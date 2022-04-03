package dsi.chat.registration;

import org.springframework.context.annotation.Configuration;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Configuration
public class PasswordEncoder {

    public static String encode(String pwd) {
        String hash = Integer.toString(pwd.hashCode());
        return Base64.getEncoder().encodeToString(hash.getBytes(StandardCharsets.UTF_8));
    }
}
