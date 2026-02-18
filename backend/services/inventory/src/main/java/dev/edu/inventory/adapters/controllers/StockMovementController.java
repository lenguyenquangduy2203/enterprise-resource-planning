package dev.edu.inventory.adapters.controllers;

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

import dev.edu.inventory.adapters.mappers.StockMovementSearchMapper;
import dev.edu.inventory.adapters.payloads.StockMovementResponse;
import dev.edu.inventory.adapters.payloads.StockMovementSearchParams;
import dev.edu.inventory.application.commands.movement.MovementRequest;
import dev.edu.inventory.application.results.MovementRequestStatus;
import dev.edu.inventory.application.services.CreateStockMovementCommandHandler;
import dev.edu.inventory.application.services.StockMovementsSearchQueryHandler;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/stock-movements")
@AllArgsConstructor
public class StockMovementController {
    private final CreateStockMovementCommandHandler commandHandler;
    private final StockMovementsSearchQueryHandler queryHandler;
    private final StockMovementSearchMapper searchMapper;

    @PostMapping
    public ResponseEntity<MovementRequestStatus> create(@Valid @RequestBody MovementRequest request) {
        var reqStat = request.accept(commandHandler);
        return ResponseEntity.accepted().body(reqStat);
    }

    @GetMapping
    public ResponseEntity<Page<StockMovementResponse>> search(
        @Valid @ModelAttribute StockMovementSearchParams params,
        @PageableDefault(size = 10) Pageable pageable
    ) {
        var query = searchMapper.toStockMovementsSearchQuery(params, pageable);
        var results = query.accept(queryHandler);
        var response = searchMapper.toStockMovementResponses(results);

        return ResponseEntity.ok(response);
    }
}
