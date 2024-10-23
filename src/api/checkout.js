import supabase from './index';
import util from './clientuser'

export async function readPastorders() {
    const user = await util.Getuser()
    let { data: info, error } = await supabase
    .from('user')
    .select('*')
    .eq(id,user.id)

    
    if(info[0]) {
        return info[0].pastorders
    }
    return[] 
            
}
export async function readCart() {
 
    const user = await util.Getuser()
    let { data: info, error } = await supabase
    .from('user')
    .select('*')
    .eq('id', user.id)
    if(info[0]) {
        return info[0].cart
    }
    return[] 
            
}
export async function readCarts(id) {

    let { data: info, error } = await supabase
    .from('user')
    .select('*')
    .eq('id',id)

    
    if(info[0]) {
        return info[0].cart
    }
    return[] 
            
}
export async function addCart(object) {
    
    const user = await util.Getuser();
    
    const cart = await readCarts(user.id);
    
   
    const { data, error } = await supabase
    .from('user')
    .update({ cart: [...cart,object] })
    .eq('id', user.id)
    .select()

}
export async function removeFromCart(object) {
    const user = await util.Getuser()
    const cart = await readCart()
    let newcart= cart.filter(elem=>elem.id!=object.id)
    const { data, error } = await supabase
    .from('user')
    .update({ cart: newcart })
    .eq('id', user.id)
    .select()
        
}
export async function clearCart() {
    const user = await util.Getuser()
    const { data, error } = await supabase
    .from('user')
    .update({ cart: [] })
    .eq('id', user.id)
    .select()
}

export async function readAddress() {
    const user = await util.Getuser()
    let { data: info, error } = await supabase
    .from('user')
    .select('*')
    .eq('id', user.id)
    if(info[0]) {
        return info[0].adresses
    }
    return[]

}
export async function addAddress(address) {
    const user = await util.Getuser()
    const addresses= await readAddress();
    const { data, error } = await supabase
    .from('user')
    .update({ adresses: [...addresses,address] })
    .eq('id', user.id)
    .select()
}
export async function editAddress(index,address) {
    console.log(index)
//     const user = await util.Getuser()
//     const addresses= await readAddress();
//     const addres = addresses.map((elem,i)=>{
//         if(i==index){
//             elem=address
//         }
//     })
//     console.log(addres)
//     const { data, error } = await supabase
//     .from('user')
//     .update({ adresses: [...addres] })
//     .eq('id', user.id)
//     .select()
}
export async function removeAddress(index) {
    console.log(index)
    const user = await util.Getuser()
    const addresses= await readAddress();
    const addres=addresses.filter((elem,i)=>i!=index)
    console.log(addres)
    const { data, error } = await supabase
    .from('user')
    .update({ adresses: [...addres] })
    .eq('id', user.id)
    .select()
}

export default{
    readCart,
    addCart,
    removeFromCart,
    clearCart,
    readAddress,
    addAddress,
    editAddress,
    removeAddress
}