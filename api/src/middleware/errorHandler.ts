const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
      status: statusCode,
      message: err.message,
      stack: process.env.DEV ? "🥞" : err.stack,
    });
  };
  
  export default errorHandler;
  