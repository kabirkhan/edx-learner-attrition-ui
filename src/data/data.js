import { getCourseData } from '../demo_data/generator.js'
const courses = require('./courses_in_progress.json');

export function getCurrentCourseRuns() {
  return courses;
}

export function getCoursePredictions(courseId) {
  const courseRows = require('./predictions/' + courseId + '/course_demo_rows.json')
  console.log('GETTING COURSE DATA:')
  console.log(courseId)
  console.log(courseRows)
  return courseRows
}