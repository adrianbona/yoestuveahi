import { v4 as uuid } from 'uuid';
import moment from 'moment';
import users from '../../user/UserListView/data';
import locations from '../../location/LocationListView/data';

const generateRandomCustomer = () => users[Math.floor(Math.random() * 10)];

const generateRandomLocation = () => locations[Math.floor(Math.random() * 5)];

const registries = () => {
  const randomRegistries = [];
  for (let i = 0; i < 100; i++) {
    const randomMoment = moment(
      new Date(new Date() - Math.floor(Math.random() * 10000000000))
    );

    randomRegistries.push({
      id: uuid(),
      customer: generateRandomCustomer(),
      location: generateRandomLocation(),
      entranceTime: randomMoment,
      exitTime: randomMoment.clone().add(15, 'minutes')
    });
  }
  return randomRegistries;
};

export default registries().sort(
  (a, b) => b.entranceTime.unix() - a.entranceTime.unix()
);
