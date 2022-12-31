import jwt from 'jsonwebtoken';

export const generateToken = async (user, secretKey, tokenLife) => {
  const data = {
    _id: user._id,
    displayName: user.displayName,
  };

  const token = await jwt.sign(data, secretKey, { expiresIn: tokenLife || '1d' });
  return token;
};
