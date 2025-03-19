package algamoneyapi.application.service;

import algamoneyapi.application.dto.*;
import algamoneyapi.core.model.Lancamento;
import algamoneyapi.core.model.Pessoa;
import algamoneyapi.core.repository.LancamentoRepository;
import algamoneyapi.core.repository.PessoaRepository;
import algamoneyapi.application.service.exception.PessoaInexistenteOuInativaException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.sql.Date;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class LancamentoService {

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private LancamentoRepository lancamentoRepository;

    @CacheEvict(value = "lancamentos", allEntries = true)
    public LancamentoResponseDTO salvar(LancamentoRequestDTO lancamentoRequestDTO) {
        Lancamento lancamento = new Lancamento();
        BeanUtils.copyProperties(lancamentoRequestDTO, lancamento);
        validarPessoa(lancamento);
        System.out.println(lancamentoRequestDTO.dataPagamento());
        System.out.println(lancamentoRequestDTO.tipo());
        Lancamento lancamentoSalvo = lancamentoRepository.save(lancamento);
        System.out.println(lancamentoSalvo.getTipo());
        return new LancamentoResponseDTO(lancamentoSalvo.getCodigo(), lancamentoSalvo.getDescricao(), lancamentoSalvo.getDataVencimento(), lancamentoSalvo.getDataPagamento(), lancamentoSalvo.getValor(), lancamentoSalvo.getObservacao(), lancamentoSalvo.getTipo(), lancamentoSalvo.getCategoria(), lancamentoSalvo.getPessoa());
    }
    @CachePut(value = "lancamentos", key = "#codigo")
    public LancamentoResponseDTO atualizar(Long codigo, LancamentoRequestDTO lancamentoRequestDTO) {
        Lancamento lancamentoSalvo = buscarLancamentoExistente(codigo);
        if (!lancamentoRequestDTO.pessoa().equals(lancamentoSalvo.getPessoa())) {
            validarPessoa(lancamentoSalvo);
        }
        BeanUtils.copyProperties(lancamentoRequestDTO, lancamentoSalvo, "codigo");
        Lancamento lancamentoAtualizado = lancamentoRepository.save(lancamentoSalvo);
        return new LancamentoResponseDTO(lancamentoAtualizado.getCodigo(), lancamentoAtualizado.getDescricao(), lancamentoAtualizado.getDataVencimento(), lancamentoAtualizado.getDataPagamento(), lancamentoAtualizado.getValor(), lancamentoAtualizado.getObservacao(), lancamentoAtualizado.getTipo(), lancamentoAtualizado.getCategoria(), lancamentoAtualizado.getPessoa());
    }

    @Cacheable(value = "lancamentos")
    public PageResponse<LancamentoResponseDTO> findAll(Pageable pageable) {
        Page<Lancamento> lancamentos = lancamentoRepository.findAll(pageable);
        List<LancamentoResponseDTO> lancamentoResponseDTOs = lancamentos.stream()
                .map(lancamento -> new LancamentoResponseDTO(lancamento.getCodigo(), lancamento.getDescricao(), lancamento.getDataVencimento(), lancamento.getDataPagamento(), lancamento.getValor(), lancamento.getObservacao(), lancamento.getTipo(), lancamento.getCategoria(), lancamento.getPessoa()))
                .collect(Collectors.toList());
        return new PageResponse<>(lancamentoResponseDTOs, lancamentos.getNumber(), lancamentos.getSize(), lancamentos.getTotalElements(), lancamentos.getTotalPages(), lancamentos.isFirst(), lancamentos.isLast());
    }

    public PageResponse<LancamentoResponseDTO> filtrar(String descricao, LocalDate dataPagamento, LocalDate dataVencimento, int size, int page) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Lancamento> lancamentos = lancamentoRepository.filtrar(descricao, dataPagamento, dataVencimento, pageable);
        List<LancamentoResponseDTO> lancamentoResponseDTOs = lancamentos.stream()
                .map(lancamento -> new LancamentoResponseDTO(lancamento.getCodigo(), lancamento.getDescricao(), lancamento.getDataVencimento(), lancamento.getDataPagamento(), lancamento.getValor(), lancamento.getObservacao(), lancamento.getTipo(), lancamento.getCategoria(), lancamento.getPessoa()))
                .collect(Collectors.toList());
        return new PageResponse<>(lancamentoResponseDTOs, lancamentos.getNumber(), lancamentos.getSize(), lancamentos.getTotalElements(), lancamentos.getTotalPages(), lancamentos.isFirst(), lancamentos.isLast());
    }

    private void validarPessoa(Lancamento lancamento) {
        Pessoa pessoa = null;
        if (lancamento.getPessoa().getCodigo() != null) {
            pessoa = pessoaRepository.findById(lancamento.getPessoa().getCodigo()).orElse(null);
        }
        if (pessoa == null || pessoa.isInativo()) {
            throw new PessoaInexistenteOuInativaException();
        }
    }

    private Lancamento buscarLancamentoExistente(Long codigo) {
        return lancamentoRepository.findById(codigo).orElseThrow(() -> new IllegalArgumentException());
    }
    public List<LancamentoEstatisticaCategoriaDto> porCategoria(LocalDate mesReferencia) {
        LocalDate primeiroDia = mesReferencia.withDayOfMonth(1);
        LocalDate ultimoDia = mesReferencia.withDayOfMonth(mesReferencia.lengthOfMonth());

        return lancamentoRepository.porCategoria(primeiroDia, ultimoDia);
    }
    public List<LancamentoEstatisticaDiaDto> porDia(LocalDate mesReferencia) {
        LocalDate primeiroDia = mesReferencia.withDayOfMonth(1);
        LocalDate ultimoDia = mesReferencia.withDayOfMonth(mesReferencia.lengthOfMonth());

        return lancamentoRepository.porDia(primeiroDia, ultimoDia);
    }

    public byte[] relatorioPorPessoa(LocalDate inicio, LocalDate fim) throws Exception {
        List<LancamentoEstatisticaPessoaDto> dados = lancamentoRepository.porPessoa(inicio, fim);

        Map<String, Object> parametros = new HashMap<>();
        parametros.put("DT_INICIO", Date.valueOf(inicio));
        parametros.put("DT_FIM", Date.valueOf(fim));
        parametros.put("REPORT_LOCALE", new Locale("pt", "BR"));

        InputStream inputStream = this.getClass().getResourceAsStream(
                "/relatorios/lancamentos_por_pessoa.jasper");
        System.out.println(inputStream);

        JasperPrint jasperPrint = JasperFillManager.fillReport(inputStream, parametros,
                new JRBeanCollectionDataSource(dados));

        return JasperExportManager.exportReportToPdf(jasperPrint);
    }
}