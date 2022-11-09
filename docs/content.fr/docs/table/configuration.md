---
weight: 20
bookFlatSection: true
title: "Configuration d'un tableau de métadonnées"
---

# Le composant web "tableau de métadonnées"

Une balise html de type `<catalogue-results-table [parameters]></catalogue-results-table>` est utilisée dans
le code html afin d'introduire le composant web.
Plusieurs paramètres sont à introduire au niveau de cette balise afin de compléter la configuration du composant web.

Attention, il est nécessaire d'introduire des références vers le code JavaScript et les feuilles de
style en cascade d'ICHO afin d'afficher les résultats d'une recherche via ce composant web.


# Configuration du composant web "tableau de métadonnées"

Le schema ci-dessous illustre les éléments définisant le composant.

![table_schema.png](../images/table_schema.png)

Plusieurs paramètres sont utilisés pour définir cette affichage du tableau de métadonnées.
Les paragraphes suivants décrivent ces différents paramètres :


| Idenfiant  | Zone                                | Obligatoire |
|------------|-------------------------------------|--|
| catalogueurl | Paramètre global                    | x |
| filter | Paramètre global |  |
| sortby | Paramètre global |  |
| sorttype | Paramètre global |  |
| filterfield | Paramètre de la zone de recherche |  |
| togglefilterfield | Paramètre de la zone de recherche |  |
| toggleismultiselect | Paramètre de la zone de recherche |  |
| togglelabel | Paramètre de la zone de recherche |  |
| toggleButtonStyle | Paramètre de la zone de recherche |  |
| fields | Paramètre lié au tableau |  |
| size | Paramètre lié au tableau |  |



## Configuration du catalogue et de la recherche

-	***catalogueurl*** (obligatoire): adresse du catalogue source à interroger

Exemple :

  ```
  <catalogue-results-table
    ...
    catalogueurl="https://metawal.wallonie.be/geonetwork/srv"
    ...>
  </catalogue-results-table>
  ```
-	***filter***: nom du champ de l’index qui servira de filtre pour la recherche ou requête de type Lucene afin d'affiner le filtre

Exemple :

  ```
  <catalogue-results-table
    ...
    filter="+(resourceType:dataset or resourceType:series) -(th_infraSIG.default:Reporting INSPIRE) -(cl_status.key:obsolete) +(custodianOrgForResource:*SPW*)"
    ...>
  </catalogue-results-table>
  ```

-	***sortby***: nom du champ de l’index qui sert d'élément de tri pour la recherche

Exemple :

  ```
  <catalogue-results-table
    ...
    sortby="custodianOrgForResource"
    ...>
  </catalogue-results-table>
  ```
-	***sorttype***: sens du tri (valeur autorisée :'asc' ou 'desc')

Exemple :

  ```
  <catalogue-results-table
    ...
    sorttype="asc"
    ...>
  </catalogue-results-table>
  ```

# Configuration de la zone de recherche utilisateur

La barre de recherche peut contenir trois zones permettant d'affiner la recherche sur base de sélections
opérées par l'utilisateur.
![table_searchArea_schema.png](../images/table_searchArea_schema.png)

## Zone "Search"

-	***fulltextfilter*** : nom du champ de l'index qui est utilisé pour une recherche de type 'fulltext'
   
  Exemple :

  ```
  ```
-	***search_placeholder*** : texte affiché au niveau de la zone de recherche

Exemple :

```
```
## Zone "Field X"
-	***togglefilterfield*** : nom du champ de l'index qui sert de filtre
-	***toggleismultiselect*** : permet d'activer ou non une sélection multiple (valeur autorisée : 'true' ou 'false')
-	***togglelabel*** : possibilité de configuration les boutons reprenant les valeurs du champ de l'index servant de filtre :
  - *label*: label du button utilisé
  - *value*: valeur du champ de l’index
- ***toggleButtonStyle***: possibilité de customisé le style des boutons
  - *bg*: couleur de fond du bouton
  - *bg_active*: couleur de fond du bouton après sélection
  - *text_color*: couleur du texte
  - *text_color_active*: couleur du texte après sélection

Exemple :

  ```
  <catalogue-results-table
    ...
    togglefilterfield="mw-gp-localIdentifierCodespace"
    toggleismultiselect="true"
    togglelabel='{"label": "GINET", "value": "BE.SPW.INFRASIG.GINET"} | {"label": "CARTON", "value": "BE.SPW.INFRASIG.CARTON"}'
    toggleButtonStyle='{"bg":"rgb(204 0 0)", "bg_active":"rgb(204 0 0)","text_color":"rgb(200 200 200)","text_color_active":"white"}'
    ...>
  </catalogue-results-table>
  ```
## Zone "Focus on"
-	***filterfield*** : nom du champ de l'index qui sert de filtre pour ce type filtre
-	***filterfield_placeholder*** : texte utilisé pour la zone de filtre

Exemple : 

  ```
  <catalogue-results-table
    ...
    filterfield="th_Themes_geoportail_wallon_hierarchy.default"
    ...>
  </catalogue-results-table>
  ```

# Configuration du tableau

![table_tableArea_schema.png](../images/table_tableArea_schema.png)

Les paramètres de cette zone sont:

- ***fields***: regroupe sous forme d'objets json séparé les uns des autres par des '|', les paramètres des champs de l’index à intégrer dans le tableau. 
Chaque objet json représente une ligne du tableau et est constitué de plusieurs sous-paramètres :
  - *columnName*: nom de la colonne
  -	*columnIndex*: nom du champ de l’index pour cette colonne
  -	*columnJsonPath*:  chemin vers la valeur du champ de l’index ((voir https://github.com/dchester/jsonpath)
  -	*columnWidth*: dimension de la colonne (un tableau est de 16 parties maximum, au total la somme des éléments *columnWidth* ne peut excéder 16)
  -	*columnIcon*: possibilité d'utiliser un ou plusieurs icônes pour représenter une ou des valeurs spécifiques. Liste des [icônes disponibles](https://react.semantic-ui.com/elements/icon/)  
  Exemple :
  ```
  "columnIcon":"map"
  ```
  ```
  "columnIcon":{"series":"th","dataset":"map"}
  ```
  - *columnIconColor*: possibilité de modifier la couleur d'un icône ou des icônes utilisés.  
  Exemple :
  ```
  "columnIconColor":"green"
  ``` 
  ```
  "columnIconColor":{"series":"green","dataset":"red"}
  ```
  -	*columnValue*: permet d'afficher une valeur définie sur base de la valeur de champ de l'index retournée par le catalogue.  
  Exemple : le catalogue retourne les valeurs 'test1' et 'test2' mais on affiche dans le tableau respectivement la valeur 1 et 2  
  ```
  "columnValue":{"test1":"1","test2":"2"}
  ```
  -	*columnLabel*: permet d'intégrer la valeur de l'index retournée par le catalogue via un label. Il est possible de varier les couleurs selon les valeurs du champ de l'index. 
  Pour définir la couleur, il est possible d'utiliser le code hexadecimal de la couleur du bouton ou le nom de la couleur. L'utilisation du nom de la couleur est limitée aux noms définis ci-dessous :
  ![colorName.png](../images/colorName.png)
  Exemple :
  ```
  "columnLabel":{"series":"blue","dataset":"green"}
  ``` 
  ```
  "columnLabel":"red"
  ```
  -	*columnFormatter*: si la valeur 'withouttext' est indiquée, aucune valeur 'texte' n'est pas affichée pour cette cellule du tableau (cas d'utilisation : affichage d'un ou plusieurs icônes pour représenter une valeur ou plusieurs valeurs)
- ***size*** : nombre de lignes à afficher dans le tableau (ceci modifie la pagination)

Exemple :

  ```
  <catalogue-results-table
    ...
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
    size="10"
    ...>
  </catalogue-results-table>
  ```


Il est possible d'introduire plusieurs valeurs issus de différents champs de l'index au sein des cellules. Pour ce faire, il suffit d'utiliser la même valeur pour le paramètre *columnName* et d'appliquer un *columnWidth* identique. 

{{< hint danger >}}
**Il est nécessaire de référencer les liens vers le code JavaScript et le code de style en cascade des composants web ICHO**  
En plus de cette balise, il est nécessaire de référencer lors de l’intégration les fichiers JavaScript et CSS nécessaires à l'intégration du tableau de métadonnées.
{{< /hint >}}

{{< button relref="./integration">}}Intégration{{< /button >}}
