import crypto from 'crypto';

export function hash(string: string): string {
  return crypto.createHash('sha256')
    .update(string)
    .digest("hex");
}

export function compare(string: string, hash: string): boolean {
  const generatedHash = crypto.createHash('sha256')
    .update(string)
    .digest("hex");

  return generatedHash === hash;
}