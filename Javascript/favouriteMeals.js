console.log("Script Loaded");

//Display All Favourite Items Once DOM Gets Loaded
document.addEventListener("DOMContentLoaded", () => {
  let meals = JSON.parse(localStorage.getItem("meals"));
  meals.forEach((meal) => {
    const favMealsDisplay = document.querySelector("#favouriteMeals");
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.style.width = "18rem";
    cardDiv.style.marginLeft = "50px";
    cardDiv.style.marginTop = "80px";
    cardDiv.style.height = "26rem";
    const mealImage = document.createElement("img");
    mealImage.classList.add("card-img-top");
    Object.entries({ src: `${meal["meal-image"]}`, alt: "Meal Image" }).forEach(
      (kv) => {
        mealImage.setAttribute(kv[0], kv[1]);
      }
    );
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const p = document.createElement("p");
    p.classList.add("card-text");
    p.classList.add("text-center");
    p.textContent = `${meal["meal-name"]}`;
    cardBody.appendChild(p);
    const removeMealButton = document.createElement("button");
    removeMealButton.classList.add("btn");
    removeMealButton.classList.add("btn-danger");
    removeMealButton.textContent = `Remove Meal From Favourites`;
    removeMealButton.addEventListener("click", (event) => {
      event.preventDefault();
      const parentElement = event.target.parentElement;

      //For Debugging
      console.log(parentElement);

      // Remove the item from the DOM
      parentElement.remove();

      // Remove the item from LocalStorage

      const mealName = parentElement.textContent;

      removeMealFromLocalStorage(mealName);
    });
    cardDiv.append(mealImage, cardBody, removeMealButton);
    favMealsDisplay.appendChild(cardDiv);
  });

  //Remove All Items From The Favourites List
  const removeAllFav = document.querySelector("#removeFavourites");

  removeAllFav.addEventListener("click", (event) => {
    event.preventDefault();

    const favMealsDisplay = document.querySelector("#favouriteMeals");
    favMealsDisplay.innerHTML = ``;

    localStorage.clear();

    console.log("Local Storage Cleared");
  });
});

function removeMealFromLocalStorage(mealName) {
  // Get the stored meals from LocalStorage
  let meals = JSON.parse(localStorage.getItem("meals"));

  // Filter out the meal with the specified ID
  meals = meals.filter((meal) => meal["meal-name"] !== mealName);

  // Update the LocalStorage with the updated meals array
  localStorage.setItem("meals", JSON.stringify(meals));
}
