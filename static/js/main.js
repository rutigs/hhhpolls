$(document).ready(function(){
    var currentIsOpen = true;
    var pastIsOpen = true;
    var myPlayer = videojs('test1'); 
    
    $("#current_polls_arrow").click(function(){
        togglePollContainers($(this), currentIsOpen);
        currentIsOpen = !currentIsOpen;
    });
    
    $("#past_polls_arrow").click(function(){
        togglePollContainers($(this), pastIsOpen);
        pastIsOpen = !pastIsOpen;
    });
    
    $(".play").click(function(){
        $(this).toggleClass("icon-pause-circle");
        
        var message = $(this).next(".play_message").text();
        if(message == "PLAY") {
            $(this).next(".play_message").text("PAUSE");
            myPlayer.play();
        }
        else {
            $(this).next(".play_message").text("PLAY");
            myPlayer.pause();
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
    
    /*
        https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API
        https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API#Creating_a_waveformoscilloscope
        https://github.com/mdn/voice-change-o-matic/blob/gh-pages/scripts/app.js#L123-L167
    
    
    */
    
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




