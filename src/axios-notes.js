import axios from 'axios';

let instance = axios.create({
    baseURL : "https://vikkyraki-notes.firebaseio.com/users/"
})


export default instance;