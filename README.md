<h1>klltech/baato-js-client</h1>
<p>
  <a href="https://www.npmjs.com/package/@klltech/baato-js-client" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/@klltech/baato-js-client.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> npm package for http://baato.io/

## Installation

Using npm:
```sh
$ npm install --save @klltech/baato-js-client
```

## Features

* Search API
* Reverse Search API
* Places API
* Directions API

## Usage Example

#### Search API

The `Baato.Search()` constructor can be used to make requests to the Search API.

```js
import Baato from "@klltech/baato-js-client";

const search = new Baato.Search()
  .setApiVersion("1") // default
  .setQuery("bal")
  .setKey("YOUR_BAATO_ACCESS_TOKEN")
  .doRequest()
  .then(response => {
    console.log(response); // search response
  });

```

#### Reverse Search API

The `Baato.Reverse()` constructor can be used to make requests to the Reverse Search API.

```js
import Baato from "@klltech/baato-js-client";

const reverse = new Baato.Reverse()
  .setApiVersion("1")  // default
  .setLat(27.7172)
  .setLon(85.324)
  .setKey("YOUR_BAATO_ACCESS_TOKEN")
  .doRequest()
  .then(res => {
    console.log(res); // reverse-search response
  });

```

#### Places API

The `Baato.Place()` constructor can be used to make requests to the Places API.

```js
import Baato from "@klltech/baato-js-client";

const search = new Baato.Places()
  .setApiVersion("1.0") // default
  .setPlaceId("110023")
  .setKey("YOUR_BAATO_ACCESS_TOKEN")
  .doRequest()
  .then(response => {
    console.log(response); // place response
  });

```

#### Directions API

```js
import Baato from "@klltech/baato-js-client";

const points = ["27.71772,85.32784", "27.73449,85.33714"];

const bRouting = new Baato.Routing({
  key: "YOUR_BAATO_ACCESS_TOKEN"
})
  .setApiVersion("1.0")  // default
  .addPoints(points)
  .setVehicle(vehicle)
  .getBest()
  .doRequest()
  .then(response => {
    console.log(response); // directions response
  });

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
