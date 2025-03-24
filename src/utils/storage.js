const TOKEN_KEY="token"
const INFO = "health-info";
const ACTIVE_PATH="active_key"
const USER = "user_id";
export function getToken(){
    return sessionStorage.getItem(TOKEN_KEY);
}

export function setToken(token){
    sessionStorage.setItem(TOKEN_KEY,token);
}

export function getHealthInfo(){
    return sessionStorage.getItem(INFO);
}

export function getUserId(){
    return sessionStorage.getItem(USER);
}

export function setUserId(id){
    sessionStorage.setItem(USER,id);
}

export function setHealthInfo(obj){
    sessionStorage.setItem(INFO,obj);
}

export function clearToken(){
    sessionStorage.clear();
}
export function getActivePath(){
    return sessionStorage.getItem(ACTIVE_PATH);
}

export function setActivePath(path){
    sessionStorage.setItem(ACTIVE_PATH, path);
}