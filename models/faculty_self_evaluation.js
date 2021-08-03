const mongoose = require('mongoose');

const modelName = 'FacultySelfEvaluation';

const CourseSchema = mongoose.Schema({
    course_name: { type: String, required: true },
    course_code: { type: String, required: true },
});

const FacultySelfEvaluationSchema = mongoose.Schema({
    hdp_training: { type: String, enum: ['yes', 'no'], default: 'no' },
    higher_degree_earned: { type: String, enum: ['yes', 'no'], default: 'no' },
    entrepreneurship_training: { type: String, enum: ['yes', 'no'], default: 'no' },
    other_trainings_skills_gained: { type: String, enum: ['yes', 'no'], default: 'no' },

    // document owner
    user: { type: mongoose.Types.ObjectId, ref: 'Faculty', default: null },

    // course tought
    bsc_courses: { type: [CourseSchema], default: [] },
    msc_courses: { type: [CourseSchema], default: [] },
    phd_courses: { type: [CourseSchema], default: [] },

    // tutored courses
    bsc_courses: { type: Number, default: null },
    msc_courses: { type: Number, default: null },
    phd_courses: { type: Number, default: null },

    // teaching and learning
    student_feedback_teaching_quality_rating: { type: Number, min: 0, max: 5, default: 0 },
    student_feedback_motivation: { type: Number, min: 0, max: 5, defaut: 0 },
    student_feedback_overall_satisfaction: { type: Number, min: 0, max: 5, default: 0 },

    teaching_materials_hard_copy: { type: Number, default: null },
    teaching_materials_soft_copy: { type: Number, default: null },
    e_learning_lectures_full_course: { type: Number, default: null },
    e_learning_lectures_part_of_course: { type: Number, default: null },
    tutorial_exercises_num_of_exercises: { type: Number, default: null },
    laboratory_courses_supervised: { type: Number, default: null },

    // Entrepreneurial projects
    bsc_msc_student_advised_partially_done: { type: Number, default: null },
    bsc_msc_student_advised_completed: { type: Number, default: null },
    bsc_msc_student_advised_prototype_developed: { type: Number, default: null },

    personally_executed_partially_done: { type: Number, default: null },
    personally_executed_completed: { type: Number, default: null },
    personally_executed_prototype_developed: { type: Number, default: null },

    // research
    num_of_research_grants_applied_internal: { type: Number, default: null },
    num_of_research_grants_applied_external: { type: Number, default: null },
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

    paper_presented_on_conference_national: { type: Number, default: null },
    paper_presented_on_conference_international: { type: Number, default: null },

    seminar_speaker_internal: { type: Number, default: null },
    seminar_speaker_external: { type: Number, default: null },

    // cooperation with university abroad
    faculty_exchange: { type: Number, default: null },
    joint_projects: { type: Number, default: null },

    // university industry linkage
    invited_industrialists_number: { type: Number, default: null },
    invited_industrialists_percent_course_covered: { type: Number, default: null },
    invited_industrialists_num_of_joint_projects: { type: Number, default: null },

    industry_projects_initiated: { type: Number, default: null },
    industry_projects_completed: { type: Number, default: null },

    mentoring_internship_students_number: { type: Number, default: null },

    // consultancy
    short_term_training: { type: Number, default: null },
    num_of_consulting_services_initiated: { type: Number, default: null },
    num_of_consulting_services_completed: { type: Number, default: null },
    consulting_income_generated: { type: Number, default: null },

    // technology transfer
    it_projects_initiated: { type: Number, default: null },
    it_projects_completed: { type: Number, default: null },
    patented_research_outputs: { type: Number, default: null },
    enterprise_encubated: { type: Number, defaut: null },

    // community engagement
    num_of_community_services_initiated: { type: Number, default: null },
    num_of_community_services_completed: { type: Number, default: null },
    num_of_benefited_parties: { type: Number, default: null },
});

FacultySelfEvaluationSchema.options.toJSON = {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
};

module.exports = mongoose.model(modelName, FacultySelfEvaluationSchema);