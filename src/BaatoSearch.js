import axios from 'axios'


class BaatoSearch {
    constructor(props) {
        this.key = props && props.key ? props.key : 'YOURAPIKEY'
        this.query = props && props.query ? props.query : 'YOURQUERY'
        this.baseUrl = props && props.baseUrl ? props.baseUrl : 'http://baato.io/api/v2'
    }

    setKey(key) {
        this.key = key
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

    setPlaceId(placeId) {
      this.placeId = placeId
      return this
    }

    async doRequest() {
        if (this.key !== null) {
            return axios.get(`${this.baseUrl}/search`, {
                params: {
                    key: this.key,
                    q: this.query,
                    placeId: this.placeId
                },
            })
                .then(response => response.data)

            // return fetch(this.getBaseUrl())
        }

        return null
    }
}


export default BaatoSearch
