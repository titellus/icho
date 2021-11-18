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

/**
 * The new password and a valid change key
 * @export
 * @interface PasswordUpdateParameter
 */
export interface PasswordUpdateParameter {
  /**
   *
   * @type {string}
   * @memberof PasswordUpdateParameter
   */
  password?: string;
  /**
   *
   * @type {string}
   * @memberof PasswordUpdateParameter
   */
  changeKey?: string;
}
