// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import type { FirebaseOptions } from '@firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseOptions: FirebaseOptions = {
    apiKey: 'AIzaSyBDoUzueohPzqlXYIDPdRW4yxSR9JXSiY0',
    authDomain: 'apapacha-4de27.firebaseapp.com',
    projectId: 'apapacha-4de27',
    storageBucket: 'apapacha-4de27.appspot.com',
    messagingSenderId: '945820812192',
    appId: '1:945820812192:web:435c2e35bdbe1407b7dac5',
    measurementId: 'G-FH5WFJM3RG',
    databaseURL:
        'https://apapacha-4de27-default-rtdb.europe-west1.firebasedatabase.app/',
}

const app = initializeApp(firebaseOptions)
const auth = getAuth(app)
const database = getDatabase(app)

export { app, auth, database }
