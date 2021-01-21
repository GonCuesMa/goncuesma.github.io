var prompt = {
    window: $(".terminal"),
    body: $("#terminal_body"),
    shortcut: $(".prompt-shortcut"),
    input: $(".terminal_input"),
    elemtext: $(".terminal__text"),
    welcome_msg: "Hi! I'm Gonzalo and this is my resume. Type 'help' for a list of available commands.",
    count: 0,
    commands: [],

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
      $(".terminal_main").hide();
      prompt.welcome();
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
        prompt.commands.push("clear");
        prompt.body.html("");
        k = `<div class="terminal__text">`+ prompt.welcome_msg + `</div>
              <div class="terminal_main">
                <div class="terminal_input_left">
                    <span class="user_msg">you@gcm:</span><span class="user_loc">~</span><span class="user_doll">$</span>
                </div>
                <input class="terminal_input" type="text">
            </div>`;
        prompt.body.html(k);
        prompt.createEvent();
    },
    createEvent: function() {
        var i = 0;
        k = $(".terminal_input")[$(".terminal_input").length-1];
        k.focus();
        k.addEventListener('keydown', (e) => {
            if (e.keyCode == 13){
                i = 0;
                if(e.target.value == "clear"){
                    prompt.clear();
                } else {
                    prompt.changeContent(e);
                }
            } else if (e.keyCode == 38){
              i = ++i;
              prompt.rememo(i);
            }
        });
    },
    changeContent: function(e){
        e.target.setAttribute("disabled","disabled");
        var div = document.createElement("DIV");
        div.className = "terminal__text";
        div.setAttribute('style', 'white-space: pre-wrap;');
        prompt.commands.push(e.target.value);
        switch(e.target.value){
          case "help":
            div.innerHTML = "HELP\r\n" + 
                              "------------------------------------------------------------\r\n" +
                              "COMMAND      DESCRIPTION\r\n\r\n" +
                              "help         list all the commands you could run\r\n" +
                              "clear        clear terminal screen\r\n" +
                              "contact      display my name and contact details\r\n" +
                              "summary      display a brief qualifications summary\r\n" +
                              "education    display list of the highest levels of education\r\n" +
                              "experience   display work experience\r\n" +
                              "skills       display list of skills\r\n" +
                              "hobbies      display list of hobbies\r\n";
            break;
          case "contact":
            div.innerHTML = " > First and last name: <strong> Gonzalo Cuesta Marín </strong>\r\n" +
                            " > City and Country: <strong> Burgos, Spain </strong>\r\n" +
                            " > E-mail: <strong> <a href='mailto:goncuesma@gmail.com'>goncuesma@gmail.com</a></strong>\r\n" + 
                            " > LinkedIn: <strong> <a href='https://www.linkedin.com/in/gcm97' target='_blank'>//gcm97</a> </strong>\r\n" +
                            " > GitHub: <strong> <a href='https://github.com/GonCuesMa/' target='_blank'>/GonCuesMa</a> </strong>";
            break;
          case "summary":
            div.innerHTML = "\r\n > As a recent graduate in Computer Science, I've had the opportunity to carry out work practices where I've could participate in an international project, working as a team and applying values like responsibility, communication, learning, flexibility and organization. My main areas of interest are web development/design and artificial intelligence.\r\n";
            break;
          case "education":
            div.innerHTML = " > <strong><a href='https://www.ubu.es/' target='_blank'>University of Burgos</a></strong>\r\n" +
                            "   * <a href='https://www.ubu.es/grado-en-ingenieria-informatica' target='_blank'>Computer Engineering</a> | September 2016 - June 2020\r\n";
            break;
          case "experience":
            div.innerHTML = " > <strong><a href='https://www.cenieh.es/' target='_blank'>CENIEH</a></strong>\r\n" +
                            "   * Collaborator of <a href='https://ariadne-infrastructure.eu/' target='_blank'>ARIADNEplus</a> project | February 2020 - July 2020\r\n";
            break;
          case "skills":
            div.innerHTML = " > Programming languages: <strong> Java, PHP, JavaScript (jQuery), Python </strong>\r\n" +
                            " > Databases: <strong> PostgreSQL, MySQL </strong>\r\n" +
                            " > Frameworks: <strong> Zend Framework </strong>\r\n" + 
                            " > Technologies: <strong> Docker, Kubernetes,  MVC</strong>\r\n" +
                            " > Other: <strong> Cloud Services (Google Cloud) </strong>";
            break;
          case "hobbies":
            div.innerHTML = " > <strong> Motorcycling </strong> \r\n" +
                            " > <strong> Cooking </strong>\r\n" +
                            " > <strong> Travelling </strong>\r\n" + 
                            " > <strong> Taking free online classes </strong>\r\n" +
                            " > <strong> Electronics repair </strong>";
            break;
          default:
            div.textContent = e.target.value + ": command not found";
        }
        prompt.body.append(div);
        var input_div = document.createElement("DIV");
        input_div.className = "terminal_main";
        input_div.innerHTML = '<div class="terminal_input_left"><span class="user_msg">you@gcm:</span><span class="user_loc">~</span><span class="user_doll">$</span></div><input class="terminal_input" type="text">';
        prompt.body.append(input_div);
        prompt.createEvent();
    },
    rememo: function(count){
      if(prompt.commands.length > 0){
        var command = prompt.commands[prompt.commands.length-count];
        if(command){
          $(".terminal_input")[$(".terminal_input").length-1].value = command;
        }
      }
    },
    welcome: function(){
      if (prompt.count < prompt.welcome_msg.length) {
        $(".terminal__text").append(prompt.welcome_msg.charAt(prompt.count));
        prompt.count++;
        setTimeout(prompt.welcome, 50);
      } else {
        prompt.count = 0;
        $(".terminal_main").show();
      }
    }
};

$(document).ready(prompt.init);
