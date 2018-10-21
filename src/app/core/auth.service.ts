import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { Observable, of } from 'rxjs';
import { switchMap, mergeMap, map } from 'rxjs/operators';

import { User } from '../../models/user';
import { AdminConfig } from '../../models/admin-config';

@Injectable()
export class AuthService {

  public user: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {

    // get auth data, then get firestore user document || null
    this.user = this.afAuth.authState
      .pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
      );
  }

  public signOut() {
    this.afAuth.auth.signOut();
  }

  public adminSignIn(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  public adminSignUp(email: string, password: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  public saveAdminUid(uid: string) {
    const adminConfigDocRef = this.afs.doc('config/admin');
    return adminConfigDocRef.set({ adminUid: uid });
  }

  public adminUserExists(): Observable<boolean> {
    const adminConfigDocRef = this.afs.doc<AdminConfig>('config/admin');
    return adminConfigDocRef.valueChanges()
      .pipe(
        map(config => !!config && !!config.adminUid)
      );
  }

  public adminLoggedIn(): Observable<boolean> {
    const currentUserUid = this.afAuth.auth.currentUser ? this.afAuth.auth.currentUser.uid : null;
    const adminConfigDocRef = this.afs.doc<AdminConfig>('config/admin');

    return adminConfigDocRef.valueChanges()
      .pipe(
        mergeMap(config =>
          this.afAuth.authState.pipe(
            map(authState =>
                  config && config.adminUid && authState && ( config.adminUid === authState.uid )))
          )
      );
  }

  public adminLogin(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  public anonymousLogin(): Promise<any> {
    return this.afAuth.auth.signInAnonymously();
  }

  public githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then(credential => this.updateUserData(credential.user));
  }

  private updateUserData(user) {
    // sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    // add custom data, like type for admin vs. visitor type
    const data: User = {
      uid: user.uid,
      email: user.email,
      type: user.type
    };

    return userRef.set(data);
  }

}
