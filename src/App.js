import React, { Component } from 'react';
import logo from './logo.svg';
import Select from 'react-select';
import Grid from 'material-ui/Grid';
import Navigation from './Navigation.js';
import { DarkDataTable } from './DataTable/DataTable.js'
import { getCurrentCourseRuns, getCoursePredictions } from './data/data.js';
import 'react-select-plus/dist/react-select-plus.css';


class App extends Component {
  constructor(props) {
    super(props);

    const courses = getCurrentCourseRuns()
    console.log(courses)
    const selectedCourse = courses[0];
    this.state = {
      courses,
      selectedCourse,
      rows: getCoursePredictions(selectedCourse.value)
    }
  }

  handleChange = (selectedCourse) => {
    this.setState({ 
      selectedCourse, 
      rows: getCoursePredictions(selectedCourse.value) 
    });
  }

  render() {
    const { selectedCourse, courses, rows } = this.state;
    const value = selectedCourse && selectedCourse.value;

    return (
      <div className="App">
        <Navigation />
        <Grid container spacing={16} style={{ padding: 50 }}>
          <Grid item xs={12}>
            <Select
              name="course"
              value={value}
              onChange={this.handleChange}
              options={courses} />
          </Grid>
          <Grid item xs={12}>
            <DarkDataTable rows={rows}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
