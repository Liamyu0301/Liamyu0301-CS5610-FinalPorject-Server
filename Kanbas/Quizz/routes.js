import * as quizzesDao from "./dao.js";

export default function QuizRoutes(app) {

    // get all quizzes
    app.get("/api/quizzes", (req, res) => {
        const quizzes = quizzesDao.selectAllQuiz();
        res.json(quizzes);
    });

    // get a quiz by ID
    app.get("/api/quizzes/:quizId", (req, res) => {
        const { quizId } = req.params;
        const quiz = quizzesDao.selectQuizById(quizId);
        if (quiz) {
            res.json(quiz);
        } else {
            res.status(404).send({ error: 'Quiz not found' });
        }
    });

    // create a quiz
    app.post("/api/quizzes", (req, res) => {
        const quiz = req.body;
        const newQuiz = quizzesDao.createUnpublishedQuiz(quiz);
        res.status(201).json(newQuiz);
    });

    // update a quiz
    app.put("/api/quizzes/:quizId", (req, res) => {
        const { quizId } = req.params;
        const dataList = req.body;
        const result = quizzesDao.updateQuiz(quizId, dataList);
        if (result === 'success') {
            res.status(200).send({ message: 'Quiz updated successfully' });
        } else {
            res.status(404).send({ error: 'Quiz not found' });
        }
    });

    // delete a quiz
    app.delete("/api/quizzes/:quizId", (req, res) => {
        const { quizId } = req.params;
        const result = quizzesDao.deleteQuiz(quizId);
        if (result === 'success') {
            res.sendStatus(204);
        } else {
            res.status(404).send({ error: 'Quiz not found' });
        }
    });

    // publish or unpublish a quiz
    app.post("/api/quizzes/:quizId/publish", (req, res) => {
        const { quizId } = req.params;
        const result = quizzesDao.publishById(quizId);
        if (result === 'success') {
            res.status(200).send({ message: 'Quiz publish status toggled' });
        } else {
            res.status(404).send({ error: 'Quiz not found' });
        }
    });

}

