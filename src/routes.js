import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import UserListView from 'src/views/user/UserListView';
import NotificationListView from 'src/views/notification/NotificationListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import RegistryListView from 'src/views/registry/RegistryListView';
import SettingsView from 'src/views/settings/SettingsView';
import LocationListView from './views/location/LocationListView';
import TestListView from './views/test/TestListView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'users', element: <UserListView /> },
      { path: 'notifications', element: <NotificationListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'locations', element: <LocationListView /> },
      { path: 'tests', element: <TestListView /> },
      { path: 'registry', element: <RegistryListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
