package algamoneyapi.repository;

import algamoneyapi.model.Lancamento;
import algamoneyapi.repository.filter.LancamentoFilter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LancamentoRepository extends JpaRepository<Lancamento, Long> {
    List<LancamentoFilter> findByDescricao(String descricao);
    List<LancamentoFilter> findByDataVencimentoDe(String dataVencimentoDe);
    List<LancamentoFilter> findByDataVencimentoAte(String dataVencimentoAte);

    Page<Lancamento> filtrar(
            LancamentoFilter lancamentoFilter, Pageable pageable);
}
