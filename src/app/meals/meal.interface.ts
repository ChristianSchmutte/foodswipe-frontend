import { Restaurant } from './restaurant.interface';

export interface Meal {
  id: number;
  name: string;
  description: string;
  price: number;
  //TODO: image url
  restaurant: Restaurant;
}