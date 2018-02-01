
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

const handleContact = ({ email = 'learner@example.com' }) => {
    return window.location.href = 'mailto:' + email;
}

const ContactComponent = (props) => {
    const { classes, disabled } = props;
    const color = disabled ? 'default' : 'secondary'
    return (
        <Button raised color={color} disabled={disabled} onClick={handleContact}>
            <EmailIcon className={classes.leftIcon}/>
            Contact
        </Button>
    )
}

const ContactCellBase = ({
    tableColumn, row, value, classes, style, thresholds
}) => (
  <TableCell
    className={classes.highlightedCell}
    style={{
      textAlign: tableColumn.align,
      ...style,
    }}>
    <span>{<ContactComponent classes={classes} disabled={row.predicted_user_dropped_out_next_week === 0} />}</span>
  </TableCell>
)

ContactCellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  style: PropTypes.object,
  tableColumn: PropTypes.object,
};
ContactCellBase.defaultProps = {
  style: {},
  tableColumn: {},
};

export default withStyles(styles, { name: 'ContactCell' })(ContactCellBase);