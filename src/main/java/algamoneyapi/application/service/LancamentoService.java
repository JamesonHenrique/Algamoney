package algamoneyapi.application.service;


import algamoneyapi.application.dto.LancamentoRequestDTO;
import algamoneyapi.application.dto.LancamentoResponseDTO;
import algamoneyapi.application.dto.PageResponse;
import algamoneyapi.core.model.Lancamento;
import algamoneyapi.core.model.Pessoa;
import algamoneyapi.core.repository.LancamentoRepository;
import algamoneyapi.core.repository.PessoaRepository;
import algamoneyapi.application.service.exception.PessoaInexistenteOuInativaException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LancamentoService {

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private LancamentoRepository lancamentoRepository;

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

    public LancamentoResponseDTO atualizar(Long codigo, LancamentoRequestDTO lancamentoRequestDTO) {
        Lancamento lancamentoSalvo = buscarLancamentoExistente(codigo);
        if (!lancamentoRequestDTO.pessoa().equals(lancamentoSalvo.getPessoa())) {
            validarPessoa(lancamentoSalvo);
        }
        BeanUtils.copyProperties(lancamentoRequestDTO, lancamentoSalvo, "codigo");
        Lancamento lancamentoAtualizado = lancamentoRepository.save(lancamentoSalvo);
        return new LancamentoResponseDTO(lancamentoAtualizado.getCodigo(), lancamentoAtualizado.getDescricao(), lancamentoAtualizado.getDataVencimento(), lancamentoAtualizado.getDataPagamento(), lancamentoAtualizado.getValor(), lancamentoAtualizado.getObservacao(), lancamentoAtualizado.getTipo(), lancamentoAtualizado.getCategoria(), lancamentoAtualizado.getPessoa());
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
}