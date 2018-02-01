
import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import EmailIcon from 'material-ui-icons/Email';

const styles = theme => ({
  highlightedCell: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  }
});

const ContactComponent = (props) => {
    const { classes } = props;
    return (
        <Button raised color='secondary'>
            <EmailIcon className={classes.leftIcon}/>
            Contact
        </Button>
    )
}

const PredictionCellBase = ({
  tableColumn, value, classes, style, thresholds
}) => (
  <TableCell
    className={classes.highlightedCell}
    style={{
      textAlign: tableColumn.align,
      ...style,
    }}>
    <span>{value === 1 ? 'Yes' : 'No'}</span>
  </TableCell>
);

PredictionCellBase.propTypes = {
  value: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  style: PropTypes.object,
  tableColumn: PropTypes.object,
};
PredictionCellBase.defaultProps = {
  style: {},
  tableColumn: {},
};

export default withStyles(styles, { name: 'PredictionCell' })(PredictionCellBase);
