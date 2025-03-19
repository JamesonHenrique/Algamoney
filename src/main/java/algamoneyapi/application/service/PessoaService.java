package algamoneyapi.application.service;


import algamoneyapi.application.dto.PageResponse;
import algamoneyapi.application.dto.PessoaRequestDTO;
import algamoneyapi.application.dto.PessoaResponseDTO;
import algamoneyapi.core.model.Pessoa;
import algamoneyapi.core.repository.PessoaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PessoaService {

    @Autowired
    private PessoaRepository pessoaRepository;

    public PessoaResponseDTO atualizar(Long codigo, PessoaRequestDTO pessoaRequestDTO) {
        Pessoa pessoaSalva = buscarPessoaPeloCodigo(codigo);

        BeanUtils.copyProperties(pessoaRequestDTO, pessoaSalva, "codigo", "contatos");

        pessoaSalva.getContatos().clear();

        if (pessoaRequestDTO.contatos() != null) {
            pessoaRequestDTO.contatos().forEach(contato -> {
                contato.setPessoa(pessoaSalva);
                pessoaSalva.getContatos().add(contato);
            });
        }

        Pessoa pessoaAtualizada = pessoaRepository.save(pessoaSalva);
        return new PessoaResponseDTO(
                pessoaAtualizada.getCodigo(),
                pessoaAtualizada.getNome(),
                pessoaAtualizada.getEndereco(),
                pessoaAtualizada.getAtivo(),
                pessoaAtualizada.getContatos()
        );
    }
    public void atualizarPropriedadeAtivo(Long codigo, Boolean ativo) {
        Pessoa pessoaSalva = buscarPessoaPeloCodigo(codigo);
        pessoaSalva.setAtivo(ativo);
        pessoaRepository.save(pessoaSalva);
    }

    public Pessoa buscarPessoaPeloCodigo(Long codigo) {
        return pessoaRepository.findById(codigo)
                .orElseThrow(() -> new EmptyResultDataAccessException(1));
    }

    public PageResponse<PessoaResponseDTO> pesquisar(String nome, int size, int page) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("nome").ascending());
        Page<Pessoa> pessoas = pessoaRepository.findByNomeContaining(nome, pageable);
        List<PessoaResponseDTO> pessoaResponseDTOs = pessoas.stream()
                .map(pessoa -> new PessoaResponseDTO(pessoa.getCodigo(), pessoa.getNome(), pessoa.getEndereco(), pessoa.getAtivo() , pessoa.getContatos()))
                .collect(Collectors.toList());
        return new PageResponse<>(pessoaResponseDTOs, pessoas.getNumber(), pessoas.getSize(), pessoas.getTotalElements(), pessoas.getTotalPages(), pessoas.isFirst(), pessoas.isLast());
    }
}