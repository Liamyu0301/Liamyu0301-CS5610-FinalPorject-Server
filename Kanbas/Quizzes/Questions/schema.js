import mongoose from "mongoose";

const choiceSchema = new mongoose.Schema({
  text: { type: String, required: true }, // Text of the choice
  isCorrect: { type: Boolean, default: false } // Whether this choice is correct
});

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, 
    points: { type: Number, required: true, min: 0 },
    questionText: { type: String, required: true },
    type: {
      type: String,
      enum: ["Multiple Choice", "True/False", "Fill in the Blank"],
      required: true
    },
    multipleChoice: {
      choices: [choiceSchema] // List of choices for multiple choice questions
    },
    trueFalse: {
      correctAnswer: { type: Boolean, required: true } // Correct answer for true/false
    },
    fillInTheBlank: {
      answers: [
        {
          text: { type: String, required: true }, // Possible correct answer
        }
      ]
    },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quizzes" }
  },
  { collection: "questions", timestamps: true }
);

export default schema;