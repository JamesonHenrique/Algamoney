package algamoneyapi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Entity
@Data
@AllArgsConstructor
@Table(name="pessoas")
public class Pessoa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;
    @NotNull
    private String nome;
    @Embedded
    private Endereco endereco;
    private Boolean ativo;
}
