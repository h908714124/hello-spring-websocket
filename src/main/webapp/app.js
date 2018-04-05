(function () {
  "use strict";

  var stompClient;

  var ar = [];

  new Vue({

    el: '#main-content',

    data: {
      connected: false,
      newMessage: '',
      messages: ar
    },

    methods: {

      sendMessage: function () {
        if (!stompClient) {
          return;
        }
        var text = this.newMessage.trim();
        var message = JSON.stringify({'text': text});
        stompClient.send('/app/hello', {}, message);
      },

      disconnect: function () {
        if (!stompClient) {
          return;
        }
        stompClient.disconnect();
        stompClient = undefined;
        this.connected = false;
        this.messages.length = 0;
        this.newMessage = '';
      },

      connect: function () {
        if (stompClient) {
          return;
        }
        this.connected = true;
        stompClient = createStompClient();
      }
    }
  });

  function createStompClient() {
    var socket = new SockJS('/hello-spring-websocket');
    var stompClient = Stomp.over(socket);
    stompClient.connect({}, function () {
      stompClient.subscribe('/topic/greetings', function (data) {
        var message = JSON.parse(data.body);
        ar.push({'text': message.text});
      });
    });
    return stompClient;
  }
})();
