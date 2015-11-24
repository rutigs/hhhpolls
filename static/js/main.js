$(document).ready(function(){
    var currentIsOpen = true;
    var pastIsOpen = true;
    
    $("#current_polls_arrow").click(function(){
        togglePollContainers($(this), currentIsOpen);
        currentIsOpen = !currentIsOpen;
    });
    
    $("#past_polls_arrow").click(function(){
        togglePollContainers($(this), pastIsOpen);
        pastIsOpen = !pastIsOpen;
    });
    
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




