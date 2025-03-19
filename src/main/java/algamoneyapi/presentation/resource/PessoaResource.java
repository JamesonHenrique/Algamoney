package algamoneyapi.presentation.resource;

import algamoneyapi.application.dto.PageResponse;
import algamoneyapi.application.dto.PessoaRequestDTO;
import algamoneyapi.application.dto.PessoaResponseDTO;
import algamoneyapi.application.service.PessoaService;
import algamoneyapi.core.model.Pessoa;
import algamoneyapi.core.repository.PessoaRepository;
import algamoneyapi.presentation.event.RecursoCriadoEvent;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pessoas")
@Tag(name = "Pessoas", description = "API para gerenciamento de pessoas")
public class PessoaResource {

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private PessoaService pessoaService;

    @Autowired
    private ApplicationEventPublisher publisher;

    @Operation(summary = "Criar nova pessoa", description = "Cria um novo registro de pessoa")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Pessoa criada com sucesso",
            content = @Content(schema = @Schema(implementation = PessoaResponseDTO.class))),
        @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos")
    })
    @PostMapping
    public ResponseEntity<PessoaResponseDTO> criar(
            @Parameter(description = "Dados da pessoa", required = true)
            @Valid @RequestBody PessoaRequestDTO pessoaRequestDTO, 
            HttpServletResponse response) {
        Pessoa pessoa = new Pessoa(null, pessoaRequestDTO.nome(), pessoaRequestDTO.endereco(), pessoaRequestDTO.ativo());
        Pessoa pessoaSalva = pessoaRepository.save(pessoa);
        publisher.publishEvent(new RecursoCriadoEvent(this, response, pessoaSalva.getCodigo()));
        PessoaResponseDTO pessoaResponseDTO = new PessoaResponseDTO(pessoaSalva.getCodigo(), pessoaSalva.getNome(), pessoaSalva.getEndereco(), pessoaSalva.getAtivo());
        return ResponseEntity.status(HttpStatus.CREATED).body(pessoaResponseDTO);
    }

    @Operation(summary = "Buscar pessoa por código", description = "Retorna uma pessoa específica pelo seu código")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Pessoa encontrada",
            content = @Content(schema = @Schema(implementation = PessoaResponseDTO.class))),
        @ApiResponse(responseCode = "404", description = "Pessoa não encontrada")
    })
    @GetMapping("/{codigo}")
    public ResponseEntity<PessoaResponseDTO> buscarPeloCodigo(
            @Parameter(description = "Código da pessoa", required = true)
            @PathVariable Long codigo) {
        Pessoa pessoa = pessoaRepository.findById(codigo).orElse(null);
        if (pessoa == null) {
            return ResponseEntity.notFound().build();
        }
        PessoaResponseDTO pessoaResponseDTO = new PessoaResponseDTO(pessoa.getCodigo(), pessoa.getNome(), pessoa.getEndereco(), pessoa.getAtivo());
        return ResponseEntity.ok(pessoaResponseDTO);
    }

    @Operation(summary = "Remover pessoa", description = "Remove uma pessoa existente")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Pessoa removida com sucesso"),
        @ApiResponse(responseCode = "404", description = "Pessoa não encontrada")
    })
    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(
            @Parameter(description = "Código da pessoa", required = true)
            @PathVariable Long codigo) {
        pessoaRepository.deleteById(codigo);
    }

    @Operation(summary = "Atualizar pessoa", description = "Atualiza os dados de uma pessoa existente")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Pessoa atualizada com sucesso",
            content = @Content(schema = @Schema(implementation = PessoaResponseDTO.class))),
        @ApiResponse(responseCode = "404", description = "Pessoa não encontrada"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos")
    })
    @PutMapping("/{codigo}")
    public ResponseEntity<PessoaResponseDTO> atualizar(
            @Parameter(description = "Código da pessoa", required = true)
            @PathVariable Long codigo,
            @Parameter(description = "Novos dados da pessoa", required = true)
            @Valid @RequestBody PessoaRequestDTO pessoaRequestDTO) {
        PessoaResponseDTO pessoaAtualizada = pessoaService.atualizar(codigo, pessoaRequestDTO);
        return ResponseEntity.ok(pessoaAtualizada);
    }

    @Operation(summary = "Atualizar status ativo", description = "Atualiza o status ativo/inativo de uma pessoa")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Status atualizado com sucesso"),
        @ApiResponse(responseCode = "404", description = "Pessoa não encontrada")
    })
    @PutMapping("/{codigo}/ativo")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void atualizarPropriedadeAtivo(
            @Parameter(description = "Código da pessoa", required = true)
            @PathVariable Long codigo,
            @Parameter(description = "Novo status ativo (true/false)", required = true)
            @RequestBody Boolean ativo) {
        pessoaService.atualizarPropriedadeAtivo(codigo, ativo);
    }

    @Operation(summary = "Pesquisar pessoas", description = "Retorna uma lista paginada de pessoas")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Pesquisa realizada com sucesso",
            content = @Content(schema = @Schema(implementation = PageResponse.class))),
        @ApiResponse(responseCode = "400", description = "Parâmetros de paginação inválidos")
    })
    @GetMapping
    public ResponseEntity<PageResponse<PessoaResponseDTO>> pesquisar(
            @Parameter(description = "Número da página (começa em 0)")
            @RequestParam(defaultValue = "0", name = "page", required = false) @PositiveOrZero int page,
            @Parameter(description = "Quantidade de registros por página (máximo 100)")
            @RequestParam(defaultValue = "10", name = "size", required = false) @Positive @Max(100) int size) {
        return ResponseEntity.ok(pessoaService.pesquisar("", size, page));
    }
}