import { Request, Response, NextFunction } from "express";
import { OAuth2Client } from 'google-auth-library';

import Config from "../utils/config-service";
import { isAfter } from 'date-fns';
import jwt from 'jsonwebtoken';

export interface IVerifyObject {
  id: number;
  iat: number;
  exp: number;
}

export function authorization(request: Request, response: Response, next: NextFunction): void {
  try {
    const header = request.headers.authorization;
    const googleHeader = request.headers.idtoken;
    
    if(!header && !googleHeader) {
      throw new Error('No token provided')
    }

    if(header) {
      const [_, token] = header.split(' ');
      const secret = Config.getString("JWT_SECRET");
  
      const result = jwt.verify(token, secret) as IVerifyObject;
      const now = Math.floor(Date.now() / 1000);
  
      const isExpired = isAfter(now, result.exp)
  
      if (isExpired) {
        throw new Error('Token expired');
      }

      request.params.userId = result.id.toString();
      next();
    }

    if (googleHeader) {
      const clientId = Config.getString('GOOGLE_CLIENT_ID');

      const client = new OAuth2Client(clientId);

      async function verify() {
        const ticket = await client.verifyIdToken({
          idToken: googleHeader as string,
          audience: clientId,
        });

        const payload = ticket.getPayload();
        console.info(payload);
        return payload;
        // const userId = payload['sub'];
      }

      verify().then((payload) => {
        next();
      }).catch((error) => {
        console.error(error);
        throw new Error('Google auth error');
      });
    }

  }catch(err) {
    next(err);
  }
}