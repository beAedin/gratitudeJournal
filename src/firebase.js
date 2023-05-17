// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_API_KEY,
    authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FB_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FB_API_ID,
};
//
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const messaging = getMessaging(firebaseApp);
// getToken(messaging, { vapidKey: process.env.REACT_APP_MESSAGING_VAPID_KEY })
//     .then((currentToken) => {
//         if (currentToken) {
//             console.log('ㅡㅇ공');
//         } else {
//             // Show permission request UI
//             console.log('No registration token available. Request permission to generate one.');
//             // ...
//         }
//     })
//     .catch((err) => {
//         console.log('An error occurred while retrieving token. ', err);
//         // ...
//     });

const auth = getAuth(firebaseApp);

const getTokenPromise = async () => {
    try {
        // Firebase 인증을 사용하여 사용자 로그인 여부 확인
        const user = auth.currentUser;
        if (user) {
            // 로그인 되어 있는 경우
            const token = await getToken(messaging, {
                vapidKey: process.env.REACT_APP_MESSAGING_VAPID_KEY,
            });
            if (token) {
                // 토큰이 존재하는 경우
                console.log('Token:', token);
            } else {
                // 토큰이 존재하지 않는 경우
                console.log('No registration token available. Request permission to generate one.');
            }
        } else {
            // 로그인 되어 있지 않은 경우
            console.log('User is not signed in.');
            // 사용자 로그인 요청
            await signInWithEmailAndPassword(auth, 'user@example.com', 'password');
        }
    } catch (error) {
        console.log('An error occurred while retrieving token. ', error);
    }
};

function requestPermission() {
    console.log('권한 요청 중...');
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('알림 권한이 허용됨');

            // FCM 메세지 처리
        } else {
            console.log('알림 권한 허용 안됨');
        }
    });
}

requestPermission();
getTokenPromise();

const db = getFirestore(firebaseApp);
export { db };
//
export { firebaseAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
