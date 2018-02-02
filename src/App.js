import React, { Component } from 'react';
import logo from './logo.svg';
import Select from 'react-select-plus';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Button from 'material-ui/Button';
import blueGrey from 'material-ui/colors/blueGrey';
import ProgressBar from './ProgressBar';
import Navigation from './Navigation.js';
import { LightDataTable, DarkDataTable } from './DataTable/DataTable.js'
import { getCurrentCourseRuns, getCoursePredictions } from './data/data.js';
import Stepper from './Stepper';
import 'react-select-plus/dist/react-select-plus.css';


const SectionHeader = ({ title }) => (
  <Typography type="title" color="inherit" style={{ fontWeight: 'bold', color: blueGrey[900] }}>
    {title}
  </Typography>
)

class App extends Component {
  constructor(props) {
    super(props);

    const courses = getCurrentCourseRuns()
    this.state = {
      courses,
      selectedCourse: '',
      showRunButton: false,
      showDataGrid: false,
      showLoadingIndicator: false,
      rows: []
    }
  }

  handleChange = (selectedCourse) => {
    this.setState({ 
      selectedCourse,
      showRunButton: true
    });
  }

  handleRunPredictionsClick = () => {
    const { selectedCourse } = this.state;
    this.setState({
      rows: getCoursePredictions(selectedCourse.value),
      showLoadingIndicator: true,
      showDataGrid: false
    })
  }

  handleProgressComplete = () => {
    this.setState({        
      showDataGrid: true,
      showLoadingIndicator: false
    })
  }

  render() {
    const { 
      selectedCourse, courses, rows, showRunButton, showDataGrid, showLoadingIndicator
    } = this.state;
    const value = selectedCourse && selectedCourse.value;

    return (
      <div className="App">
        <Navigation />
        <Grid container spacing={16} style={{ padding: 50 }}>
          <Grid item xs={12}>
            <ExpansionPanel expanded={true}>
              <ExpansionPanelSummary>
                <Grid item xs={12}>
                  <SectionHeader title='Step 1. Choose a course'/>
                </Grid>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails style={{ overflow: 'visible' }}>          
                <Grid item xs={12}>
                  <Select
                    name="course"
                    value={value}
                    onChange={this.handleChange}
                    options={courses}
                    style={{ borderRadius: 2 }} />
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
        
            <ExpansionPanel expanded={showRunButton}>
              <ExpansionPanelSummary>
                <Grid item xs={12}>
                  <SectionHeader title='Step 2. Run model on the selected course to identify learners at risk of dropping out'/>
                </Grid>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid item xs={12}>
                  <Button 
                    raised 
                    color='secondary' 
                    onClick={this.handleRunPredictionsClick}
                    style={{ padding: '10px 80px', fontSize: '1.3em' }}>
                    Run Predictions
                  </Button>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={showLoadingIndicator || showDataGrid}>
              <ExpansionPanelSummary>
                <Grid item xs={12}>
                  <SectionHeader 
                    title='Step 3. Contact at-risk learners to re-engage them in the course' />
                </Grid>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {showLoadingIndicator && 
                  <Grid item xs={12} style={{ marginBottom: 16 }}>
                    <ProgressBar onComplete={this.handleProgressComplete} />
                  </Grid>
                }
                {showDataGrid &&              
                  <LightDataTable rows={rows}/>
                }
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
{/* {showLoadingIndicator &&
            
          }
          {showDataGrid &&
          <Grid item xs={12}>
            
          </Grid>
          } */}