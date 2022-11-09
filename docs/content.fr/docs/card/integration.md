---
weight: 30
bookFlatSection: true
title: "Intégration des cartes"
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
Dans l'exemple ci-dessous, ces cinq fichiers ont été intégrés lors du 'build' du catalogue GeoNetwork (au niveau de '/web-ui/src/main/resources/catalog/lib/icho') afin d'être disponibles depuis l'adresse du catalogue source.

{{< hint info >}}
**Référencement des liens vers le code JavaScript et le code de style en cascade des composants web ICHO**  
Cette procédure de référencement des liens JavaScript et CSS est identique pour l'ensemble des composants web ICHO
{{< /hint >}}

## Introduction du composant web avec ces paramètres

```
  <catalogue-results-card
    filter=""
    size="12"
    itemsperrow="3"
    marginx="1"
    marginbottom="1"
    margincardbottom="2"
    margintoolsbottom="2"
    search_placeholder="Recherche libre"
    filterfield="th_Themes_geoportail_wallon_hierarchy.default"
    filterfield_placeholder="Thème"
    filterfield_2="custodianOrgForResource"
    filterfield_2_placeholder="Propriétaire"
    fields='{"imageIndex": "overview", "imageJsonPath":"$[0].url", "titleIndex": "resourceTitleObject", "titleJsonPath":"$.default", "titleSize":"h4", "subTitleIndex": "custodianOrgForResource", "subTitleJsonPath":"", "textIndex": "resourceHookAbstractObject", "textJsonPath":"$.default","linkIndex": "mw-gp-thematicMap", "linkJsonPath":"$[0].url", "linkIcon":"map", "linkButtonColor":"#335500", "linkHook":"Découvrir", "infoIndex":"revisionDateForResource", "infoJsonPath":"$[0]", "additionalInfoIndex":"cl_accessConstraints", "additionalInfoJsonPath":"$[0].key"}'
    fulltextfilter="resourceTitleObject.default, resourceHookAbstractObject.default"
    catalogueurl="https://metawal.wallonie.be/geonetwork/srv"
    sortbylist='{"sortIndexRef":"resourceTitleObject.default.keyword", "sortName":"Titre"} | {"sortIndexRef":"popularity", "sortName":"Popularité"} | {"sortIndexRef":"resourceHookAbstractObject.default.keyword", "sortName":"Résumé"}'
    sorttype="asc"
    sortby="custodianOrgForResource"
    linkmdt="true"
    imageheight="280">
  </catalogue-results-card>
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
    <h1>Test carte de métadonnées</h1>
    <catalogue-results-card
      filter=""
      size="12"
      itemsperrow="3"
      marginx="1"
      marginbottom="1"
      margincardbottom="2"
      margintoolsbottom="2"
      search_placeholder="Recherche libre"
      filterfield="th_Themes_geoportail_wallon_hierarchy.default"
      filterfield_placeholder="Thème"
      filterfield_2="custodianOrgForResource"
      filterfield_2_placeholder="Propriétaire"
      fields='{"imageIndex": "overview", "imageJsonPath":"$[0].url", "titleIndex": "resourceTitleObject", "titleJsonPath":"$.default", "titleSize":"h4", "subTitleIndex": "custodianOrgForResource", "subTitleJsonPath":"", "textIndex": "resourceHookAbstractObject", "textJsonPath":"$.default","linkIndex": "mw-gp-thematicMap", "linkJsonPath":"$[0].url", "linkIcon":"map", "linkButtonColor":"#335500", "linkHook":"Découvrir", "infoIndex":"revisionDateForResource", "infoJsonPath":"$[0]", "additionalInfoIndex":"cl_accessConstraints", "additionalInfoJsonPath":"$[0].key"}'
      fulltextfilter="resourceTitleObject.default, resourceHookAbstractObject.default"
      catalogueurl="https://metawal.wallonie.be/geonetwork/srv"
      sortbylist='{"sortIndexRef":"resourceTitleObject.default.keyword", "sortName":"Titre"} | {"sortIndexRef":"popularity", "sortName":"Popularité"} | {"sortIndexRef":"resourceHookAbstractObject.default.keyword", "sortName":"Résumé"}'
      sorttype="asc"
      sortby="custodianOrgForResource"
      linkmdt="true"
      imageheight="280">
    </catalogue-results-card>
    <script src="https://metawal.wallonie.be/geonetwork/catalog/lib/icho/main.esm.js" type="module"></script>
    <script src="https://metawal.wallonie.be/geonetwork/catalog/lib/icho/polyfills.esm.js" type="module"></script>
    <script src="https://metawal.wallonie.be/geonetwork/catalog/lib/icho/runtime.esm.js" type="module"></script>
 </body>
</html>
```



