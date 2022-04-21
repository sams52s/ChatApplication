package dsi.chat.chatserver.encryption;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class MessageEncryptor {
    public static String encrypt(String message, int key) {
        String base64Code = Base64.getEncoder().encodeToString(message.getBytes(StandardCharsets.UTF_8));
        StringBuilder encryptedCode = new StringBuilder();
        for (char ch: base64Code.toCharArray()) {
            ch += key;
            encryptedCode.append(ch);
        }

        return encryptedCode.toString();
    }
}
