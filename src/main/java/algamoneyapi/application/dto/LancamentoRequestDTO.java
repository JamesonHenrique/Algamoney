package algamoneyapi.application.dto;

import algamoneyapi.core.model.Categoria;
import algamoneyapi.core.model.Pessoa;
import algamoneyapi.core.model.TipoLancamento;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.*;
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