package algamoneyapi.resource;

import algamoneyapi.model.Categoria;
import algamoneyapi.repository.CategoriaRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/categorias")
@AllArgsConstructor
public class CategoriaResource {
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
    public ResponseEntity<Categoria> criar(@RequestBody Categoria categoria, HttpServletResponse response) {
        Categoria categoriaSalva = categoriaRepository.save(categoria);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{codigo}")
                .buildAndExpand(categoriaSalva.getCodigo()).toUri();
        response.setHeader("Location", uri.toASCIIString());
        return ResponseEntity.status(
                HttpStatus.CREATED).body(categoriaSalva);
}}