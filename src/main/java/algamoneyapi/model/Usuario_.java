package algamoneyapi.model;

import jakarta.persistence.metamodel.ListAttribute;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

import javax.annotation.processing.Generated;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Usuario.class)
public abstract class Usuario_ {

    public static volatile SingularAttribute<Usuario, String>
            senha;
    public static volatile ListAttribute<Usuario, Permissao>
            permissoes;
    public static volatile SingularAttribute<Usuario, Long> codigo;
    public static volatile SingularAttribute<Usuario, String> nome;
    public static volatile SingularAttribute<Usuario, String> email;

}