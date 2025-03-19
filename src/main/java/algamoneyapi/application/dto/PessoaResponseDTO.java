package algamoneyapi.application.dto;

import algamoneyapi.core.model.Contato;
import algamoneyapi.core.model.Endereco;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.Valid;

import java.util.List;

public record PessoaResponseDTO(

        Long codigo,
        String nome,
        Endereco endereco,
        Boolean ativo,

        @JsonIgnoreProperties("pessoa")
       List<Contato> contatos
) {
}