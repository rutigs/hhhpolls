$(document).ready(function(){
    var currentIsOpen = true;
    var pastIsOpen = true;
    var myPlayer = videojs('test1', { /* Options */ }, function() {
        this.on('ended', function() {
            console.log('awww...over so soon?');
            $("#center_button").removeClass("icon-pause");
            $(".play").removeClass("icon-pause-circle");
            myPlayer.pause().currentTime(0);
        });
    });
    
    $("#current_polls_arrow").click(function(){
        togglePollContainers($(this), currentIsOpen);
        currentIsOpen = !currentIsOpen;
    });
    
    $("#past_polls_arrow").click(function(){
        togglePollContainers($(this), pastIsOpen);
        pastIsOpen = !pastIsOpen;
    }); 
    
    $(".play").click(function(){
        var $target = $(this);
        $target.toggleClass("icon-pause-circle");
        $("#center_button").toggleClass("icon-pause");
        
        if($target.hasClass("icon-pause-circle")) {
            myPlayer.play();
        }
        else {            
            myPlayer.pause();            
        }                    
                    
        var message = $target.next(".play_message").text();
        if(message == "PLAY") {
            $target.next(".play_message").text("PAUSE");
        }
        else {
            $target.next(".play_message").text("PLAY");
        }
    });
    
    $(".icon-play-circle").mouseenter(function(){
        var message = "";
        if($(this).hasClass("icon-pause-circle"))
            message = "PAUSE";
        else
            message = "PLAY";
    
        $(this).after("<h3 class='play_message'>" + message + "</h3>");
        $(".icon-play-circle").mouseleave(function(){
            $(this).next(".play_message").remove();
        });
    });
    
    $(".icon-skipbackward").mouseenter(function(){
        $(this).addClass("icon-skipbackward-fill");
        $(this).mouseleave(function(){
            $(this).removeClass("icon-skipbackward-fill");
        });
    });
    
    $(".icon-skipforward").mouseenter(function(){
        $(this).addClass("icon-skipforward-fill");
        $(this).mouseleave(function(){
            $(this).removeClass("icon-skipforward-fill");
        });
    });
    
    $("#center_button").click(function(){
        var $target = $(this);
        $(this).toggleClass("icon-pause");
        $(".play").toggleClass("icon-pause-circle");
        
        if($target.hasClass("icon-pause-fill")) {
            $(this).removeClass("icon-pause-fill").addClass("icon-play-fill");
            myPlayer.pause();
        }
        else
            myPlayer.play();        
            
        togglePlayButtonState($target);
    });
    
    $("#center_button").mouseenter(function(){
        togglePlayButtonState($(this));
    });
    
    function togglePlayButtonState($target){
        var icon = "";
        if($target.hasClass("icon-pause"))
            icon = "pause";
        else {
            icon = "play";
        }
        $target.addClass("icon-" + icon + "-fill");
        $target.mouseleave(function(){
            $target.removeClass("icon-" + icon + "-fill");
        });        
    }
    
    function togglePollContainers($target, poll_state) {
        if(poll_state == true) {
            $target.next(".poll_innards").fadeOut("slow");
            $target.parent(".poll_container").animate({"width": "30px"}, "slow");
        }
        else {
            $target.next(".poll_innards").fadeIn(500);
            $target.parent(".poll_container").animate({"width": "50%"}, 500);            
        }
        $target.toggleClass("open_poll_cont");
    }
    
       
    var trackUrl = 'http://soundcloud.com/passionpit/carried-away-dillon-francis';
    $.get(
        'http://api.soundcloud.com/resolve.json?url=' + trackUrl + '&client_id=c22c5fe14fd82318be2bc25a9cecd82b', 
        function (result) {        
            var waveform = new Waveform({
                container: document.getElementById("equalizer"),
                innerColor: "#999"
            });

            waveform.dataFromSoundCloudTrack(result);
            var streamOptions = waveform.optionsForSyncedStream();
                SC.stream(track.uri, streamOptions, function(stream){
                window.exampleStream = stream;
            }); 
        }
    );
    
    //16262256
    
    /*// stack overflow homies - question ?
    (function() {
        var v = document.getElementsByClassName("youtube-player");
        for (var n = 0; n < v.length; n++) {
            var p = document.createElement("div");
            p.innerHTML = ytThumb(v[n].dataset.id);
            p.onclick = ytIframe;
            v[n].appendChild(p);
        }
    })();

    function ytThumb(id) {
        return '<img class="youtube-thumb" src="//i.ytimg.com/vi/' + id + '/hqdefault.jpg"><div class="play-button"></div>';
    }

    function ytIframe() {
        var iframe = document.createElement("iframe");
        iframe.setAttribute("src", "//www.youtube.com/embed/" + this.parentNode.dataset.id + "?autoplay=1");
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("id", "youtube-iframe");
        this.parentNode.replaceChild(iframe, this);
    }*/
});




