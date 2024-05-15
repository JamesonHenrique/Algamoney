package algamoneyapi.resource;



import algamoneyapi.config.property.AlgamoneyApiProperty;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Profile("oauth-security")
@RestController
@RequestMapping("/tokens")
public class TokenResource {

    @Autowired
    private AlgamoneyApiProperty
            algamoneyApiProperty;

    @DeleteMapping("/revoke")
    public void revoke(
            HttpServletRequest req, HttpServletResponse resp) {
        Cookie
                cookie = new Cookie("refreshToken", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(algamoneyApiProperty.getSeguranca().isEnableHttps());
        cookie.setPath(req.getContextPath() + "/oauth/token");
        cookie.setMaxAge(0);

        resp.addCookie(cookie);
        resp.setStatus(HttpStatus.NO_CONTENT.value());
    }

}