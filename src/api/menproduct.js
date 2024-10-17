import supabase from './index';

import { Products, ProductsFilter } from 'types/e-commerce';


export async function getMensProduct() {

let { data: Menpants, error } = await supabase
    .from('Menpants')
    .select('*')
    return Menpants
}

export default {
    getMensProduct
}