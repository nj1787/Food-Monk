// console.log(jsonResponse.meals[0].strMealThumb);

console.log("Script Loaded");

let favouriteMeals = [];
const defaultMessage = `Search For A Meal To Be Displayed Here`;
const submitBtn = document.querySelector("#submitButton");
const clearBtn = document.querySelector("#clearSearch");
const parentDiv = document.querySelector("#meals-data-display");
parentDiv.innerHTML = `<h3 class="text-center">${defaultMessage}</h3>`;

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  parentDiv.innerHTML = ``;
  const mealInput = document.querySelector("input");
  var mealName = mealInput.value;
  if (mealName === "") {
    alert("Empty Meal Search Not Allowed");
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

    //For Debugging
    console.log(mealImage);
    console.log(mealRecipe);

    //Create Seperate Section To Show Meal Details
    const childDiv = document.createElement("div");

    childDiv.setAttribute("class", "col-sm-12 col-md-12 col-lg-12");

    //Try To Remove Code Bloat From Here - Refactor This Section
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
    </div>
    <button style="margin-left:30%" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Recipe</button>
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">${mealName} Recipe</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>
              ${mealRecipe}
            </p>
          </div>
        </div>
      </div>
    </div>`;
    //Create Add To Favourite Button and Add Dish To Favourites Upon Clicking
    const addToFav = document.createElement("button");
    addToFav.setAttribute("class", "btn btn-primary");
    addToFav.textContent = "Add to Favourites";
    addToFav.style.marginLeft = "5%";
    childDiv.appendChild(addToFav);
    addToFav.addEventListener("click", () => {
      alert(`${mealName} added to your favourite meals`);
      console.log("Add To Favourite Button Clicked");
      favouriteMeals.push(
        Object.assign({
          "meal-name": mealName,
          "meal-type": vegNonVeg,
          "meal-cusine": cusine,
        })
      );
      console.log(favouriteMeals);
    });
    // //Show Meal Name
    // const displayMealName = document.createElement("h3");
    // displayMealName.setAttribute("class", "text-center");
    // displayMealName.textContent = mealName;
    // //Show Meal Image
    // const mealImg = document.createElement("img");
    // Object.entries({ src: mealImage, class: "img-thumbnail" }).forEach((kv) =>
    //   mealImg.setAttribute(kv[0], kv[1])
    // );
    // mealImg.style.marginLeft = "42%";

    // childDiv.append(displayMealName, mealImg);
    parentDiv.appendChild(childDiv);
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
