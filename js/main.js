(function() {
    var $progress = $('#progressBar.progress');
    var count = 0;
    var lastSec;
    var timeElem = $('#time'),
        countdown,
        responseTime;
    var h, m, s, ms;
    var requestID;
    var msg = $('.ui.negative.message');
    var timeCounter = $('#time');

    function getTime() {
        let h = +$('#hoursSet').val(),
            m = +$('#minutesSet').val(),
            s = +$('#secondsSet').val();
        if (h > 23 || m > 59 || s > 59) {

            return false;
        }

        return h * 3600 + m * 60 + s;
    }

    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    function addZeroMs(i) {
        if ((i < 100) && (i > 10)) {
            i = "0" + i;
        }
        if (i < 10) {
            i = "00" + i;
        }
        return i;
    }

    function setProgress(sec) {
        if (lastSec != sec) {
            $progress.progress('increment');
        }
        lastSec = sec;
    }

    function startTime() {
        countdown.setTime(responseTime - Date.now());
        h = addZero(countdown.getUTCHours());
        m = addZero(countdown.getUTCMinutes());
        s = addZero(countdown.getUTCSeconds());
        ms = addZeroMs(countdown.getUTCMilliseconds());
        setProgress(+s)

        if (h == 0 && m == 0 && s == 0) {
            ms = addZeroMs(countdown.setUTCMilliseconds(000));
        }
        timeElem.html(h + ':' + m + ':' + s + ':' + ms);
        if (countdown.getUTCHours() > 0 || countdown.getUTCMinutes() > 0 || countdown.getUTCSeconds() > 0)
            requestID = requestAnimationFrame(startTime);
        else
            $('.red').addClass('pulse');

    }

    $('.shape').shape();
    $('#start').on('click', function() {
        var timeInSec = getTime();
        lastSec = 0;

        if (!timeInSec) {
            msg.removeClass('hidden');
            return false;
        } else {
            msg.addClass('hidden');
        }

        $('.hide').transition('slide up');
        $('#progressBar').transition('horizontal flip', '500ms');
        $('.shape').shape('flip over');

        $('.red').removeClass('pulse');
        $progress.progress('reset');
        timeCounter.transition('scale');
        $('#progressBar')
            .progress({
                total: timeInSec
            })
        countdown = new Date(),
            responseTime = new Date(Date.now() + (1000 * timeInSec));
        requestAnimationFrame(startTime);
    });

    $('#stop').on('click', function() {
        $('#progressBar').transition('horizontal flip', '10ms');
        $('.hide').transition('slide down');
        $('.shape').shape('flip over');
        $('.red').removeClass('pulse');
        timeCounter.transition('scale', '2s');
        window.cancelAnimationFrame(requestID);
        requestID = undefined;
    });


})();
