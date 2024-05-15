package algamoneyapi.model;

import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

import javax.annotation.processing.Generated;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Categoria.class)
public abstract class Categoria_ {

    public static volatile SingularAttribute<Categoria, Long> codigo;
    public static volatile SingularAttribute<Categoria, String>
            nome;

}