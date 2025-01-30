// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, setDoc,doc} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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


function showMessage(message, divId) {  // More descriptive name: divId
    let messageDiv = document.getElementById(divId); // More descriptive name and correct capitalization
    if (!messageDiv) {  // Check if the element exists
        console.error("Div with ID '" + divId + "' not found!");
        return; // Exit early if the div doesn't exist
    }

    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1; // Set opacity to 1 to make it visible

    setTimeout(function() {
        messageDiv.style.opacity = 0; // Fade out the message
      // Delay to allow fade-out to complete (adjust as needed)
    }, 2000); // Delay before fade-out starts
}



let signup=document.getElementById("submitSignup")
signup.addEventListener("click",(e)=>{
    e.preventDefault()
    let username=document.getElementById("username").value
    let email=document.getElementById("emailr").value
    let password=document.getElementById("pwdr").value
    const auth=getAuth()
    const db=getFirestore()

    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        const user=userCredential.user;
        let userData={
            email:email,
            password:password,
            username:username

        }
        showMessage("account created successfully")
        let docRef=doc(db,"users",user.uid)
        setDoc(docRef,userData)
        .then(()=>{
            // window.location.href=`.html`

        }).catch((error)=>{
            console.log("error writing  ",error)
        })
    })
    .catch((error)=>{
        const errorCode=error.code
        if(errorCode=='auth/email-already-in-use'){
            showMessage('email address is already exists !!',"signupmessage")

        }else{
            showMessage("unable to create user","signupmessage")

        }
    })
})




// sign in 

let signin = document.getElementById("submitSignin");

signin.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission

    let email = document.getElementById("email").value;
    let password = document.getElementById("pwd").value;

    const auth = getAuth(); // Make sure getAuth() is imported correctly

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showMessage("Login is successful", "signinmessage"); // Corrected typo here
            const user = userCredential.user;
            localStorage.setItem('loggedInUserId',user.uid);
            window.location.href = "loginpage.html"; // Redirect after successful login
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message; // Good practice to use the message too
            console.error("Login error:", errorCode, errorMessage); // Log for debugging

            if (errorCode === "auth/invalid-credential") { // Corrected typo here
                showMessage('Incorrect email or password', "signinmessage"); // Corrected typo here
            } else if (errorCode === "auth/user-not-found") {  // More specific error check
                showMessage("Account does not exist", "signinmessage"); // Corrected typo here
            } else {
                showMessage("An error occurred during login. Please try again.", "signinmessage"); // Generic message
                // Optionally display the full error message for debugging (not in production):
                // showMessage(errorMessage, "signinmessage");
            }
        });
});