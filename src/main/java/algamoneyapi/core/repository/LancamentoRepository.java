package algamoneyapi.core.repository;

import algamoneyapi.application.dto.LancamentoEstatisticaCategoriaDto;
import algamoneyapi.application.dto.LancamentoEstatisticaDiaDto;
import algamoneyapi.application.dto.LancamentoEstatisticaPessoaDto;
import algamoneyapi.core.model.Lancamento;

import algamoneyapi.core.repository.projection.ResumoLancamento;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface LancamentoRepository extends JpaRepository<Lancamento, Long> {

    @Query(value = "SELECT * FROM lancamento l " +
            "WHERE (:descricao IS NULL OR LOWER(l.descricao) LIKE  LOWER(CONCAT('%', :descricao, '%'))) " +
            "AND (CAST(:dataVencimento AS DATE) IS NULL OR l.data_vencimento >= :dataVencimento) " +
            "AND (CAST(:dataPagamento AS DATE) IS NULL OR l.data_pagamento <= :dataPagamento)",
            nativeQuery = true)
    Page<Lancamento> filtrar(
            @Param("descricao") String descricao,
            @Param("dataPagamento") LocalDate dataPagamento,
            @Param("dataVencimento") LocalDate dataVencimento,
            Pageable pageable);



    @Query("SELECT new algamoneyapi.core.repository.projection.ResumoLancamento(l.codigo, l.descricao, l.dataVencimento, l.dataPagamento, l.valor, l.tipo, l.categoria.nome, l.pessoa.nome) "
            + "FROM Lancamento l WHERE "
            + "(:descricao IS NULL OR l.descricao LIKE %:descricao%) AND "
            + "(:dataVencimentoDe IS NULL OR l.dataVencimento >= :dataVencimentoDe) AND "
            + "(:dataVencimentoAte IS NULL OR l.dataVencimento <= :dataVencimentoAte)")
    Page<ResumoLancamento> resumir(@Param("descricao") String descricao,
                                   @Param("dataVencimentoDe") LocalDate dataVencimentoDe,
                                   @Param("dataVencimentoAte") LocalDate dataVencimentoAte,
                                   Pageable pageable);

    @Query("SELECT NEW algamoneyapi.application.dto.LancamentoEstatisticaCategoriaDto(" +
            "l.categoria, SUM(l.valor)) " +
            "FROM Lancamento l " +
            "WHERE l.dataVencimento BETWEEN :primeiroDia AND :ultimoDia " +
            "GROUP BY l.categoria")
    List<LancamentoEstatisticaCategoriaDto> porCategoria(
            @Param("primeiroDia") LocalDate primeiroDia,
            @Param("ultimoDia") LocalDate ultimoDia);
    @Query("SELECT NEW algamoneyapi.application.dto.LancamentoEstatisticaDiaDto(" +
                "l.tipo, l.dataVencimento, SUM(l.valor)) " +
                "FROM Lancamento l " +
                "WHERE l.dataVencimento BETWEEN :primeiroDia AND :ultimoDia " +
                "GROUP BY l.tipo, l.dataVencimento")
    List<LancamentoEstatisticaDiaDto> porDia(
                @Param("primeiroDia") LocalDate primeiroDia,
                @Param("ultimoDia") LocalDate ultimoDia);
    @Query("SELECT NEW algamoneyapi.application.dto.LancamentoEstatisticaPessoaDto(" +
            "l.tipo, l.pessoa, SUM(l.valor)) " +
            "FROM Lancamento l " +
            "WHERE l.dataVencimento BETWEEN :inicio AND :fim " +
            "GROUP BY l.tipo, l.pessoa")
    List<LancamentoEstatisticaPessoaDto> porPessoa(
            @Param("inicio") LocalDate inicio,
            @Param("fim") LocalDate fim);
    List<Lancamento> findByDataVencimentoLessThanEqualAndDataPagamentoIsNull(LocalDate data);
}


