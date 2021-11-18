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
// @ts-ignore
import { PageLink } from "../../..//geonetwork-openapi/model";
// @ts-ignore
import { SimpleMetadataProcessingReport } from "../../..//geonetwork-openapi/model";
/**
 * LinksApi - axios parameter creator
 * @export
 */
export const LinksApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     * One of uuids or bucket parameter is required if not an Administrator. Only records that you can edit will be validated.
     * @summary Analyze records links
     * @param {Array<string>} [uuids] Record UUIDs. If null current selection is used.
     * @param {string} [bucket] Selection bucket name
     * @param {boolean} [removeFirst] Only allowed if Administrator.
     * @param {boolean} [analyze]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    analyzeRecordLinks: async (
      uuids?: Array<string>,
      bucket?: string,
      removeFirst?: boolean,
      analyze?: boolean,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/records/links`;
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

      if (uuids) {
        localVarQueryParameter["uuids"] = uuids;
      }

      if (bucket !== undefined) {
        localVarQueryParameter["bucket"] = bucket;
      }

      if (removeFirst !== undefined) {
        localVarQueryParameter["removeFirst"] = removeFirst;
      }

      if (analyze !== undefined) {
        localVarQueryParameter["analyze"] = analyze;
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
     * @summary Get record links
     * @param {object} [filter] Filter, e.g. \&quot;{url: \&#39;png\&#39;, lastState: \&#39;ko\&#39;, records: \&#39;e421\&#39;, groupId: 12}\&quot;, lastState being \&#39;ok\&#39;/\&#39;ko\&#39;/\&#39;unknown\&#39;
     * @param {Array<number>} [groupIdFilter] Optional, filter links to records published in that group.
     * @param {Array<number>} [groupOwnerIdFilter] Optional, filter links to records created in that group.
     * @param {number} [page] Results page you want to retrieve (0..N)
     * @param {number} [size] Number of records per page.
     * @param {string} [sort] Sorting criteria in the format: property(,asc|desc). Default sort order is ascending.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getRecordLinks: async (
      filter?: object,
      groupIdFilter?: Array<number>,
      groupOwnerIdFilter?: Array<number>,
      page?: number,
      size?: number,
      sort?: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/records/links`;
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

      if (filter !== undefined) {
        localVarQueryParameter["filter"] = filter;
      }

      if (groupIdFilter) {
        localVarQueryParameter["groupIdFilter"] = groupIdFilter;
      }

      if (groupOwnerIdFilter) {
        localVarQueryParameter["groupOwnerIdFilter"] = groupOwnerIdFilter;
      }

      if (page !== undefined) {
        localVarQueryParameter["page"] = page;
      }

      if (size !== undefined) {
        localVarQueryParameter["size"] = size;
      }

      if (sort !== undefined) {
        localVarQueryParameter["sort"] = sort;
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
     * Get record links as CSV
     * @param {object} [filter] Filter, e.g. \&quot;{url: \&#39;png\&#39;, lastState: \&#39;ko\&#39;, records: \&#39;e421\&#39;, groupId: 12}\&quot;, lastState being \&#39;ok\&#39;/\&#39;ko\&#39;/\&#39;unknown\&#39;
     * @param {Array<number>} [groupIdFilter] Optional, filter links to records published in that group.
     * @param {Array<number>} [groupOwnerIdFilter] Optional, filter links to records created in that group.
     * @param {number} [page] Results page you want to retrieve (0..N)
     * @param {number} [size] Number of records per page.
     * @param {string} [sort] Sorting criteria in the format: property(,asc|desc). Default sort order is ascending.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getRecordLinksAsCsv: async (
      filter?: object,
      groupIdFilter?: Array<number>,
      groupOwnerIdFilter?: Array<number>,
      page?: number,
      size?: number,
      sort?: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/records/links/csv`;
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

      if (filter !== undefined) {
        localVarQueryParameter["filter"] = filter;
      }

      if (groupIdFilter) {
        localVarQueryParameter["groupIdFilter"] = groupIdFilter;
      }

      if (groupOwnerIdFilter) {
        localVarQueryParameter["groupOwnerIdFilter"] = groupOwnerIdFilter;
      }

      if (page !== undefined) {
        localVarQueryParameter["page"] = page;
      }

      if (size !== undefined) {
        localVarQueryParameter["size"] = size;
      }

      if (sort !== undefined) {
        localVarQueryParameter["sort"] = sort;
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
     * @summary Remove all links and status history
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    purgeAll: async (
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/records/links`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "DELETE",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

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
 * LinksApi - functional programming interface
 * @export
 */
export const LinksApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator = LinksApiAxiosParamCreator(configuration);
  return {
    /**
     * One of uuids or bucket parameter is required if not an Administrator. Only records that you can edit will be validated.
     * @summary Analyze records links
     * @param {Array<string>} [uuids] Record UUIDs. If null current selection is used.
     * @param {string} [bucket] Selection bucket name
     * @param {boolean} [removeFirst] Only allowed if Administrator.
     * @param {boolean} [analyze]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async analyzeRecordLinks(
      uuids?: Array<string>,
      bucket?: string,
      removeFirst?: boolean,
      analyze?: boolean,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<SimpleMetadataProcessingReport>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.analyzeRecordLinks(
          uuids,
          bucket,
          removeFirst,
          analyze,
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
     * @summary Get record links
     * @param {object} [filter] Filter, e.g. \&quot;{url: \&#39;png\&#39;, lastState: \&#39;ko\&#39;, records: \&#39;e421\&#39;, groupId: 12}\&quot;, lastState being \&#39;ok\&#39;/\&#39;ko\&#39;/\&#39;unknown\&#39;
     * @param {Array<number>} [groupIdFilter] Optional, filter links to records published in that group.
     * @param {Array<number>} [groupOwnerIdFilter] Optional, filter links to records created in that group.
     * @param {number} [page] Results page you want to retrieve (0..N)
     * @param {number} [size] Number of records per page.
     * @param {string} [sort] Sorting criteria in the format: property(,asc|desc). Default sort order is ascending.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getRecordLinks(
      filter?: object,
      groupIdFilter?: Array<number>,
      groupOwnerIdFilter?: Array<number>,
      page?: number,
      size?: number,
      sort?: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<PageLink>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getRecordLinks(
        filter,
        groupIdFilter,
        groupOwnerIdFilter,
        page,
        size,
        sort,
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
     * Get record links as CSV
     * @param {object} [filter] Filter, e.g. \&quot;{url: \&#39;png\&#39;, lastState: \&#39;ko\&#39;, records: \&#39;e421\&#39;, groupId: 12}\&quot;, lastState being \&#39;ok\&#39;/\&#39;ko\&#39;/\&#39;unknown\&#39;
     * @param {Array<number>} [groupIdFilter] Optional, filter links to records published in that group.
     * @param {Array<number>} [groupOwnerIdFilter] Optional, filter links to records created in that group.
     * @param {number} [page] Results page you want to retrieve (0..N)
     * @param {number} [size] Number of records per page.
     * @param {string} [sort] Sorting criteria in the format: property(,asc|desc). Default sort order is ascending.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getRecordLinksAsCsv(
      filter?: object,
      groupIdFilter?: Array<number>,
      groupOwnerIdFilter?: Array<number>,
      page?: number,
      size?: number,
      sort?: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.getRecordLinksAsCsv(
          filter,
          groupIdFilter,
          groupOwnerIdFilter,
          page,
          size,
          sort,
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
     * @summary Remove all links and status history
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async purgeAll(
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.purgeAll(
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
 * LinksApi - factory interface
 * @export
 */
export const LinksApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  const localVarFp = LinksApiFp(configuration);
  return {
    /**
     * One of uuids or bucket parameter is required if not an Administrator. Only records that you can edit will be validated.
     * @summary Analyze records links
     * @param {Array<string>} [uuids] Record UUIDs. If null current selection is used.
     * @param {string} [bucket] Selection bucket name
     * @param {boolean} [removeFirst] Only allowed if Administrator.
     * @param {boolean} [analyze]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    analyzeRecordLinks(
      uuids?: Array<string>,
      bucket?: string,
      removeFirst?: boolean,
      analyze?: boolean,
      options?: any
    ): AxiosPromise<SimpleMetadataProcessingReport> {
      return localVarFp
        .analyzeRecordLinks(uuids, bucket, removeFirst, analyze, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @summary Get record links
     * @param {object} [filter] Filter, e.g. \&quot;{url: \&#39;png\&#39;, lastState: \&#39;ko\&#39;, records: \&#39;e421\&#39;, groupId: 12}\&quot;, lastState being \&#39;ok\&#39;/\&#39;ko\&#39;/\&#39;unknown\&#39;
     * @param {Array<number>} [groupIdFilter] Optional, filter links to records published in that group.
     * @param {Array<number>} [groupOwnerIdFilter] Optional, filter links to records created in that group.
     * @param {number} [page] Results page you want to retrieve (0..N)
     * @param {number} [size] Number of records per page.
     * @param {string} [sort] Sorting criteria in the format: property(,asc|desc). Default sort order is ascending.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getRecordLinks(
      filter?: object,
      groupIdFilter?: Array<number>,
      groupOwnerIdFilter?: Array<number>,
      page?: number,
      size?: number,
      sort?: string,
      options?: any
    ): AxiosPromise<PageLink> {
      return localVarFp
        .getRecordLinks(
          filter,
          groupIdFilter,
          groupOwnerIdFilter,
          page,
          size,
          sort,
          options
        )
        .then((request) => request(axios, basePath));
    },
    /**
     * Get record links as CSV
     * @param {object} [filter] Filter, e.g. \&quot;{url: \&#39;png\&#39;, lastState: \&#39;ko\&#39;, records: \&#39;e421\&#39;, groupId: 12}\&quot;, lastState being \&#39;ok\&#39;/\&#39;ko\&#39;/\&#39;unknown\&#39;
     * @param {Array<number>} [groupIdFilter] Optional, filter links to records published in that group.
     * @param {Array<number>} [groupOwnerIdFilter] Optional, filter links to records created in that group.
     * @param {number} [page] Results page you want to retrieve (0..N)
     * @param {number} [size] Number of records per page.
     * @param {string} [sort] Sorting criteria in the format: property(,asc|desc). Default sort order is ascending.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getRecordLinksAsCsv(
      filter?: object,
      groupIdFilter?: Array<number>,
      groupOwnerIdFilter?: Array<number>,
      page?: number,
      size?: number,
      sort?: string,
      options?: any
    ): AxiosPromise<void> {
      return localVarFp
        .getRecordLinksAsCsv(
          filter,
          groupIdFilter,
          groupOwnerIdFilter,
          page,
          size,
          sort,
          options
        )
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @summary Remove all links and status history
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    purgeAll(options?: any): AxiosPromise<string> {
      return localVarFp
        .purgeAll(options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * LinksApi - object-oriented interface
 * @export
 * @class LinksApi
 * @extends {BaseAPI}
 */
export class LinksApi extends BaseAPI {
  /**
   * One of uuids or bucket parameter is required if not an Administrator. Only records that you can edit will be validated.
   * @summary Analyze records links
   * @param {Array<string>} [uuids] Record UUIDs. If null current selection is used.
   * @param {string} [bucket] Selection bucket name
   * @param {boolean} [removeFirst] Only allowed if Administrator.
   * @param {boolean} [analyze]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof LinksApi
   */
  public analyzeRecordLinks(
    uuids?: Array<string>,
    bucket?: string,
    removeFirst?: boolean,
    analyze?: boolean,
    options?: AxiosRequestConfig
  ) {
    return LinksApiFp(this.configuration)
      .analyzeRecordLinks(uuids, bucket, removeFirst, analyze, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @summary Get record links
   * @param {object} [filter] Filter, e.g. \&quot;{url: \&#39;png\&#39;, lastState: \&#39;ko\&#39;, records: \&#39;e421\&#39;, groupId: 12}\&quot;, lastState being \&#39;ok\&#39;/\&#39;ko\&#39;/\&#39;unknown\&#39;
   * @param {Array<number>} [groupIdFilter] Optional, filter links to records published in that group.
   * @param {Array<number>} [groupOwnerIdFilter] Optional, filter links to records created in that group.
   * @param {number} [page] Results page you want to retrieve (0..N)
   * @param {number} [size] Number of records per page.
   * @param {string} [sort] Sorting criteria in the format: property(,asc|desc). Default sort order is ascending.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof LinksApi
   */
  public getRecordLinks(
    filter?: object,
    groupIdFilter?: Array<number>,
    groupOwnerIdFilter?: Array<number>,
    page?: number,
    size?: number,
    sort?: string,
    options?: AxiosRequestConfig
  ) {
    return LinksApiFp(this.configuration)
      .getRecordLinks(
        filter,
        groupIdFilter,
        groupOwnerIdFilter,
        page,
        size,
        sort,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Get record links as CSV
   * @param {object} [filter] Filter, e.g. \&quot;{url: \&#39;png\&#39;, lastState: \&#39;ko\&#39;, records: \&#39;e421\&#39;, groupId: 12}\&quot;, lastState being \&#39;ok\&#39;/\&#39;ko\&#39;/\&#39;unknown\&#39;
   * @param {Array<number>} [groupIdFilter] Optional, filter links to records published in that group.
   * @param {Array<number>} [groupOwnerIdFilter] Optional, filter links to records created in that group.
   * @param {number} [page] Results page you want to retrieve (0..N)
   * @param {number} [size] Number of records per page.
   * @param {string} [sort] Sorting criteria in the format: property(,asc|desc). Default sort order is ascending.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof LinksApi
   */
  public getRecordLinksAsCsv(
    filter?: object,
    groupIdFilter?: Array<number>,
    groupOwnerIdFilter?: Array<number>,
    page?: number,
    size?: number,
    sort?: string,
    options?: AxiosRequestConfig
  ) {
    return LinksApiFp(this.configuration)
      .getRecordLinksAsCsv(
        filter,
        groupIdFilter,
        groupOwnerIdFilter,
        page,
        size,
        sort,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @summary Remove all links and status history
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof LinksApi
   */
  public purgeAll(options?: AxiosRequestConfig) {
    return LinksApiFp(this.configuration)
      .purgeAll(options)
      .then((request) => request(this.axios, this.basePath));
  }
}
