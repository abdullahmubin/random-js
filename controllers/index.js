import configureUserController from "./userController.js";
import configureFileController from './fileController.js'
const configure = (app) => {
    configureUserController(app);
    configureFileController(app);
}

export default configure;