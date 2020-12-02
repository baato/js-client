<h1>@klltech/baato-js-client</h1>

<p>
  <a href="https://www.npmjs.com/package/@klltech/baato-js-client" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/@klltech/baato-js-client.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-green.svg" />
  </a>
</p>

> Client library for easily integrating [Baato.io](http://baato.io/)'s services into your project

## Installation

Using npm:

```sh
$ npm install --save @klltech/baato-js-client
```

## Features

The Baato JavaScript client library makes it easy to integrate the [Baato API](https://baato.io) into existing web-based front-end projects. This package acts as a wrapper for the following Baato services:

* [Search API](https://docs.baato.io/#/v1/services/search)
* [Reverse Search API](https://docs.baato.io/#/v1/services/reverse)
* [Places API](https://docs.baato.io/#/v1/services/places)
* [Directions API](https://docs.baato.io/#/v1/services/directions)

## Usage

### Search API

The `Baato.Search()` constructor can be used to make requests to the Search API.

```js
import Baato from "@klltech/baato-js-client";

const search = new Baato.Search()
  .setApiVersion("1.0")  // default
  .setBaseUrl(`https://api.baato.io/api`) // detault Baato base URL
  .setKey("YOUR_BAATO_ACCESS_TOKEN")
  .setQuery("kathmandu") // string query to search for
  .setLimit(5) // limit the number of responses
  .doRequest()
  .then(response => {
    console.log(response); // search response
  });

```

### Reverse Search API

The `Baato.Reverse()` constructor can be used to make requests to the Reverse Search API.

```js
import Baato from "@klltech/baato-js-client";

const reverse = new Baato.Reverse()
  .setApiVersion("1.0")  // default
  .setBaseUrl(`https://api.baato.io/api`) // detault Baato base URL
  .setKey("YOUR_BAATO_ACCESS_TOKEN")
  .setCoordinates([latitude, longitude]) // coordinates to reverse geocode
  .setLimit(5) // limit the number of responses  
  .doRequest()
  .then(res => {
    console.log(res); // reverse-search response
  });

```

### Places API

The `Baato.Places()` constructor can be used to make requests to the Places API.

```js
import Baato from "@klltech/baato-js-client";

const search = new Baato.Places()
  .setApiVersion("1.0")  // default
  .setBaseUrl(`https://api.baato.io/api`) // detault Baato base URL
  .setKey("YOUR_BAATO_ACCESS_TOKEN")
  .setPlaceId("110023")
  .doRequest()
  .then(response => {
    console.log(response); // place response
  });

```

### Directions API


For getting single best route.
```js
import Baato from "@klltech/baato-js-client";

const points = ["27.71772,85.32784", "27.73449,85.33714"];

const bRouting = new Baato.Routing({
  key: "YOUR_BAATO_ACCESS_TOKEN"
})
  .setApiVersion("1.0")  // default
  .setBaseUrl(`https://api.baato.io/api`) // detault Baato base URL
  .setKey("YOUR_BAATO_ACCESS_TOKEN")
  .addPoints(points) // points for which route is to be calculated
  .setVehicle("car") // one of car, bike, or foot
  .getBest()
  .doRequest()
  .then(response => {
    console.log(response); // directions response
  });
```

For also including alternative routes. Only supports two points. Adding more than two points will return in an error response.
```js
import Baato from "@klltech/baato-js-client";

const points = ["27.71772,85.32784", "27.73449,85.33714"];

const bRouting = new Baato.Routing({
  key: "YOUR_BAATO_ACCESS_TOKEN"
})
  .setApiVersion("1.0")  // default
  .setBaseUrl(`https://api.baato.io/api`) // detault Baato base URL
  .setKey("YOUR_BAATO_ACCESS_TOKEN")
  .addPoints(points)
  .setVehicle("car") // one of car. bike, or foot
  .getAlternatives()
  .doRequest()
  .then(response => {
    console.log(response); // directions response
  });

```

### Converting into GeoJSON
To get the results in GeoJSON format, use one of our utilities `Baato.Util().getGeoJsonFromSearchResults(res)` and pass the response as argument from one of the above features.

```js
// res is the response
const geojson = new Baato.Util().getGeoJsonFromSearchResults(res);
```
