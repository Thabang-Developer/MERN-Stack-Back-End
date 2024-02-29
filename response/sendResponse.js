
exports.sendResponseInfo = (statusCode, data, res, baseUrl, method) => {
    try {
        res.status(statusCode).json({
            status: "success",
            length: data?.length,
            data,
            Url: baseUrl,
            method: `/${method}`,
        });

    } catch (error) {
        console.log(error)
    }
}