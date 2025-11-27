const jwt = require("jsonwebtoken");
const User = require("../server/models/User");

module.exports = async function (req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // FIX: use decoded.userId (NOT decoded.id)
        const user = await User.findById(decoded.userId).lean();

        if (!user) {
            return res.redirect("/");
        }

        req.user = user;
        res.locals.user = user;

        next();

    } catch (err) {
        return res.redirect("/");
    }
};
