package algamoneyapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

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
    @JsonIgnore
    @Transient
    public boolean isInativo() {
        return !this.ativo;
    }
}
