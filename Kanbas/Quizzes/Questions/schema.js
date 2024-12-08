import mongoose from "mongoose";

const choiceSchema = new mongoose.Schema({
  text: { type: String, required: true }, // Text of the choice
  isCorrect: { type: Boolean, default: false } // Whether this choice is correct
});

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    points: { type: Number, required: true, min: 0 },
    questionText: { type: String, required: true },
    type: {
      type: String,
      enum: ["Multiple Choice", "True/False", "Fill in Blanks"],
      required: true
    },
    multipleChoice: {
      choices: {
        type: [choiceSchema],
        required: function () {
          return this.type === "Multiple Choice";
        }, //1 List of choices for multiple choice questions
    },
  },
    trueFalse: {
      correctAnswer: { type: Boolean, required: function () {
        return this.type === "True/False";
      }, } // Correct answer for true/false
    },
    fillInTheBlank: {
      answers: [
        {
          text: { type: String, required: function () {
            return this.type === "Fill in Blanks";
          },
   }, // Possible correct answer
        }
      ]
    },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizzesModel" },
  },
  { collection: "questions", timestamps: true }
);

export default schema;