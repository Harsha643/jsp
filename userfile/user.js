async function fetching() {
  try {
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    if (!response.ok) {
      throw new Error("Data is not found");
    }
    let data = await response.json();
    displayData(data.categories);
  } catch (err) {
    alert("Data fetch failed");
    console.error(err);
  }
}
fetching();

function displayData(data) {
  let container = document.getElementById("recipe-display");
  let subdiv = document.createElement("div");
  subdiv.className = "scrollright";

  data.forEach((element) => {
    let items = document.createElement("div");
    items.className = "scroll";
    items.innerHTML = `
      <img src="${element.strCategoryThumb}" width="300px" id="route">
      <h3 id="nav">${element.strCategory}</h3>
      <p id="nav1">${element.strCategoryDescription}</p>
    `;

    // Add event listener to the image
    let image = items.querySelector("#route");
    image.addEventListener("click", () => {
      window.location.href = "./signin.html";
    });

    subdiv.append(items);
  });

  container.append(subdiv);
}

async function fetchingData() {
  const search = document.getElementById("input-country").value.trim();
  search.innerText = "";

  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${search || "Indian"}`
    );
    if (!response.ok) {
      throw new Error("Data is not found");
    }
    let data = await response.json();
    displayDatas(data.meals);
  } catch (err) {
    alert("Data fetch failed");
    console.error(err);
  }
}

fetchingData();

function displayDatas(data) {
  const container = document.getElementById("recipe-displays");
  container.innerHTML = "";

  const subdiv = document.createElement("div");
  subdiv.className = "scrollright";

  data.forEach((element) => {
    const item = document.createElement("div");
    item.className = "scroll";

    item.innerHTML = `
      <img src="${element.strMealThumb}" width="300px" alt="${element.strMeal}">
      <h3>${element.strMeal}</h3>
    `;

    // Add event listener to the image
    let image = item.querySelector("img");
    image.addEventListener("click", () => {
      window.location.href = "./signin.html";
    });

    subdiv.appendChild(item);
  });

  container.appendChild(subdiv);
}

// Other event listeners for navigation
let home = document.getElementById("home1");
let homeLink = document.getElementById("home");
let recipesDetails = document.getElementById("recipes-details");
let about = document.getElementById("abouta");
let aboutUs = document.getElementById("about");
let cont = document.getElementById("cont");
let contactUs = document.getElementById("contact");

home.addEventListener("click", function (event) {
  event.preventDefault();
  homeLink.style.display = "block";
  recipesDetails.style.display = "none";
  aboutUs.style.display = "none";
  contactUs.style.display = "none";
});

about.addEventListener("click", function (event) {
  event.preventDefault();
  aboutUs.style.display = "block";
  contactUs.style.display = "none";
  homeLink.style.display = "none";
  recipesDetails.style.display = "none";
});

cont.addEventListener("click", (eventa) => {
  eventa.preventDefault();
  aboutUs.style.display = "none";
  contactUs.style.display = "block";
  homeLink.style.display = "none";
  recipesDetails.style.display = "none";
});

let recipeid = document.getElementById("image");

recipeid.addEventListener("click", (eventa) => {
  eventa.preventDefault();
  aboutUs.style.display = "none";
  contactUs.style.display = "none";
  homeLink.style.display = "none";
  recipesDetails.style.display = "block";
});

let loginbtn = document.getElementById("login");

loginbtn.addEventListener("click", (e) => {
  e.preventDefault();
  location.href = "./signin.html";
});

let signupbtn = document.getElementById("sgnup");
signupbtn.addEventListener("click", (e) => {
  e.preventDefault();
  location.href = "./signup.html";
});