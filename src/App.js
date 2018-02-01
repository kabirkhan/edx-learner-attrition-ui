import React, { Component } from 'react';
import logo from './logo.svg';
import Select from 'react-select-plus';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Navigation from './Navigation.js';
import { LightDataTable, DarkDataTable } from './DataTable/DataTable.js'
import { getCurrentCourseRuns, getCoursePredictions } from './data/data.js';
import 'react-select-plus/dist/react-select-plus.css';


class App extends Component {
  constructor(props) {
    super(props);

    const courses = getCurrentCourseRuns()
    const selectedProgram = courses[0];
    const selectedCourse = selectedProgram && selectedProgram.options[0]
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
            <Paper style={{ padding: 16 }}>
              <Grid item xs={12} style={{ marginBottom: 16 }}>
                <Typography type="title" color="inherit">
                  Choose a course to view drop out predictions for.
                </Typography>            
              </Grid>
              <Grid item xs={12}>
                <Select
                  name="course"
                  value={value}
                  onChange={this.handleChange}
                  options={courses}
                  style={{ borderRadius: 2 }} />
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <LightDataTable rows={rows}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
