import axios from 'axios';

//const login = 'http://localhost:5000/login';
//const logout = 'http://localhost:5000/logout';
const login = 'login';
const logout = 'logout';
const register = 'register';

class AuthServices {

    static register(name, email, password){
        return new Promise(async (resolve, reject) => {
            try{
                const res = await axios.post(register, {
                            name: name,
                            password: password,
                            email: email
                });
                
                const data = res.data;
                resolve(
                    data.msg
                );
            } catch(err){
                reject(err);
            }
        });


    }
    //  Login
    static login(email, password){
        return new Promise(async (resolve, reject) => {
            try{
                const res = await axios.post(login, {
                    email: email,
                    password: password,
                });
                const data = res.data;
                resolve(
                    data.msg
                );
            } catch(err){
                reject(err);
            }
        });
    }

    //  Logout
    static logout(){
        return new Promise(async (resolve, reject) => {
            try{
                const res = await axios.get(logout);
                const data = res.data;
                resolve(
                    data.msg
                );
            } catch(err){
                reject(err);
            }
        });
    }

}

export default AuthServices;