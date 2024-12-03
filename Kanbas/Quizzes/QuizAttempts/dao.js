import model from "./model.js";

//get quiz attempts by student

export const getQuizAttemptByUserAndQuiz = (userId, quizId) => {
  return model.find({ user: userId, quiz: quizId });
};

// get quiz attempt by id 
// export const getQuizAttemptById = (userId, quizId) => {
//   const attempt = model.find({ user: userId, quiz: quizId });
//   const attemptId = attempt._id;
//   return model.findById(attemptId);
// };

//post to add a quiz attempt
export const createQuizAttempt = (quizAttempt) => {
  delete quizAttempt._id
  return model.create(quizAttempt);
};

export const updateQuizAttempt = (userId, quizId, quizAttempt) => {
  const attempt = model.find({ user: userId, quiz: quizId });
  const attemptId = attempt._id;
  return model.updateOne({ _id: attemptId }, quizAttempt);
}