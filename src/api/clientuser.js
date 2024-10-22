import supabase from './index';


export async function Login(email, password) {


    let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })
    console.log(data)
    if(data.user)return data.user.role
    return null
  
}
export async function Signup(email, password, firstName, lastName) {

    let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
              first_name: firstName,
              last_name: lastName,
            }
        }
    })
    console.log(data.user.role)
    if(data.user) return(data.user.role)
    return null
  
}
export async function getUserInfo(id){

let { data: user, error } = await supabase
.from('user')
.select('*')
.eq('id',id)   
console.log(user) 
return user[0]    
}

export async function Getuser() {
    console.log('here')
    const { data: { user } } = await supabase.auth.getUser()
    console.log(user)
    if(!user)return null
    const info= await getUserInfo(user.id)
    const name = user.user_metadata.first_name+' '+user.user_metadata.last_name
    console.log(user.email)
    if(info==undefined){
        console.log('here')
        const { data, error } = await supabase
        .from('user')
        .insert([
        { id: user.id,email:user.email, name: name,pastorders:[],cart:[]},
        ])
        .select()
        
    }

    return user

}
export async function Logout() {
    let { error } = await supabase.auth.signOut()
}

export async function Recoverpassword(email) {
    let { data, error } = await supabase.auth.resetPasswordForEmail(email)
}


    
export default {
    Login,
    Signup,
    Getuser,
    Logout,
    Recoverpassword
}