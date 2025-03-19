package algamoneyapi.core.repository;

import algamoneyapi.core.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {


    @Query("SELECT u FROM Usuario u JOIN u.roles r WHERE r.name = :roleName")
    List<Usuario> findByRoleName(@Param("roleName") String roleName);

    Optional<Usuario> findByEmail(String email);

    Optional<Usuario> findByNome(String nome);

}
