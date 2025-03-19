package algamoneyapi.core.model;


public enum TipoLancamento {
    RECEITA("Receita"),
    DESPESA("Despesa");
    private final String descricao;
    TipoLancamento(String descricao) {
        this.descricao = descricao;
    }
    public String getDescricao() {
        return descricao;
    }
}
