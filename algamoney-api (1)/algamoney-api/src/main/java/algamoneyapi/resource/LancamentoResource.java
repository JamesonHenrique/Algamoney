package algamoneyapi.resource;

import algamoneyapi.event.RecursoCriadoEvent;

import algamoneyapi.exceptionHandler.AlgamoneyExceptionHandler;
import algamoneyapi.model.Lancamento;

import algamoneyapi.repository.LancamentoRepository;

import algamoneyapi.repository.filter.LancamentoFilter;
import algamoneyapi.service.LancamentoService;
import algamoneyapi.service.exception.PessoaInexistenteOuInativaException;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/lancamentos")

public class LancamentoResource {
    @Autowired
    private ApplicationEventPublisher
            publisher;
    @Autowired
    private LancamentoRepository


            lancamentoRepository;
    @Autowired
    private LancamentoService lancamentoService;
    @Autowired
    private MessageSource messageSource;
    @GetMapping
    public List<Lancamento> pesquisar(
            LancamentoFilter lancamentoFilter) {
        List<Lancamento>
                lancamentos =
                lancamentoRepository.findAll();
        return lancamentos;




    }
    @PostMapping
    public ResponseEntity<Lancamento> criar(@Valid @RequestBody Lancamento lancamento, HttpServletResponse response) {
        Lancamento lancamentoSalva = lancamentoService.salvar(lancamento);
        publisher.publishEvent(new RecursoCriadoEvent(this, response, lancamentoSalva.getCodigo()));

        return ResponseEntity.status(
                HttpStatus.CREATED).body(lancamentoSalva);
    }
    @ExceptionHandler({ PessoaInexistenteOuInativaException.class })
    public ResponseEntity<Object> handlePessoaInexistenteOuInativaException(PessoaInexistenteOuInativaException ex) {
        String mensagemUsuario = messageSource.getMessage("pessoa.inexistente-ou-inativa", null, null);
        String mensagemDesenvolvedor = ex.toString();
        List<AlgamoneyExceptionHandler.Erro> erros = List.of(new AlgamoneyExceptionHandler.Erro(mensagemUsuario, mensagemDesenvolvedor));
        return ResponseEntity.badRequest().body(erros);
    }
    @GetMapping("/{codigo}")
    public ResponseEntity<Lancamento> buscarPeloCodigo(@PathVariable Long codigo) {
        Lancamento lancamento = lancamentoRepository.findById(codigo).orElseThrow( () -> new RuntimeException("lancamento não encontrada"));
        return lancamento != null ? ResponseEntity.ok(lancamento) : ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long codigo) {
        lancamentoRepository.deleteById(codigo);
    }
    @PutMapping("/{codigo}")
    public ResponseEntity<Lancamento> atualizar(@PathVariable Long codigo, @Valid @RequestBody Lancamento lancamento) {
        Lancamento lancamentoSalva = lancamentoRepository.findById(codigo).orElseThrow( () -> new RuntimeException("lancamento não encontrada"));
        if (lancamentoSalva == null) {
            return ResponseEntity.notFound().build();
        }
        lancamentoSalva.setTipo(lancamento.getTipo());
        lancamentoSalva.setDescricao(lancamento.getDescricao());
        lancamentoSalva.setDataVencimento(lancamento.getDataVencimento());
        lancamentoSalva.setDataPagamento(lancamento.getDataPagamento());
        lancamentoSalva.setValor(lancamento.getValor());
        lancamentoSalva.setObservacao(lancamento.getObservacao());
        lancamentoSalva.setCategoria(lancamento.getCategoria());
        lancamentoSalva.setPessoa(lancamento.getPessoa());


        lancamentoRepository.save(lancamentoSalva);
        return ResponseEntity.ok(lancamentoSalva);
    }

}
