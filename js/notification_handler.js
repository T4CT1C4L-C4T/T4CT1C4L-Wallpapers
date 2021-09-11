$(document).ready(function () {

    // Notification styles
    $.notify.addStyle('bleu', {
        html: "<div><span data-notify-text/></div>",
        classes: {
            base: {
                "position": "relative",
                "white-space": "nowrap",
                "background-color": "rgba(0,0,0,0.5)",
                "border-radius": "2px",
                "box-shadow": "0 0 10px rgba(0,255,255,0.5)",
                "padding": "5px",
                "bottom": "5px",
                "color": "white",
                "font-family": "'Odibee Sans', sans-serif",
                "font-size": "24px",
            },
            superblue: {
                "color": "white",
                "background-color": "blue"
            }
        }
    });

    $(".logo").click(function () {
        $('.notifyjs-corner').empty();
        $.notify("Certified TACOCAT :3", {
            style: 'bleu',
            clickToHide: true,
            position: 'bottom left',
            autoHide: true,
            autoHideDelay: 5000,
            arrowShow: false,
            arrowSize: 5,
            className: 'info',
            showAnimation: 'slideDown',
            showDuration: 400,
            hideAnimation: 'slideUp',
            hideDuration: 400,
            gap: 5
        });
    });
});