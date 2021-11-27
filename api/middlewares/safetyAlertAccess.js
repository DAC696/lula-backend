const { StatusCodes } = require('http-status-codes');

module.exports = async (req, res, next) => {
    try {

        // //deconstruct the value of user permissions from user token 
        const { permissions: { safetyAlert } } = req.userData._roleId._permissionId

        console.log(safetyAlert, req.method)

        if (req.method == "POST" && safetyAlert.canCreate) next();
        else if (req.method == "GET" && safetyAlert.canRead) next();
        else if (req.method == "POST" && safetyAlert.canUpdate) next();
        else if (req.method == "DELETE" && safetyAlert.canDelete) next();
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
