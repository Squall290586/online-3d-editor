import axios from 'axios'

const HTTP = axios.create({
    baseURL: 'http://192.168.0.23',
    headers: {
        'X-Api-Key': '6616E824967245928903C0BB014CF163'
    }
});

export {HTTP};