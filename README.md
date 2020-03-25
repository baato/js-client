<h1>klltech/baato-js-client</h1>
<p>
  <a href="https://www.npmjs.com/package/@klltech/baato-js-client" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/@klltech/baato-js-client.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> npm package for https://baato.io

## Installation

Using npm:
```sh
$ npm install --save @klltech/baato-js-client
```

## Features

* Autocomplete
* Forward Geocoding
* Reverse Geocoding
* Direction

## Usage Example

#### Autocomplete

```js
import Baato from '@klltech/baato-js-client';

const autocomplete = new Baato.AutoComplete()
        .setKey('YOUR BAATO TOKEN')
        .setQuery(queryText)
        .doRequest().then(res => {
          // response here
          console.log(res)
        })
```

#### Forward Geocoding

```js
import Baato from '@klltech/baato-js-client';

const search = new Baato.Search()
        .setQuery('Kathmandu')
        .setKey('YOUR BAATO TOKEN')
        .doRequest().then(res => {
          // response here
          console.log(res)
        })
```

Alternatively, the forward geocoding service is also designed to be used in conjunction with the Autocomplete API, so providing a `placeId` from response received in the Autocomplete API is also supported.

```js
import Baato from '@klltech/baato-js-client';

const searchPlaceId = new Baato.Search()
      .setPlaceId(placeId)
      .setKey('YOUR BAATO TOKEN')
      .doRequest().then(res => {
        // response here
        console.log(res)
      })
```

#### Reverse Geocoding

```js
import Baato from '@klltech/baato-js-client';

const reverse = new Baato.Reverse()
       .setLat(27.7172)
       .setLon(85.3240)
       .setKey('YOUR BAATO TOKEN')
       .doRequest()
       .then(res => {
          // response here
          console.log(res)         
        });
```

#### Direction

```js
import Baato from '@klltech/baato-js-client';

const bRouting = new Baato.Routing({
        key: 'YOUR BAATO TOKEN',
      });
      bRouting
        .addPoints(points)
        .setVehicle(vehicle)
        .getBest()
        .doRequest()
        .then(response => {
          // response here
          console.log(response)
        }
```
## Converting into GeoJSON
To get the results in GeoJSON format, use one of our utilities `Baato.Util().getGeoJsonFromSearchResults(res)` and pass the response as argument from one of the above features.

```js
// res is the response
const geojson = new Baato.Util().getGeoJsonFromSearchResults(res);
```

## Author

👤 **Kathmandu Living Labs**


## Show your support

Give a ⭐️ if this project helped you!

***