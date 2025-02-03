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
  profile.addEventListener("dblclick",(e)=>{
    e.preventDefault()

    profileContainer.style.display="block"
   


  })
  profile.addEventListener("click",(e)=>{
    e.preventDefault()

    profileContainer.style.display="none"


  })

// displayData
async function fetching() {
  try {
    let response = await fetch("http://localhost:3000/meals");
    if (!response.ok) {
      throw new Error("Data is not found");
    }
    let data = await response.json();
    displayData(data);
  } catch (err) {
    alert("Data fetch failed");
    console.error(err);
  }
}

fetching();

function displayData(data) {
  const categoryData = {};

  data.forEach((element) => {
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

    catName.innerHTML=`<h2>${category}</h2>`
    container.appendChild(catName)
    categoryContainer.classList.add("category-container");
    
    categoryData[category].forEach((element) => {
      const item = document.createElement("div");
    //  console.log(element)
      item.classList.add("meal-item"); 
      item.innerHTML = `
        <img src="${element.image}" width="200px">
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
    });

   
    container.appendChild(categoryContainer);
  }

  if (Object.keys(categoryData).length === 0) {
    container.innerHTML = "No meals found.";
  }

}


