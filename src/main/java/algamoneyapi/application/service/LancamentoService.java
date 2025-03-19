package algamoneyapi.application.service;

import algamoneyapi.application.dto.*;
import algamoneyapi.core.model.Lancamento;
import algamoneyapi.core.model.Pessoa;
import algamoneyapi.core.model.Role;
import algamoneyapi.core.model.Usuario;
import algamoneyapi.core.repository.LancamentoRepository;
import algamoneyapi.core.repository.PessoaRepository;
import algamoneyapi.application.service.exception.PessoaInexistenteOuInativaException;
import algamoneyapi.core.repository.RoleRepository;
import algamoneyapi.core.repository.UsuarioRepository;
import algamoneyapi.infrastructure.mail.Mailer;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.sql.Date;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class LancamentoService {
    private static final Logger logger = LoggerFactory.getLogger(LancamentoService.class);

    @Autowired
    private PessoaRepository pessoaRepository;
    @Autowired
    private Mailer mailer;
    @Autowired
    private LancamentoRepository lancamentoRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    public LancamentoResponseDTO salvar(LancamentoRequestDTO lancamentoRequestDTO) {
        Lancamento lancamento = new Lancamento();
        BeanUtils.copyProperties(lancamentoRequestDTO, lancamento);
        validarPessoa(lancamento);
        Lancamento lancamentoSalvo = lancamentoRepository.save(lancamento);
        return new LancamentoResponseDTO(lancamentoSalvo.getCodigo(), lancamentoSalvo.getDescricao(), lancamentoSalvo.getDataVencimento(), lancamentoSalvo.getDataPagamento(), lancamentoSalvo.getValor(), lancamentoSalvo.getObservacao(), lancamentoSalvo.getTipo(), lancamentoSalvo.getCategoria(), lancamentoSalvo.getPessoa());
    }

    public LancamentoResponseDTO atualizar(Long codigo, LancamentoRequestDTO lancamentoRequestDTO) {
        Lancamento lancamentoSalvo = buscarLancamentoExistente(codigo);
        if (!lancamentoRequestDTO.pessoa().equals(lancamentoSalvo.getPessoa())) {
            validarPessoa(lancamentoSalvo);
        }
        BeanUtils.copyProperties(lancamentoRequestDTO, lancamentoSalvo, "codigo");
        Lancamento lancamentoAtualizado = lancamentoRepository.save(lancamentoSalvo);
        return new LancamentoResponseDTO(lancamentoAtualizado.getCodigo(), lancamentoAtualizado.getDescricao(), lancamentoAtualizado.getDataVencimento(), lancamentoAtualizado.getDataPagamento(), lancamentoAtualizado.getValor(), lancamentoAtualizado.getObservacao(), lancamentoAtualizado.getTipo(), lancamentoAtualizado.getCategoria(), lancamentoAtualizado.getPessoa());
    }

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

        JasperPrint jasperPrint = JasperFillManager.fillReport(inputStream, parametros,
                new JRBeanCollectionDataSource(dados));

        return JasperExportManager.exportReportToPdf(jasperPrint);
    }

    @Scheduled(cron = "0 0 6 * * *")
    public void avisarSobreLancamentosVencidos() {
        if (logger.isDebugEnabled()) {
            logger.debug("Preparando envio de e-mails de aviso de lançamentos vencidos.");
        }

        List<Lancamento> vencidos = lancamentoRepository
                .findByDataVencimentoLessThanEqualAndDataPagamentoIsNull(LocalDate.now());

        if (vencidos.isEmpty()) {
            logger.info("Sem lançamentos vencidos para aviso.");
            return;
        }

        logger.info("Existem {} lançamentos vencidos.", vencidos.size());

        List<Usuario> destinatarios = usuarioRepository.findByRoleName("basic");

        if (destinatarios.isEmpty()) {
            logger.warn("Existem lançamentos vencidos, mas o sistema não encontrou destinatários.");
            return;
        }

        mailer.avisarSobreLancamentosVencidos(vencidos, destinatarios);
    }
}