package algamoneyapi.repository;



import algamoneyapi.model.Permissao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface PermissaoRepository extends JpaRepository<Permissao, Long> {

    List<Permissao> findByDescricao(String descricao);
}