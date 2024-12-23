// ==============================|| TYPES - CUSTOMER ||============================== //

import { Invoice } from './invoice';

export interface CustomerStateProps {
  customers: Customer[];
  orders: Order[];
  products: Product[];
  productreviews: ProductReview[];
  invoices: Invoice[];
  error: object | string | null;
}

export type Customer = {
  name: string;
  email: string;
  location: string;
  orders: number;
  date: string;
  status: number;
};

export type Order = {
  id: string;
  name: string;
  company: string;
  type: string;
  qty: number;
  date: string;
  status: number;
  total?:number;
  payment?:string;
  cart:[];
  address:{
    building:string|number,
    street:string,
    city:string,
    state:string,
    country:string,
    post:number
  };

};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  date: string;
  qty: number;
};

export type ProductReview = {
  name: string;
  author: string;
  review: string;
  rating: number;
  date: string;
  status: number;
};
