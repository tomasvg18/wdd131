const menuButton = document.querySelector("#menu-button");
function toggleMenu() {
    const menu = document.querySelector("#menu");
    menu.classList.toggle("hide");
}

menuButton.addEventListener("click", toggleMenu);

function closeViewer() {
  div = document.querySelector("#viewer-div");
  div.remove();
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

function viewerTemplate(pic, alt) {
  return `<div id="viewer-div" class="viewer">
    <span class="close" onclick="closeViewer()">&times;</span>
    <img class="viewer-content" id="img01" src="${pic}" alt="${alt}">
    </div>`;
}

const modal = document.createElement('dialog');
modal.innerHTML = `
  <div class="modal-content">
    <button class="close-viewer">X</button>
    <img id="modal-img" src="" alt="">
  </div>
`;
document.body.appendChild(modal);


function viewHandler(event) {
    const img = event.target.closest('img');
    if (!img) return;
  
    const filename = img.src.split('/').pop(); 
    const baseName = filename.split('-')[0];  
    const fullSrc = `${baseName}-full.jpeg`;
  
    const modalImg = modal.querySelector('#modal-img');
    modalImg.src = fullSrc;
    modalImg.alt = img.alt;
  
    modal.showModal();
  }

  modal.querySelector('.close-viewer').addEventListener('click', () => {
    modal.close();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
  });

const galleryImages = document.querySelectorAll(".gallery-image");
galleryImages.forEach((img) => {
    img.addEventListener("click", viewHandler);
});
