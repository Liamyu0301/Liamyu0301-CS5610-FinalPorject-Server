import mongoose from "mongoose";
const schema = new mongoose.Schema(
    {
        title: String,
        course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
        description: String,
        points: Number,
        group: {
            type: String,
            enum: ["ASSIGNMENTS", "QUIZZES"],
            default: "ASSIGNMENTS",
            required: true
        },
        displayGradeAs: {
            type: String,
            enum: ["Percentage", "Number"],
            default: "Percentage",
            required: true
        },
        submissionType: {
            type: String,
            enum: ["Online", "In Person"],
            default: "Online",
            required: true
        },
        submissionOptions: {
            textEntry: { type: Boolean, default: false },
            websiteUrl: { type: Boolean, default: false },
            mediaRecordings: { type: Boolean, default: false },
            studentAnnotation: { type: Boolean, default: false },
            fileUpload: { type: Boolean, default: false }
        },
        assignTo: String,
        dueDate: Date,
        availableDate: Date,
        availableUntil: Date,
        availableFromText: String,
        dueDateText: String,
    },
    { collection: "assignments" }
);
export default schema;