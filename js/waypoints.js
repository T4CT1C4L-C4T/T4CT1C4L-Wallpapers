// Short delay so that categories can load
$(document).ready(function () {

    function createWaypoints() {
        // Creates a waypoint for the top of page
        try {
            var waypoint1 = new Waypoint({
                element: document.getElementById("top"),
                handler: function (direction) {
                    window.location.hash = "top";
                }
            });
        } catch (e) { };

        // Creates a waypoint for the search bar
        try {
            var waypoint2 = new Waypoint({
                element: document.getElementById("search"),
                handler: function (direction) {
                    window.location.hash = "search";
                }
            });
        } catch (e) { };

        // Creates a waypoint for the table of contents
        try {
            var waypoint3 = new Waypoint({
                element: document.getElementById("table-contents"),
                handler: function (direction) {
                    window.location.hash = "table-contents";
                }
            });
        } catch (e) { };

        // Creates a waypoint for the bottom of page
        try {
            var waypoint4 = new Waypoint({
                element: document.getElementById("bottom"),
                handler: function (direction) {
                    window.location.hash = "bottom";
                }
            });
        } catch (e) { };

        // Creates waypoint for all group sections
        $(".category-section").each(function (i, category) {
            var reference = this.id;
            var waypoint = new Waypoint({
                element: document.getElementById(this.id),
                handler: function (direction) {
                    window.location.hash = reference;
                }
            });
        });
    };

    createWaypoints();
    window.location.href = "#top";
});