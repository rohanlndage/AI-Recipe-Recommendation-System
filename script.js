// ==========================================
// DEMO RECIPE DATABASE
// ==========================================

const recipes = [

    {
        name: "Potato Masala",
        description: "A simple and delicious Indian-style potato masala.",
        cuisine: "Indian",
        time: 30,
        difficulty: "Easy",

        ingredients: [
            "3 potatoes",
            "1 onion",
            "2 tomatoes",
            "3 garlic cloves",
            "1 tbsp cooking oil",
            "1 tsp turmeric",
            "1 tsp chilli powder",
            "Salt to taste"
        ],

        steps: [
            "Wash and peel the potatoes.",
            "Cut the potatoes into small pieces.",
            "Heat oil in a pan.",
            "Add chopped onion and garlic.",
            "Cook until the onion becomes golden.",
            "Add chopped tomatoes and cook for 3–4 minutes.",
            "Add turmeric, chilli powder and salt.",
            "Add the potatoes and mix everything well.",
            "Cover the pan and cook for 10–15 minutes.",
            "Serve hot."
        ],

        image:
            "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80"
    },


    {
        name: "Tomato Pasta",
        description: "Quick creamy-style tomato pasta made with simple ingredients.",
        cuisine: "Italian",
        time: 25,
        difficulty: "Easy",

        ingredients: [
            "200g pasta",
            "2 tomatoes",
            "1 onion",
            "3 garlic cloves",
            "1 tbsp oil",
            "1 tsp chilli flakes",
            "Salt",
            "Cheese"
        ],

        steps: [
            "Boil water and cook the pasta.",
            "Drain the pasta and keep it aside.",
            "Heat oil in a pan.",
            "Add chopped garlic and onion.",
            "Cook until soft.",
            "Add chopped tomatoes.",
            "Cook until the tomatoes become soft.",
            "Add chilli flakes and salt.",
            "Add the cooked pasta.",
            "Mix everything together.",
            "Add cheese and serve."
        ],

        image:
            "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80"
    },


    {
        name: "Vegetable Fried Rice",
        description: "Fast and tasty fried rice using vegetables from your kitchen.",
        cuisine: "Chinese",
        time: 25,
        difficulty: "Easy",

        ingredients: [
            "2 cups cooked rice",
            "1 onion",
            "1 carrot",
            "1 capsicum",
            "2 garlic cloves",
            "1 tbsp cooking oil",
            "1 tbsp soy sauce",
            "Salt"
        ],

        steps: [
            "Cook the rice and allow it to cool.",
            "Heat oil in a large pan.",
            "Add garlic and onion.",
            "Add chopped carrot and capsicum.",
            "Stir-fry the vegetables for a few minutes.",
            "Add the cooked rice.",
            "Add soy sauce and salt.",
            "Mix everything on high heat.",
            "Cook for another 2–3 minutes.",
            "Serve hot."
        ],

        image:
            "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80"
    }

];


// ==========================================
// FIND RECIPES
// ==========================================

function findRecipes() {

    const ingredientInput =
        document.getElementById("ingredients").value.toLowerCase();

    const cuisine =
        document.getElementById("cuisine").value;

    const time =
        document.getElementById("time").value;


    if (!ingredientInput.trim()) {

        alert("Please enter some ingredients first.");

        return;
    }


    const ingredients =
        ingredientInput
        .split(",")
        .map(item => item.trim());


    let filteredRecipes = recipes.filter(recipe => {

        const cuisineMatch =
            cuisine === "Any" ||
            recipe.cuisine === cuisine;

        const timeMatch =
            time === "Any" ||
            recipe.time <= Number(time);


        return cuisineMatch && timeMatch;

    });


    /*
        In the demo we display all suitable recipes.

        Later this section will be replaced by our AI API.
    */

    displayRecipes(filteredRecipes);

    document.getElementById("recipes")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ==========================================
// DISPLAY RECIPE CARDS
// ==========================================

function displayRecipes(recipeList) {

    const container =
        document.getElementById("recipe-container");

    const message =
        document.getElementById("result-message");


    container.innerHTML = "";


    if (recipeList.length === 0) {

        message.innerText =
            "No recipes found. Try different preferences.";

        return;
    }


    message.innerText =
        `${recipeList.length} recipes found based on your preferences.`;


    recipeList.forEach((recipe, index) => {

        const card =
            document.createElement("div");

        card.className = "recipe-card";


        card.innerHTML = `

            <div
                class="recipe-image"
                style="background-image:url('${recipe.image}')">
            </div>

            <div class="recipe-content">

                <h3>${recipe.name}</h3>

                <p>
                    ${recipe.description}
                </p>

                <div class="recipe-meta">

                    <span class="meta">
                        ⏱ ${recipe.time} min
                    </span>

                    <span class="meta">
                        ${recipe.difficulty}
                    </span>

                    <span class="meta">
                        ${recipe.cuisine}
                    </span>

                </div>

                <button
                    class="recipe-btn"
                    onclick="showRecipe(${index})">

                    View Recipe →

                </button>

            </div>
        `;


        container.appendChild(card);

    });


    window.currentRecipes = recipeList;
}


// ==========================================
// SHOW SELECTED RECIPE
// ==========================================

function showRecipe(index) {

    const recipe =
        window.currentRecipes[index];


    const details =
        document.getElementById("recipe-details");


    details.innerHTML = `

        <div class="recipe-detail">

            <div class="detail-header">

                <span class="small-title">
                    AI RECIPE
                </span>

                <h2>
                    ${recipe.name}
                </h2>

                <p>
                    ${recipe.description}
                </p>

            </div>


            <div class="detail-body">

                <div>

                    <h3>
                        🥕 Ingredients
                    </h3>

                    <ul class="ingredients-list">

                        ${recipe.ingredients.map(
                            ingredient =>
                            `<li>✓ ${ingredient}</li>`
                        ).join("")}

                    </ul>

                </div>


                <div>

                    <h3>
                        👨‍🍳 Step-by-Step Instructions
                    </h3>

                    <ol class="steps-list">

                        ${recipe.steps.map(
                            step =>
                            `<li>${step}</li>`
                        ).join("")}

                    </ol>

                </div>

            </div>


            <div class="video-section">

                <h3>
                    🎥 How to Cook ${recipe.name}
                </h3>

                <p>
                    Search for a cooking video for this recipe.
                </p>


                <div class="video-search">

                    <input
                        id="videoQuery"
                        value="${recipe.name} recipe cooking"
                    >

                    <button
                        onclick="searchVideo()">

                        🔎 Search Video

                    </button>

                </div>


                <div
                    id="videoResult"
                    class="video-placeholder">

                    <div>

                        <span>▶️</span>

                        <strong>
                            Cooking Video
                        </strong>

                        <p>
                            Click "Search Video" to find
                            a cooking tutorial.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    `;


    details.scrollIntoView({
        behavior: "smooth"
    });

}


// ==========================================
// VIDEO SEARCH DEMO
// ==========================================

function searchVideo() {

    const query =
        document.getElementById("videoQuery").value;


    if (!query.trim()) {

        alert("Enter a recipe name.");

        return;
    }


    /*
        DEMO VERSION

        Later we will replace this with:
        YouTube Data API / another video API.

        We are intentionally NOT putting an API key
        directly into this frontend.
    */


    const searchURL =
        "https://www.youtube.com/results?search_query="
        + encodeURIComponent(query);


    const videoResult =
        document.getElementById("videoResult");


    videoResult.innerHTML = `

        <div>

            <span>🎥</span>

            <strong>
                Video Search Ready
            </strong>

            <p>
                Searching YouTube for:
                <br>
                <b>${query}</b>
            </p>

            <br>

            <button
                onclick="window.open('${searchURL}', '_blank')"
                style="
                    border:none;
                    padding:12px 20px;
                    border-radius:8px;
                    background:#e85b35;
                    color:white;
                    cursor:pointer;
                ">

                Watch Cooking Videos →

            </button>

        </div>

    `;

}


// ==========================================
// SCROLL TO FINDER
// ==========================================

function scrollToFinder() {

    document.getElementById("finder")
        .scrollIntoView({
            behavior: "smooth"
        });

}