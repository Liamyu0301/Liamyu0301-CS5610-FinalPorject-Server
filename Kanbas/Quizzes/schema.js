import mongoose from "mongoose";
const schema = new mongoose.Schema(
    {
        course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
        title: String,
        description: String,
        points: Number,
        type: {
            type: String,
            enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
            default: "Graded Quiz",
            required: true
        },
        group: {
            type: String,
            enum: ["ASSIGNMENTS", "QUIZZES", "EXAMS", "PROJECTS"],
            default: "QUIZZES",
            required: true
        },
        options: {
            shuffleAnswers: { type: Boolean, default: false },
            timeLimit: { type: Boolean, default: false },
            timeLimitMinutes: Number,
            multipleAttempts: { type: Boolean, default: false },
            showCorrectAnswers: { type: Boolean, default: true },
            showCorrectAnswersTime: {
                type: String,
                enum: ["Immediately", "One Day", "One Week"],
                default: "Immediately",
                required: true
            },
            displayGradeAs: {
                type: String,
                enum: ["Percentage", "Number"],
                default: "Percentage",
                required: true
            },
            accessCode: { type: Boolean, default: false },
            oneQuestionAtATime: { type: Boolean, default: false },
            webcamReq: { type: Boolean, default: false },
            lockQuestions: { type: Boolean, default: false }
        },
        assignTo: {
            type: String,
            enum: ["Everyone"],
            default: "Everyone",
            required: true
        },
        dueDate: Date,
        availableDate: Date,
        availableUntil: Date,
        published: { type: Boolean, default: false }
    },
    { collection: "quizzes" }
);
export default schema;