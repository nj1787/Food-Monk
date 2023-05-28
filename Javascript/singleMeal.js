console.log("Script Loaded");

//Display Meal Name
const mealName = document.querySelector("#mealName");
mealName.textContent = localStorage.getItem("temp-meal-name");

//Display Meal Image
const mealImageContainer = document.querySelector("#mealImage");
const thumbnailImage = document.querySelector("#thumbnailImage");

thumbnailImage.classList.add("img-thumbnail");
thumbnailImage.alt = "Meal Image";
thumbnailImage.src = localStorage.getItem("temp-meal-image");
thumbnailImage.style.width = "350px";
thumbnailImage.style.height = "350px";
thumbnailImage.style.marginLeft = "38%";
thumbnailImage.style.marginTop = "15%";

//Display Meal Ingredients
const mealIngredients = document.querySelector("#mealIngredients");
const ingredientList = document.createElement("ul");
ingredientList.setAttribute("class", "list-group");
ingredientList.style.maxWidth = "30%";
ingredientList.style.marginLeft = "37%";
ingredientList.style.marginTop = "10%";
ingredientList.style.textAlign = "center";
ingredientList.innerHTML = `
<li class="list-group-item">${localStorage.getItem(
  "temp-meal-ingredient1"
)}</li>
<li class="list-group-item">${localStorage.getItem(
  "temp-meal-ingredient2"
)}</li>
<li class="list-group-item">${localStorage.getItem(
  "temp-meal-ingredient3"
)}</li>
`;
mealIngredients.appendChild(ingredientList);

//Display Meal Recipe
const mealRecipe = document.querySelector("#mealRecipe");
const recipe = document.createElement("p");
recipe.classList.add("border");
recipe.style.maxWidth = "780px";
recipe.style.marginLeft = "350px";
recipe.style.marginTop = "70px";
recipe.style.padding = "35px";
recipe.textContent = localStorage.getItem("temp-meal-recipe");
recipe.style.backgroundColor = "#e9ecef";
mealRecipe.appendChild(recipe);

//Upon Clicking Home Button Data Displayed On This Page Would Be Removed From Local Storage
const homeButton = document.querySelector("#homeButton");
homeButton.addEventListener("click", (event) => {
  //   event.preventDefault();

  localStorage.removeItem("temp-meal-name");
  localStorage.removeItem("temp-meal-image");
  localStorage.removeItem("temp-meal-recipe");
  localStorage.removeItem("temp-meal-ingredient1");
  localStorage.removeItem("temp-meal-ingredient2");
  localStorage.removeItem("temp-meal-ingredient3");
  //For Debugging
  console.log("Home Button Clicked");
});
