package algamoneyapi.service;

import algamoneyapi.model.Lancamento;
import algamoneyapi.model.Pessoa;
import algamoneyapi.repository.LancamentoRepository;
import algamoneyapi.repository.PessoaRepository;
import algamoneyapi.service.exception.PessoaInexistenteOuInativaException;
import org.springframework.stereotype.Service;

@Service
public class LancamentoService {
    private PessoaRepository pessoaRepository;
    private LancamentoRepository
            lancamentoRepository
            ;
    public Lancamento salvar(Lancamento lancamento) {
        Pessoa pessoa = pessoaRepository.findById(lancamento.getPessoa().getCodigo()).get();
        if (pessoa == null || pessoa.isInativo()) {
            throw new PessoaInexistenteOuInativaException();
        }
        return lancamentoRepository.save(lancamento);
    }
}
