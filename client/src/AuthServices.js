import axios from 'axios';

const url = 'auth';


/**  
 *   Class used to handle authentication with the server using axios
*/

class AuthServices {

    /**
    * Used to register a user on the server 
    * @param name the name of the user
    * @param email the users email used to login
    * @param password The users password
 */
    static async register(name, email, password){

            try{
                const res = await axios.post(url+'/register', {
                            name: name,
                            password: password,
                            email: email
                });
                
                const data = res.data;
                return data.msg;
                
            } catch(e){
                if(e.response){
                    switch(e.response.data.error){
                        case 'Error on the server.':
                            return 'Error on the server.'
                        case 'Email already taken':
                            return 'Email already taken'
                        default:
                            return e.response.data.error;
                    }
    
        
                }

                
            }

    }
    /**
    * Used to login a user on the server 
    * @param email the users email used to login
    * @param password The users password
    */
    static async login(email, password){
        try{
            const res = await axios.post(url+'/login', {
                email: email,
                password: password,
            });
            const data = res.data;
            return data.msg;
         } catch(e){
            if(e.response){
                switch(e.response.data.error){
                    case 'Username or password incorrect':
                        return 'usr or pw inc'
                    case 'email incorrect':
                        return 'email invalid'
                    default:
                        return e.response.data.error;
                }

    
            }
            
        }

    }

    /**
    * Used to logout a user on the server 
    */
    static async logout(){
            try{
                const res = await axios.get(url+'/logout');
                const data = res.data;
                return data.msg;
            } 
            catch(e){
                if(e.response){
                    switch(e.response.data.error){
                        case 'Username or password incorrect':
                            return 'usr or pw inc'
                        case 'email incorrect':
                            return 'email invalid'
                        default:
                            return e.response.data.error;
                    }
    
        
                }
                
            }

    }

}

export default AuthServices;