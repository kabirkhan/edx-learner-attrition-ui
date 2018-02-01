
import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';
import ArrowDropUp from 'material-ui-icons/ArrowDropUp';
import ArrowDownward from 'material-ui-icons/KeyboardArrowDown';
import ArrowUpward from 'material-ui-icons/KeyboardArrowUp';
// const getColor = (amount) => {
//   if (amount == 0) {
//     return '#F44336';
//   }
//   if (amount < 5) {
//     return '#FFC107';
//   }
//   if (amount < 10) {
//     return '#FF5722';
//   }
//   return '#009688';
// };

const styles = theme => ({
  highlightedCell: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
});

const getIcon = ({ value, columnName, thresholds=[0, 5, 10] }) => {
  if (columnName === 'num_forum_posts') {
    if (value > 0) {
      return <ArrowUpward style={{height: 18}}/>
    } else {
      return <svg className='MuiSvgIcon-root-171' />;      
    }
  }
  if (value <= thresholds[0]) {
    return <ArrowDownward style={{height: 18}}/>
  }
  if (value < thresholds[1]) {
    return <svg className='MuiSvgIcon-root-171' />;      
  }
  if (value < thresholds[2]) {
    return <ArrowUpward style={{height: 18}}/>
  }

  return <ArrowDropUp/>
}

const HighlightedCellBase = ({
  tableColumn, value, classes, style, thresholds
}) => {
return (
  <TableCell
    className={classes.highlightedCell}
    style={{
      textAlign: tableColumn.align,
      ...style,
    }}>
    {getIcon({ value, columnName: tableColumn.column.name, thresholds })}{value}
  </TableCell>
);
}

HighlightedCellBase.propTypes = {
  value: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  style: PropTypes.object,
  tableColumn: PropTypes.object,
};
HighlightedCellBase.defaultProps = {
  style: {},
  tableColumn: {},
};

export default withStyles(styles, { name: 'HighlightedCell' })(HighlightedCellBase);
