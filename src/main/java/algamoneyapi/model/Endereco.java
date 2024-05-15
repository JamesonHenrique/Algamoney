package algamoneyapi.model;

import jakarta.persistence.Embeddable;

import javax.validation.constraints.NotNull;
@Embeddable
public class Endereco {
    @NotNull
    private String logradouro;
    @NotNull
    private String numero;
    @NotNull
    private String complemento;
    @NotNull
    private String bairro;
    @NotNull
    private String cep;
    @NotNull
    private String cidade;

    @NotNull
    private String estado;
}
