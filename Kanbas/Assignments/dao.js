import model from "./model.js";
export function updateAssignment(assignmentId, assignmentUpdates) {
    return model.updateOne({ _id: assignmentId }, assignmentUpdates);
}
export function deleteAssignment(assignmentId) {
    return model.deleteOne({ _id: assignmentId });
}
export function getAssignments(courseId) {
    return model.find({ course: courseId });
}
export function createAssignment(assignment) {
    delete assignment._id
    return model.create(assignment);
}