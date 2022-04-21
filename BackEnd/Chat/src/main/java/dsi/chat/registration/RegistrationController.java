package dsi.chat.registration;

import dsi.chat.email.InvalidEmailException;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.cert.CertificateExpiredException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/v1/registration")
@AllArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;

    // Registers user with email validation
    @PostMapping
    public String register(@RequestBody RegistrationRequest request) throws InvalidEmailException {
        return registrationService.register(request);
    }

    // Confirms token to activate user
    @GetMapping(path = "confirm")
    public String confirm(@RequestParam("token") String token) throws CertificateExpiredException {
        return registrationService.confirmToken(token);
    }

    // Resends mail with a new token, in case the previous one expires
    @GetMapping(path = "reconfirm")
    public String resend(@RequestParam("token") String token) {
        return registrationService.resendEmail(token);
    }

    // Adds new user when he/she uses Google OAuth to login
    @PostMapping(path = "google")
    public String googleAuthRegister(@RequestBody RegistrationRequestWithoutPass request) {
        return registrationService.registerWithGoogle(request);
    }

}
