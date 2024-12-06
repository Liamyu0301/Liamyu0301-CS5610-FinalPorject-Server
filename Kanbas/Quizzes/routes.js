import * as quizzesDao from "./dao.js";
import * as questionsDao from "./Questions/dao.js"

export default function QuizRoutes(app) {
    app.put("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const quizUpdates = req.body;
        const status = await quizzesDao.updateQuiz(quizId, quizUpdates);
        res.send(status);
    });
    app.delete("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const status = await quizzesDao.deleteQuiz(quizId);
        res.send(status);
    });

    //get quiz object

    app.get("/api/quizzes/:quizId", async (req, res) => {
        const {quizId} = req.params;
        const quiz = await quizzesDao.getQuiz(quizId);
        res.json(quiz);
    });

    //get questions for quiz

    app.get("/api/quizzes/:quizId/questions", async (req, res) => {
        const { quizId } = req.params;
        const questions = await questionsDao.getQuestions(quizId);
        res.json(questions);
    });

    //add question for quiz
    app.post("/api/quizzes/:quizId/questions", async (req, res) => {
        const { quizId } = req.params;
        const question = { ...req.body, quiz: quizId };
        const newQuestion = await questionsDao.addQuestion(quiz);
        res.send(newQuestion);
    });
}