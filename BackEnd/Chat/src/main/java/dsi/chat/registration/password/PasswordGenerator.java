package dsi.chat.registration.password;

import org.springframework.context.annotation.Configuration;

// This generates a password of random alphanumeric digits
@Configuration
public class PasswordGenerator {

    public static String generate(int length) {
        String charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder password = new StringBuilder();

        for (int i=0; i<length; i++) {
            int charIndex = (int)(Math.random() * charSet.length());
            password.append(charSet.charAt(charIndex));
        }

        return password.toString();
    }
}
