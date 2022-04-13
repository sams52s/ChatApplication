package dsi.chat.appuser;

import dsi.chat.appuser.exceptions.BadCredentialsException;
import dsi.chat.appuser.exceptions.UnverifiedAccountException;
import dsi.chat.registration.password.PasswordEncoder;
import dsi.chat.registration.token.ConfirmationToken;
import dsi.chat.registration.token.ConfirmationTokenService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AppUserService {

    private final static String USER_NOT_FOUND_MSG = "user with email %s not found";

    private final AppUserRepository appUserRepository;
    private final ConfirmationTokenService confirmationTokenService;

    public ResponseEntity<AppUser> getUserById(Long userId) {
        AppUser appUser = appUserRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("The user with id "+userId+" does not exist."));

        return ResponseEntity.ok(appUser);
    }

    public String getName(Long id, boolean fullName) throws EntityNotFoundException {

        if (appUserRepository.findById(id).isEmpty()) {
            throw new EntityNotFoundException(String.format(USER_NOT_FOUND_MSG, id));
        }

        String firstName = appUserRepository.getById(id).getFirstName();
        String lastName = appUserRepository.getById(id).getLastName();

        return fullName ? firstName+" "+lastName : firstName;
    }

    public String userLogin(String email, String password) throws BadCredentialsException, UnverifiedAccountException {

        Optional<AppUser> appUserOptional = Optional.ofNullable(appUserRepository.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("Invalid E-mail ID")));

        String correctPwd = appUserOptional.get().getPassword();
        String givenPwd = PasswordEncoder.encode(password);

        // Check Password
        if (!givenPwd.equals(correctPwd)) {
            throw new BadCredentialsException("Incorrect Password");
        }

        // If not verified, throw an exception
        if (!appUserOptional.get().getEnabled()) {
            throw new UnverifiedAccountException("Token not verified");
        }

        return "LOGIN SUCCESSFUL!";
    }

    public String signUpUser(AppUser appUser) {
        boolean userExists = appUserRepository
                .findByEmail(appUser.getEmail())
                .isPresent();

        if (userExists) {
            throw new IllegalStateException("email already taken");
        }

        String encodedPassword = PasswordEncoder.encode(appUser.getPassword());
        appUser.setPassword(encodedPassword);

        appUserRepository.save(appUser);

        String token = UUID.randomUUID().toString();

        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                appUser
        );

        confirmationTokenService.saveConfirmationToken(confirmationToken);

        return token;
    }

    public void signUpUserWithoutVerification(AppUser appUser) {
        boolean userExists = appUserRepository
                .findByEmail(appUser.getEmail())
                .isPresent();

        if (!userExists) {
            String encodedPassword = PasswordEncoder.encode(appUser.getPassword());
            appUser.setPassword(encodedPassword);

            appUserRepository.save(appUser);
            appUserRepository.enableAppUser(appUser.getEmail());
        }
    }

    public Long getIdByEmail(String email) throws EntityNotFoundException {

        if (appUserRepository.findByEmail(email).isEmpty()) {
            throw new EntityNotFoundException(String.format(USER_NOT_FOUND_MSG, email));
        }

        return appUserRepository.findByEmail(email).get().getId();
    }

    public String makeNewToken(AppUser appUser) {

        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token, LocalDateTime.now(), LocalDateTime.now().plusMinutes(15), appUser
        );

        confirmationTokenService.saveConfirmationToken(confirmationToken);
        return token;
    }

    public void enableAppUser(String email) {
        appUserRepository.enableAppUser(email);
    }

    // Select all Users
    public List<AppUser> getUsers() {
        return appUserRepository.findAll();
    }

    // Select all users except for the one with the provided email
    public List<Long> getOtherUsers(String email) {
        return appUserRepository.findOtherIds(email);
    }
}
