package dev.edu.catalog.adapters.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.edu.catalog.adapters.mappers.SelectOptionsMapper;
import dev.edu.catalog.adapters.payloads.CategoryOptionResponse;
import dev.edu.catalog.application.queries.GetActiveCategoryOptionsQuery;
import dev.edu.catalog.application.services.ProductRegistrationQueryHandler;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/categories")
@AllArgsConstructor
public class CategoryController {
    private final ProductRegistrationQueryHandler productRegistrationQueryHandler;
    private final SelectOptionsMapper selectOptionsMapper;

    @GetMapping("/lookups")
    public ResponseEntity<List<CategoryOptionResponse>> getSelectOptions() {
        var res = new GetActiveCategoryOptionsQuery().accept(productRegistrationQueryHandler);
        var options = selectOptionsMapper.toCategoryOptionResponse(res);

        return ResponseEntity.ok(options);
    }
}
