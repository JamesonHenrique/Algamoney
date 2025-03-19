package algamoneyapi.presentation.resource;

import algamoneyapi.application.service.AuthenticationService;
import algamoneyapi.application.dto.AuthenticationRequest;
import algamoneyapi.application.dto.AuthenticationResponse;
import algamoneyapi.application.dto.RegisterRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
@Tag(name = "Autenticação", description = "API para autenticação e gerenciamento de tokens")
@SecurityRequirements
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @Operation(summary = "Registrar novo usuário", description = "Cria um novo usuário no sistema e retorna o token de acesso")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Usuário registrado com sucesso",
            content = @Content(schema = @Schema(implementation = AuthenticationResponse.class))),
        @ApiResponse(responseCode = "400", description = "Dados de registro inválidos"),
        @ApiResponse(responseCode = "409", description = "Email já registrado")
    })
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @Parameter(description = "Dados de registro do usuário", required = true)
            @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @Operation(summary = "Autenticar usuário", description = "Autentica um usuário existente e retorna o token de acesso")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Autenticação realizada com sucesso",
            content = @Content(schema = @Schema(implementation = AuthenticationResponse.class))),
        @ApiResponse(responseCode = "401", description = "Credenciais inválidas")
    })
    @PostMapping("/authentication")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @Parameter(description = "Credenciais do usuário", required = true)
            @RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @Operation(summary = "Renovar token", description = "Gera um novo token de acesso usando um token de atualização válido")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Token renovado com sucesso",
            content = @Content(schema = @Schema(implementation = AuthenticationResponse.class))),
        @ApiResponse(responseCode = "401", description = "Token de atualização inválido ou expirado")
    })
    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponse> refreshToken(
            @Parameter(description = "Token de atualização no formato 'Bearer <token>'", required = true)
            @RequestHeader("Authorization") String refreshToken) {
        if (refreshToken == null || !refreshToken.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Refresh token inválido");
        }

        String token = refreshToken.substring(7);
        return ResponseEntity.ok(authenticationService.refreshToken(token));
    }
}
