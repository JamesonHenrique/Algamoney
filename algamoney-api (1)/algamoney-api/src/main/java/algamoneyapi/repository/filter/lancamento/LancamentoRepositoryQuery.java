package algamoneyapi.repository.filter.lancamento;

import java.time.LocalDate;
import java.util.List;

import algamoneyapi.model.Lancamento;
import algamoneyapi.repository.filter.LancamentoFilter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface LancamentoRepositoryQuery {



	public Page<Lancamento> filtrar(
			LancamentoFilter lancamentoFilter, Pageable pageable);


}
