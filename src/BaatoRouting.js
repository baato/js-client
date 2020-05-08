import axios from 'axios'
import BaatoUtil from './BaatoUtil'

class BaatoRouting {
    constructor({
        key, vehicle, baseUrl, apiVersion,
    }) {
        this.alternatives = false
        this.instructions = false
        this.points = []


        this.key = key
        this.vehicle = vehicle
        this.baseUrl = baseUrl || 'http://baato.io/api'
        this.apiVersion = apiVersion || '1'
    }

    setBaseUrl(url) {
        this.baseUrl = url
        return this
    }

    setApiVersion(version) {
        this.apiVersion = version
    }

    setVehicle(vehicle) {
        this.vehicle = vehicle
        return this
    }

    addPoint({ lat, lon }) {
        this.points.push(`${lat},${lon}`)
        return this
    }

    getAlternatives() {
        this.alternatives = true
        return this
    }

    addPoints(points) {
        this.points = points
        return this
    }

    getBaseUrl() {
        if (this.alternatives) {
            return `${this.baseUrl}/directions`
        }

        return `${this.baseUrl}/directions`
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
                headers: {
                    Accept: `application/vnd.baato.api.v${this.apiVersion}+json`,
                },
            })


            const bUtil = new BaatoUtil()


            const finalData = response.data.data.length > 0 ? response.data.data.map(item => ({
                geojson: bUtil.getGeoJsonFromEncodedPolyLine(item.encodedPolyline),
                distanceInMeters: item.distanceInMeters,
                timeInMs: item.timeInMs,
            })) : []


            return finalData

            // return fetch(this.getBaseUrl())
        }

        return null
    }
}

export default BaatoRouting
