
let addRecipes = document.getElementById("admin");
let containerInputs = document.getElementById("container-inputs");

addRecipes.addEventListener("dblclick", () => {
  containerInputs.style.display = "grid"; // Set grid layout
  containerInputs.style.width = "80%";
  containerInputs.style.marginTop = "50px";
  containerInputs.style.gridTemplateColumns = "repeat(2, 1fr)";
});

addRecipes.addEventListener("click", () => {
  containerInputs.style.display = "none"; // Hide the container
});

async function fetching() {
  try {
    let response = await fetch("https://pouncing-scarlet-cesium.glitch.me/meals");
    if (!response.ok) {
      throw new Error("Data is not found");
    }
    let data = await response.json();
    displayData(data);
    localStorage.setItem("meals", JSON.stringify(data));
  } catch (err) {
    alert("Data fetch failed");
    console.error(err);
  }
}



fetching();

function displayData(data) {
  let container = document.getElementById("maincontainer");
  container.innerHTML = ""; // Clear the container

  data.forEach((element) => {
    let div = document.createElement("div");
    div.id = "subcon";

    let item = document.createElement("div");
    item.id = "item";

    let mealname = document.createElement("div");
    mealname.id = "mealname";

    let category = document.createElement("div");
    category.id = "category";

    let country = document.createElement("div");
    country.id = "country";

    item.innerHTML = `
      <img src="${element.image}" width=300px>
    `;

    mealname.innerHTML = `
      <p>MealName: ${element.mealName}</p>
      <p>Category: ${element.Category}</p>
      <p>Country: ${element.Area}</p>
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

    let del = document.getElementById(`del-${element.id}`);
    if (del) {
      del.addEventListener("click", () => {
        deleteData(element.id);
      });
    }

    let edit = document.getElementById(`edit-${element.id}`);
    if (edit) {
      edit.addEventListener("click", () => {
        containerInputs.style.display = "grid";
        containerInputs.style.width = "80%";
        containerInputs.style.marginTop = "50px";
        containerInputs.style.gridTemplateColumns = "repeat(2, 1fr)";

        editData(element.id);
      });
    }
  });

}





///delete function
async function deleteData(id) {
  try {
    let response = await fetch(`https://pouncing-scarlet-cesium.glitch.me/meals/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    alert("Item deleted successfully");
    fetching(); // Refresh data after deletion
  } catch (err) {
    console.error("Delete failed", err);
  }
}

async function editData(id) {
  try {
    let response = await fetch(`https://pouncing-scarlet-cesium.glitch.me/meals/${id}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    let recipe = await response.json();
    document.getElementById("id").value = recipe.id;
    document.getElementById("mealname").value = recipe.mealName;
    document.getElementById("category").value = recipe.Category;
    document.getElementById("country").value = recipe.Area;
    document.getElementById("imageUrl").value = recipe.image;
    document.getElementById("ingredient").value = recipe.ingredients.join("\n");
    document.getElementById("Instructions").value = recipe.instructions;

    let form = document.getElementById("head");
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    console.error("Edit data error", error);
  }
}

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
      field.style.outline = "2px solid red";
      isValid = false;
    } else {
      errorField.innerText = "";
      field.style.outline = "";
    }
  });

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
}

async function saveData() {
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
    let method = recipeId ? "PUT" : "POST";
    let url = recipeId
      ? `https://pouncing-scarlet-cesium.glitch.me/meals/${recipeId}`
      : `https://pouncing-scarlet-cesium.glitch.me/meals`;
    let response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    alert(recipeId ? "Data updated successfully" : "Data saved successfully");
    fetching(); // Refresh data after saving
    clearForm();
  } catch (error) {
    console.error("Save data error", error);
  }
}


const filterInput = document.getElementById("search");

filterInput.addEventListener("input", () => {
  const filterText = filterInput.value.toLowerCase().trim(); // Get the filter text
  const recipes = document.querySelectorAll("#maincontainer > div"); // Select all recipe cards

  recipes.forEach((recipe) => {
    // Select the text content of the meal name, category, and country
    const mealNameElement = recipe.querySelector("#mealname p:first-child");
    const categoryElement = recipe.querySelector("#mealname p:nth-child(2)");
    const countryElement = recipe.querySelector("#mealname p:nth-child(3)");

    // Extract text values and convert to lowercase
    const name = mealNameElement?.innerText.toLowerCase() || "";
    const category = categoryElement?.innerText.toLowerCase() || "";
    const country = countryElement?.innerText.toLowerCase() || "";

    // Check if the filter text matches any of the fields
    if (name.includes(filterText) || category.includes(filterText) || country.includes(filterText)) {
      recipe.style.display = "block"; // Show the recipe
    } else {
      recipe.style.display = "none"; // Hide the recipe
    }
  });
});


