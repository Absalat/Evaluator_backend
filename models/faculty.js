const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const rolesObject = require('../constants/roles');

const modelName = 'Faculty';

const FacultySchema = mongoose.Schema({
    degree_earned_bsc_nomenclature: { type: String, default: null },
    degree_earned_msc_nomenclature: { type: String, default: null },
    degree_earned_msc_thesis_title: { type: String, default: null },
    degree_earned_phd_nomenclature: { type: String, default: null },
    degree_earned_phd_thesis_title: { type: String, default: null },

    academic_rank: { type: String, default: null },
    chair_membership: { type: String, default: null },
    adminstrative_role: { type: String, default: null },

    // auth fields
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    profile_filled: { type: Boolean, default: false },
    roles: {
        type: [{
            type: String,
            enum: Object.values(rolesObject),
            required: true,
        }],
        default: []
    }
}, { timestamps: true });

FacultySchema.options.toJSON = {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
    }
};

FacultySchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    if (user.password.length < 6) {
        return next(new Error('Password too short'));
    }

    try {
        const salt = await bcrypt.genSalt(process.env.SALT_FACTOR);
        user.password = await bcrypt.hash(user.password.trim(), salt);

        return next();
    } catch (err) {
        return next(err);
    }
});

FacultySchema.methods.isPasswordCorrect = function (password) {
    return bcrypt.compareSync(password, this.password);
}

FacultySchema.methods.updateProfile = function (profileInfo = {}) {
    delete profileInfo.username;
    delete profileInfo.password;
    delete profileInfo.roles;

    for (let key of Object.keys(profileInfo)) {
        this[key] = profileInfo[key];
    }

    return this.save();
}

FacultySchema.statics.findByUsername = function (username) {
    return this.model(modelName).findOne({ username: username });
}

module.exports = mongoose.model(modelName, FacultySchema);