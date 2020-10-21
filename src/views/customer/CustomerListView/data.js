import { v4 as uuid } from 'uuid';
import moment from 'moment';

const generateRandomDate = () =>
  moment(new Date(new Date() - Math.floor(Math.random() * 10000000000)));

export default [
  {
    id: uuid(),
    avatarUrl: '/static/images/avatars/avatar_3.png',
    createdAt: generateRandomDate(),
    email: 'ekaterina.tankova@devias.io',
    name: 'Ekaterina Tankova',
    phone: '304-428-3097'
  },
  {
    id: uuid(),
    avatarUrl: '/static/images/avatars/avatar_4.png',
    createdAt: generateRandomDate(),
    email: 'cao.yu@devias.io',
    name: 'Cao Yu',
    phone: '712-351-5711'
  },
  {
    id: uuid(),
    avatarUrl: '/static/images/avatars/avatar_2.png',
    createdAt: generateRandomDate(),
    email: 'alexa.richardson@devias.io',
    name: 'Alexa Richardson',
    phone: '770-635-2682'
  },
  {
    id: uuid(),
    avatarUrl: '/static/images/avatars/avatar_5.png',
    createdAt: generateRandomDate(),
    email: 'anje.keizer@devias.io',
    name: 'Anje Keizer',
    phone: '908-691-3242'
  },
  {
    id: uuid(),
    avatarUrl: '/static/images/avatars/avatar_6.png',
    createdAt: generateRandomDate(),
    email: 'clarke.gillebert@devias.io',
    name: 'Clarke Gillebert',
    phone: '972-333-4106'
  },
  {
    id: uuid(),
    avatarUrl: '/static/images/avatars/avatar_1.png',
    createdAt: generateRandomDate(),
    email: 'adam.denisov@devias.io',
    name: 'Adam Denisov',
    phone: '858-602-3409'
  },
  {
    id: uuid(),
    avatarUrl: '/static/images/avatars/avatar_7.png',
    createdAt: generateRandomDate(),
    email: 'ava.gregoraci@devias.io',
    name: 'Ava Gregoraci',
    phone: '415-907-2647'
  },
  {
    id: uuid(),
    avatarUrl: '/static/images/avatars/avatar_8.png',
    createdAt: generateRandomDate(),
    email: 'emilee.simchenko@devias.io',
    name: 'Emilee Simchenko',
    phone: '702-661-1654'
  },
  {
    id: uuid(),
    avatarUrl: '/static/images/avatars/avatar_9.png',
    createdAt: generateRandomDate(),
    email: 'kwak.seong.min@devias.io',
    name: 'Kwak Seong-Min',
    phone: '313-812-8947'
  },
  {
    id: uuid(),
    avatarUrl: '/static/images/avatars/avatar_10.png',
    createdAt: generateRandomDate(),
    email: 'merrile.burgett@devias.io',
    name: 'Merrile Burgett',
    phone: '801-301-7894'
  }
];
