const sourceFolderImages = "images"; // Location of image folders

$(document).ready(function () {

    // Parses through all listed folders
    imageFolders.forEach(folder => {
        var id = folder.name.toLowerCase();
        
        // Creates category section
        $(".container").append(`
            <section id="` + id + `" class="category-section">
                <div class="category-group">
                    <h3 class="category-title">` + folder.categoryTitle + `</h3>
                    <table class="image-table">
                    <tbody class="table-body"></tbody>
                    </table>
                </div>
            </section>
        `);
        
        // Lists section in table of contents
        $(".table-of-contents-container").append(`
            <li class="category" id="cat-` + id + `">
                <text href="#` + id + `" class="cat-link">➠ ` + folder.categoryTitle + `</text>
            </li>
        `);

        // Parses through all images in folder
        folder.images.forEach(img => {
            var href = img.href.replace(/\s/g, "");
            $(".search-contents").append(`
                <li class="search-result" id="search-` + href + `" hidden>
                    <p href="` + href + `" class="search-result-btn">➥ ` + folder.categoryTitle + ` » ` + img.text + `</p>
                </li>
            `);

            $("#" + id).find(".table-body").append(`
                <td class="image-title">` + img.text + `
                    <div class="image-content" data-aos="zoom-in">
                        <video autoplay loop muted playsinline class="img" src="` + sourceFolderImages + `/` + folder.name + `/` + img.src + `.mp4" alt="` + img.text + `" href="` + href + `">
                    </div>
                </td>
            `);
        });
    });

    // Play or pause video when in or out of viewport respectively
    $(window).on('scroll', function() {
        $(".img").each(function () {
            if ($(this).is(":in-viewport")) {
                $(this)[0].play();
            } else {
                $(this)[0].pause();
            }
        });
    });

});