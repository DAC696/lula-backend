const { StatusCodes } = require('http-status-codes');

module.exports = async (req, res, next) => {
    try {

        // //deconstruct the value of user permissions from user token 
        const { permissions: { workInstruction } } = req.userData._roleId._permissionId

        console.log(workInstruction, req.method)

        if (req.method == "POST" && workInstruction.canCreate) next();
        else if (req.method == "GET" && workInstruction.canRead) next();
        else if (req.method == "POST" && workInstruction.canUpdate) next();
        else if (req.method == "DELETE" && workInstruction.canDelete) next();
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
