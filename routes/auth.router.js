const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Token = require('../models/Token');
const Role = require('../models/Role');
const Biography = require('../models/Biography');
const { check, validationResult } = require('express-validator');
const config = require('config');
const router = Router();
const authHelper = require('../helpers/authHelpers');

const updateToken = async (userId, role) => {
    try {
        const accessToken = authHelper.generateAccessToken(userId, role);
        const refreshToken = authHelper.generateRefreshToken(role);
        await authHelper.replaceDbRefreshToken(refreshToken.id, userId);

        return { accessToken, refreshToken: refreshToken.token };
    } catch (error) {
        console.log(error);
    }
};

getExpiredTime = () => {
    let now = new Date();
    return Date.parse(now) + 900000;
}

router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректные данные'
                })
            }

            const { email, password } = req.body
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: 'Неверный логин или пароль' });
            }

            const isMatch = bcrypt.compareSync(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Неверный пароль' });
            }

            const { accessToken, refreshToken } = await updateToken(user._id, user.role);
            const expiredIn = getExpiredTime();

            res.json({ accessToken, refreshToken, expiredIn, userId: user._id });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Что-то пошло не так' });
        }
    });

router.post('/register',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists(),
        check('firstName', 'Введите имя').exists(),
        check('lastName', 'Введите фамилию').exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректные данные'
                })
            }

            const { email, password, firstName, lastName, nickName } = req.body;
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const user = await User.create({ email, password: hash });
            await Biography.create({ firstName, lastName, nickName, user: user._id });

            const { accessToken, refreshToken } = await updateToken(user._id, 'user');
            const expiredIn = getExpiredTime();

            res.json({ accessToken, refreshToken, expiredIn, userId: user._id });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Что-то пошло не так' });
        }
    });

router.post('/refresh-token', async (req, res) => {
    try {
        const { refreshToken } = req.body;
        const payload = jwt.verify(refreshToken, config.get('jwtSecret'));
        if (payload.type !== 'refresh') {
            res.status(400).json({ message: 'Неверный токен!' });
        }

        const tokenData = await Token.findOne({ tokenId: payload.id });

        if (tokenData === null) {
            res.status(400).json({ message: 'Неверный токен!' });
        }

        const tokens = await updateToken(tokenData.userId, payload.role);
        const expiredIn = getExpiredTime();

        res.json({ ...tokens, expiredIn });
    } catch (error) {
        console.log(error)
        if (error instanceof jwt.TokenExpiredError) {
            res.status(400).json({ message: 'Ошибка. Перезайдите в приложение!', });
        } else if (error instanceof jwt.JsonWebTokenError) {
            res.status(400).json({ message: 'Ошибка. Перезайдите в приложение!' });
        }
        res.status(500).json({ message: 'Что-то пошло не так' });
    }
})

module.exports = router;
