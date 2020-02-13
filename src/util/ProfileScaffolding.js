import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import NoImg from "../pages/images/no-image.png"
// MUI
import Paper from '@material-ui/core/Paper';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = (theme) => ({
    ...theme.spreadTheme,
    handle: {
        paddingTop: 20,
        height: 20,
        backgroundColor: theme.palette.secondary.main,
        width: 60,
        margin: '0 auto 7px auto'
    },
    fullLine: {
        height: 15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: '100%',
        marginBottom: 10
    },
    halfLine: {
        height: 15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: '50%',
        marginBottom: 10
    }
});

const ProfileScaffolding = (props) => {
    const { classes } = props;
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <hr />
                <div className="profile-details">
                    <div className={classes.handle} />
                    <hr />
                    <div className={classes.fullLine} />
                    <div className={classes.fullLine} />
                    <hr />
                    <div className={classes.fullLine} />
                    <div className={classes.fullLine} />
                    <hr />
                    <LocationOn color="secondary" /> <span>Location</span>
                    <hr />
                    <LinkIcon color="secondary" /> https://website.com
                    <hr />
                    <CalendarToday color="secondary" /> Joined date
                </div>
            </div>
        </Paper>
    );
};

ProfileScaffolding.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileScaffolding);
