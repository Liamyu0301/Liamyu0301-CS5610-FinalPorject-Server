import mongoose from "mongoose";
const schema = new mongoose.Schema(
    {
        course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
        title: String,
        description: String,
        assignTo: String,
        type: {
            type: String,
            enum: ["Graded Quiz", "Ungraded Quiz"],
            default: "Graded Quiz",
            required: true
        },
        points: Number,
        group: {
            type: String,
            enum: ["ASSIGNMENTS", "QUIZZES"],
            default: "QUIZZES",
            required: true
        },
        shuffleAnswers: { type: Boolean, default: false },
        timeLimit: { type: Boolean, default: false },
        multipleAttempts: { type: Boolean, default: false },
        showCorrectAnswers: { type: Boolean, default: true },
        accessCode: { type: Boolean, default: false },
        oneQuestionAtATime: { type: Boolean, default: false },
        webcamReq: { type: Boolean, default: false },
        lockQuestions: { type: Boolean, default: false },
        displayGradeAs: {
            type: String,
            enum: ["Percentage", "Number"],
            default: "Percentage",
            required: true
        },
        dueDate: Date,
        availableDate: Date,
        availableUntil: Date,
        availableFromText: String,
        dueDateText: String,
    },
    { collection: "quizzes" }
);
export default schema;