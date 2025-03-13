package algamoneyapi.application.dto;

import algamoneyapi.core.model.Categoria;
import algamoneyapi.core.model.Pessoa;
import algamoneyapi.core.model.TipoLancamento;

import java.math.BigDecimal;
import java.time.LocalDate;

public record LancamentoResponseDTO(
        Long codigo,
        String descricao,
        LocalDate dataVencimento,
        LocalDate dataPagamento,
        BigDecimal valor,
        String observacao,
        TipoLancamento tipo,
        Categoria categoria,
        Pessoa pessoa
) {}
