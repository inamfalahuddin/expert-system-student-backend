const response = (res, status, message, data) => {
  res.status(status).json({
    payload: {
      status,
      data,
    },
    message,
  });
};

module.exports = response;
