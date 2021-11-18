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

import { Description } from "./description";
import { MultilingualValue } from "./multilingual-value";

/**
 *
 * @export
 * @interface RelatedMetadataItem
 */
export interface RelatedMetadataItem {
  /**
   *
   * @type {string}
   * @memberof RelatedMetadataItem
   */
  id?: string;
  /**
   *
   * @type {MultilingualValue}
   * @memberof RelatedMetadataItem
   */
  url?: MultilingualValue;
  /**
   *
   * @type {string}
   * @memberof RelatedMetadataItem
   */
  type?: string;
  /**
   *
   * @type {MultilingualValue}
   * @memberof RelatedMetadataItem
   */
  title: MultilingualValue;
  /**
   *
   * @type {Description}
   * @memberof RelatedMetadataItem
   */
  description: Description;
  /**
   *
   * @type {Array<string>}
   * @memberof RelatedMetadataItem
   */
  mdType: Array<string>;
  /**
   *
   * @type {string}
   * @memberof RelatedMetadataItem
   */
  origin?: string;
}
