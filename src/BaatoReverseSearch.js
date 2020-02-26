import axios from 'axios'

class BaatoReverseSearch {
    constructor(
        props,
    ) {
        this.key = props && props.key ? props.key : 'YOURQUERY'
        this.lat = props && props.lat ? props.lat : null
        this.lon = props && props.lon ? props.lon : null
        this.radius = props && props.radius ? props.radius : 0.5 // based on spring-boot API design, quick hack
        this.baseUrl = props && props.baseUrl ? props.baseUrl : 'http://178.128.59.143/api/v1'
    }

    setKey(key) {
        this.key = key
        return this
    }

    setLat(lat) {
        this.lat = lat
        return this
    }

    setLon(lon) {
        this.lon = lon
        return this
    }


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
            console.log(this.lat, this.lon)


            return axios.get(`${this.baseUrl}/reverse`, {
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


export default BaatoReverseSearch
