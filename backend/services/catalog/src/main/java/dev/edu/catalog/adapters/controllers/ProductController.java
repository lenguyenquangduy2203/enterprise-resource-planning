package dev.edu.catalog.adapters.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.edu.catalog.adapters.mappers.ProductSearchMapper;
import dev.edu.catalog.adapters.payloads.ProductSearchParams;
import dev.edu.catalog.adapters.payloads.ProductSearchResponse;
import dev.edu.catalog.application.commands.ProductRegistrationCommand;
import dev.edu.catalog.application.services.ProductRegistrationCommandHandler;
import dev.edu.catalog.application.services.SearchProductQueryHandler;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/products")
@AllArgsConstructor
public class ProductController {
    private final ProductRegistrationCommandHandler productRegistrationCommandHandler;
    private final ProductSearchMapper productSearchMapper;
    private final SearchProductQueryHandler searchProductQueryHandler;

    @PostMapping
    public ResponseEntity<Void> register(@Valid @RequestBody ProductRegistrationCommand command) {
        command.accept(productRegistrationCommandHandler);
        return ResponseEntity.status(201).build();
    }

    @GetMapping
    public ResponseEntity<Page<ProductSearchResponse>> search(
        @Valid @ModelAttribute ProductSearchParams params,
        @PageableDefault(size = 10) Pageable pageable
    ) {
        var searchProductQuery = productSearchMapper.toSearchProductQuery(params, pageable);
        var products = searchProductQuery.accept(searchProductQueryHandler);
        var resp = productSearchMapper.toProductSearchResponse(products);

        return ResponseEntity.ok(resp);
    }
}
