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
 *
 * @export
 * @interface PageJSONWrapper
 */
export interface PageJSONWrapper {
  /**
   *
   * @type {string}
   * @memberof PageJSONWrapper
   */
  format?: PageJSONWrapperFormatEnum;
  /**
   *
   * @type {string}
   * @memberof PageJSONWrapper
   */
  status?: PageJSONWrapperStatusEnum;
  /**
   *
   * @type {Array<string>}
   * @memberof PageJSONWrapper
   */
  sections?: Array<PageJSONWrapperSectionsEnum>;
  /**
   *
   * @type {string}
   * @memberof PageJSONWrapper
   */
  linkText?: string;
  /**
   *
   * @type {string}
   * @memberof PageJSONWrapper
   */
  link?: string;
  /**
   *
   * @type {string}
   * @memberof PageJSONWrapper
   */
  language?: string;
}

/**
 * @export
 * @enum {string}
 */
export enum PageJSONWrapperFormatEnum {
  Link = "LINK",
  Html = "HTML",
  Text = "TEXT",
  Markdown = "MARKDOWN",
  Wiki = "WIKI",
}
/**
 * @export
 * @enum {string}
 */
export enum PageJSONWrapperStatusEnum {
  Public = "PUBLIC",
  PublicOnly = "PUBLIC_ONLY",
  Private = "PRIVATE",
  Hidden = "HIDDEN",
}
/**
 * @export
 * @enum {string}
 */
export enum PageJSONWrapperSectionsEnum {
  All = "ALL",
  Top = "TOP",
  Footer = "FOOTER",
  Menu = "MENU",
  Submenu = "SUBMENU",
  CustomMenu1 = "CUSTOM_MENU1",
  CustomMenu2 = "CUSTOM_MENU2",
  CustomMenu3 = "CUSTOM_MENU3",
  Draft = "DRAFT",
}
