package com.stubblesched.solver;

import com.stubblesched.model.AlgorithmResult;
import com.stubblesched.model.Assignment;
import com.stubblesched.model.Farm;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class GreedySolverTest {

    private final GreedySolver solver = new GreedySolver();

    @Test
    void shouldAssignLowestPollutionMethodWhenFeasible() {
        List<Farm> farms = List.of(
                new Farm("F-01", 1, 10),
                new Farm("F-02", 2, 12)
        );

        AlgorithmResult result = solver.solve(farms, 20_000);

        assertTrue(result.isFeasible());
        assertEquals(2, result.getAssignments().size());
        assertEquals(0, result.getTotalPollution());
        assertEquals(6000, result.getTotalCost());
        assertTrue(result.getStepTrace().stream().anyMatch(s -> s.contains("Selected")));
    }

    @Test
    void shouldMarkFarmUnassignedWhenNoMethodFits() {
        List<Farm> farms = List.of(new Farm("F-X", 5, 5));

        AlgorithmResult result = solver.solve(farms, 15_000);

        assertFalse(result.isFeasible());
        Assignment assignment = result.getAssignments().get(0);
        assertEquals("UNASSIGNED", assignment.getMethodName());
        assertEquals(0, result.getTotalCost());
        assertEquals(0, result.getTotalPollution());
    }
}
