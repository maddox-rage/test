import {Itoken} from "./token.interface";

export function generateToken(userData:Itoken) {
    const userDataString = JSON.stringify(userData);
    const encodedData = btoa(userDataString);
    const uniqueId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    const token = encodedData + '_' + uniqueId;
    return token
}

export function decodeToken(token:string) {
    const [encodedData, uniqueId] = token.split('_');
    const decodedData = atob(encodedData);
    const userData = JSON.parse(decodedData);
    return {
        userData,
        uniqueId
    };
}




