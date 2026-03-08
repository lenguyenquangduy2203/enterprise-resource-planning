package dev.edu.analysis.application.services.impl;

import java.util.Objects;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import dev.edu.analysis.application.errors.EmptyAggregationException;
import dev.edu.analysis.application.errors.InStorageStocksAggregationException;
import dev.edu.analysis.application.errors.ProductCapitalSnapshotsAggregationException;
import dev.edu.analysis.application.queries.capitals.CapitalByCategory;
import dev.edu.analysis.application.queries.capitals.CapitalByWarehouse;
import dev.edu.analysis.application.results.CapitalDistributionResult;
import dev.edu.analysis.application.services.CapitalDistributionQueryHandler;
import dev.edu.analysis.domain.clients.CatalogClient;
import dev.edu.analysis.domain.clients.InvClient;
import dev.edu.analysis.domain.clients.payloads.capital.Product;
import dev.edu.analysis.domain.clients.payloads.capital.Stock;
import dev.edu.analysis.domain.entities.aggregates.InStockProduct;
import dev.edu.analysis.domain.values.GroupBy;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class CapitalDistributionQueryHandlerImpl implements CapitalDistributionQueryHandler {
    private final InvClient invClient;
    private final CatalogClient catalogClient;

    @Override
    public CapitalDistributionResult handle(CapitalByWarehouse query) {
        var inStockProducts = fetchInStockProduct();
        var capitalDistribution = inStockProducts.stream()
            .collect(Collectors.groupingBy(
                InStockProduct::getWarehouseCode, 
                Collectors.counting()
            ));

        return new CapitalDistributionResult(
            GroupBy.WAREHOUSE, 
            capitalDistribution
        );
    }

    @Override
    public CapitalDistributionResult handle(CapitalByCategory query) {
        var inStockProducts = fetchInStockProduct();
        var capitalDistribution = inStockProducts.stream()
            .collect(Collectors.groupingBy(
                InStockProduct::getCategoryCode, 
                Collectors.counting()
            ));

        return new CapitalDistributionResult(
            GroupBy.CATEGORY, 
            capitalDistribution
        );
    }

    private Set<InStockProduct> fetchInStockProduct() {
        var stocksResp = invClient.fetchActiveStocks();
        var stocksStatus = stocksResp.getStatusCode();
        if (!stocksStatus.is2xxSuccessful()) {
            throw new InStorageStocksAggregationException(stocksStatus.value());
        }

        if (!stocksResp.hasBody()) {
            throw new EmptyAggregationException(stocksStatus.value());
        }

        var stocks = stocksResp.getBody();
        var productIds = stocks.stream()
            .map(Stock::productId)
            .collect(Collectors.toSet());
        var productsResp = catalogClient.findProductsIn(productIds);
        var productsStatus = productsResp.getStatusCode();
        if (!productsStatus.is2xxSuccessful()) {
            throw new ProductCapitalSnapshotsAggregationException(productsStatus.value());
        }

        if (!productsResp.hasBody()) {
            throw new EmptyAggregationException(productsStatus.value());
        }

        var idIndexedProducts = productsResp.getBody().stream()
            .collect(Collectors.toMap(Product::id, Function.identity()));
        
        return stocks.stream()
            .map(stock -> {
                var product = idIndexedProducts.get(stock.productId());
                if (product == null) {
                    return null;
                }

                return InStockProduct.from(stock, product);
            })
            .filter(Objects::nonNull)
            .collect(Collectors.toSet());
    }
}
