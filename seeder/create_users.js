const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { FacultyModel } = require('../models');
const roles = require('../constants/roles');

dotenv.config();


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const user_credentials_list = require('./user_credentials.json');

(async () => {
    let batch = [];

    for (let credential of user_credentials_list) {
        if (batch.length == 10) {
            await Promise.all(batch.map((credential) => FacultyModel.create({
                username: credential.username,
                password: credential.password,
                roles: [roles.FACULTY],
            })));

            batch = [];
        }



        batch.push(credential);
    }

    // add the remaining users.
    if (batch.length != 0) {
        await Promise.all(batch.map((credential) => FacultyModel.create({
            username: credential.username,
            password: credential.password,
            roles: [roles.FACULTY],
        })));
    }

    console.log("users created successfuly");
    mongoose.connection.close();
})();