package dsi.chat.registration;

import dsi.chat.appuser.AppUser;
import dsi.chat.appuser.AppUserRepository;
import dsi.chat.appuser.AppUserRole;
import dsi.chat.appuser.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@AllArgsConstructor
public class RegistrationConfig {

    @Bean
    CommandLineRunner commandLineRunner(AppUserRepository repository) {
        return args -> {
            AppUser admin1 = new AppUser(
                    "Aly",
                    "Mooltazeem",
                    "aly.mooltazeem@dsinnovators.com",
                    "123",
                    AppUserRole.ADMIN
            );

            String encodedPassword = PasswordEncoder.encode(admin1.getPassword());
            admin1.setPassword(encodedPassword);
            admin1.setEnabled(true);

            AppUser admin2 = new AppUser(
                    "Toufiqul",
                    "Alam",
                    "sams52tas@gmail.com",
                    "456",
                    AppUserRole.ADMIN
            );

            encodedPassword = PasswordEncoder.encode(admin2.getPassword());
            admin2.setPassword(encodedPassword);
            admin2.setEnabled(true);

            repository.saveAll(List.of(admin1, admin2));
        };
    }
}
