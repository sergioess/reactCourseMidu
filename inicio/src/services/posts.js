// OTRA MANERA PARA CREAR UN SOLO SERVICIO Y TODOS LOS MÉTOS EN UN SOLO ARCHIVO 

import axios from 'axios';




export const create = ({ title, body, userId, token }) => {

    // console.log('Token', token)
    return axios
        .post('/api/notes', { title, body, userId }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            const { data } = response;
            return data;

        });
};


export const getAll = () => {

    return axios
        .get('/api/notes')
        .then(response => {
            const { data } = response;
            // console.log(data);

            return data;
            // setNotes(data);
            // setLoading(false);

        });
};