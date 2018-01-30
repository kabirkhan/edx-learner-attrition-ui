import { getCourseData } from '../demo_data/generator.js'
const courses = require('./courses_in_progress.json');

export function getCurrentCourseRuns() {
  return Object.keys(courses).map(key => {
    return { 
      value: courses[key], 
      label: key + ' - ' + courses[key],
    }
  })
}

export function getCoursePredictions(courseId) {
  return getCourseData(courseId)
}