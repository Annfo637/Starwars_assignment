/*** The script fetches all pages from an API,
 * displays the items and has functions for searching the items
 * and toggling further information about the items. ***/

const startUrl = "https://swapi.dev/api/people/";

const itemsContainer = document.querySelector("#characters");
const searchInput = document.querySelector("#searchinput");

// Make sure search field is empty if user reloads page
searchInput.value = "";

// Array to store character objects
let charArray = [];

getAllPages(startUrl);

// Loop through every page of the API
function getAllPages(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Loop through the characters
      data.results.map((person) => {
        charArray.push(person);
      });
      // Check if API contains more pages
      if (data.next !== null) {
        getAllPages(data.next);
      } else {
        // Draw all the characters
        displayCharacters(charArray);
      }

      function displayCharacters(arr) {
        console.log("hej");
        itemsContainer.innerHTML = "";

        arr.forEach(function (item) {
          let character = document.createElement("div");
          character.classList.add("character");
          let name = document.createElement("span");
          name.classList.add("character__name");
          name.addEventListener("click", toggleProps);
          let charProps = document.createElement("div");
          charProps.classList.add("character__props");
          charProps.classList.add("hide");
          let height = document.createElement("p");
          let eyecolor = document.createElement("p");
          let birthYear = document.createElement("p");

          name.textContent = item.name;
          height.textContent = "Height: " + item.height;
          eyecolor.textContent = "Color of eyes: " + item.eye_color;
          birthYear.textContent = "Birthyear: " + item.birth_year;

          // Append elements to the DOM
          charProps.appendChild(height);
          charProps.appendChild(eyecolor);
          charProps.appendChild(birthYear);

          character.appendChild(name);
          character.appendChild(charProps);

          itemsContainer.appendChild(character);
        });
      }

      searchInput.addEventListener("input", filterCharacters);

      // Filter characters from search input
      function filterCharacters() {
        let searchStr = searchInput.value.toLowerCase();
        let filteredArr = charArray.filter(function (item) {
          return item.name.toLowerCase().includes(searchStr);
        });
        displayCharacters(filteredArr);
      }

      function toggleProps(e) {
        let currentChar = e.currentTarget;
        let currentProps = currentChar.nextSibling;
        currentProps.classList.toggle("hide");
      }
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
}
