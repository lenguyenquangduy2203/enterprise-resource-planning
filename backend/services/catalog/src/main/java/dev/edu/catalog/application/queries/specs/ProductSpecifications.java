package dev.edu.catalog.application.queries.specs;

import java.math.BigDecimal;

import org.springframework.data.jpa.domain.Specification;

import dev.edu.catalog.application.queries.SearchProductQuery;
import dev.edu.catalog.domain.entities.persistence.Product;
import dev.edu.catalog.domain.values.ProductStatus;
import jakarta.persistence.criteria.JoinType;

public class ProductSpecifications {
    private static final String CATEGORY_ATTR = "category";
    private static final String MANUFACTURER_ATTR = "manufacturer";

    private ProductSpecifications() {}

    // == SPECS FACTORY ==
    public static Specification<Product> from(SearchProductQuery query) {
        return Specification
            .where(fetchCategoryAndManufacturer())
            .and(hasName(query.name()))
            .and(hasCategory(query.categoryCode()))
            .and(hasManufacturer(query.manufacturerCode()))
            .and(hasStatus(query.status()))
            .and(hasMinPrice(query.minPrice()))
            .and(hasMaxPrice(query.maxPrice()));
    }

    // == FETCH ==
    /**
     * Eagerly fetch category and manufacturer
     * Only applied for entity queries, not count queries
     */
    private static Specification<Product> fetchCategoryAndManufacturer() {
        return (root, query, cb) -> {
            if (query.getResultType() == Product.class) {
                root.fetch(CATEGORY_ATTR, JoinType.INNER);
                root.fetch(MANUFACTURER_ATTR, JoinType.INNER);
                query.distinct(true);
            }
            return null;
        };
    }

    // == FILTERS ==

    private static Specification<Product> hasName(String name) {
        return (root, query, cb) ->
            name == null ? null :
            cb.like(
                cb.lower(root.get("name")),
                "%" + name.toLowerCase() + "%"
            );
    }

    private static Specification<Product> hasCategory(String categoryCode) {
        return (root, query, cb) ->
            categoryCode == null ? null :
            cb.equal(
                root.join(CATEGORY_ATTR).get("code"),
                categoryCode
            );
    }

    private static Specification<Product> hasManufacturer(String manufacturerCode) {
        return (root, query, cb) ->
            manufacturerCode == null ? null :
            cb.equal(
                root.join(MANUFACTURER_ATTR).get("code"),
                manufacturerCode
            );
    }

    private static Specification<Product> hasStatus(ProductStatus status) {
        return (root, query, cb) ->
            status == null ? null :
            cb.equal(root.get("status"), status);
    }

    private static Specification<Product> hasMinPrice(BigDecimal minPrice) {
        return (root, query, cb) ->
            minPrice == null ? null :
            cb.greaterThanOrEqualTo(root.get("price"), minPrice);
    }

    private static Specification<Product> hasMaxPrice(BigDecimal maxPrice) {
        return (root, query, cb) ->
            maxPrice == null ? null :
            cb.lessThanOrEqualTo(root.get("price"), maxPrice);
    }
}
