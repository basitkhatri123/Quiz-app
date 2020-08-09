(function ($) {

    $.fn.countdown = function (options) {

        var settings = $.extend({
            "seconds": 0,
            "ongoing": true,
            "selector-start": "",
            "selector-pause": "",
            "prefix-text": "",
            "stop-text": "00:00",
            "normal-class": "",
            "warning-class": "",
            "stop-class": "",
            "warning-time": 0,
            "onComplete": "",
            "destroy": false,
        }, options);
        var timer;
        var elem = this;
        var seconds = settings['seconds'];
        var ongoing = settings['ongoing'];
        var destroy = settings['destroy'];
        settings['seconds'] = seconds;
        if(destroy){
            console.log(timer)
            settings['seconds'] = 0;
            clearInterval(timer);
        }
        var audio = new Audio('audio/alert.mp3');
        function draw() {
            if (settings['seconds'] <= settings['warning-time']){
                audio.play();
            }
            if (settings['seconds'] <= 0) {
                $(elem).html(settings['stop-text']);
                $(elem).removeClass(settings['normal-class']).removeClass(settings['warning-class']).addClass(settings['stop-class']);
                clearInterval(timer);
            } else {
                if (settings['seconds'] <= settings['warning-time'] && !$(elem).hasClass(settings['warning-class'])) {
                    $(elem).addClass(settings['warning-class']);
                }
                var res = Math.floor(settings['seconds'] / 60) < 10 ? "0" + Math.floor(settings['seconds'] / 60) : Math.floor(settings['seconds'] / 60);
                res = res + ':' + (settings['seconds'] % 60 < 10 ? "0" + (settings['seconds'] % 60) : settings['seconds'] % 60);
                $(elem).text(settings['prefix-text'] + res);
            }
            if (settings['seconds'] == 0 && settings.onComplete != "") {
                settings.onComplete.call();
                settings['seconds'] = seconds;
            }
        }

        $(settings['selector-start']).bind("click", function () {
            if (!ongoing) {
                timer = setInterval(function () {
                    settings['seconds']--;
                    draw();
                }, 1000);
                ongoing = true;
            }
        });

        $(settings['selector-pause']).bind("click", function () {
            settings['seconds'] = seconds;
            clearInterval(timer);
            ongoing = false;
        });

        $(elem).removeClass(settings['stop-class']).removeClass(settings['warning-class']).addClass(settings['normal-class']);

        draw();

        if (ongoing) {
            if (destroy) {
                clearInterval(timer);
            }
            timer = setInterval(function () {
                settings['seconds']--;
                draw();
            }, 1000);
        }
    };
})(jQuery);

