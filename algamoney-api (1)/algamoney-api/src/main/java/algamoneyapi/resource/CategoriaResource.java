package algamoneyapi.resource;

import algamoneyapi.event.RecursoCriadoEvent;
import algamoneyapi.model.Categoria;
import algamoneyapi.repository.CategoriaRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/categorias")

public class CategoriaResource {
    @Autowired
    private ApplicationEventPublisher publisher;
    @Autowired
    private CategoriaRepository
            categoriaRepository;

    @GetMapping
    public List<Categoria> listar() {
        List<Categoria>
                categorias =
                categoriaRepository.findAll();
        return categorias;




    }
    @PostMapping
    public ResponseEntity<Categoria> criar(@Valid  @RequestBody Categoria categoria, HttpServletResponse response) {
        Categoria categoriaSalva = categoriaRepository.save(categoria);
        publisher.publishEvent(new RecursoCriadoEvent(this, response, categoriaSalva.getCodigo()));

        return ResponseEntity.status(
                HttpStatus.CREATED).body(categoriaSalva);
}
    @GetMapping("/{codigo}")
    public ResponseEntity<Categoria> buscarPeloCodigo(@PathVariable Long codigo) {
        Categoria categoria = categoriaRepository.findById(codigo).orElseThrow( () -> new RuntimeException("Categoria não encontrada"));
        return categoria != null ? ResponseEntity.ok(categoria) : ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long codigo) {
        categoriaRepository.deleteById(codigo);
    }
    @PutMapping("/{codigo}")
    public ResponseEntity<Categoria> atualizar(@PathVariable Long codigo, @RequestBody Categoria categoria) {
        Categoria categoriaSalva = categoriaRepository.findById(codigo).orElseThrow( () -> new RuntimeException("Categoria não encontrada"));
        if (categoriaSalva == null) {
            return ResponseEntity.notFound().build();
        }
        categoriaSalva.setNome(categoria.getNome());
        categoriaRepository.save(categoriaSalva);
        return ResponseEntity.ok(categoriaSalva);
    }
}