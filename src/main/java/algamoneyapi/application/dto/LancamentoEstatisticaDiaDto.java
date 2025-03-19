package algamoneyapi.application.dto;

import algamoneyapi.core.model.TipoLancamento;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDate;

@Builder
public record LancamentoEstatisticaDiaDto(
        TipoLancamento tipo,
        LocalDate dia,
        BigDecimal total
) {
}
