const mongoose = require('mongoose');

const modelName = 'ChairSelfEvaluation';
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });

const ChairSelfEvaluationSchema = mongoose.Schema({
    year: { type: String, default: null },
    semester: { type: Number, enum: [1, 2, null], default: null },
    evaluation_type: { type: String, enum: ['expected', 'achieved'], default: 'expected' },

    checked: { type: Boolean, default: false, default: null },
    checked_by: { type: mongoose.Types.ObjectId, ref: 'Faculty', default: null },
    checked_date: { type: Date, default: null },

    approved: { type: Boolean, default: false },
    approved_by: { type: mongoose.Types.ObjectId, ref: 'Faculty', default: null },
    approved_date: { type: Date, default: null },

    // the faculty id of the chair filling the form.
    user: { type: mongoose.Types.ObjectId, ref: 'Faculty', default: null },

    // Chair's profile.
    num_of_technical_staff: { type: Number, default: null },
    num_of_bsc_holders: { type: Number, default: null },
    num_of_msc_holders: { type: Number, default: null },
    num_of_phd_holders: { type: Number, default: null },
    num_of_asst_professors: { type: Number, default: null },
    num_of_assoc_professors: { type: Number, default: null },
    num_of_full_professors: { type: Number, default: null },

    // Staff capacity building.
    hdp_training: { type: String, enum: ['yes', 'no'], default: 'no' },
    higher_degree_study_started: { type: String, enum: ['yes', 'no'], default: 'no' },
    higher_degree_study_completed: { type: String, enum: ['yes', 'no'], default: 'no' },
    special_training_started: { type: String, enum: ['yes', 'no'], default: 'no' },
    special_training_completed: { type: String, enum: ['yes', 'no'], default: 'no' },

    // Teaching and learing
    student_feedback_teaching_quality: { type: Number, default: null },
    student_feedback_teaching_motivation: { type: Number, default: null },
    student_feedback_overall_satisfaction: { type: Number, default: null },

    teaching_materials_hard_copy: { type: Number, default: null },
    teaching_materials_soft_copy: { type: Number, default: null },
    e_learning_lectures_full_course: { type: Number, default: null },
    e_learning_lectures_part_of_course: { type: Number, default: null },

    // Research
    num_of_research_grant_applied_internal: { type: Number, default: null },
    num_of_research_grant_applied_external: { type: Number, default: null },
    amount_of_grant_secured_internal: { type: Number, default: null },
    amount_of_grant_secured_external: { type: Number, default: null },

    phd_students_supervision_enrolled: { type: Number, default: null },
    phd_students_supervision_completed: { type: Number, default: null },

    msc_students_supervision_enrolled: { type: Number, default: null },
    msc_students_supervision_completed: { type: Number, default: null },
    msc_students_supervision_manuscripts_produced: { type: Number, default: null },

    // Publication
    published_journal_papers_national: { type: Number, default: null },
    published_journal_papers_international: { type: Number, default: null },
    submitted_journal_papers_national: { type: Number, default: null },
    submitted_journal_papers_international: { type: Number, default: null },
    conference_proceedings_national: { type: Number, default: null },
    conference_proceedings_international: { type: Number, default: null },

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
    num_of_consulting_services_initiated: { type: Number, default: null },
    num_of_consulting_services_completed: { type: Number, default: null },
    consulting_income_generated: { type: Number, default: null },

    // technology transfer
    it_projects_initiated: { type: Number, default: null },
    it_projects_completed: { type: Number, default: null },
    potential_research_outputs: { type: Number, default: null },

    // community engagement
    num_of_community_services_initiated: { type: Number, default: null },
    num_of_community_services_completed: { type: Number, default: null },
    num_of_benefited_parties: { type: Number, default: null },
});

const model = mongoose.model(modelName, ChairSelfEvaluationSchema);

const first = model({});
first.save();
