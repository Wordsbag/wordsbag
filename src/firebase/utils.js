import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {initializeFirestore} from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyBmcufsJaqb39rmcNUtg1GGBhOs7kDnQVI',
  authDomain: 'wordsbag.firebaseapp.com',
  projectId: 'wordsbag',
  storageBucket: 'wordsbag.appspot.com',
  messagingSenderId: '1049303087692',
  appId: '1:1049303087692:web:b193a9c1b8637892d9d2e9',
  measurementId: 'G-BFN64EY6MC',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const user = auth.currentUser;
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
const storage = getStorage();
export {auth, db, storage};
