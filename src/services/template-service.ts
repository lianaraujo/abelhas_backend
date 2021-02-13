
import { promises as fs } from 'fs';
import * as handlebars from 'handlebars';
import * as path from 'path';
import User from '../models/User';
import { SendMailData } from './email-service';

class TemplateService {
  static async getMailData(data: SendMailData): Promise<any> {
    const { type, token } = data.options;
    const { user } = data;

    const source = await fs.readFile(
      path.join(__dirname, 'templates', `${type}.hbs`),
      'utf-8',
    );
    
    const baseUrl = 'http://localhost:3000'
    const link = type === 'forgot' ? `${baseUrl}/forgot/finish/${token}` : baseUrl;

    const template = handlebars.compile(source);

    return {
      from: 'Instituto Abelha Nativa <sms@copadubo.com.br>',
      to: `${user.email}`,
      subject: '[IAN] Registro de Conta',
      html: template({
        user,
        link,
      }),
    };
  }
}

export default TemplateService;