import supabase from './index';
import util from './clientuser'

export async function readPastorders() {
    const user = await util.Getuser()
    let { data: info, error } = await supabase
    .from('user')
    .select('*')
    .eq(id,user.id)

    console.log(info)
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

    console.log(info)
    if(info[0]) {
        return info[0].cart
    }
    return[] 
            
}
export async function addCart(object) {
    console.log('here')
    const user = await util.Getuser();
    console.log(user)
    const cart = await readCarts(user.id);
    console.log(cart)
   
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

export default{
    readCart,
    addCart,
    removeFromCart,
    clearCart
}