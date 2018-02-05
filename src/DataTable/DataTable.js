import React from 'react';
import PropTypes from 'prop-types';
import { withTheme, createMuiTheme } from 'material-ui/styles';
import { blue } from 'material-ui/colors';
import Paper from 'material-ui/Paper';
import {
  SortingState, SelectionState, FilteringState, PagingState, GroupingState,
  IntegratedFiltering, IntegratedGrouping, IntegratedPaging, IntegratedSorting, IntegratedSelection,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table, TableHeaderRow, TableFilterRow, TableSelection, TableGroupRow,
  PagingPanel, GroupingPanel, DragDropProvider, TableColumnReordering, Toolbar,
  TableColumnVisibility, ColumnChooser,
} from '@devexpress/dx-react-grid-material-ui';
import red from 'material-ui/colors/red';
import blueGrey from 'material-ui/colors/blueGrey';

import HighlightedCell from './HighlightedCell';
import ContactCell from './ContactCell';

const Cell = (props) => {
  const feature_col_names = new Set([
    'num_video_plays', 'num_problems_attempted', 'num_problems_correct', 
    'num_pages_viewed', 'num_forum_posts'
  ])
  const cellStyle = {
    fontSize: '1.3em'
  }
  if (feature_col_names.has(props.column.name)) {
    return <HighlightedCell {...props} style={cellStyle}/>;
  }
  if (props.column.name === 'contact') {
    return <ContactCell {...props} style={cellStyle} />
  }
  if (props.column.name === 'predicted_user_dropped_out_next_week_likelihood') {
    cellStyle['backgroundColor'] = blueGrey[100]
    props = {...props, value: props.value === 'Maybe' ? 'Medium' : props.value}
  }
  return <Table.Cell {...props} style={cellStyle}/>;
};
Cell.propTypes = {
  column: PropTypes.shape({ name: PropTypes.string }).isRequired,
};

const FilterCell = (props) => {
  if (props.column.name === 'contact') {
    return null;
  }
  return <TableFilterRow.Cell {...props} />;
};
FilterCell.propTypes = {
  column: PropTypes.shape({ name: PropTypes.string }).isRequired,
};

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: blue,
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: blue,
  },
});

class DataTable extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'user_id', title: 'Learner Id' },
        { name: 'course_week', title: 'Course Week' },
        { name: 'num_video_plays', title: 'Video Plays' },
        { name: 'num_problems_attempted', title: 'Problem Attempts' },
        { name: 'num_problems_correct', title: 'Problems Correct' },
        { name: 'num_subsections_viewed', title: 'Content Page Views' },
        { name: 'num_forum_posts', title: 'Forum Posts' },
        { name: 'avg_forum_sentiment', title: 'Forum Sentiment' },
        { name: 'user_started_week', title: 'Week Started' },
        { name: 'user_last_active_week', title: 'Last Active Week' },
        { name: 'user_active_previous_week', title: 'Active Previous Week' },
        { name: 'predicted_user_dropped_out_next_week_likelihood', title: "Learner drop out risk" },
        { name: 'contact', title: "Actions" }
      ],
      rows: props.rows,
      pageSizes: [10, 20, 50, 100],
    };
  }

  componentWillUpdate(nextProps) {
    const { rows } = nextProps;
    this.setState({ rows })
  }

  render() {
    const {
      rows, columns, tableColumnExtensions, pageSizes,
    } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}>
        <FilteringState/>
        <SortingState
          defaultSorting={[
            { columnName: 'user_id', direction: 'asc' },
            { columnName: 'course_week', direction: 'desc' },
          ]} />

        <GroupingState
          defaultGrouping={[{ columnName: 'course_week' }]}
          defaultExpandedGroups={['5']} />
        <PagingState
          defaultCurrentPage={0}
          defaultPageSize={20} />

        <IntegratedGrouping />
        <IntegratedFiltering />
        <IntegratedSorting />
        <IntegratedPaging />

        <DragDropProvider />

        <Table
          columnExtensions={tableColumnExtensions}
          cellComponent={Cell} />

        <TableColumnReordering defaultOrder={columns.map(column => column.name)} />

        <TableHeaderRow showSortingControls />
        <TableFilterRow cellComponent={FilterCell}/>
        <PagingPanel
          pageSizes={pageSizes} />

        <TableGroupRow />            
        <TableColumnVisibility defaultHiddenColumnNames={[
          'avg_forum_sentiment', 'user_started_week', 
          'user_last_active_week', 'user_active_previous_week'
        ]} />
        <Toolbar />
        <GroupingPanel showSortingControls />
        <ColumnChooser />
      </Grid>
    );
  }
}

export const LightDataTable = withTheme(lightTheme)(DataTable)
export const DarkDataTable = withTheme(darkTheme)(DataTable)
