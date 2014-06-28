var config = {
    manual: true,
    pusherApiKey: ""
};


var animateBalloon = function (balloonHeight, speed, deg) {
    var $clone = $("#balloon").clone();
    $("#content").after($clone);
    var height = (balloonHeight) * 50;
    $clone.css({
        display: "block",
        "-webkit-filter": "hue-rotate(" + deg + "deg)",
        "-mozilla-filter": "hue-rotate(" + deg + "deg)",
        height: height,
        top: $(window).height() + height
    });
    var position = Math.floor((Math.random() * ($(window).width() - $clone.width())) + 1);
    $clone.css({
        left: position
    }).animate({
        top: 0 - height
    }, 10000 / speed, "linear")
};

$(function () {
    if (config.pusherApiKey !== "") {
        var pusher = new Pusher(pusherApiKey);
        var channel = pusher.subscribe('balloon_channel');
        channel.bind('balloon', function(data) {
            animateBalloon(data.size, data.speed, data.color);
        });
    }

    if (config.manual) {
        $("#manualControl").show();
    }

    $("#sendMany").click(function () {
        for (var i = 0; i < 10; i++) {
            var size = Math.floor((Math.random() * 10) + 1);
            var speed = Math.floor((Math.random() * 10) + 1);
            var color = Math.floor((Math.random() * 360) + 1);
            animateBalloon(size, speed, color);
        }
    });

    $("#newBalloon").submit(function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        animateBalloon($("#size").val(), $("#speed").val(), $("#color").val());
    });
});