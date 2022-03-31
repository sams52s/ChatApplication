package dsi.chat.appuser.exceptions;

public class UnverifiedAccountException extends Exception {
    public UnverifiedAccountException(String errorMessage) {
        super(errorMessage);
    }
}
