const arrowContract = "⮚ ";
const arrowExpand = "⮛ ";

$(document).ready(function () {

    // Scrolls to an area on the page
    function scrollToOnPage(ref, delay) {
        var loc = $(ref).offset().top;

        if ($(".search-box").css("opacity") !== 0 && $(".search-box").css("display") !== "none") {
            loc = loc - $(".search-box").css("height").replace("px", "");
        };
        
        $('html,body').animate({ scrollTop: loc }, delay);

        setTimeout(function () {
            window.location.href = ref;
        }, delay);
    }

    // Expands or collapses images
    function expandImage(object, option = 'none') {
        var w = object.width() / object.parent().width() * 100;

        if (option === "none") {
            ((w === 100) ?
                object.animate({ width: "75%", "border-radius": "5px" }, 300) :
                object.animate({ width: "100%", "border-radius": "0px" }, 300));
        } else if (option === "expand") {
            object.animate({ width: "100%", "border-radius": "0px" }, 300);
        } else if (option === "collapse") {
            object.animate({ width: "75%", "border-radius": "5px" }, 300);
        };

        setTimeout(function () {
            AOS.refresh();
            Waypoint.refreshAll();
        }, 300);
    };

    // Show/hide categories
    function toggleCategory(obj, option = 'none') {
        if ($(obj).next().is(":hidden") || option === "expand") {
            $(obj).find(".arrow").text(arrowExpand);
            $(obj).next().show();
            $(obj).next().toggleClass("animate", false);

            setTimeout(function () {
                AOS.refresh();
                Waypoint.refreshAll();
            }, 300);
        } else if (option === "none" || option === "collapse") {
            $(obj).next().toggleClass("animate", true);

            setTimeout(function () {
                $(obj).find(".arrow").text(arrowContract);
                $(obj).next().hide();
                AOS.refresh();
                Waypoint.refreshAll();
            }, 300);
        };
    };

    // Show/hide search results
    function toggleSearches(option = 'none') {
        var obj = ".search-box";

        if (option === "expand") {
            $(obj).show();
            $(obj).fadeTo(200, 1);
        } else if (option === "collapse") {
            $(obj).fadeTo(200, 0);
            setTimeout(function () {
                $(obj).hide();
            }, 200);
        };
    };

    // Update search results
    function updateSearches(input) {
        var findString = input.toLowerCase();

        $(".search-result-btn").each(function() {
            if ($(this).text().toLowerCase().includes(findString) && findString!='') {
                $(this).parent().show();
                $(this).parent().fadeTo(200, 1);
            } else {
                $(this).parent().css("opacity", 0);
                $(this).parent().hide();
            };
        });
    };

    // Convert Indo-Arabic numerals to Roman numerals
    function romanizeNumbers(num, upper) {
        var lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 }, roman = '', i;

        for (i in lookup) {
            while (num >= lookup[i]) {
                roman += i;
                num -= lookup[i];
            }
        };

        (upper ? roman = roman.toUpperCase() : roman = roman.toLowerCase());
        return roman;
    };

    // Hide full size overlay
    $(".full-size-overlay").hide();

    // Disable right-clicking of document
    $(document).bind("contextmenu", function (e) {
        return false;
    });

    // Show searches on focus
    $(".search-input").focus(function () {
        $("html").css("overflow-y", "hidden");
        toggleSearches("expand");

        updateSearches($(this).val());
    });

    // Hide searches out of focus
    $(".search-input").focusout(function () {
        $("html").css("overflow-y", "visible");
        toggleSearches("collapse");

        $(".search-result").each(function () {
            $(this).hide();
        });
    });

    // Update search results while typing
    $(".search-input").keyup(function (e) {
        updateSearches($(this).val());
    });

    // Scroll to image for search result buttons
    $('.search-result-btn').mousedown(function () {
        var obj = $(this);
        scrollToOnPage("#" + obj.attr("href"), 200);
    });

    // Individual image clicking
    $(".img").mousedown(function (e) {
        switch (e.which) {
            case 1: expandImage($(this)); break;
            case 2: break;
            case 3: {
                $(".full-size-overlay").show();
                $(".full-size-overlay").fadeTo(500, 1);

                $(".full-size-img").attr( { "alt": $(this).attr("alt"), "src": $(this).attr("src") } );
            }; break;
            default: break;
        }
    });

    // Show details of image
    $(".img").mouseover(function (e) {
        var dimensions = $(this)[0].videoWidth + "x" + $(this)[0].videoHeight + "px";
        const txt = "Dimensions: " + dimensions;

        $(".information-corner").fadeTo(100, 1);
        $(".information-text").text(txt);
    });

    // Hide details of image
    $(".img").mouseout(function (e) {
        $(".information-corner").fadeTo(100, 0);
    });

    // Left-click show/hide category, reft-click expand/collapse images
    $(".category-title").mousedown(function (e) {
        var obj = $(this);
        
        switch (e.which) {
            case 1: toggleCategory(obj); break;
            case 2: break;
            case 3: expandImage($(this).siblings().find("video")); break;
            default: break;
        }
    });

    // Full-size image overlay hide
    $(".full-size-overlay").mousedown(function (e) {
        $(this).fadeTo(500, 0);
        setTimeout(() => { $(this).hide(); $(".full-size-img").attr({ "alt": "none", "src": "" });}, 500);
    });

    // Hover over tooltip for categories
    $(".category-title").attr({
        "data-toggle": "tooltip",
        "title": "Left-click to show/hide category\nRight-click to enlarge/reduce all images in this category"
    });

    // Hover over tooltip for images
    $(".img").attr({
        "data-toggle": "tooltip",
        "title": "Left-click to enlarge/reduce this image\nRight-click to show full size"
    });

    // Display number of images per category
    $(".category-group").each(function(i, category) {
        var count = $(this).find("video").length;
        var imageText = "";
        
        ((count !== 1) ? imageText = " Images" : imageText = " Image");
        $(this).find(".category-title").append(" - " + count + imageText);
    });

    // Display image number in category
    var numCatGroup = $(".category-group").length - 1;
    $(".category-group").each(function(i) {
        $(this).find(".category-title").prepend("<b class=\"arrow\">" + arrowExpand + "</b>");

        $(this).find(".image-title").each(function(i, img){
            img.prepend(romanizeNumbers(++i, true) + ". ");
        });

        (numCatGroup === i) ?
            $(this).parent().append("<hr class=\"line-divider\" style=\"margin-top: 20px\">") :
            $(this).parent().append("<hr class=\"line-divider cat-line-divider\" style=\"margin-top: 20px\">");
    });

    // Return to top button
    $('.return-button').click(function () {
        scrollToOnPage("#top", 200);
    });

    // Table of contents links
    $('.cat-link').click(function () {
        var obj = $(this);
        scrollToOnPage(obj.attr("href"), 300);
    });

    // Keybinds
    // alert("Keybinding:\n- 'q' to enlarge or reduce all images\n- 'e' to show or hide all categories\n- 't' to return to top of page");
    var qState = "expand";
    var eState = "collapse";

    Mousetrap.bind(['q'], function (e) {
        $(".img").each(function (i, img) {
            expandImage($(this), qState);
        });

        ((qState === "expand") ? qState = "collapse" : qState = "expand");
    });

    Mousetrap.bind(['e'], function (e) {
        $(".category-title").each(function (i, cat) {
            toggleCategory($(this), eState);
        });

        ((eState === "expand") ? eState = "collapse" : eState = "expand");
    });

    Mousetrap.bind(['t'], function (e) {
        scrollToOnPage("#top", 200);
    });
    
});