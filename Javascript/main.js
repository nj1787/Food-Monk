// console.log(jsonResponse.meals[0].strMealThumb);

console.log("Script Loaded");

// let favouriteMeals = [];
const defaultMessage = `Search For A Meal To Be Displayed Here`;
const submitBtn = document.querySelector("#submitButton");
const clearBtn = document.querySelector("#clearSearch");
const parentDiv = document.querySelector("#meals-data-display");
parentDiv.innerHTML = `<h3 class="text-center" style="margin-top:5%">${defaultMessage}</h3>`;

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  parentDiv.innerHTML = ``;
  const mealInput = document.querySelector("input");
  const mealName = mealInput.value;
  if (mealName === "") {
    alert("Empty Meal Search Not Allowed");
    parentDiv.innerHTML = `<h3 class="text-center" style="margin-top:5%">${defaultMessage}</h3>`;
    return;
  }

  //Fetch Data From The API
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    var jsonResponse = JSON.parse(xhrRequest.response);

    const mealImage = String(jsonResponse.meals[0].strMealThumb) + "/preview";
    const mealRecipe = String(jsonResponse.meals[0].strInstructions);
    const vegNonVeg = String(jsonResponse.meals[0].strCategory);
    const cusine = String(jsonResponse.meals[0].strArea);
    const mealIngredient1 = String(jsonResponse.meals[0].strIngredient1);
    const mealIngredient2 = String(jsonResponse.meals[0].strIngredient2);
    const mealIngredient3 = String(jsonResponse.meals[0].strIngredient3);

    //For Debugging
    console.log(mealImage);
    console.log(mealRecipe);

    //Create Seperate Section To Show Meal Details
    const childDiv = document.createElement("div");

    childDiv.setAttribute("class", "col-sm-12 col-md-12 col-lg-12");

    childDiv.innerHTML = `
    <div class="card mb-3" style="max-width: 540px;margin-left: 29%">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${mealImage}" class="img-fluid rounded-start" alt="DishImage">
        </div>
        <div class="col-md-8">
          <div style="background-color:goldenrod" class="card-body">
            <h2 class="card-title">${mealName}</h2>
            <h3 class="card-text my-5">
              ${vegNonVeg} Dish of ${cusine} Cuisine.
            </h3>
          </div>
        </div>
      </div>
    </div>`;

    /*Create A Button Group Where Both Buttons Would Be Displayed*/
    const buttonGroup = document.createElement("div");
    // buttonGroup.setAttribute("class", "d-grid gap-2 d-md-block");
    // buttonGroup.style.marginLeft = "25%";

    /*Show Details Button*/
    const detailsPageLink = document.createElement("a");
    detailsPageLink.setAttribute("href", "../HTML/singleMeal.html");
    const detailsButton = document.createElement("button");
    detailsButton.setAttribute("class", "btn btn-primary");
    detailsButton.style.marginLeft = "35%";
    detailsButton.textContent = `Show Details`;
    detailsPageLink.appendChild(detailsButton);

    /*Add The Meal Details To Local Storage Once The Show Details Button Clicked*/
    detailsButton.addEventListener("click", (event) => {
      // event.preventDefault();

      localStorage.setItem("temp-meal-name", mealName);
      localStorage.setItem("temp-meal-image", mealImage);
      localStorage.setItem("temp-meal-recipe", mealRecipe);
      localStorage.setItem("temp-meal-ingredient1", mealIngredient1);
      localStorage.setItem("temp-meal-ingredient2", mealIngredient2);
      localStorage.setItem("temp-meal-ingredient3", mealIngredient3);

      //For Debugging
      console.log("Show Details Button Clicked");
    });

    /*Add To Favourites Button*/
    const favouriteButton = document.createElement("button");
    favouriteButton.setAttribute("class", "btn btn-primary");
    favouriteButton.style.marginLeft = "5%";
    favouriteButton.textContent = `Add To Favourites`;

    /*Add Meal To The Favourites List Upon Button Click*/
    favouriteButton.addEventListener("click", (event) => {
      // event.preventDefault();

      var existingDataString = localStorage.getItem("meals");
      var existingData = existingDataString
        ? JSON.parse(existingDataString)
        : [];

      var mealsData = {
        "meal-name": mealName,
        "meal-image": mealImage,
      };

      existingData.push(mealsData);

      var mealsDataString = JSON.stringify(existingData);

      localStorage.setItem("meals", mealsDataString);

      //For Debugging
      console.log("Add To Favourites Button Clicked");

      alert("Meal Added To Your Favourites");
      //For Debugging
      // console.log(favouriteMeals);
      console.log(mealsDataString);
    });
    buttonGroup.append(detailsPageLink, favouriteButton);
    parentDiv.append(childDiv, buttonGroup);
  };

  xhrRequest.open(
    "get",
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`,
    true
  );
  xhrRequest.send();
});

clearBtn.addEventListener("click", () => {
  parentDiv.innerHTML = `<h3>${defaultMessage}</h3>`;
});
