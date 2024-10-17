import supabase from './index';
import axios from 'utils/axios'

import { Products, ProductsFilter } from 'types/e-commerce';
import { reach } from 'yup';

// ⬇️ this is the loader for the detail route
export async function loader() {
  try {
    const response = await axios.get('/api/products/list');
    return response.data.products 
  } catch (error) {
    return error;
  }
}

// export async function filterProducts(filter: ProductsFilter) {
//   return await axios.post('/api/products/filter', { filter });
// }

export async function productLoader({ params }) {
  try {
    const response = await axios.post('/api/product/details', { id: params.id });
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function getRelatedProducts(id) {
  return await axios.post('/api/product/related', { id });
}

export async function getProductReviews() {
  return await axios.get('/api/review/list');
}
async function ReadProduct() {
let { data: products, error } = await supabase
  .from('products')
  .select('*')
  console.log(error)
  return products
}

async function filterProducts(filter) {

  let query = supabase.from('products').select("*");

  if (filter.price) {
    const [min, max] = filter.price.split('-').map(Number)
    query = query.gte('offerPrice', min).lte('offerPrice', max)
  }

  if (filter.search) {
    query = query.ilike('name', `%${filter.search}%`); 
  }

  if (filter.gender && filter.gender.length > 0) {
    query = query.in('gender', filter.gender); 
  }
  
  if (filter.colors && filter.colors.length > 0) {
    query = query.eq('color', filter.colors)
  }

  if (filter.rating) {
    const minRating = Number(filter.rating); 
    query = query.gte('rating', minRating); 
}

  if (filter.sort === 'low') {
  query = query.order('offerPrice', { ascending: true });
} else if (filter.sort === 'high') {
  query = query.order('offerPrice', { ascending: false });
} 

if (filter.categories && filter.categories.length > 0 && !filter.categories.includes('all')) {
  query = query.in('categories', filter.categories); 
}

  let { data: products, error } = await query;

  if (error) {
    console.log(error);
  }

  return products;
}



export default {
  ReadProduct,
  filterProducts
}