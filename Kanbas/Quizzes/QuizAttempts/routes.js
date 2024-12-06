import * as dao from './dao.js';
import * as questionsDao from '../Questions/dao.js';
import * as quizzesDao from '../dao.js';
import * as userDao from "../../Users/dao.js";

export default function QuizAttemptRoutes(app) {
  //create a quiz attempt 
  const createQuizAttempt = async (req, res) => {
  try {
    const { uid, qid } = req.params; 
    // array of answers from request body
    const { answers } = req.body; 

    // Retrieve all questions for the quiz
    const questions = await questionsDao.getQuestions(qid);

    if (!questions || questions.length === 0) {
      return res.status(404).json({ error: "No questions found for the quiz." });
    }

    let totalScore = 0;
    const processedAnswers = answers.map((answer) => {
      // const questionId = mongoose.Types.ObjectId(answer.question); 
      const question = questions.find(
        (question) => question._id.toString() === answer.question
      );

      if (!question) {
        throw new Error(`Question not found for ID: ${answer.questionId}`);
      }

      let isCorrect = false;

      // Validate the answer based on question type
      if (question.type === "Multiple Choice") {
        // Find the correct choice
        const correctChoice = question.multipleChoice.choices.find((choice) => choice.isCorrect);
        // Check if the user's answer matches the correct choice
        isCorrect = correctChoice && answer.answer === correctChoice.text;
      } else if (question.type === "True/False") {
        isCorrect = question.trueFalse.correctAnswer === answer.answer;
      } else if (question.type === "Fill in the Blank") {
        // rewrite this!!! each answer is also an array 
        isCorrect = question.fillInTheBlank.answers.every(
          (correctAnswer) => correctAnswer.text === answer.answer.text
        );
      }

      // Update total score if the answer is correct
      if (isCorrect) {
        totalScore += question.points;
      }

      return {
        question: question._id,
        answer: answer.answer,
        isCorrect,
        questionPoints: question.points,
      };
    });

    // Prepare data for saving the quiz attempt
    const quizAttemptData = {
      user: uid,
      quiz: qid,
      attemptNumber: 1,
      answers: processedAnswers,
      score: totalScore,
    };

    // Save the quiz attempt
    const newAttempt = await dao.createQuizAttempt(quizAttemptData);

    res.json(newAttempt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
app.post('/api/quizzes/:uid/:qid/attempt', createQuizAttempt);

const updateQuizAttempt = async (req, res) => {
  try {
    const { uid, qid } = req.params; 
    const { answers } = req.body;

    // Find the existing attempt
    const quizAttempt = await dao.getQuizAttemptById(uid, qid);
    const quiz = await quizzesDao.getQuiz(qid);

    const user = await userDao.findUserById(uid);

    // Check if the student has remaining attempts
    if ((quizAttempt.attemptNumber >= quiz.options.numOfAttempts) && user.role === 'STUDENT') {
      return res.status(403).json({ error: "Maximum attempts reached." });
    }

    //get questions
    const questions = await questionsDao.getQuestions(qid);

    // Validate answers and calculate new score
    let totalScore = 0;

    const processedAnswers = await Promise.all(
      answers.map(async (answer) => {
        const question = questions.find(
          (question) => question._id.toString() === answer.question
        );
        if (!question) {
          throw new Error(`Question not found: ${answer.question}`);
        }

        let isCorrect = false;

        if (question.type === "Multiple Choice") {
          const correctChoice = question.multipleChoice.choices.find((choice) => choice.isCorrect);
          isCorrect = correctChoice && answer.answer === correctChoice.text;
        } else if (question.type === "True/False") {
          isCorrect = question.trueFalse.correctAnswer === answer.answer;
        } else if (question.type === "Fill in the Blank") {
          if (!Array.isArray(answer.answer)) {
            throw new Error(`Invalid data: answer.answer must be an array for "Fill in the Blank" questions.`);
          }
          isCorrect = answer.answer.every((providedAnswer, index) => {
            const correctAnswer = question.fillInTheBlank.answers[index];
            return correctAnswer && correctAnswer.text === providedAnswer.text;
          });
        }

        if (isCorrect) {
          totalScore += question.points;
        }

        return {
          question: question._id,
          answer: answer.answer,
          isCorrect,
          questionPoints: question.points,
        };
      })
    );

    // Update the quiz attempt
    quizAttempt.answers = processedAnswers;
    quizAttempt.score = totalScore;
    quizAttempt.dateTaken = new Date();
    quizAttempt.attemptNumber += 1;

    const updatedAttempt = await dao.updateQuizAttempt(quizAttempt._id, quizAttempt);
    res.json(updatedAttempt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
app.put('/api/quizzes/:uid/:qid/attempt', updateQuizAttempt);

const getQuizAttempt = async (req, res) => {
  const {uid, qid} = req.params;
  const attempt = await dao.getQuizAttemptById(uid, qid);
  res.send(attempt);
}
app.get('/api/quizzes/:uid/:qid/attempt', getQuizAttempt);

}

