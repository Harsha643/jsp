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
        // console.log(user.email)
        // console.log(loggedInUserId)
        const docRef=doc(db, "users",loggedInUserId)
        // console.log(docRef)
        getDoc(docRef)
        .then((docSnap)=>{
            // console.log(docSnap.data())
            if(docSnap.exists()){

                const userData=docSnap.data()
                // console.log(userData)
                document.getElementById("username").innerText=userData.username
                document.getElementById("email").innerText=userData.email
                document.getElementById("password").innerText=userData.password
                // document.getElementById("id").innerText=
                

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

  let logout=document.getElementById("logout")
  logout.addEventListener("click",(e)=>{
    e.preventDefault()
    window.location.href="signin.html"
  })

  //userprofile


let profileContainer=document.getElementById("profileContainer")
profileContainer.style.display="none"
  let profile=document.getElementById("userprofile")
  profile.addEventListener("click",(e)=>{
    e.preventDefault()

    profileContainer.style.display=profileContainer.style.display==="none"?"block":"none"
   


  })
///////////////////////////////////////////////////
async function fetchingData() {
  try {
    let response = await fetch("https://pouncing-scarlet-cesium.glitch.me/meals");
    if (!response.ok) {
      throw new Error("Data is not found");
    }
    let data = await response.json();
    displayData1(data);
    // console.log(data)
   
  } catch (err) {
    alert("Data fetch failed");
    console.error(err);
  }
}
fetchingData();

function displayData1(data) {
  const categoryData = {};
// const countryData={}s
  data.forEach((element) => {

    // if(element.Area){
    //   if(!countryData[element.Area]){
    //     countryData[element.Area]=[];
  
    //   }
    // countryData[element.Area].push(element)
    // }else{
      
    //   country.warn("Element found without a countrry:",element)
  
    // }
    // console.log(element)
    if (element.Category) {
      if (!categoryData[element.Category]) {
        categoryData[element.Category] = [];
      }
      categoryData[element.Category].push(element);
    } else {
     
      console.warn("Element found without a category:", element);
    }
  });

  const container = document.getElementById("maincontainer");
  container.innerHTML = ``;


  for (const category in categoryData) {
    // console.log(category)
    const categoryContainer = document.createElement("div");
    let catName=document.createElement("div")
    catName.classList.add("catName");
    catName.innerHTML=`<h2>${category}</h2>`
    container.appendChild(catName)
    categoryContainer.classList.add("category-container");
    
    categoryData[category].forEach((element) => {
      const item = document.createElement("div");
      item.classList.add("meal-item"); 
    

      item.innerHTML = `
        <img src="${element.image}" width="200px" class="imgopen" data-id="${element.id}">
        <p>${element.mealName}</p>
         <span id="fava" class="favorite-icon"><ion-icon name="heart-outline"></ion-icon></span>
      `;
      categoryContainer.append(item);
      const favoriteIcon = item.querySelector(".favorite-icon");
      favoriteIcon.addEventListener("click", () => {

        const favoriteMeals = JSON.parse(localStorage.getItem("favoriteMeals")) || [];
        const isAlreadyFavorite = favoriteMeals.some((meal) => meal.id === element.id);
        if (!isAlreadyFavorite) {
          favoriteMeals.push(element);
          localStorage.setItem("favoriteMeals", JSON.stringify(favoriteMeals));
          favoriteIcon.querySelector("ion-icon").name = "heart";
        } else {
          const filteredFavorites = favoriteMeals.filter((meal) => meal.id !== element.id);
          localStorage.setItem("favoriteMeals", JSON.stringify(filteredFavorites));
          favoriteIcon.querySelector("ion-icon").name = "heart-outline";
        }

      });
    
   
    container.appendChild(categoryContainer);
  
  if (Object.keys(categoryData).length === 0) {
    container.innerHTML = "No meals found.";
  }

        // image 

      let imgOpen = item.querySelector(".imgopen");
  imgOpen.addEventListener("click", (event1) => {
    event1.preventDefault();
    console.log("Image clicked for meal ID:", element)
  localStorage.setItem("imageitem",JSON.stringify(element))


  });



    });

   
    container.appendChild(categoryContainer);
  }

  if (Object.keys(categoryData).length === 0) {
    container.innerHTML = "No meals found.";
  }

}

let favopen=document.getElementById("favopen")
favopen.addEventListener("click",()=>{
  window.location.href="fav.html"

})


// recipes adding

let addRecipes = document.getElementById("addBtn");
let containerInputs = document.getElementById("container-inputs");

addRecipes.addEventListener("click", () => {
  containerInputs.style.display = containerInputs.style.display==="none"? "grid" :"none";
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

let savedata=document.getElementById("savedata")
savedata.addEventListener("click",()=>{
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
    fetchingData(); 
    clearForm(); 
  } catch (error) {
    console.error("Save data error", error);
  }
}



const filterInput = document.getElementById("search");

filterInput.addEventListener("input", () => {
  const filterText = filterInput.value.toLowerCase().trim(); 
  const mealItems = document.querySelectorAll(".meal-item"); 

  mealItems.forEach((mealItem) => {
    const mealName = mealItem.querySelector("p").textContent.toLowerCase(); 
    const categoryElement = mealItem.querySelector("p:nth-child(2)"); 
    const category = categoryElement ? categoryElement.textContent.toLowerCase() : ""; 
    const countryElement = mealItem.querySelector("p:nth-child(3)"); 
    const country = countryElement ? countryElement.textContent.toLowerCase() : ""; 

    if (mealName.includes(filterText) || category.includes(filterText) || country.includes(filterText)) {
      mealItem.style.display = "block"; 
    } else {
      mealItem.style.display = "none"; 
    }
  });

  // Filter category headers as well
  const categoryHeaders = document.querySelectorAll("h2");
  categoryHeaders.forEach((header) => {
    const categoryName = header.textContent.toLowerCase();
    if (categoryName.includes(filterText)) {
      header.style.display = "block"; 
    } else {
      header.style.display = "none"; 
    }
  });
});


// let addion=document.getElementById('ion')
// addion.addEventListener('click', (e)=> {
//   e.preventDefault()
//   var spans = document.querySelectorAll('.main span');
//   spans.forEach(function(span) {
//       span.style.display = span.style.display === 'block' ? 'none' : 'block';
//   });
// });




// imageopen 
