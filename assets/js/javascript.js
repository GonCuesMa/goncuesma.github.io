var prompt = {
    window: $(".terminal"),
    body: $("#terminal_body"),
    shortcut: $(".prompt-shortcut"),
    input: $(".terminal_input"),
    
    init: function() {
      $(".js-minimize").click(prompt.minimize);
      $(".js-maximize").click(prompt.maximize);
      $(".js-close").click(prompt.close);
      $(".js-open").click(prompt.open);
      prompt.input[prompt.input.length-1].blur(function (event) { 
        var blurEl = this; 
        setTimeout(function() {
            blurEl.focus()
        }, 10);
      });
      prompt.createEvent();
    },
    focus: function() {
      prompt.input.focus();
    },
    minimize: function() {
      prompt.window.removeClass("t__maximized");
      prompt.window.toggleClass("t__minimized");
    },
    maximize: function() {
      prompt.window.removeClass("t__minimized");
      prompt.window.toggleClass("t__maximized");
      prompt.focus();
    },
    close: function() {
      prompt.window.addClass("t__closed");
      prompt.window.removeClass("t__maximized t__minimized");
      prompt.shortcut.removeClass("hidden");
      prompt.input.val("");
    },
    open: function() {
      prompt.window.removeClass("t__closed");
      prompt.shortcut.addClass("hidden");
      prompt.focus();
    },
    clear: function(){
        prompt.body.html("");
        k = `<div class="terminal__text">Type clear to clear screen</div>
            <div class="terminal_main">
                <div class="terminal_input_left">
                    <span class="user_msg">you@root:</span><span class="user_loc">~</span><span class="user_doll">$</span>
                </div>
                <input class="terminal_input" type="text">
            </div>`;
        prompt.body.html(k);
        prompt.createEvent();
    },
    createEvent: function() {
        k = $(".terminal_input")[$(".terminal_input").length-1];
        k.focus();
        k.addEventListener('keydown', (e) => {
            if (e.keyCode == 13){
                if(e.target.value == "clear"){
                    prompt.clear();
                } else {
                    prompt.changeContent(e);
                }
            }
        });
    },
    changeContent: function(e){
        e.target.setAttribute("disabled","disabled");
        var div = document.createElement("DIV");
        div.className = "terminal__text";
        div.textContent = "You have entered  "+ e.target.value;
        prompt.body.append(div);
        var input_div = document.createElement("DIV");
        input_div.className = "terminal_main";
        input_div.innerHTML = '<div class="terminal_input_left"><span class="user_msg">me@goncuesma:</span><span class="user_loc">~</span><span class="user_doll">$</span></div><input class="terminal_input" type="text">';
        prompt.body.append(input_div);
        prompt.createEvent();
    }
};

$(document).ready(prompt.init);
