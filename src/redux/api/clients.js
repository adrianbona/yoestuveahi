import { instance } from './axios';

export function getClients({
  userId,
  page,
  pageSize,
  orderField,
  orderDirection,
  filters
}) {
  const mock = {
    page: 1,
    pageSize: 10,
    clients: [
      {
        id: 'a0c5e283',
        name: 'Client #1',
        agentName: 'Agent #1',
        trackingNumber: '#123456',
        startedOn: new Date(2020, 9, 15),
        lastActivity: new Date(2020, 9, 20),
        submissionDate: new Date(2020, 9, 10)
      },
      {
        id: 'e081',
        name: 'Client #2',
        agentName: 'Agent #1',
        trackingNumber: '#123456',
        startedOn: new Date(2020, 9, 15),
        lastActivity: new Date(2020, 9, 20),
        submissionDate: new Date(2020, 9, 10)
      },
      {
        id: '44e7',
        name: 'Client #3',
        agentName: 'Agent #1',
        trackingNumber: '#123456',
        startedOn: new Date(2020, 9, 15),
        lastActivity: new Date(2020, 9, 20),
        submissionDate: new Date(2020, 9, 10)
      },
      {
        id: 'bfd2',
        name: 'Client #4',
        agentName: 'Agent #2',
        trackingNumber: '#123456',
        startedOn: new Date(2020, 9, 15),
        lastActivity: null,
        submissionDate: null
      },
      {
        id: '1ae096edbb3f',
        name: 'Client #5',
        agentName: 'Agent #2',
        trackingNumber: '#123456',
        startedOn: new Date(2020, 9, 15),
        lastActivity: null,
        submissionDate: null
      }
    ]
  };
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mock);
    }, 250);
  });

  // eslint-disable-next-line no-unreachable
  return instance.post(`/user/${userId}/clients`, {
    page,
    pageSize,
    orderField,
    orderDirection,
    filters
  });
}

export function getClient({ userId, clientId }) {
  const mock = {
    id: 'a0c5e283',
    name: 'Client #1',
    agentName: 'Agent #1',
    trackingNumber: '#123456',
    startedOn: new Date(2020, 9, 15),
    lastActivity: new Date(2020, 9, 20),
    submissionDate: new Date(2020, 9, 10)
  };
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mock);
    }, 1500);
  });

  // eslint-disable-next-line no-unreachable
  return instance.get(`/user/${userId}/client/${clientId}`);
}

export default {
  getClients,
  getClient
};
