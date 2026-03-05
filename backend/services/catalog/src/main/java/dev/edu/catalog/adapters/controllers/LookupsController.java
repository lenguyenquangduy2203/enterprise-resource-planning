package dev.edu.catalog.adapters.controllers;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.edu.catalog.adapters.mappers.ProductSearchMapper;
import dev.edu.catalog.adapters.mappers.SelectOptionsMapper;
import dev.edu.catalog.adapters.payloads.CategoryOptionResponse;
import dev.edu.catalog.adapters.payloads.ManufacturerOptionResponse;
import dev.edu.catalog.adapters.payloads.ProductLookupParams;
import dev.edu.catalog.application.queries.GetActiveCategoryOptionsQuery;
import dev.edu.catalog.application.queries.GetActiveManufacturerOptionsQuery;
import dev.edu.catalog.application.services.LookupQueryHandler;
import dev.edu.catalog.application.services.ProductRegistrationQueryHandler;
import dev.edu.catalog.domain.repositories.projections.ProductSelection;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/lookups")
public class LookupsController {
    private final ProductRegistrationQueryHandler productRegistrationQueryHandler;
    private final SelectOptionsMapper selectOptionsMapper;
    private final ProductSearchMapper productSearchMapper;
    private final LookupQueryHandler lookupQueryHandler;

    @GetMapping("/manufacturers")
    public ResponseEntity<List<ManufacturerOptionResponse>> getManufacturerSelections() {
        var res = new GetActiveManufacturerOptionsQuery().accept(productRegistrationQueryHandler);
        var options = selectOptionsMapper.toManufacturerOptionResponse(res);

        return ResponseEntity.ok(options);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryOptionResponse>> getCategorySelections() {
        var res = new GetActiveCategoryOptionsQuery().accept(productRegistrationQueryHandler);
        var options = selectOptionsMapper.toCategoryOptionResponse(res);

        return ResponseEntity.ok(options);
    }

    @GetMapping("/products")
    public ResponseEntity<Page<ProductSelection>> getProductSelections(
        @Valid @ModelAttribute ProductLookupParams params,
        @PageableDefault(size = 10) Pageable pageable
    ) {
        var searchProductQuery = productSearchMapper.toProductLookupQuery(params, pageable);
        var resp = searchProductQuery.accept(lookupQueryHandler);

        return ResponseEntity.ok(resp);
    }
}
