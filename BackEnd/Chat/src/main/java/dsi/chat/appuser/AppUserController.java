package dsi.chat.appuser;

import dsi.chat.appuser.exceptions.BadCredentialsException;
import dsi.chat.appuser.exceptions.UnverifiedAccountException;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/v1/client")
@AllArgsConstructor
public class AppUserController {

    private final AppUserService appUserService;

    // Checks whether the user credentials are correct
    @GetMapping(path = "login")
    public String login(
            @RequestParam("email") String email,
            @RequestParam("pwd") String pwd) throws BadCredentialsException, UnverifiedAccountException {

        return appUserService.userLogin(email, pwd);
    }

//    // Get the user with the given email
//    @GetMapping(path = "get/{email}")
//    public AppUser getUser(@PathVariable String email) {
//        return appUserService.getUserByEmail(email);
//    }

    // Get the user with the given ID
    @GetMapping(path = "get/{id}")
    public ResponseEntity<AppUser> getUser(@PathVariable Long id) {
        return appUserService.getUserById(id);
    }


    // Get the user ID from given email
    @GetMapping(path = "get-id-by-email/{email}")
    public Long getUserID(@PathVariable String email) throws EntityNotFoundException {
        return appUserService.getIdByEmail(email);
    }

    // Get the first name by email
    @GetMapping(path = "getname/{id}")
    public String getFirstName(@PathVariable Long id) {
        return appUserService.getName(id, false);
    }

    // Get the full name by email
    @GetMapping(path = "getfullname/{id}")
    public String getFullName(@PathVariable Long id) {
        return appUserService.getName(id, true);
    }
}
