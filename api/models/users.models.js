const User = require('../schemas/user');

//Don't Lean this query
/**
 * @description get user by username or email
 * @param {String} userName
 */

const getUserByEmail = async (email) => {
    try {

        const user = await User.findOne({ email: email }).select(`-__v`)

        return user;

    } catch (error) {
        console.log(error);
    }
}

/**
 * @description This will create new User
 * @param {Object} User 
 */

const createNewUser = async (user) => {
    try {

        const newUser = new User(user);

        const userCreated = await newUser.save();

        return userCreated;

    } catch (error) {

        console.log(error)

    }
}

module.exports = {

    createNewUser,
    getUserByEmail

}