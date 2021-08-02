const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const modelName = 'Faculty';

const FacultySchema = mongoose.Schema({
    degree_earned: {
        bsc: {
            nomenclature: { type: String, default: null },
        },
        msc: {
            nomenclature: { type: String, default: null },
            thesis_title: { type: String, default: null },
        },
        phd: {
            nomenclature: { type: String, default: null },
            thesis_title: { type: String, default: null },
        }
    },
    academic_rank: { type: String, default: null },
    chair_membership: { type: String, default: null },
    adminstrative_role: { type: String, default: null },

    // auth fields
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

FacultySchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    if (user.password.length < 6) {
        return next(new Error('Password too short'));
    }

    try {
        const salt = await bcrypt.genSalt(process.env.SALT_FACTOR);
        user.password = await bcrypt.hash(user.auth.password.trim(), salt);

        return next();
    } catch (err) {
        return next(err);
    }
});

FacultySchema.methods.isPasswordCorrect = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model(modelName, FacultySchema);