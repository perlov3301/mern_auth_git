// express default errorPage is html
// we will have json error Message
// first function: catch of error not found route
const notFound = (req, res, next) => {
    const error=new Error(
        `not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
//second function: throw error(message); 
//express knows that first among four arg is 
//the custom error method
const errorHandler = (err, req, res, next) => {
// if there is error statusCode can't be 200
    let statusCode = res.statusCode === 200
     ? 500 : res.statusCode;
     let message = err.message;
// error from mongoose: 
     if(err.name ==='CastError' 
        && err.kind==='ObjectId') {
            statusCode = 404;
            message = 'Resource not found';
        }
      res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production'
               ? null : err.stack,
      });
      //next();
};
export{
    notFound, errorHandler,
};
