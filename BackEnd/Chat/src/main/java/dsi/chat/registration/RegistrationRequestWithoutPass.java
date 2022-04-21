package dsi.chat.registration;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

// It is the same code as RegistrationRequest, but it
// doesn't take password.
// Only used when the user uses Google OAuth.
@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class RegistrationRequestWithoutPass {
    private final String firstName;
    private final String lastName;
    private final String email;
}
