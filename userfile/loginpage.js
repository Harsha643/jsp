
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

            let loadin=document.getElementsByClassName("loadersave")[0]
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



let  draftbtn= document.getElementById("draftdisplay")
draftbtn.addEventListener("click",(e)=>{
    e.preventDefault()
    window.location.href="./draft.html"
    
})
/////////////////////////////////////////////////// fetching data


async function fetchingData() {
  try {
    let response = await fetch("https://pouncing-scarlet-cesium.glitch.me/meals");
    if (!response.ok) {
      throw new Error("Data is not found");
    }
    let data = await response.json();
    displayData(data);
    // console.log(data)

  } catch (err) {
    alert("Data fetch failed");
    console.error(err);
  }
}

fetchingData();
let bodyna=document.getElementById("bodyna")
// bodyna.style.display="none"
// displayrecipes
function displayData(data) {
  const categoryData = {};

  const countryData = {};

  let loading=document.getElementsByClassName("loader")[0]
loading.style.display="block"


 setTimeout(()=>{
  bodyna.style.display="block"
  loading.style.display="none"
  catdata(categoryData)
 },3000)


  data.forEach((element) => {
    // categoryData appending
    if (element.Category) {
      if (!categoryData[element.Category]) {
        categoryData[element.Category] = [];
      }
      categoryData[element.Category].push(element);
    } else {

      console.warn("Element found without a category:", element);
    }

    // countrydata appending
    if (element.Area) {
      // console.log(element.Area)
      if (!countryData[element.Area]) {
        countryData[element.Area] = [];
      }
      countryData[element.Area].push(element);
    } else {

      console.warn("Element found without a category:", element);
    }



  });


  let containerA = document.getElementById("main2container")

  let countryContainer = document.getElementById("footcountry");
  countryContainer.style.backgroundColor = "#ccc"
 

setTimeout(()=>{
  
  if (countryContainer) {
    let allAreas = [];
    for (const country in countryData) {
      countryData[country].forEach(element => {
        if (!allAreas.includes(element.Area)) {
          allAreas.push(element.Area);
        }
      });
    }
    // console.log(allAreas)
    const uniqueAreas = [...new Set(allAreas)];
    
    uniqueAreas.forEach((element) => {
       
      const items = document.createElement("h5");
      items.classList.add(`eleitems`);
      items.style.cursor="pointer"
      items.textContent = element || "No Name";
      let  countryFilter=[]



// click the country
items.addEventListener("click", () => {
// console.log("hello")
containerA.innerHTML=""              
        const filteredData =countryData[element];
        filteredData.forEach((ele) => {
          console.log(ele.ingredients)

          let filterdiv = document.createElement("div")
          filterdiv.className="filterdiv"

          if(element==ele.Area){
            countryFilter.push(ele.Area)

          }
          filterdiv.innerHTML = `
          <img src="${ele.image}" width="200px" class="imgopen" data-id="${ele.id}"/>
          <h3>${ele.mealName}</h3>
          <span id="fava" class="favorite-icon"><ion-icon name="heart-outline"></ion-icon></span>
        `;
    
        const favoriteIcon = filterdiv.querySelector(".favorite-icon");
        
        // Check if this meal is already in favorites and set the initial icon state
        const favoriteMeals = JSON.parse(localStorage.getItem("favoriteMeals")) || [];
        const isFavorite = favoriteMeals.some(meal => meal.id === ele.id);
        if (isFavorite) {
          favoriteIcon.querySelector("ion-icon").name = "heart";
        }
    
        favoriteIcon.addEventListener("click", () => {
          let favoriteMeals = JSON.parse(localStorage.getItem("favoriteMeals")) || [];
          const mealIndex = favoriteMeals.findIndex(meal => meal.id === ele.id);
          
          if (mealIndex === -1) {
            // Add to favorites - push the whole meal object, not just the area
            favoriteMeals.push({
              id: ele.id,
              mealName: ele.mealName,
              image: ele.image,
              Category: ele.Area,
              ingredients:ele.ingredients,
              instructions:ele.instructions
              // ingredients:ele.
              // Add any other properties you want to save
            });
            favoriteIcon.querySelector("ion-icon").name = "heart";
          } else {
            // Remove from favorites
            favoriteMeals.splice(mealIndex, 1);
            favoriteIcon.querySelector("ion-icon").name = "heart-outline";
          }
          
          localStorage.setItem("favoriteMeals", JSON.stringify(favoriteMeals));
        });

         let imgOpen =filterdiv .querySelector(".imgopen");
         imgOpen.addEventListener("click", (event1) => {
           event1.preventDefault();
   
           console.log("Image clicked for meal ID:", ele)
           localStorage.setItem("imageitem", JSON.stringify(ele))
           window.location.href = "./image.html"
   
         });

          containerA.append(filterdiv )

        })

        filcon(countryFilter)
      });
      countryContainer.appendChild(items);
    });

  }
  else {
    console.error("Element with ID 'footcountry' not found.");
  }
},5000)
}

// fav
let favopen = document.getElementById("favopen")
favopen.addEventListener("click", () => {
  window.location.href = "./fav.html"

})

// recipes adding
let addRecipes = document.getElementById("addBtn");

let containerInputs = document.getElementById("container-inputs");
containerInputs.style.display="none"

addRecipes.addEventListener("click", () => {
 
// coninput.style.display=coninput.style.display==="none"?"block":"none"
  containerInputs.style.display = containerInputs.style.display === "none" ? "block" : "none";
containerInputs.style.display="grid"
  containerInputs.style.width = "80%";
  containerInputs.style.marginTop = "50px";
  containerInputs.style.gridTemplateColumns = "repeat(2, 1fr)";

});

addRecipes.addEventListener("dblclick",()=>{
  containerInputs.style.display = containerInputs.style.display === "none" ? "block" : "none";

})

let close=document.getElementById("closebtn")
close.style.backgroundColor="red"
close.style.color="white"

close.addEventListener("click",()=>{
  containerInputs.style.display = containerInputs.style.display === "none" ? "block" : "none";

})

// icon
let iconadd = document.getElementById("iconadd");

iconadd.addEventListener("dblclick",()=>{
  containerInputs.style.display = containerInputs.style.display === "none" ? "block" : "none";
containerInputs.style.display="grid"
  containerInputs.style.width = "80%";
  containerInputs.style.marginTop = "50px";
  containerInputs.style.gridTemplateColumns = "repeat(2, 1fr)";
})

iconadd.addEventListener("click",()=>{
  containerInputs.style.display = containerInputs.style.display === "none" ? "block" : "none";
  

})

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

// draft data

let draftdata=document.getElementById("draftdata")
draftdata.addEventListener("click",()=>{
  dSave()
  // console.log("he")
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
    fetchingData();
    clearForm();
  } catch (error) {
    console.error("Save data error", error);
  }
}

// search function

const filterInput = document.getElementById("search");

filterInput.addEventListener("input", () => {
  console.log("hello")
  const filterText = filterInput.value.toLowerCase().trim();
  const mealItems = document.querySelectorAll(".meal-item");

  mealItems.forEach((mealItem) => {
    const mealName = mealItem.querySelector("h4").innerText.toLowerCase();
    const categoryElement = mealItem.querySelector("h4:nth-child(2)");
    const category = categoryElement ? categoryElement.innerText.toLowerCase() : "";
    const countryElement = mealItem.querySelector("h4:nth-child(3)");
    const country = countryElement ? countryElement.innerText.toLowerCase() : "";

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



// imageopen 



// category recipes
function catdata(categoryData) {
  // console.log(categoryData)// console.log(categoryData)
  const container = document.getElementById("maincontainer");
  const subcontainer2=document.getElementById("subcontainer2")
  subcontainer2.innerHTML = ``;

  // categotydata  
  for (const category in categoryData) {
    // console.log(category)
    const categoryContainer = document.createElement("div");   
    let catName = document.createElement("div")
    catName.classList.add("catName");
    catName.innerHTML = `<h2>${category}</h2>`
    subcontainer2.appendChild(catName)
    categoryContainer.classList.add("category-container");

    categoryData[category].forEach((element) => {
      const item = document.createElement("div");
      item.classList.add("meal-item");


      item.innerHTML = `
        <img src="${element.image}" width="200px" class="imgopen" data-id="${element.id}">
        <h4>${element.mealName}</h4>
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


      subcontainer2.appendChild(categoryContainer);

      if (Object.keys(categoryData).length === 0) {
        subcontainer2.innerHTML = "No meals found.";
      }

      // click image  details
      let imgOpen = item.querySelector(".imgopen");
      imgOpen.addEventListener("click", (event1) => {
        event1.preventDefault();

        console.log("Image clicked for meal ID:", element)
        localStorage.setItem("imageitem", JSON.stringify(element))
        window.location.href = "./image.html"

      });



    });


    subcontainer2.appendChild(categoryContainer);
  }

  if (Object.keys(categoryData).length === 0) {
   subcontainer2.innerHTML = "No meals found.";
  }

}


// displaying country recipes
function filcon(countryFilter){
  // console.log(countryFilter)

  let singlecountry=[...new Set(countryFilter)]
  let single = singlecountry.join(", "); 
  let inner=document.getElementById("inner")
  inner.innerHTML = ""; 
  inner.style.padding="30px"

    console.log(single)
    let filterh1=document.createElement("h1")
  filterh1.innerText=`${single} recipes`

    inner.appendChild(filterh1)

}

         

