import axiosClient from "../../ultils/axiosClient/index";
import { ValidationError } from "yup";
import {toast} from "react-toastify"
import axios from "axios";

export const END_POINT = {
  GET_ALL_POST: "/api/postservices/getPost",
  DELETEPOST: "/api/postservices/deletepost/{postId}",
  EDITPOST: "/api/postservices/editpost",
  POSTING : "/api/postservices/posting"
};


type Post = { 
  
   postId : number,
   content : string,
   time : Date,
   imageURL : string,
   author : string,
   groupName : string,
   comments : Comment[],
   reports : [],
   likes : Like[]

}

type Comment = { 
  commentId: number,
  postId : number,
  commentParentId : number;
  content: string,
  time: Date,
  author : string,
  reports: [],
  likes: Like[]
}

type Like = {
    likeId : number,
    status : number , 
    time : Date
}   



export const getAllPost = () => {
  return axiosClient.get(END_POINT.GET_ALL_POST, {
  });
};
