/* The first time the page is loaded, the color mode set on the preference is used
 and set as 'default' in the local storage.
 Changing the default preferences works the same way as changing the color mode using the buttons, if the page is loaded.
 When the page is reloaded, whatever is the value set on local storage has precedence ovr the values in the preference. 
 If the preference  changed after the page was visited - and the page is not loaded -  the last value saved on the local storage is loaded*/
 
let darkMode = localStorage.getItem('darkMode');
const darkModeToggle = document.querySelector('.dark-light-toggle');

const enableDarkMode = () => {
    darkModeToggle.click();

    //add the class darkmode to the body
    document.body.classList.add("darkmode");

    //remove the class lightmode to the body
    document.body.classList.remove("lightmode");

    //update the localStorage
    localStorage.setItem("darkMode", "enabled");

    //change the button icon
    darkModeToggle.querySelector("img").setAttribute("src", "assets/images/icon-sun.svg");

    //change the background image
    document.body.style.backgroundImage = "url(assets/images/bg-desktop-dark.jpg)";
}

const disableDarkMode = () => {
    darkModeToggle.click();

    //remove the class darkmode to the body
    document.body.classList.remove('darkmode');

    //add the class lightmode to the body
    document.body.classList.add('lightmode');

    //update the localStorage
    localStorage.setItem('darkMode', 'disabled');

    //change the button icon
    darkModeToggle.querySelector('img').setAttribute('src', 'assets/images/icon-moon.svg');

    //change the background image
    document.body.style.backgroundImage = "url(assets/images/bg-desktop-light.jpg)";
}

const colorModeFromLocalStorage = () => {
    return localStorage.getItem('darkMode');
}

const colorModeFromPreferences = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'enabled' : 'disabled';
}

const loadAndUpdateColor = () => {
    //local storage has precedence over the prefers-color-scheme
    const color = colorModeFromLocalStorage() || colorModeFromPreferences();

    color == 'enabled' ? enableDarkMode() : disableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
    darkMode = localStorage.getItem('darkMode');

    darkMode !== 'enabled' ? enableDarkMode() : disableDarkMode();
});

//when the prefers-color-scheme changes this event will be emitted
//'e' reflects the media query, if it matches, the new color is dark, else it is light
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    e.matches ? enableDarkMode() : disableDarkMode();
});

//Load and update the right color on startup, localStorage has precedence
loadAndUpdateColor();