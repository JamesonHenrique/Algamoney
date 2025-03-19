package algamoneyapi.presentation.resource;

import algamoneyapi.presentation.event.RecursoCriadoEvent;
import algamoneyapi.core.model.Categoria;
import algamoneyapi.core.repository.CategoriaRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
@Tag(name = "Categorias", description = "API para gerenciamento de categorias financeiras")
public class CategoriaResource {
    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private ApplicationEventPublisher publisher;

    @Operation(summary = "Listar categorias", description = "Retorna todas as categorias cadastradas")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de categorias retornada com sucesso",
            content = @Content(schema = @Schema(implementation = Categoria.class)))
    })
    @GetMapping

    public List<Categoria> listar() {
        return categoriaRepository.findAll();
    }

    @Operation(summary = "Criar categoria", description = "Cria uma nova categoria financeira")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Categoria criada com sucesso",
            content = @Content(schema = @Schema(implementation = Categoria.class))),
        @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos")
    })
    @PostMapping
    public ResponseEntity<Categoria> criar(
            @Parameter(description = "Dados da categoria", required = true)
            @Valid @RequestBody Categoria categoria, 
            HttpServletResponse response) {
        Categoria categoriaSalva = categoriaRepository.save(categoria);
        publisher.publishEvent(new RecursoCriadoEvent(this, response, categoriaSalva.getCodigo()));
        return ResponseEntity.status(HttpStatus.CREATED).body(categoriaSalva);
    }

    @Operation(summary = "Buscar categoria por código", description = "Retorna uma categoria específica pelo seu código")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Categoria encontrada",
            content = @Content(schema = @Schema(implementation = Categoria.class))),
        @ApiResponse(responseCode = "404", description = "Categoria não encontrada")
    })
    @GetMapping("/{codigo}")

    public ResponseEntity<Categoria> buscarPeloCodigo(
            @Parameter(description = "Código da categoria", required = true)
            @PathVariable Long codigo) {
        Categoria categoria = categoriaRepository.findById(codigo).get();
        return categoria != null ? ResponseEntity.ok(categoria) : ResponseEntity.notFound().build();
    }
}