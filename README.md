# README DU MEILlEUR PROJET DE L'ANNÉE

## Installation

Pour commencer il faut faut faire un git clone du projet : 

```bash
git clone https://github.com/castanie-valentin/iut-project-castanie.git
```

Ensuite pour lance le projet, veuillez suivre les étapes suivantes :

1. Installer le package npm `@castanie-valentin/iut-encrypt` :
   ```bash
   npm install @castanie-valentin/iut-encrypt
   ```

2. Installer les dépendances du projet :
   ```bash
   npm install
   ```

3. Lancer un conteneur Docker MySQL et le connecter au projet :
   ```bash
   docker run --name hapi-mysql -e MYSQL_USER=user -e MYSQL_PASSWORD=hapi -e MYSQL_ROOT_PASSWORD=hapi -e MYSQL_DATABASE=user -d -p 3306:3306 mysql:8 mysqld --default-authentication-plugin=mysql_native_password
   ```


4. Assurez-vous d'avoir les données de connexion suivantes dans le fichier `manifest.js` au niveau de la ligne client :
   ```javascript
   client: 'mysql',
   connection: {
       host     : process.env.DB_HOST || '0.0.0.0',
       user     : process.env.DB_USER || 'root',
       password : process.env.DB_PASSWORD || 'hapi',
       database : process.env.DB_DATABASE || 'user'
   },
   ```

5. Lancer l'application et vous rendre sur http://localhost:3000/documentation#/ :
   ```bash
   npm start
   ```

## Envoi de mail

Pour l'envoi de mail, nous vous conseillons d'utiliser [Ethereal Email](https://ethereal.email/create). Ce site vous fournira un nom d'utilisateur (Username) et un mot de passe (Password) qu'il faudra remplacer par ceux existant dans le fichier `.env` se trouvant à la racine du projet.
