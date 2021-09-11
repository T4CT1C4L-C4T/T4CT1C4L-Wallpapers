const sourceFolderAudio = "audio"; // Location of audio folders
const audioList = [                // List of audio
    { id: "mouseenter", src: "mouseenter" },
    { id: "mousehovercat", src: "mouseenter" },
    { id: "mouseclick", src: "mouseclickcat" },
];

$(document).ready(function () {

    // Create all audio elements
    audioList.forEach(audio => {
        $("head").append("<audio id=\"audio-" + audio.id + "\" src=\"" + sourceFolderAudio + "/" + audio.src + ".mp3\"></audio>");
    });

    // Enable playing if document has been focused
    var playingEnabled = false;
    $("body").mousedown(function(e) {
        if (!playingEnabled) playingEnabled = true;
    });

    // Mouse hover over images sfx
    function createMouseEnterImageAudio() {
        $(".img").each(function (i) {
            $("#audio-mouseenter").clone().attr("id", "audio-mouseenter-" + i).appendTo($(this).parent());

            $(this).mouseenter(function () {
                if (playingEnabled) {
                    $("#audio-mouseenter-" + i)[0].volume = 0.5;
                    $("#audio-mouseenter-" + i)[0].play();
                };
            });
        });
        
        $("#audio-mouseenter").attr("id", "audio-mouseenter-0");
    };

    // Mouse click category titles sfx
    function createMouseClickCategoryTitle() {
        $(".category-title").each(function (i) {
            $("#audio-mouseclick").clone().attr("id", "audio-mouseclick-" + i).appendTo($(this));

            $(this).click(function () {
                if (playingEnabled) {
                    $("#audio-mouseclick-" + i)[0].volume = 0.5;
                    $("#audio-mouseclick-" + i)[0].play();
                };
            });
        });

        $("#audio-mouseclick").attr("id", "audio-mouseclick-0");
    };

    // Mouse hover over images sfx
    function createMouseEnterCategory() {
        $(".category").each(function (i) {
            $("#audio-mousehovercat").clone().attr("id", "audio-mousehovercat-" + i).appendTo($(this).parent());

            $(this).mouseenter(function () {
                if (playingEnabled) {
                    $("#audio-mousehovercat-" + i)[0].volume = 0.5;
                    $("#audio-mousehovercat-" + i)[0].play();
                };
            });
        });

        $("#audio-mousehovercat").attr("id", "audio-mousehovercat-0");
    };

    // Calling all functions...
    createMouseEnterImageAudio();
    createMouseClickCategoryTitle();
    createMouseEnterCategory();
});