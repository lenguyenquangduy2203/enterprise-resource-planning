package dev.edu.catalog.domain.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import dev.edu.catalog.domain.entities.persistence.Product;
import dev.edu.catalog.domain.repositories.projections.ProductSelection;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    boolean existsBySku(String sku);
    Page<ProductSelection> findAll(
        Specification<Product> spec,
        Pageable pageable,
        Class<ProductSelection> type
    );
}
