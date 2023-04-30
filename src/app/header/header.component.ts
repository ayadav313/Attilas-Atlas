import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public auth: AngularFireAuth){
  }
  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((result) => {
      const user = result.user;
      let userId = "";
      if(user) { userId = user.uid} ;
      localStorage.setItem('userId', userId.toString() );
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.

    });;
  }
  logout() {
    this.auth.signOut().then((result) => {
      localStorage.setItem('userId', "" );
    });
  }
}
