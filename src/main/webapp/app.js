(function () {
  "use strict";

  var stompClient;

  var vm = new Vue({

    el: '#main-content',

    data: {
      connected: false,
      newMessage: '',
      messages: []
    },

    methods: {

      sendMessage: function () {
        if (!this.connected) {
          return;
        }
        var text = this.newMessage.trim();
        var message = JSON.stringify({'text': text});
        stompClient.send('/app/hello', {}, message);
      },

      disconnect: function () {
        this.connected = false;
        if (!stompClient) {
          return;
        }
        stompClient.disconnect();
        stompClient = undefined;
        this.messages.length = 0;
        this.newMessage = '';
      },

      connect: function () {
        this.connected = true;
        createStompClient();
      }
    }
  });

  function createStompClient() {
    if (stompClient) {
      return;
    }
    var socket = new SockJS('/hello-spring-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function () {
      stompClient.subscribe('/topic/greetings', function (data) {
        var message = JSON.parse(data.body);
        vm.messages.push({'text': message.text});
      });
    });
  }
})();
