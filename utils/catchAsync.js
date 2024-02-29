const errorResponseResult = (statusCode, res, data, baseUrl, method) => {
    res.status(statusCode).json({
        status: 'error',
        data,
        Url: baseUrl,
        method: `/${method}`,
    });
};


module.exports = fn => {
    return (req, res, next) => {
        // fn(req, res, next).catch(next);
        fn(req, res, next).catch((err) => {
            console.log("Display output : ", err);
            if (err.name === 'MongoServerError' && err.code === 11000) {
                const message = `Please review your input data carefully to avoid duplications, it looks like the data existed already in the system`
                errorResponseResult(500, res, message, req.baseUrl, req.method,)
            }

            if (err.message.includes('EHOSTUNREACH') || err.message.includes('ENETUNREACH')) {
                const message = `There seems to be an issue with your network connection. Please check your internet connection and try again.`
                errorResponseResult(500, res, message, req.baseUrl, req.method,)
            }

            // if (err.name === 'ValidationError' && err.code === 500) {
            if (err.name === 'ValidationError') {
                // const message = Object.values(err.errors).map(error => error.message).join(', ');
                const message = "Please complete required field";
                errorResponseResult(500, res, message, req.baseUrl, req.method,)
            } else {
                const message = `There is a problem on the server`;
                errorResponseResult(500, res, message, req.baseUrl, req.method,)
            }

            next(err);
        });
    };
};
