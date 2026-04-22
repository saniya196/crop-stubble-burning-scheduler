package com.stubblesched.solver;

import com.stubblesched.model.AlgorithmResult;
import com.stubblesched.model.Farm;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class BacktrackingSolverTest {

    private final BacktrackingSolver solver = new BacktrackingSolver();

    @Test
    void shouldFindFeasibleSolutionAndExposePruningStats() {
        List<Farm> farms = List.of(
                new Farm("F-01", 1, 8),
                new Farm("F-02", 2, 10),
                new Farm("F-03", 3, 11)
        );

        AlgorithmResult result = solver.solve(farms, 10_000);

        assertTrue(result.isFeasible());
        assertEquals(3, result.getAssignments().size());
        assertNotNull(result.getPruneRate());
        assertTrue(result.getPruneRate() >= 0.0);
        assertTrue(result.getStepTrace().stream().anyMatch(s -> s.startsWith("PRUNE:") || s.startsWith("SUCCESS:")));
    }

    @Test
    void shouldReturnInfeasibleWhenAllWindowsAreZero() {
        List<Farm> farms = List.of(
                new Farm("F-01", 5, 5),
                new Farm("F-02", 10, 10)
        );

        AlgorithmResult result = solver.solve(farms, 20_000);

        assertFalse(result.isFeasible());
        assertTrue(result.getAssignments().isEmpty());
        assertEquals(0, result.getTotalPollution());
        assertTrue(result.getStepTrace().stream().anyMatch(s -> s.contains("No feasible solution")));
    }
}
