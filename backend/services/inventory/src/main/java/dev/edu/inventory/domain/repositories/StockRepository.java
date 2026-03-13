package dev.edu.inventory.domain.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import dev.edu.inventory.domain.entities.persistence.Stock;
import dev.edu.inventory.domain.repositories.projections.InStockCapitalSnapshot;

public interface StockRepository extends JpaRepository<Stock, Long> {
    @Query("""
        SELECT 
            s.id AS id,
            s.productId AS productId,
            s.quantity AS quantity,
            w.code AS warehouseCode
        FROM Stock s
        JOIN s.Warehouse w
        WHERE s.quantity > 0
    """)
    List<InStockCapitalSnapshot> findInStockCapitalSnapshots();
}