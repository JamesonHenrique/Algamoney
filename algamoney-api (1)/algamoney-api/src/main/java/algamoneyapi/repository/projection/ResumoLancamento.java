package algamoneyapi.repository.projection;

import algamoneyapi.model.TipoLancamento;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ResumoLancamento(Long codigo,
         String descricao,
        LocalDate dataVencimento,
         LocalDate dataPagamento,
         BigDecimal valor,
         TipoLancamento tipo,
         String categoria,
         String pessoa
) {
}
