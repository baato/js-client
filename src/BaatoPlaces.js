import axios from 'axios'

class BaatoSearch {
    constructor(props) {
        this.key = props && props.key ? props.key : 'YOURAPIKEY'
        this.baseUrl = props && props.baseUrl ? props.baseUrl : 'https://api.baato.io/api'
        this.apiVersion = props && props.apiVersion ? props.apiVersion : '1'
    }

    setKey(key) {
        this.key = key
        return this
    }

    setApiVersion(apiVersion) {
        this.apiVersion = apiVersion.match(/\d+/)[0]
        return this
    }

    setBaseUrl(baseUrl) {
        this.baseUrl = baseUrl
        return this
    }

    setPlaceId(placeId) {
        this.placeId = placeId
        return this
    }

    async doRequest() {
        if (this.key !== null) {
            return axios.get(`${this.baseUrl}/v${this.apiVersion}/places`, {
                params: {
                    key: this.key,
                    placeId: this.placeId,
                },                
            })
                .then(response => response.data)

            // return fetch(this.getBaseUrl())
        }

        return null
    }
}


export default BaatoSearch
