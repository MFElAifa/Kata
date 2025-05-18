# KATA - Application de Sondage

Ce projet est une application fullstack construite avec **Symfony (backend)** et **React (frontend)**, le tout conteneurisé avec **Docker**. Il permet de gérer des enquêtes de satisfaction avec une interface utilisateur simple et une interface administrateur sécurisée.

---

## Technologies utilisées

- **Symfony 6.4** (API REST, Doctrine ORM)
- **React 18 + Vite** (frontend SPA)
- **Bootstrap 5** (design responsive)
- **PHP 8.x** avec extensions nécessaires
- **Nginx** (reverse proxy et serveur HTTP)
- **Docker / Docker Compose**

---

## Lancer le projet

Assurez-vous d'avoir **Docker** et **Docker Compose** installés.

```back
docker-compose up --build
```

```front
npm install
npm run dev
```

Les services suivants seront disponibles :

| Service        | URL                        |
|----------------|----------------------------|
| Frontend React | http://localhost:5173      |
| Backend API    | http://localhost:8000/api  |

---

## Authentification admin

Une interface admin est accessible depuis le frontend. Utilisez les identifiants suivants pour vous connecter :

```
Identifiant : admin
Mot de passe : admin
```

---

## Tests

Côté backend, des tests unitaires sont définis avec PHPUnit. Lancez-les avec :

```bash
docker exec -it <php_container> php bin/phpunit
```

