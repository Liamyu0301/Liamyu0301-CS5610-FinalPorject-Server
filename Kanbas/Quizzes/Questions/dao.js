import model from "./model.js";

//get questions based on quiz
export function getQuestions(quizId) {
  return model.find({ quiz: quizId });
}
// add question

export function addQuestion(question) {
  delete question._id
  return model.create(question);
}

//delete a question
export function deleteQuiz(questionId) {
  return model.deleteOne({ _id: questionId });
}

//update a question

export function updateQuestion(questionId, questionUpdates) {
  return model.updateOne({ _id: questionId }, questionUpdates);
}
