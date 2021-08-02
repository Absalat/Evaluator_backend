const mongoose = require('mongoose');
const dotenv = require('dotenv');
const FacultySchema = require('../models/faculty');
const roles = require('../constants/roles');

dotenv.config();


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

(async () => {
    const superAdmin = await FacultySchema.create({
        username: process.env.SUPER_ADMIN_USERNAME,
        password: process.env.SUPER_ADMIN_PASSWORD,
        roles: [
            roles.SUPER_ADMIN,
            roles.FACULTY,
        ]
    });

    console.log("super admin created succesfully");
})();