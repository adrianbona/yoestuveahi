import { v4 as uuid } from 'uuid';
import moment from 'moment';
import customers from '../../customer/CustomerListView/data';

const generateRandomDate = () =>
  moment(new Date(new Date() - Math.floor(Math.random() * 10000000000)));

const generateRandomCustomer = () => customers[Math.floor(Math.random() * 10)];

const generateRandomResult = () => Boolean(Math.floor(Math.random() * 10) % 2);

const tests = () => {
  const randomTests = [];
  for (let i = 0; i < 100; i++) {
    randomTests.push({
      id: uuid(),
      isPositive: generateRandomResult(),
      dateTaken: generateRandomDate(),
      takenBy: generateRandomCustomer()
    });
  }
  return randomTests;
};

export default tests().sort((a, b) => b.dateTaken.unix() - a.dateTaken.unix());
