import * as quizzesDao from "./dao.js"; // Import DAO functions for quizzes

export default function QuizRoutes(app) {

    // Create a new quiz
    app.post("/api/quizzes/createUnpublishedQuiz", (req, res) => {
        const quiz = { ...req.body, quiz_id: new Date().toString() };
        const newQuiz = quizzesDao.createUnpublishedQuiz(quiz);
        res.status(201).json(newQuiz); //
    });
    app.post("/api/quizzes/createPublishedQuiz", (req, res) => {
        const quiz = { ...req.body, quiz_id: new Date().toString() };
        const newQuiz = quizzesDao.createPublishedQuiz(quiz);
        res.status(201).json(newQuiz);
    });
    app.post("/api/quizzes/updateQuiz", (req, res) => {
        const { quizId } = req.body;
        const newQuiz = quizzesDao.updateQuiz(quizId); // Create the quiz using the DAO
        res.status(201).json(newQuiz); // Return the new quiz with 201 Created status
    });

    // Delete a quiz by ID
    app.delete("/api/quizzes/:quizId", (req, res) => {
        const { quizId } = req.params;
        quizzesDao.deleteQuiz(quizId); // Delete the quiz using the DAO
        res.sendStatus(204); // Return 204 No Content status
    });

        app.post("/api/quizzes/getQuizzesById", (req, res) => {
        const { quizId } = req.body;
        const selectedQuiz = quizzesDao.selectQuizById(quizId); // Delete the quiz using the DAO
            res.send(selectedQuiz);
        });
    app.post("/api/quizzes/publishById", (req, res) => {
        const { quizId } = req.body;
        const selectedQuiz = quizzesDao.publishById(quizId); // Delete the quiz using the DAO
        res.send(selectedQuiz);
    });

    app.get("/api/quizzes/getAllQuizzes", (req, res) => {
        const selectedAllQuiz = quizzesDao.selectAllQuiz(); // Delete the quiz using the DAO
        res.send(selectedAllQuiz);
    });


}
