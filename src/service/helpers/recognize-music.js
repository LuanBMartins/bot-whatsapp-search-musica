const axios = require('axios').default
const FormData = require('form-data');
const dotenv = require('dotenv');
// const got = require('got');

dotenv.config();

module.exports = async (url) => {
    const form = new FormData();
    form.append('api_token', process.env.AUDD_TOKEN);
    form.append('url', url);
    form.append('return', 'deezer');
    const configs = {
        headers: {
            ...form.getHeaders()
        }
    }
    const response = await axios.post(
        'https://api.audd.io/',
        form,
        configs    
    );

    if (response.data.status === 'success') {
        return {
            artist: response.data.result.artist,
            title: response.data.result.title,
            album: response.data.result.album,
            deezer: {
                picture: response.data.result.deezer && response.data.result.deezer.artist ? response.data.result.deezer.artist.picture_medium : undefined,
                preview: response.data.result.deezer ? response.data.result.deezer.preview : undefined,
            },
        };
    }

    return false
};
