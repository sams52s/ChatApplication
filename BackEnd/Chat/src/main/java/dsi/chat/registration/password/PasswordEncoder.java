package dsi.chat.registration.password;

import org.springframework.context.annotation.Configuration;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Configuration
public class PasswordEncoder {

    public static String encode(String pwd) {
        // First, it converts the string to hashcode
        String hash = Integer.toString(pwd.hashCode());
        // Then the hashcode is converted to Base64 code
        return Base64.getEncoder().encodeToString(hash.getBytes(StandardCharsets.UTF_8));
    }
}
