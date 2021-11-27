const { StatusCodes } = require('http-status-codes');

module.exports = async (req, res, next) => {
    try {

        //deconstruct the value of user permissions from user token 
        const { permissions: { workOrder } } = req.userData._roleId._permissionId

        console.log(workOrder, req.method)

        if (req.method == "POST" && workOrder.canCreate) next();
        else if (req.method == "GET" && workOrder.canRead) next();
        else if (req.method == "POST" && workOrder.canUpdate) next();
        else if (req.method == "DELETE" && workOrder.canDelete) next();
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
