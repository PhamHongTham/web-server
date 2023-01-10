import jwt from 'jsonwebtoken';
import path from 'path'
import multer from 'multer'

export const generateToken = async (user, secretKey, tokenLife) => {
  const data = {
    _id: user._id,
    displayName: user.displayName,
  };

  const token = await jwt.sign(data, secretKey, { expiresIn: tokenLife || '1d' });
  return token;
};

export const verifyToken = async (token, secretKey) => {
  if (!token) {
    return;
  }
  const decoded = await jwt.verify(token.replace('Bearer ', ''), secretKey);
  return decoded;
};

export const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if(ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png"){
      cb(new Error("file type is not supported"))
      return;
    }
    cb(null, true);
  }
});

