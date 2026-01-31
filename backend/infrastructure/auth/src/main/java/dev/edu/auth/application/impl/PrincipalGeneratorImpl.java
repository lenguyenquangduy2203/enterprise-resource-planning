package dev.edu.auth.application.impl;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dev.edu.auth.application.PrincipalGenerator;
import dev.edu.auth.domain.models.PrincipalCounter;
import dev.edu.auth.domain.models.PrincipalCounterId;
import dev.edu.auth.domain.values.GeneratedPrincipal;
import dev.edu.auth.infrastructure.persistence.jpa.PrincipalCounterRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PrincipalGeneratorImpl implements PrincipalGenerator {
    private final PrincipalCounterRepository counterRepository;

    @Transactional
    @Override
    public GeneratedPrincipal generate(String departmentCode, String positionCode) {
        try {
            return doGenerate(departmentCode, positionCode);
        } catch (DataIntegrityViolationException _) {
            // another thread created the counter → retry
            return doGenerate(departmentCode, positionCode);
        }
    }

    private GeneratedPrincipal doGenerate(String departmentCode, String positionCode) {
        PrincipalCounter counter = counterRepository.findById(new PrincipalCounterId(departmentCode, positionCode))
            .orElseGet(() -> createNewCounter(departmentCode, positionCode));

        long seq = counter.next();
        counterRepository.saveAndFlush(counter);

        String username = buildUsername(departmentCode, positionCode, seq);
        String rawPassword = buildInitialPassword(departmentCode, positionCode, seq);

        return new GeneratedPrincipal(username, rawPassword);
    }

    private PrincipalCounter createNewCounter(String departmentCode, String positionCode) {
        var counter = new PrincipalCounter(
            new PrincipalCounterId(departmentCode, positionCode),
            0L
        );

        return counterRepository.save(counter);
    }

    private String buildUsername(String dept, String pos, long seq) {
        return "%s%s%03d".formatted(dept, pos, seq);
    }

    private String buildInitialPassword(String dept, String pos, long seq) {
        // keep simple & explainable
        return "%s%s%03d".formatted(dept.toLowerCase(), pos.toLowerCase(), seq);
    }
}
