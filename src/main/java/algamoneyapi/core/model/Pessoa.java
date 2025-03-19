package algamoneyapi.core.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Entity
@Data
@AllArgsConstructor
@Table(name = "pessoa")
@NoArgsConstructor

public class Pessoa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;
    @NotNull
    private String nome;
    @Embedded
    @NotNull
    private Endereco endereco;
    @NotNull
    private Boolean ativo;
    @JsonIgnoreProperties("pessoa")
    @Valid
    @OneToMany(mappedBy = "pessoa", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Contato> contatos;
    @JsonIgnore
    @Transient
    public boolean isInativo() {
        return !this.ativo;
    }
}
