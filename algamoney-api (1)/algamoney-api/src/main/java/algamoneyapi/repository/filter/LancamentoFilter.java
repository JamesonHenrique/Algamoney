package algamoneyapi.repository.filter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LancamentoFilter {
    private String descricao;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String dataVencimentoDe;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String dataVencimentoAte;


}
