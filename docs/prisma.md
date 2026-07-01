# Guide prisma

## Qu'est ce que prisma ?

Prisma agit comme une d'abstraction de langage SQL de maniere entierement "TypeSafe". Le client prisma, nous permet d'interagir avec notre database en utilisant des methodes javascript.

## Le client

Le client prisma fournit les types et methodes qui nous permettent d'interagir avec notre database.
Tous les types est methode sont dans generated/prisma/model

## Les models

Les models sont des representations sous la forme d'objet de nos tables sql.
Prisma s'en sert a la migration ( passage de la DB d'un etat A a un etat B ) pour genere le code SQL necessaire.

## Les commandes clefs

- migrer la database : `npx prisma migrate dev --name init`
- generer le client approprie : `npx prisma generate`
