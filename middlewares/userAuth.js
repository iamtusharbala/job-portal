import JWT from 'jsonwebtoken'
export const userAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            next("Not authorized")
        }
        const token = JWT.verify(authHeader, process.env.JWT_SECRET);
        req.user = { userId: token._id }
        next()

    } catch (error) {
        next(error)
    }
}