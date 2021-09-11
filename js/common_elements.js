$(document).ready(function () {

    // BACKDROP
    $("body").prepend(`<div class="bg"></div>`);

    // TITLE
    $(".container").prepend(`
            <h1 class="header">T4CT1C4L-C4T WALLPAPERS</h1>
        `);

    // TOPBAR
    $("body").prepend(`
    <nav class="topbar" id="top">
        <div id="particle-background-0"></div>
        <img src="images/site/pageicon.jpg" alt="Taco cat website logo" class="logo">
        <a href="index.html" class="pages">HOME</a>
        <a href="aboutpage.html" class="pages">ABOUT</a>
        <a href="minigamepage.html" class="pages">GAME</a>
        <a href="https://github.com/T4CT1C4L-C4T" class="pages" target="_blank">GITHUB</a>
        <label class="clock">THURSDAY JANUARY 1ST 1970, 0:00:00 AM</label>
    </nav>
    `);

    // BOTTOM BAR
    $("body").append(`
        <div class="bottombar" id="bottom">
            <div id="particle-background-1"></div>
            <footer class="termsandconditions">TERMS & CONDITIONS</footer>
            <footer class="copyright">Copyright © 2021 T4CT1C4L-C4T All Rights Reserved</footer>
        </div>
    `);

    // INFORMATION
    $("body").append(`
        <div class="information-corner" hidden>
            <div class="information-container">
                <label class="information-text"></label>
            </div>
        </div>
    `);

});