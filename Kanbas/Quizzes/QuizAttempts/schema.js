import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  question: { type: mongoose.Schema.Types.ObjectId, ref: "QuestionsModel", required: true },
  answer: {
    type: mongoose.Schema.Types.Mixed, // Flexible to handle multiple types (e.g., string, boolean, array)
    required: true
  },
  isCorrect: { type: Boolean },
  questionPoints: { type: Number, required: true }, // Points for the question
});

const schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizzesModel", required: true },
    attemptNumber: { type: Number, required: true },
    answers: [answerSchema],
    score: { type: Number, default: 0 },
    dateTaken: { type: Date, default: Date.now },
    completed: { type: Boolean, default: true },
  },
  { collection: "quizAttempts", timestamps: true }
);

export default schema;