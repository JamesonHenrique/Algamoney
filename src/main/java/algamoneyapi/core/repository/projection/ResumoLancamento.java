package algamoneyapi.core.repository.projection;

import algamoneyapi.core.model.TipoLancamento;

import java.math.BigDecimal;
import java.time.LocalDate;


public class ResumoLancamento {
    private Long codigo;
    private String descricao;
    private LocalDate dataVencimento;
    private LocalDate dataPagamento;
    private BigDecimal valor;
    private TipoLancamento tipo;
    private String categoriaNome;
    private String pessoaNome;

    public ResumoLancamento(Long codigo, String descricao, LocalDate dataVencimento, LocalDate dataPagamento, BigDecimal valor, TipoLancamento tipo, String categoriaNome, String pessoaNome) {
        this.codigo = codigo;
        this.descricao = descricao;
        this.dataVencimento = dataVencimento;
        this.dataPagamento = dataPagamento;
        this.valor = valor;
        this.tipo = tipo;
        this.categoriaNome = categoriaNome;
        this.pessoaNome = pessoaNome;
    }
}