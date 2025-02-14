
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, getDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

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

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
  if (user) {
    const loggedInUserId = user.uid; 

    const docRef = doc(db, "users", loggedInUserId);

    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();

          document.getElementById("username").textContent = userData.username;
          document.getElementById("email").textContent = user.email; 

          const editButton = document.getElementById('editbt');
          const subcontainer = document.getElementById('subcontainer');
          const edituser = document.getElementById('edituser');

          editButton.addEventListener('click', () => {
            subcontainer.style.display = "none"; 
            edituser.style.display = "block"; 


            const usernameInput = document.getElementById('useredit');
usernameInput.value = userData.username;
const emailInput = document.getElementById('emailedit');

 emailInput.value = userData.email; 



          });

          const saveButton = document.getElementById('saveedit');
          saveButton.addEventListener('click', async () => {

            let loaders=document.getElementsByClassName("loader")[0]
            loaders.style.display="block"
            try {
              const usernameInput = document.getElementById('useredit');
              const emailInput = document.getElementById('emailedit');

              await updateProfile(auth.currentUser, { displayName: usernameInput.value, email: emailInput.value }); 
              await updateDoc(docRef, { username: usernameInput.value, email: emailInput.value }); 

              document.getElementById("username").textContent = usernameInput.value;
              document.getElementById("email").textContent = emailInput.value; 

              subcontainer.style.display = "block"; 
              edituser.style.display = "none"; 
            } catch (error) {
              console.error("Error updating user data:", error);
            }
          });
        } else {
          console.log("no document found matching id");
        }
      })
      .catch((error) => {
        console.error("error getting ", error);
      });
  } else {
    console.error("user id not found in local storage");
  }
});



let logout = document.getElementById("logout")
logout.addEventListener("click", (e) => {
  e.preventDefault()
  window.location.href = "signin.html"
})

//userprofile
let profileContainer = document.getElementById("profileContainer")
profileContainer.style.display = "none"
let profile = document.getElementById("userprofile")
profile.addEventListener("click", (e) => {
  e.preventDefault()
  setTimeout(()=>{
     profileContainer.style.display = profileContainer.style.display === "none" ? "block" : "none"
  profileContainer.style.width="250px"
  },0)
})


let  draftbtn= document.getElementById("draftdisplay")
draftbtn.addEventListener("click",(e)=>{
    e.preventDefault()
    window.location.href="./draft.html"
    
})





        
        let imageDetails = JSON.parse(localStorage.getItem("imageitem")) || []; 

console.log(imageDetails); 
const mainContainer = document.getElementById("container");


    const mealContainer = document.createElement("div");
    mealContainer.classList.add("meal-item"); 

    const mealInfo = document.createElement("div");
    mealInfo.classList.add("items")
    mealInfo.innerHTML = `
      <img src="${imageDetails.image}" width="400px" alt="${imageDetails.mealName}">
      <p>Meal Name: ${imageDetails.mealName}</p>
      <p>Category: ${imageDetails.Category}</p>

      
    `;
    let mealInfo1=document.createElement("div")
    mealInfo1.classList.add("items1")

    mealInfo1.innerHTML=
    `
    <h2>INGREDIENTS</h2>
      <ul>
        ${imageDetails.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
      </ul>


         <h2>INSTRUCTIONS</h2>
      <p>${imageDetails.instructions}</p>

    `


    mealContainer.append(mealInfo,mealInfo1);
    mainContainer.appendChild(mealContainer); 

    let favopen = document.getElementById("favopen")
favopen.addEventListener("click", () => {
  window.location.href = "fav.html"

})
let home=document.getElementById("home")
home.addEventListener("click",(e)=>{
  e.preventDefault()
  window.location.href="loginpage.html"

})
