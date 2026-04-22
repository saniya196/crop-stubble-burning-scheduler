package com.stubblesched.solver;

import com.stubblesched.model.AlgorithmResult;
import com.stubblesched.model.Assignment;
import com.stubblesched.model.ClearingMethod;
import com.stubblesched.model.Farm;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class GreedySolver {

    public AlgorithmResult solve(List<Farm> farms, int budget) {
        AlgorithmResult result = new AlgorithmResult();
        result.setAlgorithmName("Greedy");
        result.setTimeComplexity("O(n log n)");
        result.setSpaceComplexity("O(n)");

        List<String> trace = new ArrayList<>();
        List<Assignment> assignments = new ArrayList<>();

        List<Farm> sorted = farms.stream()
                .sorted(Comparator.comparingInt(Farm::getTimeWindow).thenComparing(Farm::getId))
                .toList();

        int totalCost = 0;
        int totalPollution = 0;
        boolean feasible = true;

        for (Farm farm : sorted) {
            Assignment selected = null;
            trace.add("Farm " + farm.getId() + " window=" + farm.getTimeWindow() + " risk=" + farm.getRiskLevel());

            for (ClearingMethod method : ClearingMethod.byLowestPollution()) {
                boolean fitsDeadline = method.getDays() <= farm.getTimeWindow();
                boolean fitsBudget = totalCost + method.getCost() <= budget;

                trace.add("  Try " + method.getMethodName() + " (days=" + method.getDays() + ", cost=" + method.getCost()
                        + ", pollution=" + method.getPollution() + ") -> deadline=" + fitsDeadline + ", budget=" + fitsBudget);

                if (fitsDeadline && fitsBudget) {
                    selected = new Assignment(farm.getId(), method.getMethodName(), method.getDays(), method.getCost(), method.getPollution());
                    trace.add("  Selected " + method.getMethodName() + " for " + farm.getId());
                    break;
                }
            }

            if (selected == null) {
                feasible = false;
                selected = new Assignment(farm.getId(), "UNASSIGNED", 0, 0, 0);
                trace.add("  No feasible method for " + farm.getId() + " -> UNASSIGNED");
            }

            assignments.add(selected);
            totalCost += selected.getCost();
            totalPollution += selected.getPollution();
        }

        result.setAssignments(assignments);
        result.setTotalCost(totalCost);
        result.setTotalPollution(totalPollution);
        result.setFeasible(feasible);
        result.setStepTrace(trace);
        return result;
    }
}
