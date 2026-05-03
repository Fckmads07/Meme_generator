# PokéDex App

## Description

Cette application web a été développée dans le cadre du projet final du cours
**420-211-H26 – Applications Web** au Cégep Marie-Victorin.

L'objectif de l'application est de permettre aux utilisateurs de rechercher et consulter
des Pokémon à partir de l'API PokéAPI. L'utilisateur peut parcourir une liste de Pokémon,
effectuer une recherche par nom, consulter les détails de chaque Pokémon, naviguer entre les
pages grâce à la pagination, et sauvegarder ses favoris entre les sessions.

## Fonctionnalités principales

- Page d'accueil avec section Hero animée et présentation de l'application
- Liste de Pokémons sous forme de cartes avec image et types
- Recherche en temps réel par nom de Pokémon
- Page de détails affichant nom, types, taille, poids, expérience de base, capacités et statistiques
- Gestion des favoris : ajout et suppression depuis toutes les pages
- Persistance localStorage : les favoris sont conservés après rechargement (bonus)
- Pagination : navigation entre les pages de résultats (bonus)
- Design responsive adapté mobile et desktop

## API utilisée

- **Nom** : PokéAPI
- **URL** : https://pokeapi.co/
- **Documentation** : https://pokeapi.co/docs/v2

## Stack technique

- React 18 + Vite
- React Router DOM (v6) pour la navigation
- Context API + useState/useEffect pour la gestion d'état
- CSS (un fichier CSS par composant)
- localStorage pour la persistance des favoris

## Lancer le projet

npm install
npm run dev

## Planification du projet

### Semaine 1
- Initialisation du dépôt GitHub (branche projet)
- Mise en place de la structure des composants et dossiers
- Configuration du routing (React Router, 3 pages principales)
- Choix de l'API (PokéAPI) et rédaction du README.md
- Création du FavoritesContext avec localStorage
- Composants globaux : Navbar et Footer

### Semaine 2
- Implémentation de la page d'accueil (Hero, features)
- Implémentation de la page de liste avec cards
- Ajout de la fonctionnalité de recherche en temps réel
- Création de la page de détails avec 5+ propriétés
- Intégration des données de l'API (fetch, gestion loading/erreur)

### Semaine 3
- Implémentation complète des favoris (ajout / suppression / synchronisation)
- Page des favoris avec état vide
- Pagination sur la page de liste (bonus)
- Améliorations visuelles : design dark theme, animations CSS
- Tests, correction de bugs, nettoyage du code et commentaires

## Auteur

Madhav – Cégep Marie-Victorin, session Hiver 2025
