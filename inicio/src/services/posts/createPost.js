import axios from 'axios';


export const createPost = ({ title, body, userId }) => {


    return axios
        .post('https://jsonplaceholder.typicode.com/posts', { title, body, userId }, {
            headers: {
                'authorization': 'Basic eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDczYjM2OGJkYmZiODQ1ZDBjZjliNiIsIm5hbWUiOiJTZXJnaW8gU2FubWlndWVsIiwidXNlcm5hbWUiOiJzZXJnaW9lc3MiLCJpYXQiOjE2NTg0NDQ3MTB9.SJAfK23-bA3Ltjj7Xf86lpwclPinsA-OWXlPEkQN0Ps'
            }
        })
        .then(response => {
            const { data } = response;
            return data;

        });
};
