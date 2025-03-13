package algamoneyapi.presentation.resource;

import algamoneyapi.application.dto.PageResponse;
import algamoneyapi.application.dto.PessoaRequestDTO;
import algamoneyapi.application.dto.PessoaResponseDTO;
import algamoneyapi.application.service.PessoaService;
import algamoneyapi.core.model.Pessoa;
import algamoneyapi.core.repository.PessoaRepository;
import algamoneyapi.presentation.event.RecursoCriadoEvent;
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
public class PessoaResource {

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private PessoaService pessoaService;

    @Autowired
    private ApplicationEventPublisher publisher;

    @PostMapping
    public ResponseEntity<PessoaResponseDTO> criar(@Valid @RequestBody PessoaRequestDTO pessoaRequestDTO, HttpServletResponse response) {
        Pessoa pessoa = new Pessoa(null, pessoaRequestDTO.nome(), pessoaRequestDTO.endereco(), pessoaRequestDTO.ativo());
        Pessoa pessoaSalva = pessoaRepository.save(pessoa);
        publisher.publishEvent(new RecursoCriadoEvent(this, response, pessoaSalva.getCodigo()));
        PessoaResponseDTO pessoaResponseDTO = new PessoaResponseDTO(pessoaSalva.getCodigo(), pessoaSalva.getNome(), pessoaSalva.getEndereco(), pessoaSalva.getAtivo());
        return ResponseEntity.status(HttpStatus.CREATED).body(pessoaResponseDTO);
    }

    @GetMapping("/{codigo}")
    public ResponseEntity<PessoaResponseDTO> buscarPeloCodigo(@PathVariable Long codigo) {
        Pessoa pessoa = pessoaRepository.findById(codigo).orElse(null);
        if (pessoa == null) {
            return ResponseEntity.notFound().build();
        }
        PessoaResponseDTO pessoaResponseDTO = new PessoaResponseDTO(pessoa.getCodigo(), pessoa.getNome(), pessoa.getEndereco(), pessoa.getAtivo());
        return ResponseEntity.ok(pessoaResponseDTO);
    }

    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long codigo) {
        pessoaRepository.deleteById(codigo);
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<PessoaResponseDTO> atualizar(@PathVariable Long codigo, @Valid @RequestBody PessoaRequestDTO pessoaRequestDTO) {
        PessoaResponseDTO pessoaAtualizada = pessoaService.atualizar(codigo, pessoaRequestDTO);
        return ResponseEntity.ok(pessoaAtualizada);
    }

    @PutMapping("/{codigo}/ativo")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void atualizarPropriedadeAtivo(@PathVariable Long codigo, @RequestBody Boolean ativo) {
        pessoaService.atualizarPropriedadeAtivo(codigo, ativo);
    }

    @GetMapping
    public ResponseEntity<PageResponse<PessoaResponseDTO>> pesquisar(

            @RequestParam(defaultValue = "0", name = "page", required = false) @PositiveOrZero int page,
            @RequestParam(defaultValue = "10", name = "size", required = false) @Positive @Max(100) int size) {
        return ResponseEntity.ok(pessoaService.pesquisar("", size, page));
    }
}