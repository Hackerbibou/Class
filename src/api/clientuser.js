import supabase from './index';


export async function Login(email, password) {


    let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })
    
    if(data.user)return data.user.role
    return null
  
}
export async function Signup(email, phone, password, firstName, lastName) {

    let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
              first_name: firstName,
              last_name: lastName,
              phone:phone
            }
        }
    })
    
    if(data.user) return(data.user.role)
    return null
  
}
export async function getUserInfo(id){

let { data: user, error } = await supabase
.from('user')
.select('*')
.eq('id',id)   

return user[0]    
}

export async function Getuser() {


    const { data: { user } } = await supabase.auth.getUser()
    
    if(!user)return null
    const info= await getUserInfo(user.id)
    const name = user.user_metadata.first_name+' '+user.user_metadata.last_name
    
    if(info==undefined){
        
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

export async function EditUser(objectt){

const { data, error } = await supabase.auth.updateUser({
    email: objectt.email,
   
    data: { 
        first_name:objectt.user_metadata.first_name,
        last_name:objectt.user_metadata.last_name,
         phone: objectt.phone
    }
  })
  
}
export async function EditPassword(password){

    const { data, error } = await supabase.auth.updateUser({
        password: password
      })
      
      
    }
    
export default {
    Login,
    Signup,
    Getuser,
    Logout,
    Recoverpassword,
    EditUser,
    EditPassword
}