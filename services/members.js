import axios from 'axios';

export const fetchMembers = async () => {
    const response = await axios.get('https://randomuser.me/api/?results=20');
    return response.data.results;
};
