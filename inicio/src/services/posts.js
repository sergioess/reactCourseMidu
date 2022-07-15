// OTRA MANERA PARA CREAR UN SOLO SERVICIO Y TODOS LOS MÉTOS EN UN SOLO ARCHIVO 

import axios from 'axios';


export const create = ({ title, body, userId }) => {


    return axios
        .post('http://localhost:3001/api/notes', { title, body, userId })
        .then(response => {
            const { data } = response;
            return data;

        });
};


export const getAll = () => {

    return axios
        .get('http://localhost:3001/api/notes')
        .then(response => {
            const { data } = response;
            // console.log(data);

            return data;
            // setNotes(data);
            // setLoading(false);

        });
};