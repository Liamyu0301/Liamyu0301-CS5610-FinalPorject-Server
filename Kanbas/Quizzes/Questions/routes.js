import * as questionsDao from "./dao.js"

export default function QuestionsRoutes(app) {
    //add question for quiz
    app.post("/api/questions/:questionId", async (req, res) => {
        const { questionId } = req.params;
        const question = { ...req.body, questionId };
        const newQuestion = await questionsDao.addQuestion(question);
        res.send(newQuestion);
    });
    app.get("/api/questions/:questionId", async (req, res) => {
        const { questionId } = req.params;
        console.log(questionId,'iididididi')
        const questions = await questionsDao.getQuestionsById(questionId);
        res.json(questions);
    });
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