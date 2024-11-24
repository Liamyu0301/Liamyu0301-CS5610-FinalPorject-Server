import Database from "../Database/index.js"; // Assuming this is where quizzes are stored


// Create a new quiz
export function selectQuizById(quizId) {
    return Database.quizzes.filter(item=>{
        return item.quiz_id==quizId
    });
}
export function selectAllQuiz() {
    return Database.quizzes
}
// Create a new quiz
export function createUnpublishedQuiz(quiz) {
    const newQuiz = { ...quiz, quiz_id: Date.now().toString(),publish_status:0 }; // Unique ID using timestamp
    Database.quizzes = [...Database.quizzes, newQuiz];
    return newQuiz;
}
export function createPublishedQuiz(quiz) {
    const newQuiz = { ...quiz, quiz_id: Date.now().toString(),publish_status:1 }; // Unique ID using timestamp
    Database.quizzes = [...Database.quizzes, newQuiz];
    return newQuiz;
}
export function publishById(quizId){
    let flag = false
    Database.quizzes.forEach(item=>{
        if(item.quiz_id==quizId){
            item.publish_status = !item.publish_status
            flag = true
        }
    })
    if (flag) return '成功'
    return '失败'
}
export function updateQuiz(id,dataList) {
    let flag = false
    Database.quizzes.forEach(item=>{
        if(item.quiz_id==id){
            item = {
                ...item,
                ...dataList
            }
            flag = true
        }
    })
    return flag?'success':'fail'
}
// Delete a quiz by ID
export function deleteQuiz(quizId) {
    Database.quizzes = Database.quizzes.filter((quiz) => quiz._id !== quizId);
}


