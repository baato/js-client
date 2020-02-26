class BaatoReverseSearch {
    constructor({ lat, lon, radius, key }) {
        this.key = key
        this.lat = lat
        this.lon = lon
        this.radius = radius || "2km" // based on spring-boot API design, quick hack 
        this.baseUrl = baseUrl || 'http://178.128.59.143/api/v1'
    }

    setKey(key) {
        this.key = key
        return this;
    }

    setLat(lat) {
        this.lat = lat
        return this;
    }

    setLon(lon) {
        this.lon = lon
        return this;
    }

    
    setRadius(radius) {
        this.radius = radius
        return this;
    }

    setBaseUrl(baseUrl) {
        this.baseUrl = baseUrl
        return this;
    }


    async doRequest() {
        if (this.key !== null) {
            return axios.get(this.getBaseUrl(), {
                params: {
                    key: this.key,
                    lat: this.lat,
                    lon: this.lon,
                    radius: this.radius,
                },
            })
                .then(response => response.data)

            // return fetch(this.getBaseUrl())
        }

        return null
    }
}


export default BaatoSearch;