import axios from 'axios'


class Search {
    constructor(props) {
        this.key = props && props.key ? props.key : 'YOURAPIKEY'
        this.query = props && props.query ? props.query : 'YOURQUERY'
        this.baseUrl = props && props.baseUrl ? props.baseUrl : 'http://baato.io/api'
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

    setQuery(query) {
        this.query = query
        return this
    }

    setBaseUrl(baseUrl) {
        this.baseUrl = baseUrl
        return this
    }

    async doRequest() {
        if (this.key !== null) {
            return axios.get(`${this.baseUrl}/v${this.apiVersion}/search`, {
                params: {
                    key: this.key,
                    q: this.query,
                },
            })
                .then(response => response.data)

            // return fetch(this.getBaseUrl())
        }
        return null
    }
}


export default Search
