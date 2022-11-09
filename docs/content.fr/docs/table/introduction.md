---
weight: 10
bookFlatSection: true
title: "Introduction aux tableaux"
---

# Vue globale
La structure de présentation des métadonnées est réalisée sous forme d'un tableau que l'on peut paramétrer afin de faire apparaître l'un ou l'autre champ. De plus, on peut enrichier l'expérience utilisateur en customisant le rendu visuel via des couleurs, des labels et des icônes.

On identifie deux parties pour ce composant web:
- la zone de recherche
- la zone de présentation des métadonnées (tableau)

![table_exemple.png](../images/table_exemple.png)

## La zone de recherche

![table_searchArea.png](../images/table_searchArea.png)

La zone de recherche peut contenir trois éléments:
- une zone de recherche libre (l'opérateur peut définir les champs qui seront interroger lors de la requête)
- une zone de sélection rapide (via 'toggle button') basée sur un champ de l'index que l'opérateur peut définir
- une seconde zone de sélection basée également sur un champs de l'index que l'opérateur peut définir

Il est à noter que certains éléments visuels peuvent être modifié tel que la couleur des boutons de la zone de sélection rapide (via 'toggle button')

## La zone de présentation des métadonnes via un tableau

![table_tableArea.png](../images/table_tableArea.png)

Au niveau du tableau, on peut configurer chaque cellule du tableau afin d'afficher un icône, un label, un texte, un code ou une infobulle.

{{< button relref="./configuration">}}Configuration{{< /button >}}
