import axios from 'axios'
import BaatoUtil from './BaatoUtil'

class BaatoRouting {
    constructor({
        key, mode, baseUrl, apiVersion,
    }) {
        this.alternatives = false
        this.instructions = false
        this.points = []


        this.key = key
        this.mode = mode
        this.baseUrl = baseUrl || 'http://baato.io/api'
        this.apiVersion = apiVersion || '1'
    }

    setBaseUrl(url) {
        this.baseUrl = url
        return this
    }

    setApiVersion(apiVersion) {
        this.apiVersion = apiVersion.match(/\d+/)[0]
        return this
    }

    setMode(mode) {
        this.mode = mode
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
            const response = await axios.get(`${this.baseUrl}/v${this.apiVersion}/directions`, {
                params: {
                    points: this.points,
                    key: this.key,
                    mode: this.mode,
                    alternatives: this.alternatives,
                },
            })

            const bUtil = new BaatoUtil()            

            const finalData = response.data.data.length > 0 ? response.data.data.map(item => ({
                geojson: bUtil.getGeoJsonFromEncodedPolyLine(item.encodedPolyline),
                distanceInMeters: item.distanceInMeters,
                timeInMs: item.timeInMs,
            })) : []

            return finalData

        }

        return { message: response.data.message}
    }
}

export default BaatoRouting
