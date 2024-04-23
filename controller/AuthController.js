const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserServiceImpl } = require('./path/to/UserServiceImpl'); // Example UserServiceImpl import
const { JwtUtils } = require('./path/to/JwtUtils'); // Example JwtUtils import

class AuthController {
    constructor(userService, passwordEncoder, utils) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.utils = utils;
    }

    signUp(req, res) {
        const userDto = req.body;
        const user = this.userService.saveUser(userDto);
        const userDto1 = {
            id: user.id,
            username: user.username,
            email: user.email
        };
        res.status(201).json(userDto1);
    }

    async logInUser(req, res) {
        const userDto = req.body;
        const user = await this.userService.loadUserByUsername(userDto.username);
        if (await this.passwordEncoder.compare(userDto.password, user.password)) {
            const jwtToken = this.utils.createJwt(user);
            res.status(201).json(jwtToken);
        } else {
            res.status(401).json({ error: "Username and Password is incorrect" });
        }
    }

    dashboard(req, res) {
        res.send("Welcome to your Dashboard");
    }

    routes() {
        const router = express.Router();

        router.post('/sign-up', this.signUp.bind(this));
        router.post('/login', this.logInUser.bind(this));
        router.get('/dashboard', this.dashboard.bind(this));

        return router;
    }
}

module.exports = AuthController;
