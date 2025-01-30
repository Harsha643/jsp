import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, getDoc,doc} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyBbmBJPwfOKa2Q-r2CEhvsFv5yhmNFkuAU",
    authDomain: "login-kk-f580d.firebaseapp.com",
    projectId: "login-kk-f580d",
    storageBucket: "login-kk-f580d.firebasestorage.app",
    messagingSenderId: "901441715555",
    appId: "1:901441715555:web:5228323a42259e1e91a756"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth=getAuth()
  const db=getFirestore()
  onAuthStateChanged(auth, (user)=>{

    const loggedInUserId=localStorage.getItem("loggedInUserId")
    if(loggedInUserId){
        console.log(user.email)
        console.log(loggedInUserId)
        const docRef=doc(db, "users",loggedInUserId)
        console.log(docRef)
        getDoc(docRef)
        .then((docSnap)=>{

            if(docSnap.exists()){
                const userData=docSnap.data()
                console.log(userData)
                document.getElementById("username").innerText=userData.username
                document.getElementById("email").innerText=userData.email
                document.getElementById("password").innerText=userData.password

            }
            else{
                console.log("no document found matching id ")
            }

        })
        .catch((error)=>{
            console.error("error geting ",error)
        })

    }
    else{
        console.error("user id not found in local storage")
    }
  })
