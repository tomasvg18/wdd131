const menuButton = document.querySelector("#menu-button");
function toggleMenu() {
    const menu = document.querySelector("#menu");
    menu.classList.toggle("hide");
}

menuButton.addEventListener("click", toggleMenu);

function closeViewer() {
  div = document.querySelector("#viewer-div");
  if (div) div.remove();
}

function handleResize() {
    const menu = document.querySelector("#menu");
    if (window.innerWidth > 1000) {
      menu.classList.remove("hide");
    } else {
      menu.classList.add("hide");
    }
  }
  
  handleResize();
  window.addEventListener("resize", handleResize);

function viewerTemplate(src, alt) {
    return `
    <div class="viewer show" id="viewer-div">
      <div class="image-container">
        <button class="close" aria-label="Close modal">&times;</button>
        <img src="${src}" alt="${alt}" />
      </div>
    </div>
    `;
}


function viewHandler(event) {
    const img = event.target.closest('img');
    if (!img) return;
     const fullSrc = 'norris-full.jpeg';

    closeViewer();
    
    const viewerHTML = viewerTemplate(fullSrc, img.alt);
    document.body.insertAdjacentHTML("beforeend", viewerHTML);

    document.querySelector("#viewer-div .close").addEventListener("click", closeViewer);

//this will close the viwer if you click out of the image as well
    document.querySelector("#viewer-div").addEventListener("click", (e) => {
        if (e.target.id === "viewer-div") {
            closeViewer();
        }
    });
}


const galleryImages = document.querySelectorAll(".gallery-image");
galleryImages.forEach((img) => {
    img.addEventListener("click", viewHandler);
});





  //decided to mess around with how the modal is displayed, honestly I like it better than the viewhandler function but I included the view handler function due to the rubric. 
