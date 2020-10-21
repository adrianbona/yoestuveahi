import { v4 as uuid } from 'uuid';
import moment from 'moment';

const registries = () => {
  const randomRegistries = [];
  for (let i = 0; i < 10; i++) {
    const randomMoment = moment(
      new Date(new Date() - Math.floor(Math.random() * 10000000000))
    );

    randomRegistries.push({
      id: uuid(),
      userId: uuid(),
      entranceTime: randomMoment,
      exitTime: randomMoment.clone().add(15, 'minutes')
    });
  }
  return randomRegistries;
};

export default registries();
