package com.stubblesched.solver;

import com.stubblesched.model.AlgorithmResult;
import com.stubblesched.model.Farm;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class DPSolverTest {

    private final DPSolver solver = new DPSolver();

    @Test
    void shouldFindMinimumPollutionWithinBudget() {
        List<Farm> farms = List.of(
                new Farm("F-01", 1, 8),
                new Farm("F-02", 2, 9)
        );

        AlgorithmResult result = solver.solve(farms, 6000);

        assertTrue(result.isFeasible());
        assertEquals(2, result.getAssignments().size());
        assertEquals(0, result.getTotalPollution());
        assertEquals(6000, result.getTotalCost());
        assertTrue(result.getStepTrace().stream().anyMatch(s -> s.contains("Computed DP row")));
    }

    @Test
    void shouldReturnInfeasibleWhenNoFarmCanMeetDeadline() {
        List<Farm> farms = List.of(
                new Farm("F-01", 10, 10),
                new Farm("F-02", 7, 7)
        );

        AlgorithmResult result = solver.solve(farms, 15000);

        assertFalse(result.isFeasible());
        assertTrue(result.getAssignments().isEmpty());
        assertEquals(0, result.getTotalCost());
        assertEquals(0, result.getTotalPollution());
    }
}
