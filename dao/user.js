import UserModel from '../models/user.js'

class Users {
    static createUser(user) {
        return UserModel.create(user)
    }

    static getUsers() {
        return UserModel.find()
    }

    static getUserById(id) {
        return UserModel.findById(id)
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
}

export default Users