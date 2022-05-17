/* import { postNewPost } from "./app.js"; */
//Things that directly affect the DOM, event listeners etc

const btnPost = document.querySelector(".button1");
const generalTitle = document.querySelector("#general-title");
const generalBody = document.querySelector("#general-body");
const generalPosts = document.querySelector(".general-posts");
const attractionsPosts = document.querySelector(".attractions-posts");
const placesPosts = document.querySelector(".places-posts");

//Adding all posts that are on server on load

getAllPosts("general");
getAllPosts("attractions");
getAllPosts("places");

//Event listeners

btnPost.addEventListener("click", (e) => {
  e.preventDefault();
  let dataType = e.target.id;

  const postData = {
    title: eval(`${dataType + "Title"}`).value,
    body: eval(`${dataType + "Body"}`).value,
  };
  postNewPost(dataType, postData);

  eval(`${dataType + "Title"}`).value = "";
  eval(`${dataType + "Body"}`).value = "";
});

//Functions

//Getting all posts on load

function getAllPosts(dataType) {
  fetch(`http://localhost:3000/${dataType}`)
    .then((r) => r.json())
    .then((allPostData) => {
      allPostData.forEach((post) => {
        append(dataType, post);
      });
    });
}

//Adding a new post

function postNewPost(dataType, post) {
  const options = {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(`http://localhost:3000/${dataType}`, options)
    .then((r) => r.json())
    .then((postData) => {
      append(dataType, postData);
    })
    .catch(console.warn);
}

//Function that deals with appending the posts to the correct carousel page

function append(dataType, post) {
  let page = Math.ceil(post.id / 3);
  if (post.id % 3 == 1) {
    eval(`${dataType}Posts`).insertAdjacentHTML(
      "beforeend",
      `<div class="carousel-item ${
        page == 1 ? "active" : ""
      }  ${dataType}-${page}"></div>`
    );
    document.querySelector(`.${dataType}-${page}`).insertAdjacentHTML(
      "beforeend",
      ` <div class="card main-card m-3" id="${post.id} "style="width: 18rem;">
                            
                    <div class="card-body">
                      <h5 class="card-title">${post.title}</h5>
                      <p class="card-text">${post.body}</p>
                      <a href="#" class="btn card-button">View the Discussion</a>
                    </div>
              </div>
            `
    );
  } else {
    document.querySelector(`.${dataType}-${page}`).insertAdjacentHTML(
      "beforeend",
      ` <div class="card main-card m-3" id="${post.id} "style="width: 18rem;">
                          
                  <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.body}</p>
                    <a href="#" class="btn card-button">View the Discussion</a>
                  </div>
            </div>
          `
    );
  }
}
