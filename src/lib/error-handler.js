const HTTP = require("http-status-codes");

function wrap(handler) {
    return async (req, res) => {
        try {
            const result = await handler(req, res);
            const responseBody = JSON.stringify(result);
            res.set({
                "Content-Type": "application/json",
                "Content-Length": responseBody.length
            });
            res.status(HTTP.StatusCodes.OK);
            return res.send(result);
        } catch (err) {
            return getErrorHandler(res, err);
        }
    };
}

function getErrorHandler(res, err) {
    let code = parseInt(err.statusCode || err.code);
    if (typeof code !== "number" || isNaN(code)) {

        code = HTTP.StatusCodes.INTERNAL_SERVER_ERROR;
        console.error([
            "Unexpected error thrown",
            "Code 500",
            `Message ${err.message}`,
            `Stack ${err.stack}`,
            `Raw ${err}`,
        ].join("\n"));
    }
    res.status(code);
    res.send(err);
}

module.exports = {
    wrap
};