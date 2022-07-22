const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {

    const authorization = request.get('authorization');
    let token = null;
    try {
        if (authorization && authorization.toLocaleLowerCase().startsWith('bearer')) {
            token = authorization.substring(7);
            // token = authorization.split(' ')[1];
        }
    } catch (error) {
        next(error)
    }

    // console.log(token)

    let decodedToken = '';

    if (token != null) {
        decodedToken = jwt.verify(token, process.env.SECRET);
    }

    // console.log(decodedToken)



    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token mission or invalid' });
    }

    const { id: userId } = decodedToken;
    request.userId = userId;

    next();
}

