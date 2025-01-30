import { verifyToken } from '@clerk/backend';

export const validateToken = async (
  token: string | undefined
): Promise<boolean> => {
  if (!token) {
    return false;
  }
  try {
    await verifyToken(token, {
      jwtKey: process.env['CLERK_JWT_KEY'],
      secretKey: process.env['CLERK_SECRET_KEY'],
    });
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
};
