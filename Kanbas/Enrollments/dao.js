import Database from "../Database/index.js";
// export function enrollUserInCourse(userId, courseId) {
//   const { enrollments } = Database;
//   enrollments.push({ _id: Date.now(), user: userId, course: courseId });
// }

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  const exists = enrollments.some(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );
  if (!exists) {
    const newEnrollment = {
      _id: Date.now().toString(),
      user: userId,
      course: courseId,
    };
    enrollments.push(newEnrollment);
    return newEnrollment;
  }
  return null; 
}

// export function unenrollUserFromCourse(userId, courseId) {
//   Database.enrollments = Database.enrollments.filter(
//     (enrollment) =>
//       !(enrollment.user === userId && enrollment.course === courseId)
//   );
// }


export function unenrollUserFromCourse(userId, courseId) {
  const { enrollments } = Database;
  Database.enrollments = enrollments.filter(
    (enrollment) =>
      !(enrollment.user === userId && enrollment.course === courseId)
  );
}

export function findEnrollmentsByUserId(userId) {
  return Database.enrollments.filter((enrollment) => enrollment.user === userId);
}

export function findAllEnrollments() {
  return Database.enrollments;
}