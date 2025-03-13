package algamoneyapi.application.dto;


import algamoneyapi.core.model.Categoria;
import algamoneyapi.core.model.Pessoa;
import algamoneyapi.core.model.TipoLancamento;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

public record LancamentoRequestDTO(
        @NotNull String descricao,
        @NotNull LocalDate dataVencimento,
        LocalDate dataPagamento,
        @NotNull BigDecimal valor,
        String observacao,
        @NotNull TipoLancamento tipo,
        @NotNull Categoria categoria,
        @NotNull Pessoa pessoa
) {}