
async function fetching() {
    try {
      let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
      if (!response.ok) {
        throw new Error("Data is not found");
      }
      let data = await response.json();
      console.log(data)
      displayData(data.categories);
    
    } catch (err) {
      alert("Data fetch failed");
      console.error(err);
    }
  }
fetching()  

function displayData(data){
    // console.log(data)
    let container=document.getElementById("recipe-display")
    let subdiv=document.createElement("div")
    subdiv.className="scrollright"

    data.forEach(element => {
        // console.log(element)
        let items=document.createElement("div")
        items.className="scroll"
        items.innerHTML=
        `
        <img src="${element.strCategoryThumb}" width="300px">
        <h3>${element.strCategory}</h3>
        <p>${element.strCategoryDescription}</p>

        `
        subdiv.append(items)
        
        
    });
    container.append(subdiv)

}


/////////////////////////////////////////////////////////////////////fatching data/////////////////////



async function fetchingData() {
    const search = document.getElementById("input-country").value.trim(); // Get and trim search input
    search.innerText=""
        
    try {
      // Use the `search` value dynamically to fetch recipes for a specific country
      let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${search || "Indian"}`
      );
      if (!response.ok) {
        throw new Error("Data is not found");
      }
      let data = await response.json();
      displayDatas(data.meals); // Pass the fetched meals to display function
    } catch (err) {
      alert("Data fetch failed");
      console.error(err);
    }
  }
  
  // Call the fetchingData function
  fetchingData();
  
  function displayDatas(data) {
    console.log(data);
  
    // Clear previous content before appending new items
    const container = document.getElementById("recipe-displays");
    container.innerHTML = ""; // Clear existing content
  
    // Create a scrollable container
    
    const subdiv = document.createElement("div");
    subdiv.className = "scrollright";
  
    // Iterate through the meal data and display each item
    data.forEach((element) => {
      console.log(element);
      
      const item = document.createElement("div");
      item.className = "scroll";
  
      item.innerHTML = `
      
      <img src="${element.strMealThumb}" width="300px" alt="${element.strMeal}">
        <h3>${element.strMeal}</h3>
    
        
       
      `;
  
      subdiv.appendChild(item); // Append the item to the scrollable container
    });
  
    container.appendChild(subdiv); // Add the scrollable container to the main container
  }
  



  ///////home///////////

  // let home =document.getElementById("home")
  //   // home.style.display="block"
  // let header=document.getElementById("recipes-details")
  // home.addEventListener("click",home=>{
  // home.style.display="block"
  // header.style.display="none"
    
  // })

let home=document.getElementById("home1")

let homeLink = document.getElementById("home"); // More descriptive variable name
let recipesDetails = document.getElementById("recipes-details");
let about=document.getElementById("abouta")
let aboutUs=document.getElementById("about")
let cont=document.getElementById("cont")
let contactUs=document.getElementById("contact")


home.addEventListener("click", function(event) { 
      event.preventDefault(); 
    homeLink.style.display = "block"; 
    recipesDetails.style.display = "none";
     aboutUs.style.display="none"
       contactUs.style.display="none"
  });

  about.addEventListener("click", function(event) { 
    event.preventDefault(); 
    aboutUs.style.display="block"
      contactUs.style.display="none"
        homeLink.style.display = "none"; 
  recipesDetails.style.display = "none";
});

cont.addEventListener("click",(eventa)=>{
  eventa.preventDefault(); 
  aboutUs.style.display="none"
  contactUs.style.display="block"
  homeLink.style.display = "none"; 
recipesDetails.style.display = "none";

})
 const animatedLetters = document.querySelectorAll('.animated-letter');

animatedLetters.forEach((letter, index) => {
    letter.style.animationDelay = `${index * 0.2}s`;
}); 