// console.log(jsonResponse.meals[0].strMealThumb);

console.log("Script Loaded");

const submitBtn = document.querySelector("#submitButton");
const parentDiv = document.querySelector("#meals-data-display");

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
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
    console.log(mealImage);
    //Create Seperate Section To Show Meal Details
    const childDiv = document.createElement("div");
    childDiv.setAttribute("class", "col-sm-12 col-md-12 col-lg-12");

    childDiv.innerHTML = `<div class="card mb-3" style="max-width: 540px;margin-left: 29%">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${mealImage}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${mealName}</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
  </div>`;

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

//
//function showMealName(){}
