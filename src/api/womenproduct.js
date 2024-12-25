import supabase from './index';

import { Products, ProductsFilter } from 'types/e-commerce';


/////Tops
export async function ensembleFille02() {

    let { data: EnsembleFille, error } = await supabase
        .from('EnsembleFille02')
        .select('*')
        return EnsembleFille
}
export async function ensembleFille24() {

    let { data: EnsembleFille, error } = await supabase
        .from('EnsembleFille24')
        .select('*')
        return EnsembleFille
}
export async function getWomensShirts() {

    let { data: Womenshirts, error } = await supabase
        .from('Womenshirts')
        .select('*')
        return Womenshirts
}
export async function getWomensHoodies() {

    let { data: Womenhoodies, error } = await supabase
        .from('Womenshoodies')
        .select('*')
        return Womenhoodies
}
export async function getWomensLongsleeves() {

    let { data: Womenlongsleeves, error } = await supabase
        .from('Womenlongsleeves')
        .select('*')
        return Womenlongsleeves
}


////////Bottom
export async function getWomensJeans() {

let { data: Womenjeans, error } = await supabase
    .from('Womenjeans')
    .select('*')
    return Womenjeans
    }
export async function getWomensSweatpants() {

    let { data: WomenSweats, error } = await supabase
    .from('Womensweatpants')
    .select('*')
    return WomenSweats
}

export async function getWomensPants() {

let { data: Womenpants, error } = await supabase
    .from('Womenpants')
    .select('*')
    return Womenpants
 }
 export async function getWomensShorts() {

    let { data: Womenshorts, error } = await supabase
        .from('Womenshorts')
        .select('*')
        return Womenshorts
     }




 ////////Accessories
export async function getWomensShoes() {

    let { data: Womenshoes, error } = await supabase
    .from('Womenshoes')
    .select('*')
    return Womenshoes
}
export async function getWomensHats() {

    let { data: Womenhats, error } = await supabase
    .from('Womenshats')
    .select('*')
    return Womenhats
}
export async function getWomensSocks() {

    let { data: Womensocks, error } = await supabase
    .from('Womensocks')
    .select('*')
    return Womensocks
}
    
export default {
    ensembleFille02,
    ensembleFille24,
    getWomensShirts,
    getWomensHoodies,
    getWomensLongsleeves,

    getWomensJeans,
    getWomensSweatpants,
    getWomensPants,
    getWomensShorts,

    getWomensShoes,
    getWomensHats,
    getWomensSocks
}