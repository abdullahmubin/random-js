import models from "../models/index.js";
import { BadRequest, NotFound, DuplicateFound } from "../utils/customErrors.js";

export const saveUser = async (user) => {
    const model = new models.User({ username: user.username, createdAt: new Date() })


    try {
        const saveUser = await model.save();
        return saveUser;

    } catch (error) {
        if (error.code === 11000) {
            console.log('error');
            console.log(error)
            throw new DuplicateFound('Duplicate found.' + error.message)

        } else {
            throw new Error(error.message) // rethrow if it's a different kind of error
        }
    }



}

export const getAllUsers = async () => {
    const User = models.User;
    const users = await User.find();

    return users;
}

export const update = async (user) => {
    const id = user._id;
    const User = models.User;

    let model = await User.findById(id);

    if (model) {
        model.username = user.username;
        model.save()
        return model;
    }

    throw new NotFound('User not found by the id' + id)
}

export const getById = async (id) => {
    const User = models.User;

    let model = await User.findById(id);

    if (model) {
        return model;
    }

    throw new NotFound('User not found by the id' + id)
}

export const deleteById = async (id) => {
    const User = models.User;

    let model = await User.findById(id);

    if (model) {
        const result = await User.deleteOne({ _id: id });
        return result;
    }

} 