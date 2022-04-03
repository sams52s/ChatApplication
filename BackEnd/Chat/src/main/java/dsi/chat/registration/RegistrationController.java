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

    @PostMapping
    public String register(@RequestBody RegistrationRequest request) throws InvalidEmailException {
        return registrationService.register(request);
    }

    @GetMapping(path = "confirm")
    public String confirm(@RequestParam("token") String token) throws CertificateExpiredException {
        return registrationService.confirmToken(token);
    }

    @GetMapping(path = "reconfirm")
    public String resend(@RequestParam("token") String token) {
        return registrationService.resendEmail(token);
    }

    @PostMapping(path = "google")
    public String googleAuthRegister(@RequestBody RegistrationRequestWithoutPass request) {
        return registrationService.registerWithGoogle(request);
    }

}
