package algamoneyapi.application.service;

import algamoneyapi.core.model.Usuario;
import algamoneyapi.core.repository.RoleRepository;
import algamoneyapi.core.repository.UsuarioRepository;
import algamoneyapi.application.dto.AuthenticationRequest;
import algamoneyapi.application.dto.AuthenticationResponse;
import algamoneyapi.application.dto.RegisterRequest;
import algamoneyapi.infrastructure.security.JwtService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final PasswordEncoder passwordEncoder;

    private final UsuarioRepository userRepository;
    private final RoleRepository roleRepository;
    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;


    public AuthenticationResponse register(RegisterRequest request) {

        var userole = roleRepository.findByName("basic")
                .orElseThrow(() -> new RuntimeException("Regra não encontrada")); var user = Usuario.builder()
                .nome(request.nome())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .roles(List.of(userole))
                .build();


        userRepository.save(user);


        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }


    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        if (request.password() == null || request.password().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be empty");
        }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        var user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new RuntimeException("User not found"));

        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder().token(jwtToken).build();
    }
    public AuthenticationResponse refreshToken(String refreshToken) {
        String username = jwtService.extractUsername(refreshToken);

        if (username != null) {
            var user = userRepository.findByEmail(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (jwtService.isTokenValid(refreshToken, user)) {
                var newAccessToken = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                        .token(newAccessToken)
                        .refreshToken(refreshToken)
                        .build();
            }
        }

        throw new RuntimeException("Refresh token inválido ou expirado");
    }
}