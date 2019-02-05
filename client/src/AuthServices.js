import axios from 'axios';

const url = 'auth';

class AuthServices {

    static register(name, email, password){
        return new Promise(async (resolve, reject) => {
            try{
                const res = await axios.post(url+'/register', {
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
                const res = await axios.post(url+'/login', {
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
                const res = await axios.get(url+'/logout');
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