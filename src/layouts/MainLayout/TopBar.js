import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, makeStyles, Typography } from '@material-ui/core';
import Logo from 'src/components/Logo';

const useStyles = makeStyles({
  root: {},
  toolbar: {
    height: 64
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    '& > h3': {
      marginLeft: '24px'
    }
  }
});

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Logo />
          <Typography align="center" color="textPrimary" variant="h3">
            Yo Estuve Ahí App
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;
