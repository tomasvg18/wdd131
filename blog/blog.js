const articles = [
	{
		id: 1,
		title: 'Septimus Heap Book One: Magyk',
		date: 'July 5, 2022',
		description:
			'If you enjoy stories about seventh sons of seventh sons and magyk this is the book for you.',
		imgSrc: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Magkycover2.jpg',
		imgAlt: 'Book cover for Septimus Heap 1',
		ages: '10-14',
		genre: 'Fantasy',
		stars: '****'
	},
	{
		id: 2,
		title: 'Magnus Chase Book One: Sword of Summer',
		date: 'December 12, 2021',
		description:
			'The anticipated new novel by Rick Riordan. After Greek mythology (Percy Jackson), Greek/Roman (Heroes of Olympus), and Egyptian (Kane Chronicles), Rick decides to try his hand with Norse Mythology, and the end result is good.',
		imgSrc:
			'https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300',
		imgAlt: 'Book cover for Magnus Chase 1',
		ages: '12-16',
		genre: 'Fantasy',
		stars: '⭐⭐⭐⭐'
	},
    {
    id: 3,
    title: "Belgariad Book One: Pawn of Prophecy",
    date: "Feb 12, 2022",
    description:
    "A fierce dispute among the Gods and the theft of a powerful Orb leaves the World divided into five kingdoms. Young Garion, with his 'Aunt Pol' and an elderly man calling himself Wolf --a father and daughter granted near-immortality by one of the Gods -- set out on a complex mission.",
    imgSrc:
    "https://images-na.ssl-images-amazon.com/images/I/41ZxXA+nInL.jpg",
    imgAlt: "Book cover for Pawn of Prophecy",
    ages: "12-16",
    genre: "Fantasy",
    stars: "⭐⭐⭐⭐⭐"
    }
];

function generateArticles() {
    const container = document.getElementById("articles");

    articles.forEach(article => {
        const articleDiv = document.createElement("div");
        articleDiv.classList.add("article");

        const metaDiv = document.createElement("div");
        metaDiv.classList.add("meta");
        metaDiv.style.textAlign = "right";
        
        

        const articleDate = document.createElement("p");
        articleDate.textContent = article.date;
        articleDate.style.fontSize = "18px";
        

        const articleAges = document.createElement("p");
        articleAges.textContent = article.ages;

        const articleGenre = document.createElement("p");
        articleGenre.textContent = article.genre;

        const articleStars = document.createElement("p");
        articleStars.textContent = article.stars;

        // Append all meta paragraphs to metaDiv
        metaDiv.appendChild(articleDate);
        metaDiv.appendChild(articleAges);
        metaDiv.appendChild(articleGenre);
        metaDiv.appendChild(articleStars);

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("content");

        const articleTitle = document.createElement("h2");
        articleTitle.textContent = article.title;
        articleTitle.style.color = "#8b0000"

        const articleImage = document.createElement("img");
        articleImage.src = article.imgSrc;
        articleImage.alt = article.imgAlt;
        articleImage.style.display = "block";
        articleImage.style.marginLeft = "auto";
        articleImage.style.marginRight = "auto";


        const articleDescription = document.createElement("p");
        articleDescription.textContent = article.description;

        const readMoreLink = document.createElement("a");
        readMoreLink.textContent = "Read More...";
        readMoreLink.href = "#"; 
        readMoreLink.style.color = "#007BFF"; 
        readMoreLink.style.textDecoration = "underline";

articleDescription.appendChild(readMoreLink);

        contentDiv.appendChild(articleTitle);
        contentDiv.appendChild(articleImage);
        contentDiv.appendChild(articleDescription);

        // Append both meta and content to articleDiv
        articleDiv.appendChild(metaDiv);
        articleDiv.appendChild(contentDiv);

        container.appendChild(articleDiv);
    });
}


window.addEventListener("load", generateArticles);