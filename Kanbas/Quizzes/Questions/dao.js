import model from "./model.js";

export async function getQuestionsByQuizId(quizId) {
  return await model.find({ quiz: quizId });
}


//get questions based on quiz
export function getQuestions(quizId) {
  return model.find({ quiz: quizId });
}
export function getQuestionById(questionId) {
  return model.findOne({ _id: questionId});
}
// add question

export function addQuestion(question) {
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
