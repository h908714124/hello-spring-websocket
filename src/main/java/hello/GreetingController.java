package hello;

import org.springframework.http.MediaType;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class GreetingController {

  private final SimpMessagingTemplate template;

  public GreetingController(SimpMessagingTemplate template) {
    this.template = template;
  }

  @MessageMapping("/hello")
  @SendTo("/topic/greetings")
  public OutMessage greeting(InMessage message) {
    OutMessage outMessage = new OutMessage();
    outMessage.setText("Hello, " + message.getText() + "!");
    return outMessage;
  }

  @ResponseBody
  @PostMapping(value = "/blub", consumes = MediaType.APPLICATION_JSON_VALUE)
  public OutMessage blub(@RequestBody InMessage message) {
    OutMessage outMessage = new OutMessage();
    outMessage.setText(message.getText());
    template.convertAndSend("/topic/greetings", outMessage);
    return outMessage;
  }
}
