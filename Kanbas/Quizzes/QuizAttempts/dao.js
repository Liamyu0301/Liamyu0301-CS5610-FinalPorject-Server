import model from "./model.js";

//get quiz attempts by student

export const getQuizAttemptByUserAndQuiz = (userId, quizId) => {
  return model.find({ user: userId, quiz: quizId });
};

// get quiz attempt by id 
export const getQuizAttemptById = (userId, quizId) => {
  return model.findOne({ user: userId, quiz: quizId });

};

//post to add a quiz attempt
export const createQuizAttempt = (quizAttempt) => {
  delete quizAttempt._id
  return model.create(quizAttempt);
};

export const updateQuizAttempt = async (quizAttemptId, quizAttemptUpdates) => {
  // Fetch the existing attempt
  // const attempt = await model.findOne({ user: userId, quiz: quizId });
  
  // if (!attempt) {
  //   throw new Error("Quiz attempt not found");
  // }
  // const attemptId = attempt._id;
  // // Remove _id field from the quizAttempt to prevent updating it
  // const { _id, ...updateFields } = quizAttempt;

  // // Use $set to update the fields
  // return model.updateOne({ _id: attemptId }, { $set: updateFields });
  return model.updateOne({ _id: quizAttemptId }, quizAttemptUpdates);
};