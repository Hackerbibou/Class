import supabase from './index';


export async function Login(email, password) {


    let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })
  
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
  
}


export async function Getuser() {

    const { data: { user } } = await supabase.auth.getUser()

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