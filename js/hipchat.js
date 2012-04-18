// append text to the message input field
function append(text) {
    var t = $("#message_input");
    t.val(t.val() + text);
}

function show_emoticons() {
}

function hide_emoticons() {
}

function create_emoticons() {
    if ($("#emoticon-toggle").length == 0) {
        var emoticon_toggle = '<td width="1%" id="emoticon-toggle"><a href="#" onclick=""><img src="http://hipchat.com/img/emoticons/awyea.png"></a></td>'
        $("#send_message_button").parent().before(emoticon_toggle);
    }
}

function hook_chat() {
    create_emoticons();
    
    /* hook the chat.scroll_chat function to update stuff every time we need to scroll */
    old_scroll_chat = chat.scroll_chat;
    chat.scroll_chat = function() {
        console.log("scroll hook called");

        /* add title attributes to emoticons */
        $("img[name='emoticon']:not([title])").each(function(i,elt) {
            elt=$(elt);
            /* add a title attribute to emoticons */
            elt.attr("title", elt.attr("alt"));
        });

        /* double the max size of images not already doubled */
        $("img[onload]:not([style])").each(function(i,elt) {
            elt=$(elt);
            elt.css("max-height", "500px");
            elt.css("max-width", "600px");
        });

        old_scroll_chat.apply(chat, arguments);
    }

    create_emoticons();
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
