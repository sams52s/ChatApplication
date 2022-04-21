import UserService from "./UserService";


function fullName(id) {
    let result = "";
    UserService.getUserName(id, true).then((res) => {result = res.data;});
    console.log(result);
}

export default fullName;