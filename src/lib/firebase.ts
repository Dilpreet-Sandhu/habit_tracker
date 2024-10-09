'use client'
// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {getMessaging, isSupported} from 'firebase/messaging'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTBgY9E7sJS-6UYgCqJtn4OrZv4oR6x2c",
  authDomain: "habittracker-fef2c.firebaseapp.com",
  projectId: "habittracker-fef2c",
  storageBucket: "habittracker-fef2c.appspot.com",
  messagingSenderId: "199373381333",
  appId: "1:199373381333:web:6f6453fae2aa6a6d324c5c"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = typeof window !== "undefined" ? getMessaging(app) : null;

export {messaging}