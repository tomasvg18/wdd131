const themeSelector = document.querySelector("select");
const logo = document.querySelector("#logo");

function changeTheme() {
    const currentTheme = themeSelector.value;
    
    if (themeSelector.value === 'dark') {
        document.body.classList.add('dark');
        logo.src = 'byui-logo_white.png'; 
      } else {
        document.body.classList.remove('dark');
        logo.src = 'byui-logo_blue.webp'; 
      }
}
themeSelector.addEventListener("change", changeTheme);