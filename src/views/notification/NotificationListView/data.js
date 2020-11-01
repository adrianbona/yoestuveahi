import { v4 as uuid } from 'uuid';

import moment from 'moment';
import customers from '../../customer/CustomerListView/data';

const generateRandomCustomer = () => customers[Math.floor(Math.random() * 10)];

const notifications = () => {
  const randomNotifications = [];
  for (let i = 0; i < 20; i++) {
    const randomMoment = moment(
      new Date(new Date() - Math.floor(Math.random() * 10000000000))
    );

    randomNotifications.push({
      id: uuid(),
      content: "A contagion risk was reported at a location you've visited",
      shown: Boolean(Math.random() >= 0.5),
      contagionSource: generateRandomCustomer(),
      addressedTo: generateRandomCustomer(),
      createdAt: randomMoment
    });
  }
  return randomNotifications;
};

export default notifications().sort(
  (a, b) => b.createdAt.unix() - a.createdAt.unix()
);
