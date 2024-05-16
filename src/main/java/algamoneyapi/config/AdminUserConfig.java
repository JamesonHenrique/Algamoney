package algamoneyapi.config;

import algamoneyapi.model.Role;
import algamoneyapi.model.Usuario;
import algamoneyapi.repository.RoleRepository;
import algamoneyapi.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Configuration
public class AdminUserConfig implements CommandLineRunner {

    private RoleRepository
            roleRepository;
    private UsuarioRepository
            usuarioRepository ;
    private BCryptPasswordEncoder passwordEncoder;

    public AdminUserConfig(RoleRepository roleRepository,
                            UsuarioRepository  usuarioRepository,
                           BCryptPasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this. usuarioRepository =  usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        System.out.println("Running ");
        var roleAdmin = roleRepository.findByName(Role.Values.ADMIN.name());

        // Verifique se roleAdmin é nulo e crie o Role se necessário
        if (roleAdmin == null) {
            roleAdmin = new Role();
            roleAdmin.setName(Role.Values.ADMIN.name());
            roleRepository.save(roleAdmin);
        }

        var userAdmin =  usuarioRepository.findByNome("admin");

        Role
                finalRoleAdmin =
                roleAdmin;
        userAdmin.ifPresentOrElse(
                user -> {
                    System.out.println("admin ja existe");
                },
                () -> {
                    var user = new Usuario();
                    user.setCodigo(1L);
                    user.setNome("admin");
                    user.setSenha(passwordEncoder.encode("admin"));
                    user.setEmail("admin@algamoney.com");
                    user.setRoles(Set.of(
                            finalRoleAdmin));
                    usuarioRepository.save(user);
                }
        );
    }
}