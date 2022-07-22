const ERROR_HANDLERS = {
    CastError: (response) => {
        response.status(400).end();
    },
    ValidationError: (response, error) => {
        response.status(409).send({
            error: error.message
        })
    },
    JsonWebTokenError: (response) => {
        return response.status(401).json({ error: 'token mission or invalid' });
    },
    TokenExpiredError: (response) => {
        return response.status(401).json({ error: 'token expired' });

    },
    defaulError: (response) => {
        response.status(500).end();

    }
}




module.exports = (error, request, response, next) => {
    // console.log(error);
    console.log(error.name);
    const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaulError;

    handler(response, error);

}