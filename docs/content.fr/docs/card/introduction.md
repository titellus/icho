---
weight: 10
bookFlatSection: true
title: "Introduction aux cartes"
---

# Vue  globale
La structure de présentation des métadonnées est réalisée sous forme de liste de carte de produits (cf. web applications store).

On identifie deux parties pour ce composant web:

- la zone de recherche
- la zone de présentation des métadonnes (cartes de métadonnées)

![mapStore_exemple.png](../images/mapStore_exemple.png)

## La zone de recherche

![mapStore_searchArea.png](../images/mapStore_searchArea.png)

La zone de recherche peut contenir quatre éléments:
- une zone de recherche libre
- une zone de sélection basée sur un champ de l'index 
- une seconde zone de sélection basée sur un champ de l'index
- une zone de tri (plusieurs champs de l'index peuvent être intégrés)

## La zone de présentation des métadonnées sous forme de carte

![img.png](../images/mapStore_cardArea.png)

Chaque métadonnée est présentée sous forme d'une carte de produit.
Au niveau de la carte, on distingue plusieurs zones :
-	Zone pour l'illustration
-	Zone de titre
-	Zone de sous-titre
-	Zone d'information
-	Lien
-	Zone d'information complémentaire

Par ailleurs, il est possible de définir le nombre de cartes par ligne et par page, ainsi que l'espacement entre cartes.

{{< button relref="./configuration">}}Configuration{{< /button >}}
