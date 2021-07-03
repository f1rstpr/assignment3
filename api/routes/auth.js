const express = require("express");
const router = express.Router();
const security = require("../middleware/security");
const User = require("../models/user");
const { createUserJwt } = require("../utils/tokens");

router.post("/register", async (req, res, next) => {
    try {
        const user = await User.register(req.body);
        const token = createUserJwt(user);
        return res.status(201).json({ user, token });
    } catch (err) {
        next(err);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const user = await User.login(req.body);
        const token = createUserJwt(user);
        return res.status(201).json({ user, token });
    } catch (err) {
        next(err);
    }
});


// In INSOMINA: Headers -> Authorization: Bearer <Token From Register/Login route>
router.get(
    "/cur",
    security.requireAuthenticatedUser,
    async (req, res, next) => {
        try {
            const { email } = res.locals.user;
            const user = await User.fetchUserByEmail(email);
            const publicUser = User.makeUser(user);
            return res.status(200).json({ user: publicUser });
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;
