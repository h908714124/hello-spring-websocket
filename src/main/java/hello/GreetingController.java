package hello;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class GreetingController {

  @MessageMapping("/hello")
  @SendTo("/topic/greetings")
  public OutMessage greeting(InMessage message) {
    OutMessage outMessage = new OutMessage();
    outMessage.setText("Hello, " + message.getText() + "!");
    return outMessage;
  }
}
