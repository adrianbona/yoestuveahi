import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  Bell as BellIcon,
  Settings as SettingsIcon,
  Users as UsersIcon
} from 'react-feather';
import StorefrontIcon from '@material-ui/icons/Storefront';
import DirectionsWalk from '@material-ui/icons/DirectionsWalk';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import Avatar from 'avataaars';
import NavItem from './NavItem';

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard',
    requiresAdminPrivilege: true
  },
  {
    href: '/app/users',
    icon: UsersIcon,
    title: 'Users',
    requiresAdminPrivilege: true
  },
  {
    href: '/app/notifications',
    icon: BellIcon,
    title: 'Notifications'
  },
  {
    href: '/app/locations',
    icon: StorefrontIcon,
    title: 'Locations'
  },
  {
    href: '/app/registry',
    icon: DirectionsWalk,
    title: 'Registry'
  },
  {
    href: '/app/tests',
    icon: LocalHospitalIcon,
    title: 'Tests'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings'
  }
];

const useStyles = makeStyles(theme => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    width: 64,
    height: 64
  },
  healthStatus: {
    marginTop: '5px',
    padding: '5px',
    backgroundColor: theme.palette.primary.light
  }
}));

const avatar = user => {
  return {
    accessoriesType:
      user.status !== 'Healthy'
        ? null
        : user.isAdministrator
        ? 'Wayfarers'
        : null,
    eyeType:
      user.status === 'COVID Positive'
        ? 'Dizzy'
        : user.status === 'Contagion Risk'
        ? 'Surprised'
        : 'Default',
    mouthType:
      user.status === 'COVID Positive'
        ? 'Vomit'
        : user.status === 'Contagion Risk'
        ? 'Concerned'
        : 'Smile'
  };
};

const NavBar = props => {
  const classes = useStyles();
  const { onMobileClose, openMobile, user } = props;
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          style={{ width: '70px', height: '70px' }}
          avatarStyle="Transparent"
          topType="ShortHairShortCurly"
          accessoriesType={avatar(user).accessoriesType}
          hairColor="BrownDark"
          clotheType="ShirtVNeck"
          clotheColor="Black"
          eyeType={avatar(user).eyeType}
          eyebrowType="Default"
          mouthType={avatar(user).mouthType}
          skinColor="Light"
        />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.email}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
          className={classes.healthStatus}
        >
          {user.status}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items
            .filter(
              item =>
                !item.requiresAdminPrivilege ||
                item.requiresAdminPrivilege === user.isAdministrator
            )
            .map(item => (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden mdUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
  user: PropTypes.shape({
    name: PropTypes.string,
    status: PropTypes.string,
    email: PropTypes.string,
    isAdministrator: PropTypes.bool
  })
};

NavBar.defaultProps = {
  openMobile: false
};

export default NavBar;
