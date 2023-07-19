// Import stylesheets
import './style.css';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
} from 'firebase/firestore'; // import getDoc for data collection
// Write Javascript code!
const appDiv = document.getElementById('app');
const usercountDiv = document.getElementById('usercount');
const userlistDiv = document.getElementById('userlist');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

const firebaseConfig = {
  apiKey: 'AIzaSyDAnfOhiaNrw3j_IUFdrPEQfFwKOvcYP8U',
  authDomain: 'fir-tutorial-1-2e338.firebaseapp.com',
  projectId: 'fir-tutorial-1-2e338',
  storageBucket: 'fir-tutorial-1-2e338.appspot.com',
  messagingSenderId: '216570939099',
  appId: '1:216570939099:web:c34b74ae6866bd552daefe',
};

initializeApp(firebaseConfig);

//init firebse service//
const db = getFirestore();

// collection ref//
const colRef = collection(db, 'users');

// queries
const q = query(
  colRef,
  where('lastname', '==', 'patel'),
  orderBy('title', 'desc')
);

// get data //

// getDocs(colRef).then((snapshot) => {
//   let users=[]
//   snapshot.docs.forEach((doc)=>{
//     users.push({ ...doc.data(), id: doc.id })
//   })
//   console.log(users)
// })
// .catch(error => {
//   console.log(error.message)
// })

//real time collection data //

onSnapshot(q, (snapshot) => {
  // replace it with colRef to get whole data in db
  let users = [];
  snapshot.docs.forEach((doc) => {
    users.push({ ...doc.data(), id: doc.id });
  });
  usercountDiv.innerHTML = '<h4>' + users.length + ' users added</h4>';
});

//add user//
const adduser = document.querySelector('.add');
adduser.addEventListener('submit', (e) => {
  e.preventDefault();
  addDoc(colRef, {
    firstname: adduser.firstname.value,
    lastname: adduser.lastname.value,
    uid: adduser.uid.value,
  }).then(() => {
    adduser.reset();
  });
});

// delete user //
const deleteuser = document.querySelector('.delete');
deleteuser.addEventListener('submit', (e) => {
  e.preventDefault();
  const docRef = doc(db, 'users', deleteuser.id.value);
  deleteDoc(docRef).then(() => {
    deleteuser.reset();
  });
});