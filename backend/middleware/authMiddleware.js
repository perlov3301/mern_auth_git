import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
// next is added because this is middleware
const protect = asyncHandler(async (req, res, next) => {
    let token;
//name of cookie is 'jwt';due to cookieParser we can...
    token = req.cookies.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // to put user to the user of 'token' that 
    // we can axcesse from any route
    // when we generate Token we sign({userId}, secret)
        req.user = await User.findById(decoded.userId).select('-password') ;

        next();
      } catch (error) {
        res.status(401);//not authorized
        throw new Error('invalid token');
      }
    } else {
        res.status(401);
        throw new Error('Not authorized;there is no token')
    }
});
// may be onother athentications (for example 'admin')
export { protect };