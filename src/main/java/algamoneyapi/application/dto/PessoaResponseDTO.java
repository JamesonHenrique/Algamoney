package algamoneyapi.application.dto;
import algamoneyapi.core.model.Endereco;
import io.swagger.v3.oas.annotations.media.Schema;

public record PessoaResponseDTO(

        Long codigo,


        String nome,

        Endereco endereco,


        Boolean ativo
) {}