package algamoneyapi.application.dto;

import algamoneyapi.core.model.Categoria;
import lombok.Builder;

import java.math.BigDecimal;
@Builder
public record LancamentoEstatisticaCategoriaDto(
        Categoria categoria,
        BigDecimal total
) {
}
