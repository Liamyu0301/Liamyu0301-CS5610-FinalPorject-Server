import model from "./model.js";

//get quiz attempts by student

// export const getQuizAttemptByUserAndQuiz = (userId, quizId) => {
//   return model.find({ user: userId, quiz: quizId });
// };

// get quiz attempt by id 
// export const getQuizAttemptById = (userId, quizId) => {
//   return model.findOne({ user: userId, quiz: quizId });
//
// };
const getQuizAttemptById = async (uid, qid) => {
  // Query the latest attempt
  const attempts = await db.collection('quizAttempts').find({ user: uid, quiz: qid }).sort({ attemptNumber: -1 }).limit(1).toArray();
  return attempts[0];  // Return the most recent attempt
};


//post to add a quiz attempt
export const createQuizAttempt = (quizAttempt) => {
  delete quizAttempt._id
  return model.create(quizAttempt);
};

export const updateQuizAttempt = async (quizAttemptId, quizAttemptUpdates) => {
  return model.updateOne({ _id: quizAttemptId }, quizAttemptUpdates);
};