console.log("ChefAI script loaded!");

// =====================================================
// YOUTUBE API KEY
// =====================================================

// Paste your YouTube Data API v3 key here
const YOUTUBE_API_KEY = "AIzaSyD-9jMt3DH4t207rLOTIu7IJxkH_8uBU28";


// =====================================================
// SCROLL TO RECIPE FINDER
// =====================================================

function scrollToFinder() {

    document.getElementById("finder").scrollIntoView({
        behavior: "smooth"
    });

}


// =====================================================
// FIND RECIPES
// =====================================================

function findRecipes() {

    console.log("FIND RECIPES BUTTON CLICKED");

    const ingredients =
        document.getElementById("ingredients").value.trim();

    const cuisine =
        document.getElementById("cuisine").value;

    const cookingTime =
        document.getElementById("time").value;


    console.log("Ingredients:", ingredients);
    console.log("Cuisine:", cuisine);
    console.log("Cooking Time:", cookingTime);


    // Check ingredients

    if (ingredients === "") {

        alert("Please enter your ingredients first!");

        return;
    }


    // Update message

    document.getElementById("result-message").innerText =
        "Recipe recommendation generated successfully!";


    // Show recipe

    document.getElementById("recipe-container").innerHTML = `

        <div class="recipe-card">

            <h2>🥔 Potato Masala</h2>

            <p>
                A simple and delicious recipe based on your available
                ingredients.
            </p>

            <div class="recipe-info">

                <p>
                    <strong>🥕 Your Ingredients:</strong>
                    ${ingredients}
                </p>

                <p>
                    <strong>🍽️ Cuisine:</strong>
                    ${cuisine}
                </p>

                <p>
                    <strong>⏱️ Cooking Time:</strong>
                    ${cookingTime === "Any"
                        ? "Any"
                        : "Under " + cookingTime + " minutes"}
                </p>

            </div>


            <button
                class="view-recipe-btn"
                onclick="searchYouTube()">

                🎥 Find Cooking Video

            </button>

        </div>

    `;


    console.log("Recipe displayed successfully!");
}


// =====================================================
// SEARCH YOUTUBE
// =====================================================

async function searchYouTube() {

    console.log("YOUTUBE SEARCH STARTED");


    const container =
        document.getElementById("recipe-container");


    // Check API key

    if (
        YOUTUBE_API_KEY ===
        "PASTE_YOUR_YOUTUBE_API_KEY_HERE"
    ) {

        container.innerHTML += `

            <div class="error-box">

                <h3>❌ YouTube API Key Missing</h3>

                <p>
                    Please add your YouTube Data API v3 key
                    inside script.js.
                </p>

            </div>

        `;

        return;
    }


    // Show loading

    container.innerHTML += `

        <div class="loading">

            🔎 Searching YouTube for cooking videos...

        </div>

    `;


    // Recipe search query

    const recipeName =
        "Potato Masala cooking recipe";


    // YouTube API URL

    const url =
        "https://www.googleapis.com/youtube/v3/search" +
        "?part=snippet" +
        "&type=video" +
        "&maxResults=6" +
        "&q=" +
        encodeURIComponent(recipeName) +
        "&key=" +
        YOUTUBE_API_KEY;


    console.log("YouTube request started");


    try {

        const response =
            await fetch(url);


        const data =
            await response.json();


        console.log(
            "YouTube response:",
            data
        );


        // API error

        if (!response.ok) {

            throw new Error(
                data.error?.message ||
                "YouTube API request failed"
            );

        }


        // Display videos

        displayVideos(data.items);

    }

    catch (error) {

        console.error(
            "YouTube ERROR:",
            error
        );


        container.innerHTML += `

            <div class="error-box">

                <h3>❌ YouTube Error</h3>

                <p>
                    ${error.message}
                </p>

            </div>

        `;

    }

}


// =====================================================
// DISPLAY YOUTUBE VIDEOS
// =====================================================

function displayVideos(videos) {

    const container =
        document.getElementById("recipe-container");


    if (!videos || videos.length === 0) {

        container.innerHTML += `

            <div class="error-box">

                <h3>😕 No Videos Found</h3>

                <p>
                    We couldn't find a cooking video
                    for this recipe.
                </p>

            </div>

        `;

        return;
    }


    // Remove loading message

    const loading =
        container.querySelector(".loading");

    if (loading) {

        loading.remove();

    }


    // Video section heading

    const heading =
        document.createElement("div");

    heading.className =
        "youtube-heading";

    heading.innerHTML = `

        <h2>🎥 Recommended Cooking Videos</h2>

        <p>
            Watch a step-by-step video to prepare your recipe.
        </p>

    `;

    container.appendChild(heading);


    // Display each video

    videos.forEach(video => {

        const videoId =
            video.id.videoId;

        const title =
            video.snippet.title;

        const channel =
            video.snippet.channelTitle;

        const thumbnail =
            video.snippet.thumbnails.medium.url;


        const videoCard =
            document.createElement("div");

        videoCard.className =
            "video-card";


        videoCard.innerHTML = `

            <img
                src="${thumbnail}"
                alt="Cooking video thumbnail"
            >


            <div class="video-info">

                <h3>
                    ${title}
                </h3>

                <p>
                    📺 ${channel}
                </p>

                <a
                    href="https://www.youtube.com/watch?v=${videoId}"
                    target="_blank"
                    rel="noopener noreferrer">

                    ▶ Watch Video

                </a>

            </div>

        `;


        container.appendChild(videoCard);

    });


    console.log(
        "YouTube videos displayed:",
        videos.length
    );

}