/* tslint:disable */
/* eslint-disable */
/**
 * GeoNetwork 4.0.6 OpenAPI Documentation
 * This is the description of the GeoNetwork OpenAPI. Use this API to manage your catalog.
 *
 * The version of the OpenAPI document: 4.0.6
 * Contact: geonetwork-users@lists.sourceforge.net
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import globalAxios, {
  AxiosPromise,
  AxiosInstance,
  AxiosRequestConfig,
} from "axios";
import { Configuration } from "../../../configuration";
// Some imports not used depending on template conditions
// @ts-ignore
import {
  DUMMY_BASE_URL,
  assertParamExists,
  setApiKeyToObject,
  setBasicAuthToObject,
  setBearerAuthToObject,
  setOAuthToObject,
  setSearchParams,
  serializeDataIfNeeded,
  toPathString,
  createRequestFunction,
} from "../../../common";
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  RequestArgs,
  BaseAPI,
  RequiredError,
} from "../../../base";
/**
 * HarvestersApi - axios parameter creator
 * @export
 */
export const HarvestersApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     *
     * @summary Assign harvester records to a new source
     * @param {string} harvesterUuid The harvester UUID
     * @param {string} source The target source UUID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assignHarvestedRecordToSource: async (
      harvesterUuid: string,
      source: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'harvesterUuid' is not null or undefined
      assertParamExists(
        "assignHarvestedRecordToSource",
        "harvesterUuid",
        harvesterUuid
      );
      // verify required parameter 'source' is not null or undefined
      assertParamExists("assignHarvestedRecordToSource", "source", source);
      const localVarPath = `/harvesters/{harvesterUuid}/assign`.replace(
        `{${"harvesterUuid"}}`,
        encodeURIComponent(String(harvesterUuid))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "POST",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      if (source !== undefined) {
        localVarQueryParameter["source"] = source;
      }

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @summary Check if a harvester name or host already exist
     * @param {string} property The harvester property to check
     * @param {string} exist The value to search
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    checkHarvesterPropertyExist: async (
      property: string,
      exist: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'property' is not null or undefined
      assertParamExists("checkHarvesterPropertyExist", "property", property);
      // verify required parameter 'exist' is not null or undefined
      assertParamExists("checkHarvesterPropertyExist", "exist", exist);
      const localVarPath = `/harvesters/properties/{property}`.replace(
        `{${"property"}}`,
        encodeURIComponent(String(property))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      if (exist !== undefined) {
        localVarQueryParameter["exist"] = exist;
      }

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * HarvestersApi - functional programming interface
 * @export
 */
export const HarvestersApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator =
    HarvestersApiAxiosParamCreator(configuration);
  return {
    /**
     *
     * @summary Assign harvester records to a new source
     * @param {string} harvesterUuid The harvester UUID
     * @param {string} source The target source UUID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async assignHarvestedRecordToSource(
      harvesterUuid: string,
      source: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.assignHarvestedRecordToSource(
          harvesterUuid,
          source,
          options
        );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
    /**
     *
     * @summary Check if a harvester name or host already exist
     * @param {string} property The harvester property to check
     * @param {string} exist The value to search
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async checkHarvesterPropertyExist(
      property: string,
      exist: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.checkHarvesterPropertyExist(
          property,
          exist,
          options
        );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
  };
};

/**
 * HarvestersApi - factory interface
 * @export
 */
export const HarvestersApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  const localVarFp = HarvestersApiFp(configuration);
  return {
    /**
     *
     * @summary Assign harvester records to a new source
     * @param {string} harvesterUuid The harvester UUID
     * @param {string} source The target source UUID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assignHarvestedRecordToSource(
      harvesterUuid: string,
      source: string,
      options?: any
    ): AxiosPromise<string> {
      return localVarFp
        .assignHarvestedRecordToSource(harvesterUuid, source, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @summary Check if a harvester name or host already exist
     * @param {string} property The harvester property to check
     * @param {string} exist The value to search
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    checkHarvesterPropertyExist(
      property: string,
      exist: string,
      options?: any
    ): AxiosPromise<string> {
      return localVarFp
        .checkHarvesterPropertyExist(property, exist, options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * HarvestersApi - object-oriented interface
 * @export
 * @class HarvestersApi
 * @extends {BaseAPI}
 */
export class HarvestersApi extends BaseAPI {
  /**
   *
   * @summary Assign harvester records to a new source
   * @param {string} harvesterUuid The harvester UUID
   * @param {string} source The target source UUID
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof HarvestersApi
   */
  public assignHarvestedRecordToSource(
    harvesterUuid: string,
    source: string,
    options?: AxiosRequestConfig
  ) {
    return HarvestersApiFp(this.configuration)
      .assignHarvestedRecordToSource(harvesterUuid, source, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @summary Check if a harvester name or host already exist
   * @param {string} property The harvester property to check
   * @param {string} exist The value to search
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof HarvestersApi
   */
  public checkHarvesterPropertyExist(
    property: string,
    exist: string,
    options?: AxiosRequestConfig
  ) {
    return HarvestersApiFp(this.configuration)
      .checkHarvesterPropertyExist(property, exist, options)
      .then((request) => request(this.axios, this.basePath));
  }
}
