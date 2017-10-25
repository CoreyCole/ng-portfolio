# ng-portfolio

See the Demo [HERE](https://coreycole.net/)

- We are using firebase for hosting and content management of the portfolio projects
```
$ npm install -g firebase-tools
$ firebase login
$ firebase init
$ firebase deploy
```

- Add firebase config file to `src/environments/firebase-config.ts`
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

- Enable firestore database
- Enable email and password authentication (for your admin user)
- Enable anonymous authentication (for your guests)

## UI components
If you want more UI components from angular material library, import them in `src/core/material.module.ts`

## Images
- You can upload portfolio images to firebase storage.

### For project preview images on home page (main project image)
If you're getting a problem where there is a white margin left and right around your project image, and you have a solid background color, make the background wider than the height until it fills. The default project image [here](https://firebasestorage.googleapis.com/v0/b/corey-portfolio.appspot.com/o/ng-portfolio-logo-with-background.png?alt=media&token=14ddec84-8bf8-446f-ac4e-e67db4826d90) is 352x256 pixels (1.375:1 ratio).
