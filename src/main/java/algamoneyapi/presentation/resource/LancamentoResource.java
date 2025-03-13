package algamoneyapi.presentation.resource;

import algamoneyapi.application.dto.LancamentoRequestDTO;
import algamoneyapi.application.dto.LancamentoResponseDTO;
import algamoneyapi.application.dto.PageResponse;
import algamoneyapi.application.service.LancamentoService;
import algamoneyapi.core.repository.LancamentoRepository;
import algamoneyapi.core.repository.projection.ResumoLancamento;
import algamoneyapi.presentation.event.RecursoCriadoEvent;
import algamoneyapi.presentation.exceptionHandler.AlgamoneyExceptionHandler;
import algamoneyapi.application.service.exception.PessoaInexistenteOuInativaException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/lancamentos")
public class LancamentoResource {

    @Autowired
    private LancamentoRepository lancamentoRepository;

    @Autowired
    private LancamentoService lancamentoService;

    @Autowired
    private ApplicationEventPublisher publisher;

    @Autowired
    private MessageSource messageSource;

    @GetMapping
    public ResponseEntity<PageResponse<LancamentoResponseDTO>> filtrar(
            @RequestParam(required = false) String descricao,
            @RequestParam(required = false)  LocalDate dataPagamento,
            @RequestParam(required = false) LocalDate dataVencimento,
            @RequestParam(defaultValue = "0", name = "page", required = false) @PositiveOrZero int page,
            @RequestParam(defaultValue = "10", name = "size", required = false) @Positive @Max(100) int size) {
        return ResponseEntity.ok(lancamentoService.filtrar(descricao, dataPagamento, dataVencimento, size, page));
    }

    @GetMapping("/resumir")
    public Page<ResumoLancamento> resumir(
            @RequestParam(required = false) String descricao,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataVencimentoDe,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataVencimentoAte,
            Pageable pageable) {
        return lancamentoRepository.resumir(descricao, dataVencimentoDe, dataVencimentoAte, pageable);
    }

    @GetMapping("/{codigo}")
    public ResponseEntity<LancamentoResponseDTO> buscarPeloCodigo(@PathVariable Long codigo) {
        return lancamentoRepository.findById(codigo)
                .map(lancamento -> ResponseEntity.ok(new LancamentoResponseDTO(lancamento.getCodigo(), lancamento.getDescricao(), lancamento.getDataVencimento(), lancamento.getDataPagamento(), lancamento.getValor(), lancamento.getObservacao(), lancamento.getTipo(), lancamento.getCategoria(), lancamento.getPessoa())))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<LancamentoResponseDTO> criar(@Valid @RequestBody LancamentoRequestDTO lancamentoRequestDTO, HttpServletResponse response) {
        LancamentoResponseDTO lancamentoSalvo = lancamentoService.salvar(lancamentoRequestDTO);
        publisher.publishEvent(new RecursoCriadoEvent(this, response, lancamentoSalvo.codigo()));
        return ResponseEntity.status(HttpStatus.CREATED).body(lancamentoSalvo);
    }

    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long codigo) {
        lancamentoRepository.deleteById(codigo);
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<LancamentoResponseDTO> atualizar(@PathVariable Long codigo, @Valid @RequestBody LancamentoRequestDTO lancamentoRequestDTO) {
        try {
            LancamentoResponseDTO lancamentoAtualizado = lancamentoService.atualizar(codigo, lancamentoRequestDTO);
            return ResponseEntity.ok(lancamentoAtualizado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @ExceptionHandler({ PessoaInexistenteOuInativaException.class })
    public ResponseEntity<Object> handlePessoaInexistenteOuInativaException(PessoaInexistenteOuInativaException ex) {
        String mensagemUsuario = messageSource.getMessage("pessoa.inexistente-ou-inativa", null, LocaleContextHolder.getLocale());
        String mensagemDesenvolvedor = ex.toString();
        List<AlgamoneyExceptionHandler.ApiError> erros = Arrays.asList(new AlgamoneyExceptionHandler.ApiError(mensagemUsuario, mensagemDesenvolvedor));
        return ResponseEntity.badRequest().body(erros);
    }
}