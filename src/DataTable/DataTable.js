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

import HighlightedCell from './HighlightedCell';

const Cell = (props) => {
  const feature_col_names = new Set([
    'num_problems_attempted', 'num_problems_correct', 
    'num_pages_viewed', 'num_forum_posts'
  ])
  const cellStyle = {
    fontSize: '1.3em'
  }
  if (feature_col_names.has(props.column.name)) {
    return <HighlightedCell {...props} style={cellStyle}/>;
  }
  return <Table.Cell {...props} style={cellStyle}/>;
};
Cell.propTypes = {
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
        { name: 'user_id', title: 'User Id' },
        { name: 'course_week', title: 'Course Week' },
        { name: 'num_video_plays', title: 'Video Plays' },
        { name: 'num_problems_attempted', title: 'Problems Attempted' },
        { name: 'num_problems_correct', title: 'Problems Correct' },
        { name: 'num_pages_viewed', title: 'Page Views' },
        { name: 'num_forum_posts', title: 'Forum Posts' },
        { name: 'predicted_user_dropped_out_next_week', title: "User will drop out next week" }
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
      <Paper>
        <Grid
          rows={rows}
          columns={columns}>          
          <SortingState
            defaultSorting={[
              { columnName: 'user_id', direction: 'asc' },
              { columnName: 'course_week', direction: 'asc' },
            ]} />

          <SelectionState />

          <GroupingState
            defaultGrouping={[{ columnName: 'course_week' }]}
            defaultExpandedGroups={['1']} />
          <PagingState
            defaultCurrentPage={0}
            defaultPageSize={20} />

          <IntegratedGrouping />
          <IntegratedSorting />
          <IntegratedPaging />
          <IntegratedSelection />

          <DragDropProvider />

          <Table
            columnExtensions={tableColumnExtensions}
            cellComponent={Cell} />
          <TableSelection showSelectAll />

          <TableColumnReordering defaultOrder={columns.map(column => column.name)} />

          <TableHeaderRow showSortingControls />
          <PagingPanel
            pageSizes={pageSizes} />

          <TableGroupRow />
          <TableColumnVisibility />
          <Toolbar />
          <GroupingPanel showSortingControls />
          <ColumnChooser />
        </Grid>
      </Paper>
    );
  }
}

export const LightDataTable = withTheme(lightTheme)(DataTable)
export const DarkDataTable = withTheme(darkTheme)(DataTable)
