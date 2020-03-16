
/* eslint no-bitwise: ["off"] */
/* eslint no-plusplus: ["off"] */
class BaatoUtil {
    decodePath(encoded, is3D) { //eslint-disable-line
        const len = encoded.length
        let index = 0
        const array = []
        let lat = 0
        let lng = 0
        let ele = 0

        while (index < len) {
            let b
            let shift = 0
            let result = 0
            do {
                b = encoded.charCodeAt(index++) - 63
                result |= (b & 0x1f) << shift
                shift += 5
            } while (b >= 0x20)
            const deltaLat = ((result & 1) ? ~(result >> 1) : (result >> 1))
            lat += deltaLat

            shift = 0
            result = 0
            do {
                b = encoded.charCodeAt(index++) - 63
                result |= (b & 0x1f) << shift
                shift += 5
            } while (b >= 0x20)
            const deltaLon = ((result & 1) ? ~(result >> 1) : (result >> 1))
            lng += deltaLon

            if (is3D) {
                // elevation
                shift = 0
                result = 0
                do {
                    b = encoded.charCodeAt(index++) - 63
                    result |= (b & 0x1f) << shift
                    shift += 5
                } while (b >= 0x20)
                const deltaEle = ((result & 1) ? ~(result >> 1) : (result >> 1))
                ele += deltaEle
                array.push([lng * 1e-5, lat * 1e-5, ele / 100])
            } else { array.push([lng * 1e-5, lat * 1e-5]) }
        }
        // var end = new Date().getTime();
        // console.log("decoded " + len + " coordinates in " + ((end - start) / 1000) + "s");
        return array
    }

    getGeoJsonFromEncodedPolyLine(encoded) {
        return {
            type: 'LineString',
            coordinates: this.decodePath(encoded, false),
        }
    }

    getGeoJsonFromSearchResults(searchResults) { //eslint-disable-line

        const createFeature = item => ({
            type: 'Feature',
            properties: {
                name: item.name,
                address: item.address,
                tags: item.tags,
                classification: item.classification,
                type: item.type,
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    item.centroid.lon,
                    item.centroid.lat,
                ],
            },
        })

        const features = searchResults.data.map(result => createFeature(result))


        return {
            type: 'FeatureCollection',
            features,
        }
    }
}


export default BaatoUtil
