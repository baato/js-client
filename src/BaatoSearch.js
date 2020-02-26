class BaatoSearch {
    constructor({ key, query }) {
        this.key = key
        this.query = query
        this.baseUrl = baseUrl || 'http://178.128.59.143/api/v1'
    }

    setKey(key) {
        this.key = key
        return this;
    }

    setQuery(query) {
        this.query = query
        return this;
    }

    async doRequest() {
        if (this.key !== null) {
            return axios.get(this.getBaseUrl(), {
                params: {
                    key: this.key,
                    query: this.query,
                },
            })
                .then(response => response.data)

            // return fetch(this.getBaseUrl())
        }

        return null
    }
}


export default BaatoSearch;