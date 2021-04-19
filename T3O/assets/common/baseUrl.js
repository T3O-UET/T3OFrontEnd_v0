import {Platform} from 'react-native'

//Home
let baseURL = 'http://192.168.1.227:3000/api/v1';
// let baseURL = 'http://localhost:3000/api/v1/';
// 2.4 GHz G2
// let baseURL = 'http://10.90.136.151:3000/api/v1';

//heroku Server
// let baseURL = 'https://t3ostore-server.herokuapp.com/api/v1'

// {Platform.OS == 'android'
// ? baseURL = 'http://10.0.2.2:3000/api/v1/'
// : baseURL = 'http://localhost:3000/api/v1/'
// }

export default baseURL