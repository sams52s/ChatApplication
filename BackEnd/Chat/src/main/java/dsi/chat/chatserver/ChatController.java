package dsi.chat.chatserver;

import dsi.chat.appuser.AppUserRepository;
import dsi.chat.chatserver.encryption.MessageEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    private static final int PUBLIC_KEY = 27;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

//    @Autowired
//    private AppUserRepository appUserRepository;

    @MessageMapping("/message") // Accessed through /app/message
    @SendTo("/chatroom/public")
    public Message receivePublicMessage(@Payload Message message) {
//        String encryptedMessage = MessageEncryptor.encrypt(message.getContent(), PUBLIC_KEY);
//        message.setContent(encryptedMessage);
        return message;
    }

    @MessageMapping("/private-message") // Accessed through /app/private-message
    public Message receivePrivateMessage(@Payload Message message) {

//        int privateKey = appUserRepository.getById(message.getReceiverId()).getPrivateKey();
//        String encryptedMessage = MessageEncryptor.encrypt(message.getContent(), privateKey);
//        message.setContent(encryptedMessage);

        simpMessagingTemplate.convertAndSendToUser(message.getReceiverId().toString(), "/private", message); // /user/{User ID}/private
        return message;
    }

}
