import supabase from './index';

import { Products, ProductsFilter } from 'types/e-commerce';


/////Tops

export async function getMensShirts() {

    let { data: Menshirts, error } = await supabase
        .from('Menshirts')
        .select('*')
        return Menshirts
}
export async function getMensHoodies() {

    let { data: Menhoodies, error } = await supabase
        .from('Menshoodies')
        .select('*')
        return Menhoodies
}
export async function getMensLongsleeves() {

    let { data: Menlongsleeves, error } = await supabase
        .from('Menlongsleeves')
        .select('*')
        return Menlongsleeves
}


////////Bottom
export async function getMensJeans() {

let { data: Menjeans, error } = await supabase
    .from('Menjeans')
    .select('*')
    return Menjeans
    }
export async function getMensSweatpants() {

    let { data: MenSweats, error } = await supabase
    .from('Mensweatpants')
    .select('*')
    return MenSweats
}

export async function getMensPants() {

let { data: Menpants, error } = await supabase
    .from('Menpants')
    .select('*')
    return Menpants
 }
 export async function getMensShorts() {

    let { data: Menshorts, error } = await supabase
        .from('Menshorts')
        .select('*')
        return Menshorts
     }




 ////////Accessories
export async function getMensShoes() {

    let { data: Menshoes, error } = await supabase
    .from('Menshoes')
    .select('*')
    return Menshoes
}
export async function getMensHats() {

    let { data: Menhats, error } = await supabase
    .from('Menshats')
    .select('*')
    return Menhats
}
export async function getMensSocks() {

    let { data: Mensocks, error } = await supabase
    .from('Mensocks')
    .select('*')
    return Mensocks
}
export async function getMensTable(table) {
    console.log(table)
    let { data: Table, error } = await supabase
    .from(table)
    .select('*')
    return Table
}
    
export default {
    getMensShirts,
    getMensHoodies,
    getMensLongsleeves,

    getMensJeans,
    getMensSweatpants,
    getMensPants,
    getMensShorts,

    getMensShoes,
    getMensHats,
    getMensSocks,

    getMensTable
}