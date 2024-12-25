import supabase from './index';

import { Products, ProductsFilter } from 'types/e-commerce';


/////Tops


// export async function getMensShirts() {

//     let { data: Menshirts, error } = await supabase
//         .from('Menshirts')
//         .select('*')
//         return Menshirts
// }
export async function ensembleGarcon02() {

    let { data: EnsembleGarcon, error } = await supabase
        .from('EnsembleGarcon02')
        .select('*')
        return EnsembleGarcon
}
export async function ensembleGarcon24() {

    let { data: EnsembleGarcon, error } = await supabase
        .from('EnsembleGarcon24')
        .select('*')
        return EnsembleGarcon
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
export async function searchAllProducts(product) {
    let Products = []
    let reg = '*'+product+'*'
    let { data: Products1, error1 } = await supabase
    .from('Menshirts')
    .select('*')
    .ilike('name', reg)
    Products=[...Products,...Products1]
    
    let { data: Products2, error2 } = await supabase
    .from('Menjeans')
    .select('*')
    .ilike('name', reg)
    Products=[...Products,...Products2]
    
    let { data: Products3, error3 } = await supabase
    .from('Menlongsleeves')
    .select('*')
    .ilike('name', reg)
    Products=[...Products,...Products3]
    
    let { data: Products4, error4 } = await supabase
    .from('Menpants')
    .select('*')
    .ilike('name', reg)
    Products=[...Products,...Products4]
    
    let { data: Products5, error5 } = await supabase
    .from('Menshats')
    .select('*')
    .ilike('name', reg)
    Products=[...Products,...Products5]
    
    let { data: Products6, error6 } = await supabase
    .from('Menshoes')
    .select('*')
    .ilike('name', reg)
    Products=[...Products,...Products6]
    
    let { data: Products7, error7 } = await supabase
    .from('Menshoodies')
    .select('*')
    .ilike('name', reg)
    Products=[...Products,...Products7]
    
    let { data: Products8, error8 } = await supabase
    .from('Menshorts')
    .select('*')
    .ilike('name', reg)
    Products=[...Products,...Products8]
    
    let { data: Products9, error9 } = await supabase
    .from('Menshoes')
    .select('*')
    .ilike('name', reg)
    Products=[...Products,...Products9]
    
    let { data: Products10, error10 } = await supabase
    .from('Mensocks')
    .select('*')
    .ilike('name', reg)
    Products=[...Products,...Products10]
    
    let { data: Products11, error11 } = await supabase
    .from('Mensweatpants')
    .select('*')
    .ilike('name', reg)
    Products=[...Products,...Products11]
    
    let { data: Products12, error12 } = await supabase
    .from('Womenshirts')
    .select('*')
    .ilike('name', reg)
    Products=[...Products,...Products12]
    
    let { data: Products13, error13 } = await supabase
    .from('Womenshoodies')
    .select('*')
    .ilike('name', reg)
    Products=[...Products,...Products13]
    
    let { data: Products14, error14 } = await supabase
    .from('Womenlongsleeves')
    .select('*')
    .ilike('name', reg)
    Products=[...Products,...Products14]
    
    let { data: Products15, error15 } = await supabase
    .from('Womenjeans')
    .select('*')
    .ilike('name', reg)
    Products=[...Products,...Products15]
    
    let { data: Products16, error16 } = await supabase
    .from('Womensweatpants')
    .select('*')
    .ilike('name', reg)
    Products=[...Products,...Products16]
    
    let { data: Products17, error17 } = await supabase
    .from('Womenpants')
    .select('*')
    .ilike('name', reg)
    Products=[...Products,...Products17]
    
    let { data: Products18, error18 } = await supabase
    .from('Womenshorts')
    .select('*')
    .ilike('name', reg)
    Products=[...Products,...Products18]
    
    let { data: Products19, error19 } = await supabase
    .from('Womensocks')
    .select('*')
    .ilike('name', reg)
    Products=[...Products,...Products19]
    
    let { data: Products20, error20 } = await supabase
    .from('Womenshats')
    .select('*')
    .ilike('name', reg)
    Products=[...Products,...Products20]
    
    let { data: Products21, error21 } = await supabase
    .from('Womenshoes')
    .select('*')
    .ilike('name', reg)
    Products=[...Products,...Products21]
    

    
    return Products
}    
export default {
    searchAllProducts,
    ensembleGarcon02,
    ensembleGarcon24,
    // getMensShirts,
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