
  let addRecipes=document.getElementById("admin")
  let  containerInputs=document.getElementById("container-inputs")

  addRecipes.addEventListener("dblclick",()=>{
    containerInputs.style.display="block"
    containerInputs.style.display="grid"
    containerInputs.style.width="80%"
    containerInputs.style.marginTop="50px"
    containerInputs.style.gridTemplateColumns="repeat(2,1fr)"
    
    
  })
  addRecipes.addEventListener("click",()=>{
    containerInputs.style.display="none"

  })


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
    console.log(err);
  }
}

fetching();

function displayData(data) {
  let container = document.getElementById("maincontainer");
  container.innerHTML = "";
  

  data.forEach((element) => {
    let div = document.createElement("div");
    div.id = "subcon";
  

    let item = document.createElement("div");
    item.id = "item";

    let mealname = document.createElement("div");
    mealname.id = "mealname";

    let category = document.createElement("div");
    category.id = "category";
    // category.style.display = "none"; // Initially hide instructions

    let country = document.createElement("div");
    country.id = "country";

    item.innerHTML = `
      <img src="${element.image}" width=300px>
    `;

    mealname.innerHTML = `
      <p>MealName:${element.mealName}</p>
      <p>Category:${element.Category}</p>
      <p>Country:${element.Area}</p>
      <button id="instbtn-${element.id}">Instructions</button><br><br>
      <button id="insgrebtn-${element.id}">Ingredients</button>
    `;

    category.innerHTML = `
      <p id="inst-${element.id}">${element.instructions}</p>
    `;

    let ingredientsContainer = document.createElement("div");
    ingredientsContainer.id = "ingre-container";
    ingredientsContainer.style.display = "none"; // Initially hide ingredients

    element.ingredients.forEach((ingredient) => {
      ingredientsContainer.innerHTML += `
        <p id="ingre">${ingredient}</p>
      `;
    });

    //buttons
    country.innerHTML = `
      <button id="del-${element.id}">Delete</button>
      <button id="edit-${element.id}">Edit</button>
    `;

    div.append(item, mealname, category, ingredientsContainer, country);
    container.appendChild(div);

    let instructionsBtn = document.getElementById(`instbtn-${element.id}`);
    if (instructionsBtn) {
      instructionsBtn.addEventListener("click", () => {
        category.style.display = "block"; 
        ingredientsContainer.style.display = "none"; // Hide ingredients when instructions are shown
      });
    }

    let ingredientsBtn = document.getElementById(`insgrebtn-${element.id}`);
    if (ingredientsBtn) {
      ingredientsBtn.addEventListener("click", () => {
        ingredientsContainer.style.display = "block";
        category.style.display = "none"; // Hide instructions when ingredients are shown
      });
    }

    let del=document.getElementById(`del-${element.id}`)

    del.addEventListener("click",() =>{
      console.log(element.id)

      deleteData(element.id)
    })

    let edit=document.getElementById(`edit-${element.id}`)
    edit.addEventListener("click",() =>{
      
      // console.log(element.id)
        containerInputs.style.display="block"
        containerInputs.style.display="grid"
        containerInputs.style.width="80%"
        containerInputs.style.marginTop="50px"
        containerInputs.style.gridTemplateColumns="repeat(2,1fr)"

      editData(element.id)
    })

 
    
  });
}



///delete function
async function deleteData(id){

  let response=await fetch(`http://localhost:3000/meals/${id}`,{method:"DELETE"})
  try{
    if(response.ok){
      throw new err (response.statusText,response.status)

    }
    alert("Are want to delete this item")
  }catch(err){
//  alert("delete data failed")
 console.log(err)
  }
}


// edit function
async function editData(id){

 


  let recipeId=document.getElementById("id")
    let mealname=document.getElementById("mealname")
    let category=document.getElementById("category")
    let Country=document.getElementById("country")
    let imageURL=document.getElementById("imageUrl")
    let ingredient = document.getElementById("ingredient");   
    let instructions = document.getElementById("Instructions");
 

    let response=await fetch(`http://localhost:3000/meals/${id}`)
    try{
        if(!response.ok){
            throw new Error(response.statusText)
   

        }
        let recipe=await response.json()
      console.log(recipe.ingredients.toString())
        console.log(recipe)
        recipeId.value=recipe.id
        mealname.value=recipe.mealName
        category.value=recipe.Category
        Country.value=recipe.Area
        imageURL.value=recipe.image
        ingredient.value=recipe.ingredients.join("\n")
        instructions.value=recipe.instructions


        let form = document.getElementById("head");
      
        form.scrollIntoView({ behavior: "smooth", block: "start" });

    }catch(error){
        alert("editData data error"  + error.message)
        // console.log(error)
 
}

}

function valid() {
  let isValid=true;
  // Get input fields and their error placeholders
  const mealName= document.getElementById("mealname")
  const mealNameError = document.getElementById("MealnameError");
  const category= document.getElementById("category")
  const categoryError = document.getElementById("CategoryError");
  const country= document.getElementById("country")
  const countryError = document.getElementById("countryError");
  const image= document.getElementById("imageUrl")
  const imageError = document.getElementById("imageError");
  const ingredients= document.getElementById("ingredient")
  const ingredientsError= document.getElementById("IngredientsError");
  const instructions= document.getElementById("Instructions")
  const instructionsError= document.getElementById("InstructionsError");

  // Validate name
  if (!mealName.value.trim()) {
    mealNameError.innerText= "mealName is required.";
    mealNameError.style.color="red"
    mealName.style.outline = "1px solid red";
    isValid = false;
}else{
    mealNameError.style.display="none"
    mealName.style.outline = "";
}

// Validate image URL
if (!image.value.trim()) {
    imageError.innerText = "Image URL is required.";
     imageError.style.color="red"
     image.style.outline = "2px solid red";
    isValid = false;
} else if (!isValidURL(image.value.trim())) {
    imageError.innerText = "Enter a valid URL.";
    image.style.outline = "2px solid red";
    isValid = false;
}else{
    imageError.style.display="none"
    image.style.outline = ""
}

if (!instructions.value.trim()) {
    instructionsError.innerText = "instructions is required.";
    instructionsError.style.color="red"
    instructions.style.outline = "2px solid red";
    isValid = false;
}else{
    instructionsError.style.display="none"
    instructions.style.outline = "";
}


if (!ingredients.value.trim()) {
    ingredientsError.innerText = "ingredients is required.";
    ingredientsError.style.color="red"
    ingredients.style.outline = "2px solid red";
    isValid = false;
}else{
  ingredientsError.style.display="none"
  ingredients.style.outline = "";
}

if (!country.value.trim()) {
  countryError.innerText = "country is required.";
  countryError.style.color="red"
  country.style.outline = "2px solid red";
  isValid = false;
}else{
countryError.style.display="none"
country.style.outline = "";
}



if (!category.value.trim()) {
  categoryError.innerText = "category is required.";
  categoryError.style.color="red"
  category.style.outline = "2px solid red";
    isValid = false;
}else{
  categoryError.style.display="none"
  category.style.outline = "";
}

if (!isValid) {
    alert("Please fill out all fields correctly.");
}
return isValid;
}


function isValidURL(string) {
try {
    new URL(string);
    return true;
} catch (_) {
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
 
}

async function saveData() {
  // console.log("hello")
  if (!valid()) {
    alert("Data is not valid");
    return;
  }

  let recipeId = document.getElementById("id").value;
  let mealname = document.getElementById("mealname").value;
  let category = document.getElementById("category").value;
  let country = document.getElementById("country").value;
  let imageURL = document.getElementById("imageUrl").value;
  let ingredients = document.getElementById("ingredient").value.split("\n");
  let instructions=document.getElementById("Instructions").value;

  let obj = {
    "mealName": mealname,
    "Category": category,
    "Area": country,
    "instructions": instructions,
    "image": imageURL,
    "ingredients": ingredients,
  };

  let method = recipeId ? "PUT" : "POST";
  let url = recipeId
    ? `http://localhost:3000/meals/${recipeId}`
    : `http://localhost:3000/meals`;

  let response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  try {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    alert("Data updated successfully");
    // fetching(); 
    clearForm() 
  } catch (error) {
    console.error(error);
  }
}

////filter 

const filterInput = document.getElementById("search");

filterInput.addEventListener("input", () => {
    const filterText = filterInput.value.toLowerCase();
    const recipes = document.querySelectorAll("#maincontainer > div");

    recipes.forEach((recipe) => {
        const mealNameElement = recipe.querySelector("#mealname p:first-child");
        const categoryElement = recipe.querySelector("#mealname p:nth-child(2)");
        const countryElement = recipe.querySelector("#mealname p:nth-child(3)");

        const name = mealNameElement ? mealNameElement.innerText.toLowerCase() : "";
        const category = categoryElement ? categoryElement.innerText.toLowerCase() : "";
        const country = countryElement ? countryElement.innerText.toLowerCase() : "";

        if (
            name.includes(filterText) || 
            category.includes(filterText) || 
            country.includes(filterText)
        ) {
            recipe.style.display = "block";
        } else {
            recipe.style.display = "none";
        }
    });
});



  async function fetchData() {
    
    let response = await fetch("http://localhost:3000/meals");
    let meals = await response.json();
    console.log(meals.Category)
   
  }
  
  