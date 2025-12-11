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
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
        <button onclick="loadCategoriesVideos(${item.category_id})" class="btn">${item.category}</button>
    `;

    categories.appendChild(buttonContainer);
  });
};

// create loadCategoriesVideos(); function 
const loadCategoriesVideos = (id) => {
  
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then( data => displayVideos(data.category))
    .catch((error) => console.log("Cannot find data", error));
}

// create loadVideos function
const loadVideos = () => {
  // fetch videos api
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log("Cannot find data", error));
};

loadVideos();

// get time function 
function getTimeString(timeInSeconds) {
    const hour = Math.floor(timeInSeconds / 3600);
    let remainingSeconds = timeInSeconds % 3600;
    const minute = Math.floor(remainingSeconds / 60);
    remainingSeconds = remainingSeconds % 60;

    return `${hour} hr ${minute} min ${remainingSeconds} sec ago`;
}

// create displayVideos function
const displayVideos = (data) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = '';

  if (data.length === 0) {
    videoContainer.classList.remove('grid');
    videoContainer.innerHTML = `
      <div class="min-h-[300px] flex flex-col justify-center items-center">
        <img src="./Assets/icon.png" />
        <h2 class="text-center text-xl font-bold">No Content Here in this Category</h2>
      </div>
    `;
    return;
  }
  else{
    videoContainer.classList.add('grid');
  }

  data.forEach((video) => {
    // console.log(video);

    const videoDiv = document.createElement("div");
    videoDiv.classList = "card";
    videoDiv.innerHTML = `
          <figure class="h-[200px] relative">
                <img
                class="h-full w-full object-cover rounded-md"
                src=${video.thumbnail}
                alt="Shoes" />

                ${video.others.posted_date?.length ===  0 ? "" : `<span class="absolute right-2 bottom-2 bg-black text-white text-xs p-1 rounded">${getTimeString(video.others.posted_date)}</span>`}
                
          </figure>
          <div class="py-4 flex gap-2">

                <div>
                    <img class="h-10 w-10 object-cover rounded-full" src=${video.authors[0].profile_picture} />
                </div>

                <div>
                    <h2 class="font-bold">${video.title}</h2>
                    <div class="flex items-center gap-2">
                        <p class="text-sm text-gray-400">${video.authors[0].profile_name}</p>
                        ${video.authors[0].verified ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" />` : ""}
                    </div>
                    <p></p>
                </div>

          </div>
        `;

        videoContainer.append(videoDiv);
  });
};


