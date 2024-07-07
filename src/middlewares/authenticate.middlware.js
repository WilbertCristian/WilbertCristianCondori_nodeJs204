import jwt from 'jsonwebtoken';
import 'dotenv/config';

export function authenticateToken(req, res, next) {
    //obtenenr el token de la autirizacion 
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(" ")[1];
    if(token === null) 
        return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err)
            return res.sendStatus(403);
        console.log('user: ', user);
        req.user = user;
        next();
    });
}