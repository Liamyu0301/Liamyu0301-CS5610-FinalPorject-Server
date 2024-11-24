import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.delete("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const status = assignmentsDao.deleteAssignment(assignmentId);
    res.sendStatus(204);
  });

  // Update an assignment
  app.put("/api/assignments/:course/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const updatedAssignment = assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
    if (updatedAssignment) {
      res.status(200).json(updatedAssignment);
    } else {
      res.status(404).send({ error: "Assignment not found" });
    }
  });
}