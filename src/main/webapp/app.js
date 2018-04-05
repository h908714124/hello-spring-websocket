(function () {
  "use strict";

  var stompClient;

  function setConnected(connected) {
    document.getElementById('connect').disabled = connected;
    document.getElementById('disconnect').disabled = !connected;
    document.getElementById('send').disabled = !connected;
    document.getElementById('conversation').style.display = connected ? 'table' : 'none';
    document.getElementById('greetings').innerHTML = '';
  }

  function connect() {
    if (stompClient) {
      setConnected(true);
      return;
    }
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
    if (stompClient) {
      stompClient.disconnect();
      stompClient = undefined;
    }
    setConnected(false);
  }

  function sendName() {
    if (!stompClient) {
      return;
    }
    var name = document.getElementById('name').value;
    var data = JSON.stringify({'name': name});
    stompClient.send('/app/hello', {}, data);
  }

  function showGreeting(message) {
    document.getElementById('greetings')
        .insertAdjacentHTML('beforeend', '<tr><td>' + message + '</td></tr>');
  }

  (function () {
    setConnected(false);
    var forms = document.getElementsByTagName('form');
    for (var i = 0; i < forms.length; ++i) {
      forms[i].addEventListener('submit', function (e) {
        e.preventDefault();
      })
    }
    document.getElementById('connect').addEventListener('click', connect);
    document.getElementById('disconnect').addEventListener('click', disconnect);
    document.getElementById('send').addEventListener('click', sendName);
  })();
})();
