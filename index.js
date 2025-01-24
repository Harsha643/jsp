

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

    let item1 = document.createElement("div");
    item1.id = "item1";

    let item2 = document.createElement("div");
    item2.id = "item2";
    // item2.style.display = "none"; // Initially hide instructions

    let item3 = document.createElement("div");
    item3.id = "item3";

    item.innerHTML = `
      <img src="${element.image}" width=300px>
    `;

    item1.innerHTML = `
      <p>MealName:${element.mealName}</p>
      <p>Category:${element.Category}</p>
      <p>Country:${element.Area}</p>
      <button id="instbtn-${element.id}">Instructions</button><br><br>
      <button id="insgrebtn-${element.id}">Ingredients</button>
    `;

    item2.innerHTML = `
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
    item3.innerHTML = `
      <button id="del-${element.id}">Delete</button>
      <button id="edit-${element.id}">Edit</button>
    `;

    div.append(item, item1, item2, ingredientsContainer, item3);
    container.appendChild(div);

    let instructionsBtn = document.getElementById(`instbtn-${element.id}`);
    if (instructionsBtn) {
      instructionsBtn.addEventListener("click", () => {
        item2.style.display = "block"; 
        ingredientsContainer.style.display = "none"; // Hide ingredients when instructions are shown
      });
    }

    let ingredientsBtn = document.getElementById(`insgrebtn-${element.id}`);
    if (ingredientsBtn) {
      ingredientsBtn.addEventListener("click", () => {
        ingredientsContainer.style.display = "block";
        item2.style.display = "none"; // Hide instructions when ingredients are shown
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

async function editData(id){


  let recipeId=document.getElementById("id")
    let mealname=document.getElementById("item1")
    let category=document.getElementById("item2")
    let Country=document.getElementById("item3")
    let imageURL=document.getElementById("item4")
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
        ingredient.value=recipe.ingredients.join(",\n")
        instructions.value=recipe.instructions


        let form = document.getElementById("container-inputs");
        form.scrollIntoView({ behavior: "smooth", block: "start" });

    }catch(error){
        alert("editData data error"  + error.message)
        // console.log(error)
 
}

}


async function saveData(){
       
  // if(!valid()){
  //     alert("data is not valid")
  //     return;
  // }else{
      
    let recipeId=document.getElementById("id").value
    let mealname=document.getElementById("item1").value
    let category=document.getElementById("item2").value
    let Country=document.getElementById("item3").value
    let imageURL=document.getElementById("item4").value
    let ingredient=document.getElementById("ingredients").value
  let instructions=document.getElementById("instractions").value

let obj={
"mealName":mealname,
"Category":category,
"Area":Country,
"instructions":ingredient,
"image":imageURL,
"ingredients":instructions
}
let  method=recipeId?"PUT":"POST"
let URL=recipeId?`http://localhost:3000/meals/${recipeId}`:`http://localhost:3000/meals`;
let res=await fetch(URL,{
method,
"headers":{
   "content-type":"application/json"
  
},
"body":JSON.stringify(obj)
})
try{
if(!res.ok){
   throw new Error(res.statusText)
}
alert("data updated successfully")
fetching()

}catch(error){
console.error(error)
}

  }

// }





