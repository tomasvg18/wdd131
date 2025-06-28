import recipes from './recipes.mjs';

function random(num) {
	return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
	const listLength = list.length;
	const randomNum = random(listLength);
	return list[randomNum];
}

function recipeTemplate(recipe) {
	return `
        <article class="recipe">
            <img class="photo" src="${recipe.image}" alt="Example Recipe">
            <div>
                <div style="border: 1px solid black; display: inline-block; padding: 4px;">
                    ${tagsTemplate(recipe.tags)}
                </div>
                <h2>${recipe.name}</h2>
                ${ratingTemplate(recipe.rating)}
                <p class="description">${recipe.description}</p>
            </div>
        </article>
    `;
}

function tagsTemplate(tags) {
    return tags.join(', ');
}

function ratingTemplate(rating) {
    let html = `<div class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
    for (let i = 0; i < 5; i++) {
        html += `<span aria-hidden="true" class="icon-star">${i < rating ? '⭐' : '☆'}</span>`;
    }
    html += `</div>`;
    return html;
}

function renderRecipes(recipeList) {
  const container = document.getElementById("recipes");   
  const html = recipeList.map(recipeTemplate).join("");   
  container.innerHTML = html;
}

function filterRecipes(query) {
  query = query.toLowerCase().trim();

  const filtered = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(query) ||
    recipe.description.toLowerCase().includes(query) ||
    recipe.tags.find(tag => tag.toLowerCase().includes(query)) ||
    recipe.recipeIngredient.find(ingredient => ingredient.toLowerCase().includes(query))
  );

  const sorted = filtered.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return sorted;
}

function searchHandler(e) {
  e.preventDefault();
  const input = document.querySelector("input[type='search']").value;
  const results = filterRecipes(input);
  renderRecipes(results);
}


function init() {
    const recipe = getRandomListEntry(recipes);
    renderRecipes([recipe]);
}

init();
document.querySelector("form").addEventListener("submit", searchHandler);
