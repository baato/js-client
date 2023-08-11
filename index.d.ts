declare namespace Baato {
    // Common Types
    type CommonConstructorProps = {
      key: string;
      baseUrl?: string;
      apiVersion?: string;
    };
  
    abstract class Common<T> {
      setKey(key: string): T;
      setBaseUrl(url: string): T;
      setApiVersion(version: string): T;
    }
  
    // Places API
    interface PlacesProps extends CommonConstructorProps {}
  
    class Places extends Common<Places> {
      constructor(props: PlacesProps);
      setPlaceId(placeId: string): Places;
      doRequest: () => Promise<any> | null;
    }
  
    // Reverse Search API
    interface ReverseProps extends CommonConstructorProps {
      radius: number;
      limit: number;
    }
  
    type ReverseResponseItem = {
      address: string;
      centroid: GeoJSON.LatLon;
      geometry: GeoJSON.GeoJSON;
      name: string;
      osmId: number;
      placeId: number;
      score: string;
      tags: Array<string>;
      type: string;
    };
  
    type ReverseResponse = {
      data: Array<ReverseResponseItem>;
      message: string;
      status: number;
    };
  
    class Reverse extends Common<Reverse> {
      constructor(props?: ReverseProps);
      setCoordinates(coordinates: [number, number]): Reverse;
      setCoordinate(coordinate: GeoJSON.Position): Reverse;
      setRadius(radius: number): Reverse;
      setLimit(limit: number): Reverse;
      doRequest: () => Promise<any> | null;
    }
  
    // Routing API
    interface RoutingProps extends CommonConstructorProps {}
  
    type RoutingResponse = {
      distanceInMeters: number;
      geojson: GeoJSON.GeoJSON;
      instructionList: Array<any> | null;
      timeInMs: number;
    };
  
    class Routing extends Common<Routing> {
      constructor(props: RoutingProps);
      setVehicle(vehicle: string): Routing;
      addPoint(point: GeoJSON.LatLon): Routing;
      getAlternatives(alternatives: boolean): Routing;
      addPoints(point: Array<string>): Routing;
      getBaseUrl(): string;
      getKey(): string;
      includeAlternativeRoutes(): Routing;
      getElevation(elevation:boolean):Routing;
      getBest(): Routing;
      hasInstructions(instructions: boolean): Routing;
      doRequest(): Promise<Array<RoutingResponse>> | null;
    }
  
    // Search API
    interface SearchProps extends CommonConstructorProps {
      query?: string;
    }
  
    type SearchResultItem = {
      address: string;
      name: string;
      placeId: number;
      radialDistanceInKm: number;
      score: number;
      type: string;
    };
  
    type SearchResult = {
      data: Array<SearchResultItem>;
      message: string;
      status: number;
    };
  
    class Search extends Common<Search> {
      constructor(props?: SearchProps);
      setLimit(limit: number): Reverse;
      setQuery(query: string): Search;
      setCoordinates(coordinate: GeoJSON.Position, radius: number): Search;
      doRequest: () => Promise<SearchResult> | null;
    }
  
    // Utils API
  
    class Utils {
      decodePath(encoded: string, is3D: boolean): Array<GeoJSON.Position>;
      getGeoJsonFromEncodedPolyLine(encoded: string): GeoJSON.LineString;
      getGeoJsonFromSearchResults(searchResults): GeoJSON.FeatureCollection;
    }
  }
  
  /**
   * GeoJSON types according to the GeoJSON specs
   */
  declare namespace GeoJSON {
    export type LatLon = {
      lat: number;
      lon: number;
    };
    /**
     * The valid values for the "type" property of GeoJSON geometry objects.
     * https://tools.ietf.org/html/rfc7946#section-1.4
     */
    export type GeoJsonGeometryTypes = Geometry["type"];
  
    /**
     * The value values for the "type" property of GeoJSON Objects.
     * https://tools.ietf.org/html/rfc7946#section-1.4
     */
    export type GeoJsonTypes = GeoJSON["type"];
  
    /**
     * Bounding box
     * https://tools.ietf.org/html/rfc7946#section-5
     */
    export type BBox =
      | [number, number, number, number]
      | [number, number, number, number, number, number];
  
    /**
     * A Position is an array of coordinates.
     * https://tools.ietf.org/html/rfc7946#section-3.1.1
     * Array should contain between two and three elements.
     * The previous GeoJSON specification allowed more elements (e.g., which could be used to represent M values),
     * but the current specification only allows X, Y, and (optionally) Z to be defined.
     */
    export type Position = number[]; // [number, number] | [number, number, number];
  
    /**
     * The base GeoJSON object.
     * https://tools.ietf.org/html/rfc7946#section-3
     * The GeoJSON specification also allows foreign members
     * (https://tools.ietf.org/html/rfc7946#section-6.1)
     * Developers should use "&" type in TypeScript or extend the interface
     * to add these foreign members.
     */
    export interface GeoJsonObject {
      // Don't include foreign members directly into this type def.
      // in order to preserve type safety.
      // [key: string]: any;
      /**
       * Specifies the type of GeoJSON object.
       */
      type: GeoJsonTypes;
      /**
       * Bounding box of the coordinate range of the object's Geometries, Features, or Feature Collections.
       * The value of the bbox member is an array of length 2*n where n is the number of dimensions
       * represented in the contained geometries, with all axes of the most southwesterly point
       * followed by all axes of the more northeasterly point.
       * The axes order of a bbox follows the axes order of geometries.
       * https://tools.ietf.org/html/rfc7946#section-5
       */
      bbox?: BBox | undefined;
    }
  
    /**
     * Union of GeoJSON objects.
     */
    export type GeoJSON = Geometry | Feature | FeatureCollection;
  
    /**
     * Geometry object.
     * https://tools.ietf.org/html/rfc7946#section-3
     */
    export type Geometry =
      | Point
      | MultiPoint
      | LineString
      | MultiLineString
      | Polygon
      | MultiPolygon
      | GeometryCollection;
    export type GeometryObject = Geometry;
  
    /**
     * Point geometry object.
     * https://tools.ietf.org/html/rfc7946#section-3.1.2
     */
    export interface Point extends GeoJsonObject {
      type: "Point";
      coordinates: Position;
    }
  
    /**
     * MultiPoint geometry object.
     *  https://tools.ietf.org/html/rfc7946#section-3.1.3
     */
    export interface MultiPoint extends GeoJsonObject {
      type: "MultiPoint";
      coordinates: Position[];
    }
  
    /**
     * LineString geometry object.
     * https://tools.ietf.org/html/rfc7946#section-3.1.4
     */
    export interface LineString extends GeoJsonObject {
      type: "LineString";
      coordinates: Position[];
    }
  
    /**
     * MultiLineString geometry object.
     * https://tools.ietf.org/html/rfc7946#section-3.1.5
     */
    export interface MultiLineString extends GeoJsonObject {
      type: "MultiLineString";
      coordinates: Position[][];
    }
  
    /**
     * Polygon geometry object.
     * https://tools.ietf.org/html/rfc7946#section-3.1.6
     */
    export interface Polygon extends GeoJsonObject {
      type: "Polygon";
      coordinates: Position[][];
    }
  
    /**
     * MultiPolygon geometry object.
     * https://tools.ietf.org/html/rfc7946#section-3.1.7
     */
    export interface MultiPolygon extends GeoJsonObject {
      type: "MultiPolygon";
      coordinates: Position[][][];
    }
  
    /**
     * Geometry Collection
     * https://tools.ietf.org/html/rfc7946#section-3.1.8
     */
    export interface GeometryCollection extends GeoJsonObject {
      type: "GeometryCollection";
      geometries: Geometry[];
    }
  
    export type GeoJsonProperties = { [name: string]: any } | null;
  
    /**
     * A feature object which contains a geometry and associated properties.
     * https://tools.ietf.org/html/rfc7946#section-3.2
     */
    export interface Feature<
      G extends Geometry | null = Geometry,
      P = GeoJsonProperties
    > extends GeoJsonObject {
      type: "Feature";
      /**
       * The feature's geometry
       */
      geometry: G;
      /**
       * A value that uniquely identifies this feature in a
       * https://tools.ietf.org/html/rfc7946#section-3.2.
       */
      id?: string | number | undefined;
      /**
       * Properties associated with this feature.
       */
      properties: P;
    }
  
    /**
     * A collection of feature objects.
     *  https://tools.ietf.org/html/rfc7946#section-3.3
     */
    export interface FeatureCollection<
      G extends Geometry | null = Geometry,
      P = GeoJsonProperties
    > extends GeoJsonObject {
      type: "FeatureCollection";
      features: Array<Feature<G, P>>;
    }
  }
  
  export default Baato;
  