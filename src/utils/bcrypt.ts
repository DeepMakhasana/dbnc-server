import bcrypt from "bcrypt";

export async function hashSecret(secret: string): Promise<string> {
  const saltRounds = 10;
  const hashedSecret = await bcrypt.hash(secret, saltRounds);
  return hashedSecret;
}

export async function verifySecret(secret: string, hashedSecret: string): Promise<boolean> {
  return await bcrypt.compare(secret, hashedSecret);
}
