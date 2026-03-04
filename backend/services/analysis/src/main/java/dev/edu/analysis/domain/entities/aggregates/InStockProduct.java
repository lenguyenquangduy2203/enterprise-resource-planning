package dev.edu.analysis.domain.entities.aggregates;

import java.math.BigDecimal;

import dev.edu.analysis.domain.clients.payloads.capital.Product;
import dev.edu.analysis.domain.clients.payloads.capital.Stock;
import dev.edu.analysis.domain.errors.ConflictStockProduct;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class InStockProduct {
    private Long stockId;
    private Long productId;
    private String warehouseCode;
    private String categoryCode;
    private BigDecimal netValue;

    public static InStockProduct from(Stock stock, Product product) {
        if (!stock.productId().equals(product.id())) {
            throw new ConflictStockProduct(stock, product);
        }

        var netValue = product.unitPrice().multiply(BigDecimal.valueOf(stock.quantity()));

        return new InStockProduct(
            stock.id(), 
            product.id(), 
            stock.warehouseCode(), 
            product.categoryCode(), 
            netValue
        );
    }
}
