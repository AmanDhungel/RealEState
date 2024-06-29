import { defer } from "react-router-dom";
import apiRequest from "./apiResquest"

export const singlePageLoader = async({req, params}) => {
    const res = await apiRequest("/posts/" + params.id);
    return res.data;
}

export const listPageLoader = async({request, params})=>{
//    console.log(request.url.split("?")[1]);
    const query = request.url.split("?")[1];
    const postPromise = apiRequest("/posts?" + query)
    return defer({
        postResponse:postPromise,
    })

}

export const profilePageLoader = async()=>{
//    console.log(request.url.split("?")[1]);
    const postPromise = apiRequest("/user/profilePosts");
    const chatPromise = apiRequest("/chats");
    return defer({
        postResponse:postPromise,
        chatResponse: chatPromise
    })

}