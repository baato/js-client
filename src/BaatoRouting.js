/* eslint-disable semi */
import axios from 'axios';
import BaatoUtil from './BaatoUtil';

class BaatoRouting {
    constructor(props) {
        this.baseUrl = (props && props.baseUrl) || 'https://api.baato.io/api';
        this.apiVersion = (props && props.apiVersion) || '1';
        this.key = (props && props.key) || 'YOURBAATOTOKEN';
        this.alternatives = false;
        this.instructions = false;
        this.points = [];
        this.vehicle = 'foot';
    }

    setBaseUrl(url) {
        this.baseUrl = url;
        return this;
    }

    setKey(key) {
        this.key = key;
        return this;
    }

    setApiVersion(apiVersion) {
        this.apiVersion = apiVersion.match(/\d+/)[0];
        return this;
    }

    setVehicle(vehicle) {
        this.vehicle = vehicle;
        return this;
    }

    addPoint({ lat, lon }) {
        this.points.push(`${lat},${lon}`);
        return this;
    }

    getAlternatives(bool) {
        this.alternatives = bool;
        return this;
    }

    addPoints(points) {
        this.points = points;
        return this;
    }

    getBaseUrl() {
        if (this.alternatives) {
            return `${this.baseUrl}/directions`;
        }

        return `${this.baseUrl}/directions`;
    }

    getKey() {
        return this.key;
    }

    includeAlternativeRoutes() {
        this.alternatives = true;
        return this;
    }

    getBest() {
        this.alternatives = false;
        return this;
    }

    hasInstructions(bool) {
        this.instructions = bool;
        return this;
    }

    async doRequest() {
        if (this.key !== null) {
            const response = await axios.get(
                `${this.baseUrl}/v${this.apiVersion}/directions`,
                {
                    params: {
                        points: this.points,
                        key: this.key,
                        mode: this.vehicle,
                        alternatives: this.alternatives,
                        instructions: this.instructions
                    },
                },
            );

            const bUtil = new BaatoUtil();

            const finalData = response.data.data.length > 0
                ? response.data.data.map(item => ({
                    geojson: bUtil.getGeoJsonFromEncodedPolyLine(
                        item.encodedPolyline,
                    ),
                    distanceInMeters: item.distanceInMeters,
                    timeInMs: item.timeInMs,
                    instructionList: item.instructionList,	
                }))
                : [];

            return finalData;

            // return fetch(this.getBaseUrl())
        }

        return null;
    }
}

export default BaatoRouting;
