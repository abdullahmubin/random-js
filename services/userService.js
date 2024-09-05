import models from "../models/index.js";

export const saveUser = async (user) => {
    const model = new models.User({ username: user.username, createdAt: new Date() })
    const saveUser = await model.save();
    return saveUser;
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

    return null;
}

export const getById = async (id) => {
    const User = models.User;

    let model = await User.findById(id);

    if (model) {
        return model;
    }

    return null;
}

export const deleteById = async (id) => {
    const User = models.User;

    const result = await User.deleteOne({ _id: id });

    return result;
}