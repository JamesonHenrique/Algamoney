package algamoneyapi.application.dto;
import algamoneyapi.core.model.Endereco;

public record PessoaResponseDTO(
        Long codigo,
        String nome,
        Endereco endereco,
        Boolean ativo
) {}