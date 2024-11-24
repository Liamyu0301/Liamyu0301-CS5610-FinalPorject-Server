import * as enrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app) {
  app.post("/api/enrollments", (req, res) => {
    const { userId, courseId } = req.body;
    const enrollment = enrollmentsDao.enrollUserInCourse(userId, courseId);
    if (enrollment) {
      res.status(201).json(enrollment);
    } else {
      res.status(400).json({ error: "User is already enrolled in this course." });
    }
  });

  app.delete("/api/enrollments", (req, res) => {
    const { userId, courseId } = req.body;
    enrollmentsDao.unenrollUserFromCourse(userId, courseId);
    res.status(200).json({ message: "Unenrollment successful." });
  });

  app.get("/api/enrollments/:userId", (req, res) => {
    const { userId } = req.params;
    const enrollments = enrollmentsDao.findEnrollmentsByUserId(userId);
    res.status(200).json(enrollments);
  });

  app.get("/api/enrollments", (req, res) => {
    const enrollments = dao.findAllEnrollments();
    res.send(enrollments);
  });
}