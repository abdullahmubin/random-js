import models from "../models/index.js";
import bcrypt from 'bcrypt'
import { BadRequest, NotFound, DuplicateFound } from "../utils/customErrors.js";
import { generateTokey } from './../utils/index.js'

const saltRounds = 10;

async function hashPassword(password) {
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (err) {
        throw err;
    }
}

async function comparePasswords(plainPassword, hashedPassword) {
    try {
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        return isMatch;
    } catch (err) {
        throw err;
    }
}

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

export const registerUser = async (user) => {
    console.log('user');
    console.log(user);

    const hashedPassword = await hashPassword(user.password);

    const model = new models.User({
        username: user.username,
        email: user.email,
        password: hashedPassword,
        role: "customer",
        createdAt: new Date()
    })

    const saveData = await model.save();

    return saveData;

}

export const login = async (data) => {
    console.log('email: ')
    console.log(data)
    let { email, password } = data;
    const existingUser = await models.User.findOne({ email });

    if (!existingUser) {
        throw new Error("user not found");
    }

    console.log('existingUser');
    console.log(existingUser)
    console.log('password: ' + password)
    // const isPasswordValid = bcrypt.compare(password, existingUser.password);
    const match = await comparePasswords(password, existingUser.password);

    if (!match) {
        throw new Error("Incorrect password.");
    }

    const token = generateTokey(existingUser);
    return token;
}