
$(document).ready(function () {

    // Update the clock
    let renderClock = function() {
        $(".clock").text(moment().format('dddd MMMM Do YYYY, h: mm: ss A').toUpperCase());
    };
    renderClock();
    setInterval(renderClock, 1000);

});