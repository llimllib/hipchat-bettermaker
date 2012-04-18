function injectJs(link) {
        var scr = document.createElement("script");
        scr.type="text/javascript";
        scr.src=link;
        (document.head || document.body || document.documentElement).appendChild(scr);
}

$(document).ready(function() {
    console.log("running inject");

    /* the random number prevent caching */
    injectJs(chrome.extension.getURL("js/hipchat.js") + "?" + Math.random());
});
