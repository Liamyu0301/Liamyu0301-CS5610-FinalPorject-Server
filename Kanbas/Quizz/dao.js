import Database from "../Database/index.js"; 

// Select a quiz by ID
export function selectQuizById(quizId) {
    return Database.quizzes.find(item => item.id === quizId); 
}

export function selectAllQuiz() {
    return Database.quizzes;
}

// Create a new quiz
export function createUnpublishedQuiz(quiz) {
    const newQuiz = { ...quiz, id: Date.now().toString(), published: false };
    Database.quizzes.push(newQuiz);
    return newQuiz;
}

// Publish or unpublish a quiz by ID
export function publishById(quizId) {
    const quiz = Database.quizzes.find(item => item.id === quizId);
    if (quiz) {
        quiz.published = !quiz.published; 
        return 'success';
    }
    return 'fail';
}

// Update a quiz by ID
const allowedFields = [
    "title", "description", "course", "assignTo", "type", "points", 
    "group", "shuffleAnswers", "timeLimit", "quiz_limit_time", 
    "multipleAttempts", "attempt_limit", "showCorrectAnswers", 
    "displayGradeAs", "correct_answers_visibility", "accessCode", 
    "oneQuestionAtTime", "webcamReq", "lockQuestions", 
    "dueDate", "availableDate", "availableUntil"
];

export function updateQuiz(id, dataList) {
    const index = Database.quizzes.findIndex(item => item.id === id);
    if (index !== -1) {
        const filteredData = Object.keys(dataList)
            .filter(key => allowedFields.includes(key)) // 只允许更新指定字段
            .reduce((obj, key) => ({ ...obj, [key]: dataList[key] }), {});
        Database.quizzes[index] = {
            ...Database.quizzes[index],
            ...filteredData,
        };
        return 'success';
    }
    return 'fail';
}

// Delete a quiz by ID
export function deleteQuiz(quizId) {
    const initialLength = Database.quizzes.length;
    Database.quizzes = Database.quizzes.filter(quiz => quiz.id !== quizId);
    return Database.quizzes.length < initialLength ? 'success' : 'fail';
}