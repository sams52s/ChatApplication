package dsi.chat.email;

public class InvalidEmailException extends Exception {
    public InvalidEmailException(String errorMessage) {
        super(errorMessage);
    }
}
