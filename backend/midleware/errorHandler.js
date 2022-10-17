const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  //Duplicate key error
  if (err.code === 11000) {
    err.statusCode = 400;
    for (let p in err.keyValue) {
      err.message = `${p} đã tồn tại!`;
    }
  }
  // wrong mongodb id error
  if (err.name === "CastError") {
    err.statusCode = 404;
    err.message = `Không tìm thấy ${err.path}`;
  }
  //Validation
  if (err.errors) {
    err.statusCode = 400;
    err.message = [];
    for (let p in err.errors) {
      err.message.push(err.errors[p].properties.message);
    }
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
export default errorHandler;
