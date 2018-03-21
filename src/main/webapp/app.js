(function () {
  "use strict";

  var stompClient = null;

  function setConnected(connected) {
    $('#connect').prop('disabled', connected);
    $('#disconnect').prop('disabled', !connected);
    if (connected) {
      $('#conversation').show();
    } else {
      $('#conversation').hide();
    }
    $('#greetings').html('');
  }

  function connect() {
    if (stompClient) throw 'Already connected';
    var socket = new SockJS('/hello-spring-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function () {
      setConnected(true);
      stompClient.subscribe('/topic/greetings', function (greeting) {
        showGreeting(JSON.parse(greeting.body).content);
      });
    });
  }

  function disconnect() {
    if (stompClient) stompClient.disconnect();
    setConnected(false);
  }

  function sendName() {
    var data = JSON.stringify({'name': $('#name').val()});
    stompClient.send('/app/hello', {}, data);
  }

  function showGreeting(message) {
    $('#greetings').append('<tr><td>' + message + '</td></tr>');
  }

  $(function () {
    $('form').on('submit', function (e) {
      e.preventDefault();
    });
    $('#connect').click(connect);
    $('#disconnect').click(disconnect);
    $('#send').click(sendName);
  });
})();
