var prompt = {
    window: $(".terminal"),
    body: $(".terminal_body"),
    shortcut: $(".prompt-shortcut"),
    input: $(".js-prompt-input"),
    
    init: function() {
      $(".js-minimize").click(prompt.minimize);
      $(".js-maximize").click(prompt.maximize);
      $(".js-close").click(prompt.close);
      $(".js-open").click(prompt.open);
      $(document).ready(prompt.createEvent);
    },
    focus: function() {
      prompt.input.focus();
    },
    minimize: function() {
      prompt.window.removeClass("window--maximized");
      prompt.window.toggleClass("window--minimized");
    },
    maximize: function() {
      prompt.window.removeClass("window--minimized");
      prompt.window.toggleClass("window--maximized");
      prompt.focus();
    },
    close: function() {
      prompt.window.addClass("window--destroyed");
      prompt.window.removeClass("window--maximized window--minimized");
      prompt.shortcut.removeClass("hidden");
      prompt.input.val("");
    },
    open: function() {
      prompt.window.removeClass("window--destroyed");
      prompt.shortcut.addClass("hidden");
      prompt.focus();
    },
    clear: function(){
        prompt.body.innerHTML = "";
        k=`<div class="terminal__text">Type anything hit Enter / Type clear to clear screen</div>
            <div class="terminal_main">
                <div class="terminal_input_left">
                    <span class="user_msg">gon@root:</span><span class="user_loc">~</span><span class="user_doll">$</span>
                </div>
                <input class="terminal_input" type="text">
            </div>`;
        prompt.body.innerHTML = k;
        prompt.createEvent;
    },
    createEvent: function() {
        k = prompt.input[prompt.input.length-1];
        k.focus();
        alert("hola");
        k.addEventListener('keydown', (e) => {
            if (e.keyCode == 13){
                if(e.target.value == "clear"){
                    prompt.clear;
                } else {
                    prompt.changeContent;
                }
            }
        });
    },
    changeContent: function(e){
        alert("hola2");
        e.target.setAttribute("disabled","disabled");
        var div = document.createElement("DIV");
        div.className = "terminal__text";
        div.textContent = "You have entered  "+e.target.value;
        document.getElementById("terminal_body").appendChild(div);
        var input_div = document.createElement("DIV");
        input_div.className = "terminal_main";
        input_div.innerHTML = '<div class="terminal_input_left"><span class="user_msg">sandy@root:</span><span class="user_loc">~</span><span class="user_doll">$</span></div><input class="terminal_input" type="text">';
        prompt.body.appendChild(input_div);
        prompt.createEvent;
    }
};

document.getElementsByClassName("terminal_input")[document.getElementsByClassName("terminal_input").length-1].onblur = function (event) { 
    var blurEl = this; 
    setTimeout(function() {
        blurEl.focus()
    }, 10);
};

$(document).ready(prompt.init);
