import axios from 'axios';


export const getAllPosts = () => {

    return axios
        .get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            const { data } = response;
            // console.log(data);

            return data;
            // setNotes(data);
            // setLoading(false);

        });
};
