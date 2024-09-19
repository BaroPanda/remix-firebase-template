import { initializeApp } from "firebase/app";
import { getAuth, inMemoryPersistence, setPersistence } from "firebase/auth";

const app = initializeApp({
    apiKey: "AIzaSyDt5GbiW1m5BRNoWf43zav2PVvD3ghFVEs",
    authDomain: "baropanda-auth.firebaseapp.com",
    projectId: "baropanda-auth",
    storageBucket: "baropanda-auth.appspot.com",
    messagingSenderId: "455398620322",
    appId: "1:455398620322:web:ba0cdc5a47159a543b2bfb",
    measurementId: "G-SD0KZJQYHF"
});

const auth = getAuth(app);

// Let Remix handle the persistence via session cookies.
setPersistence(auth, inMemoryPersistence);

export { auth };