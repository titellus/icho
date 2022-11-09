---
weight: 20
bookFlatSection: true
title: "Configuration des cartes"
---


# Le composant web "cartes de métadonnées"

Une balise html de type `<catalogue-results-card [parameters]></catalogue-results-card>` est utilisée dans
le code html afin d'introduire le composant web.
Plusieurs paramètres sont à introduire au niveau de cette balise afin de compléter la configuration du composant web.

Attention, il est nécessaire d'introduire des références vers le code JavaScript et les feuilles de
style en cascade d'ICHO afin d'afficher les résultats d'une recherche via ce composant web.


# Configuration du composant web "cartes de métadonnées"

Le schema ci-dessous illustre les éléments définisant le composant.

![table_schema.png](../images/card_schema.png)

Plusieurs paramètres sont utilisés pour définir cette affichage du tableau de métadonnées.
Les paragraphes suivants décrivent ces différents paramètres :


| Idenfiant  | Zone                                | Obligatoire |
|------------|-------------------------------------|--|
| catalogueurl | Paramètre global                    | x |
| filter     | Paramètre global                    |  |
| fulltextfilter           | Zone de recherche                   |  |
| search_placeholder     | Zone de recherche                   |  |
| Filterfield     | Zone de recherche                   |  |
| filterfield_placeholder     | Zone de recherche                   |  |
| filterfield_2     | Zone de recherche                   |  |
| filterfield_2_placeholder     | Zone de recherche                   |  |
| sortbylist     | Zone de préseantion des métadonnées |  |
| sortType     | Zone de préseantion des métadonnées |  |
| fields     | Zone de préseantion des métadonnées | x |
| size     | Zone de préseantion des métadonnées |  |
| itemsperrow     | Zone de préseantion des métadonnées |  |
| marginx     | Zone de préseantion des métadonnées |  |
| margintoolsbottom     | Zone de préseantion des métadonnées |  |
| marginbottom     | Zone de préseantion des métadonnées |  |
| margincardbottom     | Zone de préseantion des métadonnées |  |
| imageheight     | Zone de préseantion des métadonnées |  |

## Configuration du catalogue et de la recherche

-	***catalogueurl*** (obligatoire): adresse du catalogue à interroger

Exemple :

  ```
  <catalogue-results-card
    ...
    catalogueurl="https://metawal.wallonie.be/geonetwork/srv"
    ...>
  </catalogue-results-card>
  ```
-	***filter***: nom du champ de l’index qui servira de filtre pour la recherche ou requête de type Lucene afin d’affiner le filtre

Exemple :

  ```
  <catalogue-results-card
    ...
    filter="+(resourceType:application) -(th_infraSIG.default:Reporting_INSPIRE) -(cl_status.key:obsolete)"
    ...>
  </catalogue-results-card>
  ```

-	***sortby***: nom du champ de l’index qui sert d’élément de tri pour la recherche

Exemple :

  ```
  <catalogue-results-card
    ...
    sortby="custodianOrgForResource"
    ...>
  </catalogue-results-card>
  ```


## Configuration de la zone de recherche utilisateur

La barre de recherche peut contenir quatre zones permettant d'affiner la recherche sur base de sélections 
opérées par l'utilisateur.
![mapSotre_searchArea_schema.png](../images/mapSotre_searchArea_schema.png)

### Zone "Search"
-	***fulltextfilter*** : nom du champ de l'index qui sont utilisés pour la recherche de type 'fulltext'
-	***search_placeholder*** : texte affiché au niveau de la zone de recherche

Exemple :

  ```
  <catalogue-results-card
    ...
    fulltextfilter="resourceTitleObject.default, resourceHookAbstractObject.default"
    search_placeholder="Recherche libre"
    ...>
  </catalogue-results-card>
  ```

### Zone "Filterfield"
-	***filterfield*** : nom du champ de l'index qui peut-être utilisé par l'utilisateur pour filtrer les résultats
-	***filterfield_placeholder*** : texte affiché au niveau de la zone de ce filtre

Exemple :

  ```
  <catalogue-results-card
    ...
    filterfield="th_Themes_geoportail_wallon_hierarchy.default"
    filterfield_placeholder="Thème"
    ...>
  </catalogue-results-card>
  ```

### Zone "Filterfield_2"
-	***filterfield_2*** : nom du champ de l'index qui peut-être utiliser par l'utilisateur pour filter pour les résultats
-	***filterfield_2_placeholder*** : texte affiché au niveau de la zone de ce filtre

Exemple :

  ```
  <catalogue-results-card
    ...
    filterfield_2="custodianOrgForResource"
    filterfield_2_placeholder="Propriétaire"
    ...>
  </catalogue-results-card>
  ```

### Zone "Sort"
- ***sortbylist*** : définition du tri pour les résultats de la recherche, composé d'objets json séparés par des '|' et présentant des couples de valeurs
  - *sortIndexRef* : nom du champ de l'index sur lequel est effectué le tri
  -	*sortName* : texte affiché au niveau de la zone de tri
- ***sorttype*** : définition du type de tri. Valeur autorisée : “asc” ou “desc”

Exemple :

  ```
  <catalogue-results-card
    ...
    sortbylist='{"sortIndexRef":"resourceTitleObject.default.keyword", "sortName":"Titre"} |
     {"sortIndexRef":"popularity", "sortName":"Popularité"} |
     {"sortIndexRef":"resourceHookAbstractObject.default.keyword", "sortName":"Résumé"}'
    sorttype="asc"   
    ...>
  </catalogue-results-card>
  ```

## Configuration des cartes de métadonnées

![mapStore_cardArea_schema.png](../images/mapStore_cardArea_schema.png)

On distingue deux groupes de paramètres :
- paramètres liés aux informations fournies par la carte
- paramètres liés à l'organisation des cartes

### Paramètres liés aux informations fournies par la carte de métadonnées
Les paramètres de cette zone sont:

- ***fields***:  ce paramètre regroupe sous forme d’un object json les informations relatives aux champs des index à intégrer 
dans la carte au niveau des zones pré-définies (Title, SubTitle, Text,...). 
Plusieurs paramètres sont utilisés :
  - *imageIndex*: nom du champ de l’index pour la zone “Image”
  -	*imageJsonPath* (string): chemin vers la valeur du champ de l’index (un path de type [jsonpath](https://github.com/dchester/jsonpath)
  -	*titleIndex*: nom du champ de l’index pour la zone “Title”
  -	*titleJsonPath* (string): chemin vers la valeur du champ de l’index (un path de type [jsonpath](https://github.com/dchester/jsonpath)
  -	*titleSize*: taille de caractère de la zone title (h1,h2,h3,h4)
  -	*subTitleIndex*: nom du champ de l’index pour la zone “SubTitle”
  -	*subTitleJsonPath* (string): chemin vers la valeur du champ de l’index (un path de type [jsonpath](https://github.com/dchester/jsonpath)
  -	*textIndex*: nom du champ de l’index pour la zone “Text”
  -	*textJsonPath* (string): chemin vers la valeur du champ de l’index (un path de type [jsonpath](https://github.com/dchester/jsonpath)
  -	*linkIndex*: nom du champ de l’index pour la zone “Link”
  -	*linkJsonPath* (string): chemin vers la valeur du champ de l’index (un path de type [jsonpath](https://github.com/dchester/jsonpath)
  -	*linkIcon*: identifiant de l’icône (voir: bibliothèque des [icones](https://react.semantic-ui.com/elements/icon/) issus de la librairie [semantic-ui pour React](https://react.semantic-ui.com)
  -	*linkButtonColor* : code hexadecimal de la couleur du bouton ou nom de la couleur. L'utilisation du nom de la couleur est limitée aux noms définis ci-dessous :  
  ![colorName.png](../images/colorName.png)
  -	*linkHook*: texte affiché pour le bouton de lien
  -	*additionalinfoIndex*: nom du champ de l’index pour la zone “Info”
  -	*additionalinfoJsonPath* (string): chemin vers la valeur du champ de l’index (un path de type [jsonpath](https://github.com/dchester/jsonpath) est nécessaire
- ***linkmdt*** (true/false): affichage ou non du lien Link vers la fiche complète
- ***imageheight*** : hauteur des imagettes (évite l’effet escalier si elles n’ont pas la même taille)

Exemple :

  ```
  <catalogue-results-card
    ...
    fields='{"imageIndex": "overview", "imageJsonPath":"$[0].url", "titleIndex": "resourceTitleObject", "titleJsonPath":"$.default", "titleSize":"h4", "subTitleIndex": "custodianOrgForResource", "subTitleJsonPath":"", "textIndex": "resourceHookAbstractObject", "textJsonPath":"$.default","linkIndex": "mw-gp-thematicMap", "linkJsonPath":"$[0].url", "linkIcon":"map", "linkButtonColor":"#335500", "linkHook":"Découvrir", "infoIndex":"revisionDateForResource", "infoJsonPath":"$[0]", "additionalInfoIndex":"cl_accessConstraints", "additionalInfoJsonPath":"$[0].key"}'
    linkmdt="false"
    imageheight="280"  
    ...>
  </catalogue-results-card>
  ```



### Paramètres liés à l'ogranisation des cartes
- ***size*** : nombre de cartes par page (pagination)
- ***itemsperrow***: nombre de cartes par ligne 
- ***marginx*** : écart entre les cartes
- ***margintoolsbottom*** : espace entre la zone de recherche et la zone de présentation des cartes 
- ***marginbottom*** : espace entre les cartes et la pagination
- ***margincardbottom*** : espace sous une carte

Exemple :

  ```
  <catalogue-results-card
    ...
    size="12"
    itemsperrow="3"
    marginx="1"   
    margintoolsbottom="1"   
    marginbottom="1" 
    margincardbottom="2"       
    ...>
  </catalogue-results-card>
  ```
{{< hint danger >}}
**Il est nécessaire de référencer les liens vers le code JavaScript et le code de style en cascade des composants web ICHO**  
En plus de cette balise, il est nécessaire de référencer lors de l’intégration les fichiers JavaScript et CSS nécessaires à l'intégration du tableau de métadonnées.
{{< /hint >}}

{{< button relref="./integration">}}Intégration{{< /button >}}




