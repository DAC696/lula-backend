const { StatusCodes } = require('http-status-codes');

module.exports = async (req, res, next) => {
    try {

        // //deconstruct the value of user permissions from user token 
        const { permissions: { technicalManual } } = req.userData._roleId._permissionId

        console.log(technicalManual, req.method)

        if (req.method == "POST" && technicalManual.canCreate) next();
        else if (req.method == "GET" && technicalManual.canRead) next();
        else if (req.method == "POST" && technicalManual.canUpdate) next();
        else if (req.method == "DELETE" && technicalManual.canDelete) next();
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
