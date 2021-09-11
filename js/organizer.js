var maxImagesPerRow = 3; // Number of images per row, (min: 1, max: 4)

$(document).ready(function () {

    // Set drop-down menu to match current settings
    document.getElementById("iprc").value = maxImagesPerRow;

    // Name alphabetization function
    function nameAlphabetize (a, b) {
        var an = a.id.toLowerCase();
        var bn = b.id.toLowerCase();
        return ((an < bn) ? -1 : ((an > bn) ? 1 : 0));
    };

    // Alphabetizes the table of contents
    function organizeTableOfContents() {
        var titles = [];

        $(".category").each(function (i, category) {
            titles.push({ id: $(this).attr('id'), name: $(this).text() });
        });

        titles.sort(nameAlphabetize);
        titles.forEach(category => $('#' + category.id).detach().appendTo(".table-of-contents-container"));
    };

    // Alphabetizes the category sections
    function organizeCategories() {
        var titles = [];

        $(".category-group").each(function (i, category) {
            titles.push({ id: $(this).parent().attr('id'), name: $(this).find("h3").text() });
        });

        titles.sort(nameAlphabetize);
        titles.forEach(category => $('#' + category.id).detach().appendTo(".container"));
    };

    // Alphabetizes the search section
    function organizeSearch() {
        var titles = [];

        $(".search-result").each(function (i, category) {
            titles.push({ id: $(this).attr('id'), name: $(this).find("p").text() });
        });

        titles.sort(nameAlphabetize);
        titles.forEach(category => $('#' + category.id).detach().appendTo(".search-contents"));
    };

    // Alphabetizes the images in each category
    function organizeImages() {
        $(".category-group").each(function (i, category) {
            var imageNames = [];

            $(this).find(".image-title").each(function (i, image) {
                $(this).attr("id", $(this).find(".image-content").find(".img").attr('href'));
                imageNames.push({ id: $(this).attr('id'), name: $(this).text() });
            })

            imageNames.sort(nameAlphabetize);

            var nextRow;
            var rowNumber = 0;
            var imagesAdded = 0;

            // Create a cell for each image
            imageNames.forEach(img => {
                $("#" + img.id).css({width: (1/maxImagesPerRow)*100+"%"});

                if (imagesAdded === 0 || imagesAdded % maxImagesPerRow == 0) {
                    rowNumber++;
                    nextRow = $(this).find(".image-table").append("<tr class=\"image-row-" + rowNumber +"\"></tr>");
                }

                $("#" + img.id).detach().appendTo($(this).find(".image-table").find(".image-row-" + rowNumber));
                imagesAdded++;
            });

            // Fill empty cell with placeholders
            while (imagesAdded % maxImagesPerRow !== 0) {
                $(this).find(".image-table").find(".image-row-" + rowNumber).append("<td class=\"empty-cell\"></td>");
                imagesAdded++;
            };
            
            AOS.refresh();
            Waypoint.refreshAll();
        });
    };

    // Removes empty rows after moving elements
    function removeEmptyRows() {
        $('.table-body tr').each(function () {
            if (!$.trim($(this).text())) $(this).remove();
        });
    }

    // Brings elements back to the bottom of the page
    function bringAssetsDown() {
        var items = [".return-button"];
        items.forEach(item => $(item).detach().appendTo(".container"));
    };

    // Change images per row for drop-down
    $("#iprc").change(function() {
        maxImagesPerRow = document.getElementById("iprc").value;

        $(".category-group").each(function (i, category) {
            $(this).find(".image-title").each(function (i, image) {
                $(this).detach().appendTo($(category).find(".table-body"));
            });

            $(this).find('.table-body tr').each(function () {
                $(this).remove();
            });
        });
        
        organizeImages();
    });

    // Calling all functions...
    organizeTableOfContents();
    organizeCategories();
    organizeSearch();
    organizeImages();
    removeEmptyRows();
    bringAssetsDown();
});