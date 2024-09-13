import multer from 'multer';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
        // cb(null, file.originalname);
    }
})

export const uploadFile = multer({ storage: storage })

export const secretKey = crypto.randomBytes(32).toString('hex');

export const generateTokey = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role
    }

    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}
