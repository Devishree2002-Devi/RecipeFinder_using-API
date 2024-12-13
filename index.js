let allRecipes = []; // To store all recipes
let currentPage = 1;  // Start from the first page
const recipesPerPage = 10; // Number of recipes to load per page

// Function to fetch recipes with pagination
async function fetchRecipes(page) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=&page=${page}`);
        const data = await response.json();

        if (data.meals) {
            allRecipes = allRecipes.concat(data.meals); // Append new recipes to the existing ones
            displayRecipes(allRecipes); // Display all recipes
        } else {
            document.getElementById('load-more-btn').style.display = 'none'; // Hide button if no more recipes
            document.getElementById('recipe-container').innerHTML = `<p class="text-center">No more recipes found.</p>`;
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);
        alert('Failed to fetch recipes. Please try again later.');
    }
}

// Function to display recipes
function displayRecipes(recipes) {
    const recipeContainer = document.getElementById('recipe-container');
    recipeContainer.innerHTML = ''; // Clear previous recipes

    recipes.forEach(meal => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';  // Bootstrap grid for responsiveness
        card.innerHTML = `
                    <div class="card" style="width: 18rem;">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                        <div class="card-body">
                            <h5 class="card-title">${meal.strMeal}</h5>
                            <p class="card-text">A recipe from ${meal.strArea} cuisine.</p>
                            <a href="${meal.strYoutube}" target="_blank" class="btn btn-primary">Watch Recipe</a>
                        </div>
                    </div>
                `;
        recipeContainer.appendChild(card);
    });
}

// Event listener for search bar
document.getElementById('search-bar').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filteredRecipes = allRecipes.filter(recipe =>
        recipe.strMeal.toLowerCase().includes(query)
    );
    displayRecipes(filteredRecipes); // Display filtered recipes
});

// Event listener for load more button
document.getElementById('load-more-btn').addEventListener('click', () => {
    currentPage++;
    fetchRecipes(currentPage); // Load the next page of recipes
});

// Fetch and display initial recipes on page load
fetchRecipes(currentPage);

