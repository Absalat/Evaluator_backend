const mongoose = require('mongoose');
const dotenv = require('dotenv');
const roles = require('../constants/roles');

const { FacultyModel } = require('../models');

dotenv.config();


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

(async () => {
    const superAdmin = await FacultyModel.create({
        username: process.env.SUPER_ADMIN_USERNAME,
        password: process.env.SUPER_ADMIN_PASSWORD,
        profile_filled: true,
        roles: [
            roles.SUPER_ADMIN,
            roles.FACULTY,
        ]
    });

    console.log("super admin created succesfully");
    mongoose.connection.close();
})();