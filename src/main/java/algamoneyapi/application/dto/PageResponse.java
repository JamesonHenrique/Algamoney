package algamoneyapi.application.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record PageResponse<T>(List<T> content, int number, int size, long totalElements, int totalPages, boolean first,
                              boolean last) {}