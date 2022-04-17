package dsi.chat.chatserver;

import lombok.*;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Message {

    private Long senderId;
    private Long receiverId;
    private String content;
    private Status status;
}
