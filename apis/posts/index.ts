// import axiosClient from "../../ultils/axiosClient/index";
// import { ValidationError } from "yup";
// import {toast} from "react-toastify"
// import axios from "axios";

// export const END_POINT = {
//   GETPOST: "/api/postservices/getPost",
//   DELETEPOST: "/api/postservices/deletepost/{postId}",
//   EDITPOST: "/api/postservices/editpost",
//   POSTING : "/api/postservices/posting"
// };


// type Post = { 
  
//    postId : number,
//    content : string,
//    time : Date,
//    imageURL : string
// }

// type Posting = { 
//    Post : Post,
    
// }



// export const getPost = () => {
//   return axiosClient.get<LoginResponse>(END_POINT.GETPOST, {
//   });
// };
// export const deletePost = (payload: UserRegister) => {
//   return axiosClient.post(END_POINT.REGISTER, {
//     email: payload.email,
//     password: payload.password,
//     userName : payload.userName
//   });
// };

// export const resetAccount = (payload: UserChange) => {
//   return axiosClient.patch(END_POINT.RESET, {
//     email : payload.email,
//     oldPassword: payload.oldPassword,
//     newPassword: payload.newPassword
//   });
// };

