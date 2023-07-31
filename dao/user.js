import UserModel from '../models/user.js'

class Users {
    static createUser(user) {
        return UserModel.create(user)
    }

    static getUsers() {
        return UserModel.find().populate('cart')
    }

    static getUserById(id) {
        return UserModel.findById(id).populate('cart')
    }

    static updateUserById(id, data) {
        return UserModel.updateOne({_id: id}, {$set: data})
    }

    static updatePassword(id, data) {
        return UserModel.updateOne({_id: id}, {password: data})
    }

    static deleteUser(id) {
        return UserModel.deleteOne({_id: id})
    }

    static getUserByEmail(email) {
        return UserModel.findOne({email: email})
    }

    static deleteInactive(filter) {
        return UserModel.deleteMany(filter);
    }

    static lastConnection(last_connection) {
        return UserModel.find(last_connection)
    }

    static getUserPremium(email, role) {
        return userModel.findOne(email, role)
    }
}

export default Users