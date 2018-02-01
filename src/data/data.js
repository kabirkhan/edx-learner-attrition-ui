import { getCourseData } from '../demo_data/generator.js'
const courses = require('./courses_in_progress.json');

export function getCurrentCourseRuns() {
  return courses;
}

export function getCoursePredictions(courseId) {
  return getCourseData(courseId)
}