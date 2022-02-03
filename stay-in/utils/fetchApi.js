import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
    const { data } = await axios.get((url), {
        headers: {
            'x-rapidapi-host': 'bayut.p.rapidapi.com',
            'x-rapidapi-key': 'c64f38dfefmsh69875933d1b9caep14e3ddjsn2adf8806a2a5'
        }
    });
        
    return data;
}