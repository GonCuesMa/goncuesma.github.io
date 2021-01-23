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
        k = `<div class="terminal_main">
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
                var command = e.target.value;
                if(command == "clear"){
                    prompt.clear();
                } else if(/^light (on|off)$/.test(command)) {
                    prompt.light(e);
                } else {
                    prompt.changeContent(e);
                }
            } else if (e.keyCode == 38){
              i = ++i;
              prompt.rememo(i);
            }
        });
    },
    light: function(e) {
      var command = e.target.value;
      if (command.split(" ").splice(-1) == "off"){
        $('#overlay').fadeIn(1000);
        $('.terminal').addClass('highlight');
      } else {
        $('#overlay').fadeOut(1000);
        $('.terminal').removeClass('highlight');  
      }
      prompt.changeContent(e);
    },
    changeContent: function(e){
        e.target.setAttribute("disabled","disabled");
        var div = document.createElement("DIV");
        div.className = "terminal__text";
        div.setAttribute('style', 'white-space: pre-wrap;');
        prompt.commands.push(e.target.value);
        switch(e.target.value){
          case "help":
            div.innerHTML =   "<b>COMMAND</b>         <b>DESCRIPTION</b>\r\n\r\n" +
                              "<i>help</i>             list all the commands you could run\r\n" +
                              "<i>clear</i>            clear terminal screen\r\n" +
                              "<i>contact</i>          display my name and contact details\r\n" +
                              "<i>summary</i>          display a brief qualifications summary\r\n" +
                              "<i>education</i>        display list of the highest levels of education\r\n" +
                              "<i>experience</i>       display work experience\r\n" +
                              "<i>skills</i>           display list of skills\r\n" +
                              "<i>hobbies</i>          display list of hobbies\r\n" +
                              "<i>light [on off]</i>   turn on/off the light";
            break;
          case "contact":
            div.innerHTML = " > First and last name: <b> Gonzalo Cuesta Marín </b>\r\n" +
                            " > City and Country: <b> Burgos, Spain </b>\r\n" +
                            " > E-mail: <b> <a href='mailto:goncuesma@gmail.com'>goncuesma@gmail.com</a></b>\r\n" + 
                            " > LinkedIn: <b> <a href='https://www.linkedin.com/in/gcm97' target='_blank'>//gcm97</a> </b>\r\n" +
                            " > GitHub: <b> <a href='https://github.com/GonCuesMa/' target='_blank'>/GonCuesMa</a> </b>";
            break;
          case "summary":
            div.innerHTML = "\r\n > As a recent graduate in Computer Science, I've had the opportunity to carry out work practices where I've could participate in an international project, working as a team and applying values like responsibility, communication, learning, flexibility and organization. My main areas of interest are web development/design and artificial intelligence.\r\n";
            break;
          case "education":
            div.innerHTML = " > <b><a href='https://www.ubu.es/' target='_blank'>University of Burgos</a></b>\r\n" +
                            "   * <a href='https://www.ubu.es/grado-en-ingenieria-informatica' target='_blank'>Computer Engineering</a> | September 2016 - June 2020\r\n";
            break;
          case "experience":
            div.innerHTML = " > <b><a href='https://www.cenieh.es/' target='_blank'>CENIEH</a></b>\r\n" +
                            "   * Collaborator of <a href='https://ariadne-infrastructure.eu/' target='_blank'>ARIADNEplus</a> project | February 2020 - July 2020\r\n";
            break;
          case "skills":
            div.innerHTML = " > Programming languages: <b> Java, PHP, JavaScript (jQuery), Python </b>\r\n" +
                            " > Databases: <b> PostgreSQL, MySQL </b>\r\n" +
                            " > Frameworks: <b> Zend Framework </b>\r\n" + 
                            " > Technologies: <b> Docker, Kubernetes,  MVC</b>\r\n" +
                            " > Other: <b> Cloud Services (Google Cloud) </b>";
            break;
          case "hobbies":
            div.innerHTML = " > <b> Motorcycling </b> \r\n" +
                            " > <b> Cooking </b>\r\n" +
                            " > <b> Travelling </b>\r\n" + 
                            " > <b> Taking free online classes </b>\r\n" +
                            " > <b> Electronics repair </b>";
            break;
          case "light on":
            div.innerHTML = " > <b> The lights went on! Type 'lights off' to turn them off.  </b> \r\n";
            break;
          case "light off":
            div.innerHTML = " > <b> The lights went out! Type 'lights on' to turn them on. </b> \r\n";
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
