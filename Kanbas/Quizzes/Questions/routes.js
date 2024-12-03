import * as questionsDao from "./dao.js"

export default function QuestionsRoutes(app) {
  //update question
    app.put("/api/questions/:questionId", async (req, res) => {
        const { questionId } = req.params;
        const questionUpdates = req.body;
        const status = await questionsDao.updateQuestion(questionId, questionUpdates);
        res.send(status);
    });
    //delete question
    app.delete("/api/questions/:questionId", async (req, res) => {
      const { questionId } = req.params;
        const status = await quizzesDao.deleteQuiz(questionId);
        res.send(status);
    });
  }