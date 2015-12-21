$(document).ready(function(){
    var isSC = true;
    var scURL = "https://soundcloud.com/fosterthepeoplemusic/houdini";
    var currentIsOpen = true;
    var pastIsOpen = true;
    var myPlayer = videojs('testYT', { /* Options */ }, function() {
        this.on('ended', function() {
            // console.log('awww...over so soon?');
            $("#center_button").removeClass("icon-pause");
            $(".play_circle").removeClass("icon-pause-circle");
            myPlayer.pause().currentTime(0);
        });
    });
    
    
    var a = audiojs.createAll({
            trackEnded: function() {
                $("#center_button").removeClass("icon-pause");
                $(".play_circle").removeClass("icon-pause-circle");
                audio.pause();
                // audio.load($('a', next).attr('data-src'));
            }
        });    
    var audio = a[0];
    initializeSC(scURL);
    function initializeSC(url){
        //audio.load($("#testSC").attr('data-src'));
        getSCInfo(url);      
    }
    
    
    $("#current_polls_arrow").click(function(){
        togglePollContainers($(this), currentIsOpen);
        currentIsOpen = !currentIsOpen;
    });
    
    $("#past_polls_arrow").click(function(){
        togglePollContainers($(this), pastIsOpen);
        pastIsOpen = !pastIsOpen;
    }); 
    
    $(".play_circle").click(function(){
        var $target = $(this);
        $target.toggleClass("icon-pause-circle");
        $("#center_button").toggleClass("icon-pause");
        
        if($target.hasClass("icon-pause-circle")) {
            if(isSC)
                audio.play();
            else
                myPlayer.play();
        }
        else {
            if(isSC)
                audio.pause();
            else            
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
            message = "play_circle";
    
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
        $(".play_circle").toggleClass("icon-pause-circle");
        
        if($target.hasClass("icon-pause-fill")) {
            $(this).removeClass("icon-pause-fill").addClass("icon-play-fill");
            if(isSC)
                audio.pause();
            else
                myPlayer.pause();
        }
        else
            if(isSC)
                audio.play();
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
    
       
    // var trackUrl = 'http://soundcloud.com/passionpit/carried-away-dillon-francis';
    // var trackUrl = "https://soundcloud.com/fosterthepeoplemusic/houdini";
    function getSCInfo(trackUrl){
        $.get(
            'http://api.soundcloud.com/resolve.json?url=' + trackUrl + '&client_id=c22c5fe14fd82318be2bc25a9cecd82b',
            // 'https://api.soundcloud.com/tracks/85328003.json?client_id=c22c5fe14fd82318be2bc25a9cecd82b',         
            function (result) {
                // console.log(result);
                audio.load("http://api.soundcloud.com/tracks/" + result.id + "/stream?client_id=c22c5fe14fd82318be2bc25a9cecd82b");
                var artist = result.user.username;
                var title = result.title;
                var label = result.label_name;
                $("#artist_song_title").text(artist.toUpperCase() + " - " + title.toUpperCase());
                $("#album_title").text(label.toUpperCase());       
                $("#track_number").append("<img src='" + result.artwork_url + "'></img>");            
                $("#track_extra_description").text(result.description);            
                
                var waveform = new Waveform({
                    container: document.getElementById("equalizer"),
                    innerColor: "#999"
                });

                waveform.dataFromSoundCloudTrack(result);
                /*var streamOptions = waveform.optionsForSyncedStream();
                    SC.stream(track.uri, streamOptions, function(stream){
                    window.exampleStream = stream;
                });*/
            }
        );
    }
    
    
    // http://jsfiddle.net/VL7n8/33/
    // http://stackoverflow.com/questions/24232025/play-soundcloud-stream-uri-in-html-5-mp3-player-audio-js
    // 16262256
    
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




