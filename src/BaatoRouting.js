import axios from 'axios'
import BaatoUtil from './BaatoUtil'

class BaatoRouting {
    constructor({ key, vehicle, baseUrl }) {
        this.alternativeRoutes = false

        this.instructions = false

        this.points = []


        this.key = key
        this.vehicle = vehicle
        this.baseUrl = baseUrl || 'http://178.128.59.143/api/v1'
    }

    setBaseUrl(url) {
        this.baseUrl = url
        return this
    }


    setVehicle(vehicle) {
        this.vehicle = vehicle
        return this
    }

    addPoint({ lat, lon }) {
        this.points.push(`${lat},${lon}`)
        return this
    }

    getBaseUrl() {
        if (this.alternativeRoutes) {
            return `${this.baseUrl}/routes/alt`
        }

        return `${this.baseUrl}/routes/`
    }


    getKey() {
        return this.key
    }

    hasAlternativeRoutes(bool) {
        this.alternativeRoutes = bool
        return this
    }

    hasInstructions(bool) {
        this.hasInstructions = bool
        return this
    }

    async doRequest() {
        if (this.key !== null) {
            const response = await axios.get(this.getBaseUrl(), {
                params: {
                    points: this.points,
                    key: this.key,
                    mode: this.vehicle,
                    instructions: this.instructions,
                    alternatives: this.alternativeRoutes,
                },
            })
            const myJson = response.data
            const bUtil = new BaatoUtil()
            return bUtil.getGeoJsonFromEncodedPolyLine(myJson.encoded_polyline)

            // return fetch(this.getBaseUrl())
        }

        return null
    }
}

export default BaatoRouting
