const { StatusCodes } = require('http-status-codes');

module.exports = async (req, res, next) => {
    try {

        // //deconstruct the value of user permissions from user token 
        const { permissions: { permission } } = req.userData._roleId._permissionId

        console.log(permission, req.method)

        if (req.method == "POST" && permission.canCreate) next();
        else if (req.method == "GET" && permission.canRead) next();
        else if (req.method == "POST" && permission.canUpdate) next();
        else if (req.method == "DELETE" && permission.canDelete) next();
        else {

            return res.status(StatusCodes.FORBIDDEN).json({

                success: false,
                hasError: true,
                error: ["Sorry! You are not authorized to perform this action."]

            });

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
