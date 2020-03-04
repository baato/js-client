import axios from 'axios'
import BaatoUtil from './BaatoUtil'

class BaatoRouting {
    constructor({ key, vehicle, baseUrl }) {
        this.alternatives = false

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

    addPoints(points) {
        this.points = points
        return this
    }

    getBaseUrl() {
        if (this.alternatives) {
            return `${this.baseUrl}/routes`
        }

        return `${this.baseUrl}/routes`
    }


    getKey() {
        return this.key
    }

    includeAlternativeRoutes() {
        this.alternatives = true
        return this
    }

    getBest() {
        this.alternatives = false
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
                    alternatives: this.alternatives,
                },
            })


            const bUtil = new BaatoUtil()


            const finalData = response.data.length > 0 ? response.data.map(item => ({
                geojson: bUtil.getGeoJsonFromEncodedPolyLine(item.encoded_polyline),
                distanceInKm: item.distanceInKm,
                timeInMs: item.timeInMs,
            })) : []

            return finalData

            // return fetch(this.getBaseUrl())
        }

        return null
    }
}

export default BaatoRouting
