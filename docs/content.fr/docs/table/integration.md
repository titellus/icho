---
weight: 30
bookFlatSection: true
title: "Intégration d'un tableau"
---

# Intégration
On distingue deux blocs de code à intégrer dans un site tier (page html) :
- liens vers les fichiers JavaScript et css d'ICHO
- composant web avec l'ensemble de ces paramètres

## Référencement des liens JavaScript et CSS

Deux fichiers CSS doivent être référencés dans le code html.

```
<link href="https://metawal.wallonie.be/geonetwork/catalog/lib/icho/styles.css" rel="stylesheet" />
<link href="https://metawal.wallonie.be/geonetwork/catalog/lib/icho/main.css" rel="stylesheet" />
```
Trois fichiers JavaScript sont à référencer dans le code html.

```
<script src="https://metawal.wallonie.be/geonetwork/catalog/lib/icho/runtime.esm.js"  type="module">
</script><script src="https://metawal.wallonie.be/geonetwork/catalog/lib/icho/polyfills.esm.js" type="module">
</script><script src="https://metawal.wallonie.be/geonetwork/catalog/lib/icho/main.esm.js" type="module"></script>
```
Les adresses sont à modifier selon l'adresse de mise à disposition des scripts ICHO.
Dans l'exemple ci-dessous, ces cinq fichiers ont été intégrés lors du 'build' du catalogue GeoNetwork (au niveau de Dans l'exemple ci-dessous, ces cinq fichiers ont été intégrés lors du 'build' du catalogue GeoNetwork (au niveau de '/web-ui/src/main/resources/catalog/lib/icho') afin d'être disponibles depuis l'adresse du catalogue source.

{{< hint info >}}
**Référencement des liens vers le code JavaScript et le code de style en cascade des composants web ICHO**  
Cette procédure de référencement des liens JavaScript et CSS est identique pour l'ensemble des composants web ICHO
{{< /hint >}}

## Introduction du composant web avec ces paramètres

```
    <catalogue-results-table
      catalogueurl="https://metawal4.test.wallonie.be/geonetwork/srv"
      fields='{"columnName":"Nom de la donnée","columnIndex":"resourceTitleObject","columnJsonPath":"$.langfre"} |
      {"columnName":"Nom de la donnée","columnIndex":"overview","columnJsonPath":"$[0].url"} |
      {"columnName":"Type","columnIndex":"resourceType","columnJsonPath":"$[0]","columnWidth":"1"} |
      {"columnName":"Nom physique","columnIndex":"mw-gp-localIdentifier","columnJsonPath":"","columnWidth":"4"} |
      {"columnName":"Statut","columnIndex":"cl_status","columnJsonPath":"$[0].langfre","columnWidth":"1"} |
      {"columnName":"Note","columnIndex":"supplementalInformationObject","columnJsonPath":"$[0].langfre"} |
      {"columnName":"Modèle et légende","columnIndex":"related","columnJsonPath":"$.onlines[?(@.function==\"featureCatalogue\")].url.fre","columnIcon":"th"} |
      {"columnName":"Modèle et légende","columnIndex":"related","columnJsonPath":"$.onlines[?(@.function==\"legend\")].url.fre","columnIcon":"paint brush"} |
      {"columnName":"Consulter (applications et services)","columnIndex":"mw-gp-thematicMap","columnJsonPath":"$[*].url","columnIcon":"map"} |
      {"columnName":"Consulter (applications et services)","columnIndex":"mw-gp-allWebServices","columnJsonPath":"$[*].url","columnIcon":"world"} |
      {"columnName":"Crédits","columnIndex":"resourceCreditObject","columnJsonPath":"$[0].langfre"}'
      filter="+(resourceType:dataset or resourceType:series) -(th_infraSIG.default:Reporting INSPIRE) -(cl_status.key:obsolete) +(custodianOrgForResource:*SPW*)"
      filterfield="th_Themes_geoportail_wallon_hierarchy.default"
      size="10"
      sortby="mw-gp-localIdentifier"
      sorttype="asc"
      togglefilterfield="mw-gp-localIdentifierCodespace"
      toggleismultiselect="true"
      togglelabel='{"label": "GINET", "value": "BE.SPW.INFRASIG.GINET"} | {"label": "CARTON", "value": "BE.SPW.INFRASIG.CARTON"}'>
    </catalogue-results-table>
```

## Example complet d'intégration dans une page html basique

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Webcomponents demo</title>
    <base href="/RW/">
    <meta content="width=device-width, initial-scale=1" name="viewport" />
  <link rel="stylesheet" href="https://metawal4.test.wallonie.be/geonetwork/catalog/lib/icho/styles.css">
  <link rel="stylesheet" href="https://metawal4.test.wallonie.be/geonetwork/catalog/lib/icho/main.css"></head>
  <body>
    <h1>Test table de métadonnées</h1>
    <catalogue-results-table
      catalogueurl="https://metawal4.test.wallonie.be/geonetwork/srv"
      fields='{"columnName":"Nom de la donnée","columnIndex":"resourceTitleObject","columnJsonPath":"$.langfre"} |
      {"columnName":"Nom de la donnée","columnIndex":"overview","columnJsonPath":"$[0].url"} |
      {"columnName":"Type","columnIndex":"resourceType","columnJsonPath":"$[0]","columnWidth":"1"} |
      {"columnName":"Nom physique","columnIndex":"mw-gp-localIdentifier","columnJsonPath":"","columnWidth":"4"} |
      {"columnName":"Statut","columnIndex":"cl_status","columnJsonPath":"$[0].langfre","columnWidth":"1"} |
      {"columnName":"Note","columnIndex":"supplementalInformationObject","columnJsonPath":"$[0].langfre"} |
      {"columnName":"Modèle et légende","columnIndex":"related","columnJsonPath":"$.onlines[?(@.function==\"featureCatalogue\")].url.fre","columnIcon":"th"} |
      {"columnName":"Modèle et légende","columnIndex":"related","columnJsonPath":"$.onlines[?(@.function==\"legend\")].url.fre","columnIcon":"paint brush"} |
      {"columnName":"Consulter (applications et services)","columnIndex":"mw-gp-thematicMap","columnJsonPath":"$[*].url","columnIcon":"map"} |
      {"columnName":"Consulter (applications et services)","columnIndex":"mw-gp-allWebServices","columnJsonPath":"$[*].url","columnIcon":"world"} |
      {"columnName":"Crédits","columnIndex":"resourceCreditObject","columnJsonPath":"$[0].langfre"}'
      filter="+(resourceType:dataset or resourceType:series) -(th_infraSIG.default:Reporting INSPIRE) -(cl_status.key:obsolete) +(custodianOrgForResource:*SPW*)"
      filterfield="th_Themes_geoportail_wallon_hierarchy.default"
      size="10"
      sortby="mw-gp-localIdentifier"
      sorttype="asc"
      togglefilterfield="mw-gp-localIdentifierCodespace"
      toggleismultiselect="true"
      togglelabel='{"label": "GINET", "value": "BE.SPW.INFRASIG.GINET"} | {"label": "CARTON", "value": "BE.SPW.INFRASIG.CARTON"}'>
    </catalogue-results-table>
    <script src="https://metawal.wallonie.be/geonetwork/catalog/lib/icho/main.esm.js" type="module"></script>
    <script src="https://metawal.wallonie.be/geonetwork/catalog/lib/icho/polyfills.esm.js" type="module"></script>
    <script src="https://metawal.wallonie.be/geonetwork/catalog/lib/icho/runtime.esm.js" type="module"></script>
 </body>
</html>
```



