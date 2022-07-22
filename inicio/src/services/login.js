// OTRA MANERA PARA CREAR UN SOLO SERVICIO Y TODOS LOS MÉTOS EN UN SOLO ARCHIVO 

import axios from 'axios';


export const makeLogin = ({ username, password }) => {

    // console.log(username);

    return axios
        .post('http://localhost:3001/api/login', { username, password })
        .then(response => {
            const { data } = response;
            // console.log(data);
            return data;

        });
};
