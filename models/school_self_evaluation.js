const mongoose = require('mongoose');

const modelName = 'SchoolSelfEvaluation';

const SchoolSelfEvaluationSchema = mongoose.Schema({
    // this will have the format user.id_year_evaluation_type_semester
    document_key: { type: String, unique: true },

    year: { type: String, required: true },
    semester: { type: Number, enum: [1, 2, null], default: null },
    evaluation_type: { type: String, enum: ['expected', 'achieved'], required: true },

    checked: { type: Boolean, default: false, default: null },
    checked_by: { type: mongoose.Types.ObjectId, ref: 'Faculty', default: null },
    checked_date: { type: Date, default: null },

    approved: { type: Boolean, default: false },
    approved_by: { type: mongoose.Types.ObjectId, ref: 'Faculty', default: null },
    approved_date: { type: Date, default: null },

    // document_owner
    user: { type: mongoose.Types.ObjectId, ref: 'Faculty', required: true, index: true },

    // academic staff profile
    technical_staffs: { type: Number, default: null },
    asst_lecturers: { type: Number, default: null },
    lecturers: { type: Number, default: null },
    asst_profesors: { type: Number, default: null },
    assoc_professors: { type: Number, default: null },
    profesors: { type: Number, default: null },

    // administrative staff profiles
    administrators: { type: Number, default: null },
    secretaries: { type: Number, default: null },
    research_staffs: { type: Number, default: null },
    num_of_chairs: { type: Number, default: null },
    members_chair: { type: Number, default: null },
    chairs_submitted_annual_plan: { type: Number, default: null },
    chairs_submitted_quarterly_report: { type: Number, default: null },

    // programs
    bsc_programs: { type: Number, default: null },
    msc_programs: { type: Number, default: null },
    phd_programs: { type: Number, default: null },

    // student profiles
    ug_students: { type: Number, default: null },
    msc_students: { type: Number, default: null },
    phd_students: { type: Number, default: null },

    // staff capacity building
    hdp_training: { type: Number, default: null },
    msc_started: { type: Number, default: null },
    msc_completed: { type: Number, default: null },
    phd_started: { type: Number, default: null },
    phd_completed: { type: Number, default: null },
    special_training: { type: Number, default: null },

    // teaching and learning
    student_feedback_teaching_quality: { type: Number, min: 0, max: 5, default: 0 },
    student_feedback_motivation: { type: Number, min: 0, max: 5, defaut: 0 },
    student_feedback_overall_satisfaction: { type: Number, min: 0, max: 5, default: 0 },

    teaching_materials_hard_copy: { type: Number, default: null },
    teaching_materials_soft_copy: { type: Number, default: null },
    e_learning_lectures_full_course: { type: Number, default: null },
    e_learning_lectures_part_of_course: { type: Number, default: null },

    // student education & research taskforces (sert)
    sert_num_of_project_teams: { type: Number, default: null },
    sert_num_of_projects: { type: Number, default: null },
    sert_num_of_tutorials: { type: Number, default: null },

    // entrepreneurship
    courses_num_of_students: { type: Number, default: null },
    training_num_of_trainings: { type: Number, default: null },
    training_num_of_students: { type: Number, default: null },

    project_num_of_projects: { type: Number, default: null },
    project_num_of_students: { type: Number, default: null },

    num_of_motivational_programs: { type: Number, default: null },
    num_of_motivational_program_atendees: { type: Number, default: null },

    // Research
    num_of_research_grant_applied_internal: { type: Number, default: null },
    num_of_research_grant_applied_external: { type: Number, default: null },
    amount_of_grant_secured_internal: { type: Number, default: null },
    amount_of_grant_secured_external: { type: Number, default: null },

    phd_students_supervision_enrolled: { type: Number, default: null },
    phd_students_supervision_completed: { type: Number, default: null },

    msc_students_supervision_enrolled: { type: Number, default: null },
    msc_students_supervision_completed: { type: Number, default: null },

    // publication
    published_journal_papers_national: { type: Number, default: null },
    published_journal_papers_international: { type: Number, default: null },
    submitted_journal_papers_national: { type: Number, default: null },
    submitted_journal_papers_international: { type: Number, default: null },
    conference_proceedings_national: { type: Number, default: null },
    conference_proceedings_international: { type: Number, default: null },
    conference_workshop_organized_national: { type: Number, defaullt: null },
    conference_workshop_organized_international: { type: Number, defaullt: null },

    seminar_school_speaker: { type: Number, default: null },
    seminar_external_speaker: { type: Number, default: null },

    // cooperation with university abroad
    faculty_exchanges: { type: Number, default: null },
    student_exchanges: { type: Number, default: null },
    joint_projects: { type: Number, default: null },

    // university industry linkage
    partnership_established_mou_signed: { type: Number, default: null },
    partnership_established_joint_workshops: { type: Number, default: null },
    industry_projects_initiated: { type: Number, default: null },
    industry_projects_completed: { type: Number, default: null },

    // consultancy
    short_term_training: { type: Number, default: null },
    num_of_consulting_services_initiated: { type: Number, default: null },
    num_of_consulting_services_completed: { type: Number, default: null },
    consulting_income_generated: { type: Number, default: null },

    // technology transfer
    it_projects_initiated: { type: Number, default: null },
    it_projects_completed: { type: Number, default: null },
    patented_research_outputs: { type: Number, default: null },
    enterprise_incubated: { type: Number, default: null },

    // community engagement
    num_of_community_services_initiated: { type: Number, default: null },
    num_of_community_services_completed: { type: Number, default: null },
    num_of_benefited_parties: { type: Number, default: null },
}, { timestamps: true });

SchoolSelfEvaluationSchema.options.toJSON = {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
};


SchoolSelfEvaluationSchema.pre("save", async function (next) {
    if (this.evaluation_type == "achieved" && this.semester == null) {
        return next("semester is required for achieved evaluation type");
    }

    if (this.evaluation_type == "expected") {
        this.semester = null;
    }

    const userId = this.user.toString();

    // format:: user.id_year_evaluation_type_semester (if semester exists)
    this.document_key = `${userId}_${this.year}_${this.evaluation_type}`;

    if (this.semester) {
        this.document_key += `_${this.semester}`;
    }

    next();
});

module.exports = mongoose.model(modelName, SchoolSelfEvaluationSchema);