const mongoose = require('mongoose');

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
});

module.exports = mongoose.model(modelName, FacultySchema);