// append text to the message input field
function append(text) {
    var t = $("#message_input").val;
    t(t() + text);
}

function hook_chat() {
    /* hook the chat.scroll_chat function to update stuff every time we need to scroll */
    old_scroll_chat = chat.scroll_chat;
    chat.scroll_chat = function() {
        console.log("scroll hook called");

        $("img[name='emoticon']:not([title])").each(function(i,elt) {
            elt=$(elt);
            /* add a title attribute to emoticons */
            elt.attr("title", elt.attr("alt"));

            /* double size emoticons */
            elt.attr("height", "50");
            elt.attr("width", "40");
        });

        /* double the size of images */
        $("img[onload]:not([style])").each(function(i,elt) {
            elt=$(elt);
            elt.css("max-height", "500px");
            elt.css("max-width", "600px");
        }

        var emoticons = document.createElement("div");
        $(emoticons).css("display:none");
        (document.head || document.body || document.documentElement).appendChild(emoticons);

        old_scroll_chat.apply(chat, arguments);
    }
}

hipchat_bettermaker_maxwait = 0;

function wait_for_chat() {
    console.log("waiting...");

    hipchat_bettermaker_maxwait++;
    if (hipchat_bettermaker_maxwait > 100) {
        return;
    }

    if (window.chat) {
        console.log("found chat!");
        hook_chat();
    } else {
        console.log("setting new wait...");
        setTimeout(wait_for_chat, 100);
    }
}

wait_for_chat();
