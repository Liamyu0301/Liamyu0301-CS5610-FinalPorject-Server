import * as dao from './dao.js';
import * as questionsDao from '../Questions/dao.js';
import * as quizzesDao from '../dao.js';

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
      const question = questions.find(
        (question) => question._id === answer.questionId
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
        isCorrect = question.fillInTheBlank.answers.every(
          (correctAnswer) => correctAnswer.text === answer.answer
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
      student: uid,
      quiz: qid,
      attemptNumber: 1,
      answers: processedAnswers,
      score: totalScore,
    };

    // Save the quiz attempt
    const newAttempt = await quizAttemptDao.createQuizAttempt(quizAttemptData);

    res.json(newAttempt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  app.post('/api/quizzes/:uid/:qid', createQuizAttempt);

};

const updateQuizAttempt = async (req, res) => {
  try {
    const { uid, qid } = req.params; 
    const { answers } = req.body;

    // Find the existing attempt
    const quizAttempt = await dao.getQuizAttemptByUserAndQuiz(uid, qid);
    const quiz = await quizzesDao.getQuiz(qid);
    if (!quizAttempt) {
      return res.status(404).json({ error: "Quiz attempt not found." });
    }

    // Check if the student has remaining attempts
    if (quizAttempt.attemptCount >= quiz.allowedAttempts) {
      return res.status(403).json({ error: "Maximum attempts reached." });
    }

    // Validate answers and calculate new score
    let totalScore = 0;

    const processedAnswers = await Promise.all(
      answers.map(async (answer) => {
        const question = await questionsDao.findQuestionById(answer.questionId);

        if (!question) {
          throw new Error(`Question not found: ${answer.questionId}`);
        }

        let isCorrect = false;

        if (question.type === "Multiple Choice") {
          const correctChoice = question.multipleChoice.choices.find((choice) => choice.isCorrect);
          isCorrect = correctChoice && answer.answer === correctChoice.text;
        } else if (question.type === "True/False") {
          isCorrect = question.trueFalse.correctAnswer === answer.answer;
        } else if (question.type === "Fill in the Blank") {
          isCorrect = question.fillInTheBlank.answers.some(
            (correctAnswer) => correctAnswer.text === answer.answer
          );
        }

        if (isCorrect) totalScore += question.points;

        return {
          question: question._id,
          answer: answer.answer,
          isCorrect,
        };
      })
    );

    // Update the quiz attempt
    quizAttempt.answers = processedAnswers;
    quizAttempt.score = totalScore;
    quizAttempt.dateTaken = new Date();
    quizAttempt.attemptCount += 1;

    const updatedAttempt = await dao.updateQuizAttempt(uid, qid, quizAttempt);
    res.json(updatedAttempt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
app.put('/api/quizzes/:uid/:qid', updateQuizAttempt);



}

