
import { App, initializeApp, getApps, cert, getApp, applicationDefault } from "firebase-admin/app";
import { Auth, getAuth } from "firebase-admin/auth";

let app: App;
let auth: Auth;

/*
The admin SDK doesn’t allow initialization of the same app more than once 
– since Remix provides some hot-reloading on file changes this will trigger
 initialization more than once, so we first check if a Firebase App instance 
 has been initialized and return it if it already has been.
*/


if (getApps().length === 0) {
  app = initializeApp({
    credential: applicationDefault(), 
  });
  auth = getAuth(app);
} else {
  app = getApp();
  auth = getAuth(app);
}

export { auth };