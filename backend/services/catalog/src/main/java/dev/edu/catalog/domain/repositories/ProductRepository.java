package dev.edu.catalog.domain.repositories;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import dev.edu.catalog.domain.entities.persistence.Product;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    boolean existsBySku(String sku);

    @Query("""
        SELECT DISTINCT p
        FROM Product p
        JOIN FETCH p.category c
        WHERE p.id IN :ids
    """)
    Set<Product> findAllWithCategoryIn(@Param("ids") Set<Long> ids);
}
