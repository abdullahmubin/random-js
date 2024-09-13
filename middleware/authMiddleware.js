import jwt from 'jsonwebtoken';
import { secretKey } from './../utils/index.js'

export const authenticateToken = async (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader)
        return res.status(401).json({ message: "Unauthorized: missing token" })

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token)
        return res.status(401).json({ message: "Unauthorized: missing token" })

    console.log('secretKey: ' + secretKey)

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden: Invalid token" })

        }

        req.user = user;
        next();
    })
}

