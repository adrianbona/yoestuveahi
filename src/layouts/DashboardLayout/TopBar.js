import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from 'src/components/Logo';
import data from 'src/views/notification/NotificationListView/data';

const useStyles = makeStyles(() => ({
  title: {
    display: 'flex',
    alignItems: 'center',
    '& > h3': {
      marginLeft: '24px'
    }
  }
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [notifications] = useState(
    data.filter(notification => !notification.shown)
  );

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <div className={classes.title}>
            <Logo />
            <Typography align="center" color="textPrimary" variant="h3">
              Yo Estuve Ahí App
            </Typography>
          </div>
        </RouterLink>
        <Box flexGrow={1} />
        <>
          <IconButton
            color="inherit"
            onClick={() => {
              navigate('/app/notifications', { replace: true });
            }}
          >
            <Badge badgeContent={notifications.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => {
              navigate('/login', { replace: true });
            }}
          >
            <InputIcon />
          </IconButton>
        </>
        <Hidden mdUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
