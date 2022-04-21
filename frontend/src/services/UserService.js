import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/v1/client/";
const USER_API_REG_URL = "http://localhost:8080/api/v1/registration";

class UserService {

    getIdByEmail(email) {
        return axios.get(USER_API_BASE_URL+"get-id-by-email/"+email);
    }
    
    getUser(id) {
        return axios.get(USER_API_BASE_URL+"get/"+id);
    }

    getUserName(id, isfullName) {
        if (isfullName) {
            return axios.get(USER_API_BASE_URL+"getfullname/"+id);
        }
        else {
            return axios.get(USER_API_BASE_URL+"getname/"+id);
        }
    }

    authenticate(email, password) {
        return axios.get(USER_API_BASE_URL+"login?email="+email+"&pwd="+password);
    }

    createUser(appUser) {
        return axios.post(USER_API_REG_URL, appUser);
    }

    createUserWithGoogle(appUser) {
        return axios.post(USER_API_REG_URL+"/google", appUser);
    }

    confirmToken(token) {
        return axios.get(USER_API_REG_URL+"/confirm?token="+token);
    }

    resendMail(expiredToken) {
        return axios.get(USER_API_REG_URL+"/reconfirm?token="+expiredToken);
    } 
}
 
export default new UserService();