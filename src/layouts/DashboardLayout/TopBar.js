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
import CameraEnhanceIcon from '@material-ui/icons/CameraEnhance';
import HowToVoteIcon from '@material-ui/icons/HowToVote';

import Logo from 'src/components/Logo';
import data from 'src/views/notification/NotificationListView/data';
import Tooltip from '@material-ui/core/Tooltip';
import LoadTestModal from '../../components/test/LoadTestModal';
import ScanQRCodeModal from '../../components/registry/ScanQRCodeModal';

const useStyles = makeStyles(() => ({
  title: {
    display: 'flex',
    alignItems: 'center',
    '& > h3': {
      marginLeft: '24px'
    }
  }
}));

const TopBar = ({ className, onMobileNavOpen, customer, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [loadTestIsOpen, setLoadTestIsOpen] = useState(false);
  const [scanQRCodeIsOpen, setScanQRCodeIsOpen] = useState(false);
  const [notifications] = useState(
    data.filter(notification => !notification.shown)
  );

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/app/dashboard">
          <div className={classes.title}>
            <Logo />
            <Hidden xsDown>
              <Typography align="center" color="textPrimary" variant="h3">
                Yo Estuve Ahí App
              </Typography>
            </Hidden>
          </div>
        </RouterLink>
        <Box flexGrow={1} />
        <>
          <Tooltip title="Load Test Result">
            <IconButton
              color="inherit"
              onClick={() => {
                setLoadTestIsOpen(true);
              }}
            >
              <HowToVoteIcon />
            </IconButton>
          </Tooltip>
          {customer.status !== 'COVID Positive' && (
            <Tooltip title="Scan a QR Code">
              <IconButton
                color="inherit"
                onClick={() => {
                  setScanQRCodeIsOpen(true);
                }}
              >
                <CameraEnhanceIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip
            title={`You have ${notifications.length} pending notification${
              notifications.length > 1 ? 's' : ''
            }`}
          >
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
          </Tooltip>
          <Tooltip title="Log out">
            <IconButton
              color="inherit"
              onClick={() => {
                navigate('/login', { replace: true });
              }}
            >
              <InputIcon />
            </IconButton>
          </Tooltip>
        </>
        <Hidden mdUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
      <LoadTestModal
        open={loadTestIsOpen}
        onClose={() => setLoadTestIsOpen(false)}
      />
      <ScanQRCodeModal
        open={scanQRCodeIsOpen}
        onClose={() => setScanQRCodeIsOpen(false)}
      />
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
