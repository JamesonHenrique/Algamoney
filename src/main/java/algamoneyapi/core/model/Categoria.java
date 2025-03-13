package algamoneyapi.core.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "categoria")

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Categoria{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;
@NotNull
@Size(min = 3, max = 20)
    private String nome;


    }
