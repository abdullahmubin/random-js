import models from "../models/index.js";

export const saveUser = async (user) => {
    const model = new models.User({ username: user.username, createdAt: new Date() })
    const saveUser = await model.save();
    return saveUser;
}