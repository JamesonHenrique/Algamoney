package algamoneyapi.presentation.resource;

import algamoneyapi.application.service.AuthenticationService;
import algamoneyapi.application.dto.AuthenticationRequest;
import algamoneyapi.application.dto.AuthenticationResponse;
import algamoneyapi.application.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
                                                          ) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authentication")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
                                                              ) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }
}
