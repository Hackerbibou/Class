import supabase from './index';
import util from './clientuser'

export async function readPastorder() {
    const user = await util.Getuser()
    let { data: info, error } = await supabase
    .from('user')
    .select('*')
    .eq('id',user.id)

    
    if(info[0]) {
        return info[0].pastorders
    }
    return[] 
            
}
export async function readPastorders(id) {
    let { data: info, error } = await supabase
    .from('user')
    .select('*')
    .eq('id',id)

    
    if(info[0]) {
        return info[0].pastorders
    }
    return[] 
            
}
export async function addOrders(cart, name, email, phone, address, payment) {
    console.log(cart)
    console.log(name)
    console.log(email)
    console.log(phone)
    console.log(address)
    console.log(payment)
    const total=cart.reduce((acc,el)=>acc+el.offerPrice,0) +5000
    const order ={
        'cart':cart,
        'name':name,
        'email':email,
        'phone':address.phone,
        'address':address,
        'total':total,
        'payment':payment,
        'date':new Date(),
    }
    console.log(order)
    const user = await util.Getuser();
    
    const pastorders = await readPastorders(user.id);
    
   
    const { data, error } = await supabase
    .from('user')
    .update({ pastorders: [...pastorders, order] })
    .eq('id', user.id)
    .select()

}
export async function readCart() {
 
    const user = await util.Getuser()
    if(user){
        let { data: info, error } = await supabase
    .from('user')
    .select('*')
    .eq('id', user.id)
    if(info[0]) {
        return info[0].cart
    }
    return[] 
    }
    
            
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
export async function editCart(updatedProducts){
    const { data, error } = await supabase
    .from('user')
    .update({ cart: updatedProducts })
    .eq('id', user.id)
    .select()
}
export async function deleteFromCart(updatedProducts){
    const user = await util.Getuser()
    const { data, error } = await supabase
    .from('user')
    .update({ cart: updatedProducts })
    .eq('id', user.id)
    .select()
}
// export async function removeFromCart(object) {
//     const user = await util.Getuser()
//     const cart = await readCart()
//     let newcart= cart.filter(elem=>elem.id!=object.id)
//     const { data, error } = await supabase
//     .from('user')
//     .update({ cart: newcart })
//     .eq('id', user.id)
//     .select()
        
// }
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
    const user = await util.Getuser()
    const addresses= await readAddress();
    const addres = addresses.map((elem,i)=>{
        if(i==index){
            elem=address
            return elem
        }else{
            return elem
        }
    })
    console.log(addres)
    const { data, error } = await supabase
    .from('user')
    .update({ adresses: [...addres] })
    .eq('id', user.id)
    .select()
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
    // removeFromCart,
    clearCart,
    readAddress,
    addAddress,
    editAddress,
    removeAddress,
    readPastorder,
    readPastorders,
    addOrders,
    editCart,
    deleteFromCart
}