package dev.edu.catalog.domain.entities.persistence;

import java.math.BigDecimal;

import dev.edu.catalog.domain.errors.RegisterWithInactivatedCategory;
import dev.edu.catalog.domain.errors.RegisterWithInactivatedManufacturer;
import dev.edu.catalog.domain.values.ProductStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(
    name = "product",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "sku")
    }
)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String sku;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(length = 50)
    private String unit;

    @Column(name = "unit_price", nullable = false, precision = 12, scale = 2)
    private BigDecimal unitPrice;

    @Column(length = 255)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ProductStatus status = ProductStatus.ACTIVE;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "manufacturer_id", nullable = false)
    private Manufacturer manufacturer;

    public static Product register(
        String sku, String name, String unit, 
        BigDecimal unitPrice, String description, 
        Category category, Manufacturer manufacturer
    ) {
        if (!category.isActive()) {
            throw new RegisterWithInactivatedCategory(category.getCode());
        }

        if (!manufacturer.isActive()) {
            throw new RegisterWithInactivatedManufacturer(manufacturer.getCode());
        }

        var product = new Product();

        product.sku = sku;
        product.name = name;
        product.unit = unit;
        product.unitPrice = unitPrice;
        product.description = description;
        product.category = category;
        product.manufacturer = manufacturer;

        return product;
    }

    public void deactivate() {
        this.status = ProductStatus.INACTIVE;
    }

    public void activate() {
        this.status = ProductStatus.ACTIVE;
    }

    public boolean isActive() {
        return this.status == ProductStatus.ACTIVE;
    }
}
