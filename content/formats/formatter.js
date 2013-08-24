(function(window, undefined){

    var template = {
        html: _.template([
            '<!DOCTYPE html><html><head>'
          , '  <meta charset="UTF-8" />'
          , '  <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/pure/0.2.1/pure-min.css" />'
          , '  <link href="http://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet" />'
          , '  <link rel="stylesheet" type="text/css" href="chrome://si_prettyreport/content/resource/main.css" />'
          , '  <title><%= title %></title>'
          , '</head><body>'
            // Content
          , '  <div class="content">'
            // Expand Collapse Menu
          , '    <div class="pure-menu pure-menu-open pure-menu-horizontal">'
          , '        <ul>'
          , '            <li><a id="expand" href="#"><i class="icon-expand-alt"></i> Expand All</a></li>'
          , '            <li><a id="collapse" href="#"><i class="icon-collapse-alt"></i> Collapse All</a></li>'
          , '        </ul>'
          , '    </div>'
          , '    <%= body %>'
          , '  </div>'
          , '  <div class="footer">'
          , '    <p>generated by <a href="">Selenium IDE Pretty Report</a>@<a href="http://twitter.com/uochan/">uochan</a></p>'
          , '  </div>'
            // Scripts
          , '  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>'
          , '  <script type="text/javascript" src="chrome://si_prettyreport/content/resource/main.js"></script>'
          , '</body></html>'
          ].join("\n"))

      , testcase: _.template([
            '<div class="testcase">'
            // summary
          , '  <div class="summary">'
          , '    <h2>Summary</h2>'
          , '    <div class="block">'
          , '      <h3 class="<%= result %>">'
          , '        <% if(result === "done"){ %>'
          , '          <i class="icon-ok"></i> DONE'
          , '        <% } else if(result === "failed"){ %>'
          , '          <i class="icon-remove"></i> FAILED'
          , '        <% } else { %>'
          , '          <i class="icon-question"></i> UNDEFINED'
          , '        <% } %>'
          , '      </h3>'
          , '      <p><%= now %></p>'
          , '      <table class="pure-table">'
          , '        <thead><tr>'
          , '          <th class="done">Done</th>'
          , '          <th class="failed">Failed</th>'
          , '          <th class="undefined">Undefined</th>'
          , '          <th class="total">Total</th>'
          , '        </tr></thead>'
          , '        <tbody><tr>'
          , '          <td class="done"><%= count.done %></th>'
          , '          <td class="failed"><%= count.failed %></th>'
          , '          <td class="undefined"><%= count.undefined %></th>'
          , '          <td class="total"><%= count.total %></th>'
          , '        </tr></tbody>'
          , '      </table>'
          , '    </div>'
          , '  </div>'
            // /summary
          , '  <h2 class="testcase-name"><%= title %></h2>'
          , '  <div class="block">'
          , '    <% _.each(tests, function(test){ %>'
          , '      <div class="command-group <%= test.result %>">'
          , '        <p>'
          , '          <% if(test.result === "done"){ %>'
          , '            <i class="icon-ok"></i>'
          , '          <% } else if(test.result === "failed"){ %>'
          , '            <i class="icon-remove"></i>'
          , '          <% } else { %>'
          , '            <i class="icon-question"></i>'
          , '          <% } %>'
          , '          <%= test.title %>'
          , '        </p>'
          , '        <table class="pure-table pure-table-striped testcase-commands">'
          , '        <thead><tr>'
          , '          <th class="testcase-result"></th>'
          , '          <th class="testcase-command">Command</th>'
          , '          <th class="testcase-target">Target</th>'
          , '          <th class="testcase-value">Value</th>'
          , '        </tr></thead>'
          , '        <tbody>'
          , '        <% _.each(test.commands, function(cmd){ %>'
          , '          <tr class="<%= cmd.result %>">'
          , '            <td class="testcase-result">'
          , '              <% if(cmd.result === "done"){ %>'
          , '                <i class="icon-ok"></i>'
          , '              <% } else if(cmd.result === "failed"){ %>'
          , '                <i class="icon-remove"></i>'
          , '              <% } else { %>'
          , '                <i class="icon-question"></i>'
          , '              <% } %>'
          , '            </td>'
          , '            <td class="testcase-command"><%= cmd.command %></td>'
          , '            <td class="testcase-target"><%= cmd.target %></td>'
          , '            <td class="testcase-value"><%= cmd.value %></td>'
          , '          </tr>'
          , '        <% }); %>'
          , '        </tbody></table>'
          , '      </div>'
          , '    <% }); %>'
          , '  </div>'
          , '</div>'
          ].join("\n"))
      , now: _.template("<%= year%>/<%= mon %>/<%= day %> <%= hour %>:<%= min %>:<%= sec %>")
    };

    var self = {};

    var _getCurrentTime = function(){
        var d    = new Date()
          , data = {
              year: d.getFullYear()
            , mon:  d.getMonth() + 1
            , day:  d.getDate()
            , hour: d.getHours()
            , min:  d.getMinutes()
            , sec:  d.getSeconds()}
          ;
        if(data.mon < 10){  data.mon  = '0' + data.mon; }
        if(data.day < 10){  data.day  = '0' + data.day; }
        if(data.hour < 10){ data.hour = '0' + data.hour; }
        if(data.min < 10){  data.min  = '0' + data.min; }
        if(data.sec < 10){  data.sec  = '0' + data.sec; }
        return(template.now(data));
    };

    self.html = function(data){
        data.now = _getCurrentTime();
        return(template.html(data));
    }

    self.testcase = function(data){
        data.now = _getCurrentTime();
        return(template.testcase(data));
    };


    if(!window.SIPR.formatter){
        window.SIPR.formatter = self;
    }
}(window));
