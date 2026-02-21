package dev.edu.inventory.application.services.impl;

import java.util.UUID;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

import dev.edu.inventory.application.commands.movement.AdjustmentStockCommand;
import dev.edu.inventory.application.commands.movement.ExportStockCommand;
import dev.edu.inventory.application.commands.movement.ImportStockCommand;
import dev.edu.inventory.application.commands.movement.TransferStockCommand;
import dev.edu.inventory.application.errors.EmployeeNotFoundException;
import dev.edu.inventory.application.errors.EmployeeNotProvisionedException;
import dev.edu.inventory.application.errors.PerformerNotAuthenticatedException;
import dev.edu.inventory.application.errors.ProductInactiveException;
import dev.edu.inventory.application.errors.ProductNotFoundException;
import dev.edu.inventory.application.errors.WarehouseNotFoundException;
import dev.edu.inventory.application.services.CreateStockMovementCommandHandler;
import dev.edu.inventory.domain.clients.CatalogClient;
import dev.edu.inventory.domain.clients.HRClient;
import dev.edu.inventory.domain.clients.payloads.EmployeeStats;
import dev.edu.inventory.domain.clients.payloads.ProductStats;
import dev.edu.inventory.domain.entities.persistence.StockMovement;
import dev.edu.inventory.domain.repositories.StockMovementRepository;
import dev.edu.inventory.domain.repositories.WarehouseRepository;
import dev.edu.inventory.domain.values.EmployeeProvisioningStatus;
import dev.edu.inventory.domain.values.ProductStatus;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class CreateStockMovementCommandHandlerImpl implements CreateStockMovementCommandHandler {
    private final WarehouseRepository warehouseRepository;
    private final StockMovementRepository stockMovementRepository;
    private final HRClient hrClient;
    private final CatalogClient catalogClient;

    @Override
    public StockMovement handle(ImportStockCommand command) {
        var performerId = getPerformerIdFromSecurityContext();
        var toWarehouse = warehouseRepository.findById(command.toWarehouseId())
            .orElseThrow(() -> new WarehouseNotFoundException(command.toWarehouseId()));
        
        var performer = fetchEmployeeStatsById(performerId);
        assertProvisionedEmployee(performer);

        var product = fetchProductStatsById(command.productId());
        assertActiveProduct(product);

        var movement = StockMovement.stockImport(
            performer,
            product,
            toWarehouse,
            command.quantity()
        );

        return stockMovementRepository.save(movement);
    }

    @Override
    public StockMovement handle(ExportStockCommand command) {
        var performerId = getPerformerIdFromSecurityContext();
        var fromWarehouse = warehouseRepository.findById(command.fromWarehouseId())
            .orElseThrow(() -> new WarehouseNotFoundException(command.fromWarehouseId()));
        
        var performer = fetchEmployeeStatsById(performerId);
        assertProvisionedEmployee(performer);

        var product = fetchProductStatsById(command.productId());
        assertActiveProduct(product);

        var movement = StockMovement.stockExport(
            performer,
            product,
            fromWarehouse,
            command.quantity()
        );

        return stockMovementRepository.save(movement);
    }

    @Override
    public StockMovement handle(TransferStockCommand command) {
        var performerId = getPerformerIdFromSecurityContext();
        var fromWarehouse = warehouseRepository.findById(command.fromWarehouseId())
            .orElseThrow(() -> new WarehouseNotFoundException(command.toWarehouseId()));
        var toWarehouse = warehouseRepository.findById(command.toWarehouseId())
            .orElseThrow(() -> new WarehouseNotFoundException(command.fromWarehouseId()));
        
        var performer = fetchEmployeeStatsById(performerId);
        assertProvisionedEmployee(performer);

        var product = fetchProductStatsById(command.productId());
        assertActiveProduct(product);

        var movement = StockMovement.stockTransfer(
            performer,
            product,
            fromWarehouse,
            toWarehouse,
            command.quantity()
        );

        return stockMovementRepository.save(movement);
    }

    @Override
    public StockMovement handle(AdjustmentStockCommand command) {
        var performerId = getPerformerIdFromSecurityContext();
        var warehouse = warehouseRepository.findById(command.warehouseId())
            .orElseThrow(() -> new WarehouseNotFoundException(command.warehouseId()));
        
        var performer = fetchEmployeeStatsById(performerId);
        assertProvisionedEmployee(performer);

        var product = fetchProductStatsById(command.productId());
        assertActiveProduct(product);

        var movement = StockMovement.stockAdjust(
            performer,
            product,
            warehouse,
            command.quantity()
        );

        return stockMovementRepository.save(movement);
    }

    private UUID getPerformerIdFromSecurityContext() throws PerformerNotAuthenticatedException {
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        if (!(authentication instanceof JwtAuthenticationToken jwtAuth)) {
            throw new PerformerNotAuthenticatedException();
        }

        String employeeId = jwtAuth.getToken().getClaim("employeeId");

        if (employeeId == null) {
            throw new PerformerNotAuthenticatedException();
        }

        try {
            return UUID.fromString(employeeId);
        } catch (IllegalArgumentException _) {
            throw new PerformerNotAuthenticatedException();
        }
    }

    private EmployeeStats fetchEmployeeStatsById(UUID performerId) throws EmployeeNotFoundException {
        try {
            var response = hrClient.getEmployeeStatsById(performerId);

            if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
                throw new EmployeeNotFoundException(performerId);
            }

            return response.getBody();

        } catch (Exception _) {
            throw new EmployeeNotFoundException(performerId);
        } 
    }

    private void assertProvisionedEmployee(EmployeeStats employee) throws EmployeeNotProvisionedException {
        if (EmployeeProvisioningStatus.NOT_PROVISIONED.equals(employee.provisioningStatus())) {
            throw new EmployeeNotProvisionedException(employee.id());
        }
    }

    private ProductStats fetchProductStatsById(Long productId) throws ProductNotFoundException {
        try {
            var response = catalogClient.getProductStatsById(productId);

            if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
                throw new ProductNotFoundException(productId);
            }

            return response.getBody();

        } catch (Exception _) {
            throw new ProductNotFoundException(productId);
        } 
    }

    private void assertActiveProduct(ProductStats product) throws ProductInactiveException {
        if (ProductStatus.INACTIVE.equals(product.status())) {
            throw new ProductInactiveException(product.id());
        }
    }
}
