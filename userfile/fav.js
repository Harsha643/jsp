
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
          let loadin=document.getElementsByClassName("loadersave")[0]
            loadin.style.display="none"

          saveButton.addEventListener('click', async () => {
            // let loadin=document.getElementsByClassName("loadersave")[0]
            loadin.style.display="block"

            setTimeout( async ()=>{
              loadin.style.display="none"
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
          },2000)
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
  window.location.href = "index.html"
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


let logo=document.getElementById("image")
logo.addEventListener("click",()=>{
  window.location.href="./loginpage.html"
})


let  draftbtn= document.getElementById("draftdisplay")
draftbtn.addEventListener("click",(e)=>{
    e.preventDefault()
    window.location.href="./draft.html"
    
})



const favoriteMeals = JSON.parse(localStorage.getItem("favoriteMeals")) || [];
console.log(favoriteMeals.length);
const maincontainer = document.getElementById("container");

if (favoriteMeals.length > 0) {
    favoriteMeals.forEach((element) => {
      console.log(element)
        const mealContainer = document.createElement("div");
        mealContainer.classList.add("meal-item");

        const mealInfo = document.createElement("div");
        mealInfo.innerHTML = `
            <img src="${element.image}" width="300px" alt="${element.mealName}" class="imgopen" >
            <p>Meal Name: ${element.mealName}</p>
            <p>Category: ${element.Category}</p>
        `;

        const toggleButton = document.createElement("button");
        toggleButton.textContent = "Show Instructions & Ingredients";

        let imgOpen = mealInfo.querySelector(".imgopen");
        imgOpen.addEventListener("click", (event1) => {
            event1.preventDefault();
            // console.log("Image clicked for meal ID:", element);
            localStorage.setItem("imageitem", JSON.stringify(element));
            window.location.href = "./image.html";
        });

        const remove = document.createElement("button");
        remove.innerText = "remove";
        remove.addEventListener("click", (e) => {
            e.preventDefault();
            const index = favoriteMeals.indexOf(element);
            if (index > -1) {
                favoriteMeals.splice(index, 1);
                localStorage.setItem("favoriteMeals", JSON.stringify(favoriteMeals));
                mealContainer.remove();
            }
        });

        const detailsContainer = document.createElement("div");
        detailsContainer.style.display = "none";

        detailsContainer.innerHTML = `
            <h2>INGREDIENTS</h2>
            <ul>
                 ${(element.ingredients || []).map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <h2>INSTRUCTIONS</h2>
            <p>${element.instructions}</p>
        `;
 // ${element.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        mealContainer.appendChild(mealInfo);
        mealContainer.append(toggleButton, remove);
        mealContainer.appendChild(detailsContainer);

        toggleButton.addEventListener("click", () => {
          // Create modal container (acts as a background)
          const modalContainer = document.createElement("div");
          modalContainer.className = "modal-container";
        
          // Create modal
          const modal = document.createElement("div");
          modal.className = "modal";
        
          modal.innerHTML = `
            ${detailsContainer.innerHTML}
            <button id="closeModal">Close</button>
          `;
        
          // Append modal inside modalContainer
          modalContainer.appendChild(modal);
          document.body.appendChild(modalContainer);
        
          // Close modal functionality
          const closeModal = () => {
            modalContainer.remove();
            window.removeEventListener("click", outsideClickListener);
          };
        
          // Close modal when clicking outside
          const outsideClickListener = (event) => {
            if (event.target === modalContainer) {
              closeModal();
            }
          };
        
          document.getElementById("closeModal").addEventListener("click", closeModal);
          window.addEventListener("click", outsideClickListener);
        });
        

        maincontainer.appendChild(mealContainer);
    });
} else {
    console.log("else");
    let nodata = document.createElement("div");

    nodata.id = "nodata";
    nodata.innerText = "select your favorite recipes ";
    nodata.style.color = "red";
    nodata.style.fontsize="50px";
    nodata.style.fontWeight = "200";
    maincontainer.appendChild(nodata);
}

let close=document.getElementById("closebtn")
close.style.backgroundColor="red"
close.style.color="white"

close.addEventListener("click",()=>{
  containerInputs.style.display = containerInputs.style.display === "none" ? "block" : "none";

})



let addRecipes = document.getElementById("addBtn");

let containerInputs = document.getElementById("container-inputs");

addRecipes.addEventListener("click", () => {

  containerInputs.style.display = containerInputs.style.display === "none" ? "grid" : "none";
  // containerInputs.style.display = "grid"; // Set grid layout
  containerInputs.style.width = "80%";
  containerInputs.style.marginTop = "50px";
  containerInputs.style.gridTemplateColumns = "repeat(2, 1fr)";
   


});


function valid() {
  let isValid = true;
  const fields = [
    { id: "mealname", errorId: "MealnameError", message: "Meal Name is required." },
    { id: "category", errorId: "CategoryError", message: "Category is required." },
    { id: "country", errorId: "countryError", message: "Country is required." },
    { id: "imageUrl", errorId: "imageError", message: "Image URL is required." },
    { id: "ingredient", errorId: "IngredientsError", message: "Ingredients are required." },
    { id: "Instructions", errorId: "InstructionsError", message: "Instructions are required." },
  ];

  fields.forEach(({ id, errorId, message }) => {
    const field = document.getElementById(id);
    const errorField = document.getElementById(errorId);

    if (!field.value.trim()) {
      errorField.innerText = message;
      errorField.style.color = "red";
      field.style.border = "1px solid red"; // Use border for visual feedback
      isValid = false;
    } else {
      errorField.innerText = "";
      field.style.border = "";
    }
  });

  // Validate image URL
  const imageUrlField = document.getElementById("imageUrl");
  const imageUrlErrorField = document.getElementById("imageError");
  if (imageUrlField.value.trim() && !isValidURL(imageUrlField.value)) {
    imageUrlErrorField.innerText = "Invalid Image URL.";
    imageUrlErrorField.style.color = "red";
    imageUrlField.style.border = "1px solid red";
    isValid = false;
  } else {
    imageUrlErrorField.innerText = "";
    imageUrlField.style.border = "";
  }

  return isValid;
}

function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

function clearForm() {
  document.getElementById("id").value = "";
  document.getElementById("mealname").value = "";
  document.getElementById("category").value = "";
  document.getElementById("country").value = "";
  document.getElementById("imageUrl").value = "";
  document.getElementById("ingredient").value = "";
  document.getElementById("Instructions").value = "";

  // Clear error messages and styles
  const fields = [
    "mealname", "category", "country", "imageUrl", "ingredient", "Instructions"
  ];
  fields.forEach((id) => {
    const field = document.getElementById(id);
    const errorField = document.getElementById(`${id}Error`);
    errorField.innerText = "";
    field.style.border = "";
  });
}
let draftdata=document.getElementById("draftdata")
draftdata.addEventListener("click",()=>{
  dSave()
  console.log("he")
})
async function dSave() {
  console.log("hello")
  if (!valid()) {
    alert("Please fill out all fields correctly.");
    return;
  }
  let recipeId = document.getElementById("id").value;
  let obj = {
    mealName: document.getElementById("mealname").value,
    Category: document.getElementById("category").value,
    Area: document.getElementById("country").value,
    instructions: document.getElementById("Instructions").value,
    image: document.getElementById("imageUrl").value,
    ingredients: document.getElementById("ingredient").value.split("\n"),
  };
  try {
    let method = "POST";
    let response = await fetch("https://amplified-hulking-snowdrop.glitch.me/meals", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    alert(recipeId ? "Data updated successfully" : "Data saved successfully");
    fetchingData(); 
    clearForm(); 
  } catch (error) {
    console.error("Save data error", error);
  }
}


// savedata 
let savedata = document.getElementById("savedata")
savedata.addEventListener("click", () => {
  dataSave()
})
async function dataSave() {
  if (!valid()) {
    alert("Please fill out all fields correctly.");
    return;
  }

  let recipeId = document.getElementById("id").value;
  let obj = {
    mealName: document.getElementById("mealname").value,
    Category: document.getElementById("category").value,
    Area: document.getElementById("country").value,
    instructions: document.getElementById("Instructions").value,
    image: document.getElementById("imageUrl").value,
    ingredients: document.getElementById("ingredient").value.split("\n"),
  };

  try {
    let method = "POST";
    let response = await fetch("https://pouncing-scarlet-cesium.glitch.me/meals", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    
  

    alert(recipeId ? "Data updated successfully" : "Data saved successfully");
      window.location.href="./loginpage.html"


  } catch (error) {
    console.error("Save data error", error);
  }
}

let home=document.getElementById("home")
home.addEventListener("click",(e)=>{
  e.preventDefault()
  window.location.href="loginpage.html"

})