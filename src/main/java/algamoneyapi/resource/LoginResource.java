package algamoneyapi.resource;
import algamoneyapi.model.Permissao;
import algamoneyapi.model.Role;
import algamoneyapi.repository.PermissaoRepository;
import algamoneyapi.repository.UsuarioRepository;
import algamoneyapi.resource.dto.LoginRequest;
import algamoneyapi.resource.dto.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.stream.Collectors;

import static algamoneyapi.model.Permissao_.descricao;

@RestController
public class LoginResource {

    private final JwtEncoder jwtEncoder;
    private final UsuarioRepository UsuarioRepository;
    private BCryptPasswordEncoder passwordEncoder;

    public LoginResource
            (JwtEncoder jwtEncoder,
                           UsuarioRepository UsuarioRepository,
                           BCryptPasswordEncoder passwordEncoder) {
        this.jwtEncoder = jwtEncoder;
        this.UsuarioRepository = UsuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {

        var Usuario = UsuarioRepository.findByNome(loginRequest.username());

        if (Usuario.isEmpty() || !Usuario.get().isLoginCorrect(loginRequest, passwordEncoder)) {
            throw new BadCredentialsException("Usuario or password is invalid!");
        }

        var now = Instant.now();
        var expiresIn = 300L;

        var scopes = Usuario.get().getRoles()
                .stream()
                .map(Role::getName) // Mapping to the correct type
                .collect(Collectors.joining(" "));

        var claims = JwtClaimsSet.builder()
                .issuer("mybackend")
                .subject(Usuario.get().getCodigo().toString())
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiresIn))
                .claim("scope", scopes)
                .build();

        var jwtValue = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

        return ResponseEntity.ok(new LoginResponse(jwtValue, expiresIn));
    }}