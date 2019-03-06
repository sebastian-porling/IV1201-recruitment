import axios from 'axios';
//import Axios from './Axios.js';
//const axios = Axios.getAxios();
const url = 'auth';

  // const JWTToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjN2U3Mjc3MzYzYWFiOWZmNDcwM2QyMSIsImlhdCI6MTU1MTg3NTExMywiZXhwIjoxNTUxOTYxNTEzfQ.o9ko35lXZOY6_j2iaM-FgxftJKDGRfoBZia66fGXPL4"

  //   axios.defaults.headers = {
  //     Authorization: JWTToken
  //   }
   

/**  
 *   Class used to handle authentication with the server using axios
*/
class AuthServices {

  /**
  * Used to register a user on the server 
  * @param name the name of the user
  * @param surname the surname of the user
  * @param ssn the social security number of the user
  * @param email the users email used to login
  * @param password The users password
  */
  static async register(name, surname, ssn, email, password) {
    try {
      const res = await axios.post(url + '/register', {
        name: name,
        surname: surname,
        ssn: ssn,
        password: password,
        email: email
      });
      const data = res.data;
      return data.msg;
    } catch (e) {
      if (e.response) {
        switch (e.response.data.error) {
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
  static async login(email, password) {
    try {
      const res = await axios.post(url + '/login', {
        email: email,
        password: password,
      });
      const data = res.data;
      return {
        message: data.msg,
        data: {
          name: data.user.name + " " + data.user.surname,
          role: data.user.role 
        }
      };
    } catch (e) {
      if (e.response) {
        throw e.response.data.error;
        /*switch (e.response.data.error) {
          case 'Username or password incorrect':
            return 'Username or password incorrect'
          case 'email invalid':
            return 'email invalid'
          default:
            return e.response.data.error;
        }*/
      }
    }
  }


   /**
  * Used to login an Admin on the server 
  * @param name of the admin logging in 
  * @param password The users password
  */
 static async loginAdmin(name, password) {
  try {
    const res = await axios.post(url + '/loginadmin', {
      name: name,
      password: password,
    });
    const data = res.data;
    //const data = {msg: 'yes'}
    return {
      message: data.msg
    } 
  }
  catch (e) {
    if (e.response) {
      //throw e.response.data.error;
      throw e
    }
      //return e.response.data.error;
      //throw Error("error error ")
      //throw e.response.data.error;
      /*switch (e.response.data.error) {
        case 'Username or password incorrect':
          return 'Username or password incorrect'
        case 'email invalid':
          return 'email invalid'
        default:
          return e.response.data.error;
      }*/
    }
  }
  /**
  * Used to logout a user on the server 
  */
 static async logout() {
  try {
    const res = await axios.get(url + '/logout');
    const data = res.data;
    return data.msg;
  }
  catch (e) {
    if (e.response) {
      switch (e.response.data.error) {
        case 'Username or password incorrect':
          return 'Username or password incorrect'
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
