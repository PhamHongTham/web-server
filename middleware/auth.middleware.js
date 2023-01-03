import { SECRET_ACCESS_TOKEN } from '../config/constant.js';
import { verifyToken } from '../helper/index.js'

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;;
    const decoded = await verifyToken(token, SECRET_ACCESS_TOKEN);
    req.user = decoded;
    next();
  } catch(err) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};
