package algamoneyapi.model;

import jakarta.persistence.Embeddable;

@Embeddable
public enum TipoLancamento {
    RECEITA,
    DESPESA
}
