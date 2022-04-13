package dsi.chat.chatserver;

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

    public static String decrypt(String encryptedLine, int key) {
        StringBuilder base64code = new StringBuilder();

        for (char ch: encryptedLine.toCharArray()) {
            ch -= key;
            base64code.append(ch);
        }

        byte[] decodedBytes = Base64.getDecoder().decode(base64code.toString());
        String decoded = new String(decodedBytes);

        return decoded;
    }
}
