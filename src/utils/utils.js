const homePageUrl = "http://localhost:8080/";

export const checkToken = (token) => {
    if(!token){
        window.location.href=homePageUrl;
    }
};