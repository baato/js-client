import axios from 'axios'

class BaatoReverseSearch {
    constructor(
        props,
    ) {
        this.key = props && props.key ? props.key : 'YOURQUERY'
        this.radius = props && props.radius ? props.radius : 0.5 // based on spring-boot API design
        this.baseUrl = props && props.baseUrl ? props.baseUrl : 'https://api.baato.io/api'
        this.apiVersion = props && props.apiVersion ? props.apiVersion : '1'
        this.limit = props && props.limit ? props.limit : '1'
    }

    setKey(key) {
        this.key = key
        return this
    }

    setApiVersion(apiVersion) {
        this.apiVersion = apiVersion.match(/\d+/)[0]
        return this
    }

    setCoordinates(coordinates) {
        this.lat = coordinates[0]
        this.lon = coordinates[1]
        return this
    }

    setLimit(limit) {
        this.limit = String(limit)
        return this
    }


    // setLat(lat) {
    //     this.lat = lat
    //     return this
    // }
    //
    // setLon(lon) {
    //     this.lon = lon
    //     return this
    // }

    setRadius(radius) {
        this.radius = radius
        return this
    }

    setBaseUrl(baseUrl) {
        this.baseUrl = baseUrl
        return this
    }


    async doRequest() {
        if (this.key !== null) {
            return axios.get(`${this.baseUrl}/v${this.apiVersion}/reverse`, {
                params: {
                    key: this.key,
                    lat: this.lat,
                    lon: this.lon,
                    radius: this.radius,
                    limit: this.limit,
                },
            })
                .then(response => response.data)

            // return fetch(this.getBaseUrl())
        }

        return null
    }
}


export default BaatoReverseSearch
