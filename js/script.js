// create lodeCategories function
const lodeCategories = () => {
  // fetch categories api
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log("Cannot find data", error));
};

lodeCategories();

// create displayCategories function
const displayCategories = (data) => {
  const categories = document.getElementById("categories");

  data.forEach((item) => {
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;

    categories.appendChild(button);
  });
};

// create loadVideos function
const loadVideos = () => {
  // fetch videos api
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log("Cannot find data", error));
};

loadVideos();

// create displayVideos function
const displayVideos = (data) => {
  const videoContainer = document.getElementById("video-container");

  data.forEach((video) => {
    const videoDiv = document.createElement("div");
    videoDiv.classList = "card";
    videoDiv.innerHTML = `
          <figure>
                <img
                src=${video.thumbnail}
                alt="Shoes" />
          </figure>
          <div class="card-body">
                <h2 class="card-title">Card Title</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
                </div>
          </div>
        `;

        videoContainer.append(videoDiv);
  });
};
