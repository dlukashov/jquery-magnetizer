(function($) {
    $.fn.magnet = function(options) {

        var settings = $.extend({
            "fieldLength": 50
        }, options);

        //utility functions
        // determines if mouse is within a bounded region
        function insideObject(X, Y, obj, dist) {
            var xMin = obj.offset().left - dist;
            var xMax = obj.offset().left + obj.width() + dist;

            var yMin = obj.offset().top - dist;
            var yMax = obj.offset().top + obj.height() + dist;

            if ((X < xMax) && (X > xMin) && (Y > yMin) && (Y < yMax)) {
                return true;
            } else {
                return false;
            }

        }
        // determines the cartesian distance
        function calcDist(mouseX, objX, mouseY, objY) {
            return Math.sqrt(Math.pow(mouseX - objX, 2) + Math.pow(mouseY - objY, 2));
        }

        return this.each(function() {
            var $this = $(this);

            $(document).mousemove(function(e) {
                var btnOfst = $this.offset();
                var maus = {
                    X: e.pageX,
                    Y: e.pageY
                };

                var miX = btnOfst.left + ((.5) * $this.width());
                var miY = btnOfst.top + ((.5) * $this.height());

                var deltaX = maus.X - miX;
                var deltaY = miY - maus.Y;
                var theta = Math.atan2(deltaY, deltaX);

                var distance = calcDist(maus.X, miX, maus.Y, miY);

                var transform = ((settings.fieldLength * 1.4) - distance) / (distance + (settings.fieldLength * .2));

                if (insideObject(maus.X, maus.Y, $this, settings.fieldLength)) {
                    var btnX = miX + (transform * (deltaX * Math.cos(theta) - deltaY * Math.sin(theta))) - (.5 * $this.width());
                    var btnY = miY + (transform * (deltaX * Math.sin(theta) + deltaY * Math.cos(theta))) - (.5 * $this.height());
                    if (btnX <= 0) {
                        var btnX = Math.abs(btnX);
                    }
                    if (btnY <= 0) {
                        var btnY = Math.abs(btnY);
                    }
                    if (btnX >= $(document).width()) {
                        var btnX = btnX - $(document).width();
                    }
                    if (btnY >= $(document).height()) {
                        var btnX = btnX - $(document).height();
                    }
                    $this.css("left", btnX).css("top", btnY);
                    $("info").html($(document).height());
                }
            });
        });
    };

})(jQuery);
