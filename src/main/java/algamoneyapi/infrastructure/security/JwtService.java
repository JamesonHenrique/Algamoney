package algamoneyapi.infrastructure.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.*;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
@Service
public class JwtService {

    // Chave secreta usada para assinar o JWT, injetada a partir do arquivo de configuração
    // @Value("${application.security.jwt.secret-key}")
    private PrivateKey privateKey;
    private PublicKey publicKey;


    public JwtService() throws Exception {
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("EC");
        keyPairGenerator.initialize(256);
        KeyPair keyPair = keyPairGenerator.generateKeyPair();
        this.privateKey = keyPair.getPrivate();
        this.publicKey = keyPair.getPublic();

    }
    /**
     * Extrai o nome de usuário (subject) do token JWT.
     *
     * @param token o token JWT
     * @return o nome de usuário contido no token
     */
    public String extractUsername(String token) {
        // Usa o método extractClaim para obter o subject (nome de usuário) do token
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Gera um token JWT para o usuário fornecido.
     *
     * @param userDetails os detalhes do usuário
     * @return o token JWT gerado
     */
    public String generateToken(UserDetails userDetails) {
        // Chama o método generateToken com um mapa vazio de claims adicionais
        return generateToken(new HashMap<>(), userDetails);
    }

    /**
     * Gera um token JWT com claims adicionais.
     *
     * @param extraClaims claims adicionais a serem incluídas no token
     * @param userDetails os detalhes do usuário
     * @return o token JWT gerado
     */
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        // Constrói o token JWT com os claims fornecidos, subject, data de emissão, data de expiração e assinatura
        return Jwts.builder()
                .setClaims(extraClaims) // Define os claims adicionais
                .setSubject(userDetails.getUsername()) // Define o nome de usuário como subject
                .setIssuedAt(new Date(System.currentTimeMillis())) // Define a data de emissão do token
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24)) // Define a data de expiração do token (24 horas)
                .signWith(privateKey, SignatureAlgorithm.ES256) // Assina o token com a chave secreta e o algoritmo ES256
                .compact(); // Constrói o token JWT
    }

    /**
     * Verifica se o token JWT é válido para o usuário fornecido.
     *
     * @param token o token JWT
     * @param userDetails os detalhes do usuário
     * @return true se o token for válido, false caso contrário
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        // Extrai o nome de usuário do token e verifica se é igual ao nome de usuário fornecido e se o token não está expirado
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    /**
     * Verifica se o token JWT está expirado.
     *
     * @param token o token JWT
     * @return true se o token estiver expirado, false caso contrário
     */
    private boolean isTokenExpired(String token) {
        // Verifica se a data de expiração do token é anterior à data atual
        return extractExpiration(token).before(new Date());
    }

    /**
     * Extrai a data de expiração do token JWT.
     *
     * @param token o token JWT
     * @return a data de expiração do token
     */
    private Date extractExpiration(String token) {
        // Usa o método extractClaim para obter a data de expiração do token
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Extrai um claim específico do token JWT usando um resolver de claims.
     *
     * @param token o token JWT
     * @param claimsResolver a função para resolver o claim
     * @param <T> o tipo do claim
     * @return o valor do claim extraído
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        // Extrai todos os claims do token e aplica o resolver de claims para obter o claim específico
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Extrai todos os claims do token JWT.
     *
     * @param token o token JWT
     * @return os claims contidos no token
     */
    private Claims extractAllClaims(String token) {
        // Usa o parser do Jwts para analisar o token e obter os claims
        return Jwts.parserBuilder()
                .setSigningKey(publicKey) // Define a chave de assinatura
                .build() // Constrói o parser
                .parseClaimsJws(token) // Analisa o token JWT
                .getBody(); // Obtém o corpo dos claims
    }

    /**
     * Obtém a chave de assinatura usada para assinar/verificar o token JWT.
     *
     * @return a chave de assinatura
     */
    private Key getSigningKey( ) {
        // Decodifica a chave secreta e gera a chave de assinatura HMAC-SHA
      return privateKey;
    }
}
