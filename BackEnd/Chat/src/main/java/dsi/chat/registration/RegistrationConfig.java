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
            AppUser admin = new AppUser(
                    "Aly",
                    "Mooltazeem",
                    "aly.mooltazeem@dsinnovators.com",
                    "123",
                    AppUserRole.ADMIN
            );

            String encodedPassword = PasswordEncoder.encode(admin.getPassword());
            admin.setPassword(encodedPassword);
            admin.setEnabled(true);

            repository.saveAll(List.of(admin));
        };
    }
}
