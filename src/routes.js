import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import CustomerListView from 'src/views/customer/CustomerListView';
import NotificationListView from 'src/views/notification/NotificationListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import RegistryListView from 'src/views/registry/RegistryListView';
import ScanQRCodeView from 'src/views/registry/ScanQRCodeView';
import SettingsView from 'src/views/settings/SettingsView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'customers', element: <CustomerListView /> },
      { path: 'notifications', element: <NotificationListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'registry', element: <RegistryListView /> },
      { path: 'registry/scan', element: <ScanQRCodeView /> },
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
