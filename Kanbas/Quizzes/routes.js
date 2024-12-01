import * as quizzesDao from "./dao.js";
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

    // Get all quizzes for a specific course
    app.get("/api/quizzes/:courseId", async (req, res) => {
        const { courseId } = req.params;
        try {
            const quizzes = await quizzesDao.getQuizzes(courseId);
            res.json(quizzes);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    // Get all quizzes
    app.get("/api/quizzes/getAllQuizzes", async (req, res) => {
        try {
            const quizzes = await quizzesDao.findAllQuizzes();
            res.json(quizzes);
        } catch (error) {
            res.status(500).send(error);
        }
    });


    // Add POST route to create a new quiz
    app.post("/api/quizzes", async (req, res) => {
        const newQuiz = req.body;
        try {
            const createdQuiz = await quizzesDao.createQuiz(newQuiz);
            res.status(201).json(createdQuiz); // Respond with the newly created quiz
        } catch (error) {
            res.status(500).send({ message: 'Error creating quiz' });
        }
    });


}
