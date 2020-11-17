import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
import RoomIcon from '@material-ui/icons/Room';

import Logo from 'src/components/Logo';
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from 'react-redux';
import LoadTestModal from '../../components/test/LoadTestModal';
import ScanQRCodeModal from '../../components/registry/ScanQRCodeModal';
import AddLocationModal from '../../components/location/AddLocationModal';
import { actions } from '../../redux/modules/notifications';

const useStyles = makeStyles(() => ({
  title: {
    display: 'flex',
    alignItems: 'center',
    '& > h3': {
      marginLeft: '24px'
    }
  }
}));

const TopBar = ({ onMobileNavOpen, user, notifications, getNotifications }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [loadTestIsOpen, setLoadTestIsOpen] = useState(false);
  const [scanQRCodeIsOpen, setScanQRCodeIsOpen] = useState(false);
  const [addLocationIsOpen, setAddLocationIsOpen] = useState(false);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  return (
    <AppBar className={classes.root} elevation={0}>
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
          {user.status !== 'COVID Positive' && (
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
          <Tooltip title="Add Location">
            <IconButton
              color="inherit"
              onClick={() => {
                setAddLocationIsOpen(true);
              }}
            >
              <RoomIcon />
            </IconButton>
          </Tooltip>
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
                navigate('/logout', { replace: true });
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
      <AddLocationModal
        open={addLocationIsOpen}
        customer={user}
        onClose={() => setAddLocationIsOpen(false)}
      />
    </AppBar>
  );
};

const mapStateToProps = state => ({
  notifications: state.notifications.list.filter(
    notification => !notification.shown
  )
});

const mapDispatchToProps = dispatch => ({
  getNotifications: () => dispatch(actions.getNotifications())
});

TopBar.propTypes = {
  onMobileNavOpen: PropTypes.func,
  getNotifications: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number }))
    .isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    status: PropTypes.string,
    email: PropTypes.string,
    isAdministrator: PropTypes.bool
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
