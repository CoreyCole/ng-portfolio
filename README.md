# ng-portfolio

We are using firebase for hosting and content management of the portfolio projects
```
$ npm install -g firebase-tools
$ firebase login
$ firebase init
$ firebase deploy
```

Add firebase config file to `src/firebase-config.ts`
```javascript
export const firebaseConfig = {
  apiKey: '<your-key>',
  authDomain: '<your-project-authdomain>',
  databaseURL: '<your-database-URL>',
  projectId: '<your-project-id>',
  storageBucket: '<your-storage-bucket>',
  messagingSenderId: '<your-messaging-sender-id>'
};
```

Enable firestore database

Enable email and password authentication (for your admin user)
Enable anonymous authentication (for your guests)

If you want more UI components from angular material library, import them in `material.module.ts`