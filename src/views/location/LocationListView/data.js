import { v4 as uuid } from 'uuid';
import moment from 'moment';
import customers from '../../user/UserListView/data';

const generateRandomDate = () =>
  moment(new Date(new Date() - Math.floor(Math.random() * 10000000000)));

const generateRandomCustomer = () => customers[Math.floor(Math.random() * 10)];

export default [
  {
    id: uuid(),
    name: 'Parrilla La Selva',
    description: "A restaurant's description",
    openingTime: '9AM',
    closingTime: '6PM',
    logo: '/static/images/avatars/avatar_1.png',
    maximumCapacity: 100,
    country: 'USA',
    state: 'West Virginia',
    city: 'Parkersburg',
    street: '2849 Fulton Street',
    createdAt: generateRandomDate(),
    createdBy: generateRandomCustomer()
  },
  {
    id: uuid(),
    name: 'Trixie American Diner',
    description: "A restaurant's description",
    openingTime: '9AM',
    closingTime: '6PM',
    logo: '/static/images/avatars/avatar_2.png',
    maximumCapacity: 100,
    country: 'USA',
    state: 'Bristow',
    city: 'Iowa',
    street: '1865  Pleasant Hill Road',
    createdAt: generateRandomDate(),
    createdBy: generateRandomCustomer()
  },
  {
    id: uuid(),
    name: 'La Santa Fe Maschwitz',
    description: "A restaurant's description",
    openingTime: '9AM',
    closingTime: '6PM',
    logo: '/static/images/avatars/avatar_3.png',
    maximumCapacity: 100,
    country: 'USA',
    state: 'Utah',
    city: 'Salt Lake City',
    street: '368 Lamberts Branch Road',
    createdAt: generateRandomDate(),
    createdBy: generateRandomCustomer()
  },
  {
    id: uuid(),
    name: 'Pizzería Valentino',
    description: "A restaurant's description",
    openingTime: '9AM',
    closingTime: '6PM',
    logo: '/static/images/avatars/avatar_4.png',
    maximumCapacity: 100,
    country: 'USA',
    state: 'Michigan',
    city: 'Detroit',
    street: '3934  Wildrose Lane',
    createdAt: generateRandomDate(),
    createdBy: generateRandomCustomer()
  },
  {
    id: uuid(),
    name: 'El Dorado Cocina Sincera',
    description: "A restaurant's description",
    openingTime: '9AM',
    closingTime: '6PM',
    logo: '/static/images/avatars/avatar_5.png',
    maximumCapacity: 100,
    country: 'USA',
    state: 'Nevada',
    city: 'Las Vegas',
    street: '1798  Hickory Ridge Drive',
    createdAt: generateRandomDate(),
    createdBy: generateRandomCustomer()
  }
];
