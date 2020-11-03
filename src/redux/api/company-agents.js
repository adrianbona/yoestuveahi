import { instance } from './axios';

export function getCompanyAgents({
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
    companies: [
      {
        id: 'a0c5e283-e081-44e7-bfd2-1ae096edbb3f',
        email: 'company@test.com',
        name: 'Agent Company Formation',
        phone: '+35344422432',
        address: '9 Trinity St, Dublin'
      },
      {
        id: 'e081',
        email: 'company@test.com',
        name: 'Agent Company Formation #2',
        phone: '+35344422432',
        address: '9 Trinity St, Dublin'
      },
      {
        id: '44e7',
        email: 'company@test.com',
        name: 'Agent Company Formation #3',
        phone: '+35344422432',
        address: '9 Trinity St, Dublin'
      },
      {
        id: 'bfd2',
        email: 'company@test.com',
        name: 'Agent Company Formation #4',
        phone: '+35344422432',
        address: '9 Trinity St, Dublin'
      },
      {
        id: '1ae096edbddd',
        email: 'company@test.com',
        name: 'Agent Company Formation #5',
        phone: '+35344422432',
        address: '9 Trinity St, Dublin'
      }
    ]
  };
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mock);
    }, 250);
  });

  // eslint-disable-next-line no-unreachable
  return instance.post(`/user/${userId}/company-agents`, {
    page,
    pageSize,
    orderField,
    orderDirection,
    filters
  });
}

export function getCompanyAgent({ userId, companyAgentId }) {
  const mock = {
    id: 'a0c5e283-e081-44e7-bfd2-1ae096edbb3f',
    email: 'company@test.com',
    name: 'Agent Company Formation',
    phone: '+35344422432',
    address: '9 Trinity St, Dublin'
  };
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mock);
    }, 1500);
  });

  // eslint-disable-next-line no-unreachable
  return instance.get(`/user/${userId}/company-agent/${companyAgentId}`);
}

export default {
  getCompanyAgents,
  getCompanyAgent
};
