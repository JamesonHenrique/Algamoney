package algamoneyapi.presentation.resource;

import algamoneyapi.application.dto.*;
import algamoneyapi.application.service.LancamentoService;
import algamoneyapi.core.repository.LancamentoRepository;
import algamoneyapi.core.repository.projection.ResumoLancamento;
import algamoneyapi.presentation.event.RecursoCriadoEvent;
import algamoneyapi.presentation.exceptionHandler.AlgamoneyExceptionHandler;
import algamoneyapi.application.service.exception.PessoaInexistenteOuInativaException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/lancamentos")
@Tag(name = "Lançamentos", description = "API para gerenciamento de lançamentos financeiros")
public class LancamentoResource {

    @Autowired
    private LancamentoRepository lancamentoRepository;

    @Autowired
    private LancamentoService lancamentoService;

    @Autowired
    private ApplicationEventPublisher publisher;

    @Autowired
    private MessageSource messageSource;

    @Operation(summary = "Filtrar lançamentos", description = "Retorna uma lista paginada de lançamentos com base nos filtros fornecidos")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lançamentos encontrados com sucesso"),
        @ApiResponse(responseCode = "400", description = "Parâmetros de paginação inválidos")
    })
    @GetMapping
    public ResponseEntity<PageResponse<LancamentoResponseDTO>> filtrar(
            @Parameter(description = "Descrição do lançamento para filtrar") 
            @RequestParam(required = false) String descricao,
            @Parameter(description = "Data de pagamento para filtrar") 
            @RequestParam(required = false) LocalDate dataPagamento,
            @Parameter(description = "Data de vencimento para filtrar") 
            @RequestParam(required = false) LocalDate dataVencimento,
            @Parameter(description = "Número da página (começa em 0)") 
            @RequestParam(defaultValue = "0", name = "page", required = false) @PositiveOrZero int page,
            @Parameter(description = "Quantidade de registros por página (máximo 100)") 
            @RequestParam(defaultValue = "10", name = "size", required = false) @Positive @Max(100) int size) {
        return ResponseEntity.ok(lancamentoService.filtrar(descricao, dataPagamento, dataVencimento, size, page));
    }

    @Operation(summary = "Resumo de lançamentos", description = "Retorna uma lista paginada com o resumo dos lançamentos")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Resumo dos lançamentos retornado com sucesso")
    })
    @GetMapping("/resumir")
    public Page<ResumoLancamento> resumir(
            @Parameter(description = "Descrição do lançamento para filtrar")
            @RequestParam(required = false) String descricao,
            @Parameter(description = "Data de vencimento inicial")
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataVencimentoDe,
            @Parameter(description = "Data de vencimento final")
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataVencimentoAte,
            Pageable pageable) {
        return lancamentoRepository.resumir(descricao, dataVencimentoDe, dataVencimentoAte, pageable);
    }

    @Operation(summary = "Buscar lançamento por código", description = "Retorna um lançamento específico pelo seu código")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lançamento encontrado"),
        @ApiResponse(responseCode = "404", description = "Lançamento não encontrado")
    })
    @GetMapping("/{codigo}")
    public ResponseEntity<LancamentoResponseDTO> buscarPeloCodigo(
            @Parameter(description = "Código do lançamento", required = true)
            @PathVariable Long codigo) {
        return lancamentoRepository.findById(codigo)
                .map(lancamento -> ResponseEntity.ok(new LancamentoResponseDTO(lancamento.getCodigo(), lancamento.getDescricao(), lancamento.getDataVencimento(), lancamento.getDataPagamento(), lancamento.getValor(), lancamento.getObservacao(), lancamento.getTipo(), lancamento.getCategoria(), lancamento.getPessoa())))
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Criar novo lançamento", description = "Cria um novo lançamento financeiro")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Lançamento criado com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos"),
        @ApiResponse(responseCode = "422", description = "Pessoa inexistente ou inativa")
    })
    @PostMapping
    public ResponseEntity<LancamentoResponseDTO> criar(
            @Parameter(description = "Dados do lançamento", required = true)
            @Valid @RequestBody LancamentoRequestDTO lancamentoRequestDTO, 
            HttpServletResponse response) {
        LancamentoResponseDTO lancamentoSalvo = lancamentoService.salvar(lancamentoRequestDTO);
        publisher.publishEvent(new RecursoCriadoEvent(this, response, lancamentoSalvo.codigo()));
        return ResponseEntity.status(HttpStatus.CREATED).body(lancamentoSalvo);
    }

    @Operation(summary = "Remover lançamento", description = "Remove um lançamento existente")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Lançamento removido com sucesso"),
        @ApiResponse(responseCode = "404", description = "Lançamento não encontrado")
    })
    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(
            @Parameter(description = "Código do lançamento", required = true)
            @PathVariable Long codigo) {
        lancamentoRepository.deleteById(codigo);
    }

    @Operation(summary = "Atualizar lançamento", description = "Atualiza um lançamento existente")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lançamento atualizado com sucesso"),
        @ApiResponse(responseCode = "404", description = "Lançamento não encontrado"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos"),
        @ApiResponse(responseCode = "422", description = "Pessoa inexistente ou inativa")
    })
    @PutMapping("/{codigo}")
    public ResponseEntity<LancamentoResponseDTO> atualizar(
            @Parameter(description = "Código do lançamento", required = true)
            @PathVariable Long codigo,
            @Parameter(description = "Novos dados do lançamento", required = true)
            @Valid @RequestBody LancamentoRequestDTO lancamentoRequestDTO) {
        try {
            LancamentoResponseDTO lancamentoAtualizado = lancamentoService.atualizar(codigo, lancamentoRequestDTO);
            return ResponseEntity.ok(lancamentoAtualizado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @Operation(summary = "Obter estatísticas por categoria", description = "Retorna estatísticas de lançamentos financeiros agrupados por categoria")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Estatísticas retornadas com sucesso",
                    content = @Content(schema = @Schema(implementation = LancamentoEstatisticaCategoriaDto.class)))
    })
    @GetMapping("/estatisticas/por-categoria")
    public ResponseEntity<List<LancamentoEstatisticaCategoriaDto>> getEstatisticasPorCategoria() {
        List<LancamentoEstatisticaCategoriaDto> estatisticas = lancamentoService.porCategoria(LocalDate.now());
        return ResponseEntity.ok(estatisticas);
    }

    @Operation(summary = "Obter estatísticas por dia", description = "Retorna estatísticas de lançamentos financeiros agrupados por dia")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Estatísticas retornadas com sucesso",
                    content = @Content(schema = @Schema(implementation = LancamentoEstatisticaDiaDto.class)))
    })
    @GetMapping("/estatisticas/por-dia")
    public ResponseEntity<List<LancamentoEstatisticaDiaDto>> getEstatisticasPorDia() {
        List<LancamentoEstatisticaDiaDto> estatisticas = lancamentoService.porDia(LocalDate.now());
        return ResponseEntity.ok(estatisticas);
    }
    @Operation(summary = "Gerar relatório por pessoa", description = "Gera um relatório em PDF de lançamentos financeiros por pessoa em um intervalo de datas")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Relatório gerado com sucesso",
                    content = @Content(mediaType = MediaType.APPLICATION_PDF_VALUE))
    })
    @GetMapping("/relatorios/por-pessoa")
    public ResponseEntity<byte[]> relatorioPorPessoa(
            @Parameter(description = "Data de início do relatório", required = true)
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate inicio,
            @Parameter(description = "Data de fim do relatório", required = true)
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fim) throws Exception {
        byte[] relatorio = lancamentoService.relatorioPorPessoa(inicio, fim);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_PDF_VALUE)
                .body(relatorio);
    }
}