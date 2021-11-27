const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../dependencies/config");
const { StatusCodes } = require('http-status-codes');
const CONSTANTS = require("../../utils/constants");
const UserModel = require('../models/users.models')


/* DECODING JWT */
module.exports = async (req, res, next) => {
    try {

        if (!req.headers.authorization) {

            return res.status(StatusCodes.BAD_REQUEST).json({

                success: false,
                hasError: true,
                error: ["Authentication failed. Header is missing."]

            });

        } else {

            /* FETCH FIRST PART OF THE TOKEN SENT IN HEADERS */
            const token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, JWT_SECRET);

            req.userData = decoded;

            //next handler
            next()
        }

    } catch (error) {

        console.log('check auth error ', error)

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({

            success: false,
            hasError: true,
            error: ["Internal Server Error"]

        });

    }
};
