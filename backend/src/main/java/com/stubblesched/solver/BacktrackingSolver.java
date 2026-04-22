package com.stubblesched.solver;

import com.stubblesched.model.AlgorithmResult;
import com.stubblesched.model.Assignment;
import com.stubblesched.model.ClearingMethod;
import com.stubblesched.model.Farm;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class BacktrackingSolver {

    private List<Farm> farms;
    private int bestPollution;
    private List<Assignment> bestSolution;
    private long visitedNodes;
    private long prunedNodes;
    private final List<String> trace = new ArrayList<>();

    public AlgorithmResult solve(List<Farm> farms, int budget) {
        this.farms = farms;
        this.bestPollution = Integer.MAX_VALUE;
        this.bestSolution = new ArrayList<>();
        this.visitedNodes = 0;
        this.prunedNodes = 0;
        this.trace.clear();

        solveRecursive(0, budget, 0, new ArrayList<>());

        AlgorithmResult result = new AlgorithmResult();
        result.setAlgorithmName("Backtracking");
        result.setTimeComplexity("O(4^n)");
        result.setSpaceComplexity("O(n)");

        if (bestSolution.isEmpty()) {
            result.setAssignments(Collections.emptyList());
            result.setTotalCost(0);
            result.setTotalPollution(0);
            result.setFeasible(false);
            trace.add("No feasible solution found by backtracking.");
        } else {
            int totalCost = bestSolution.stream().mapToInt(Assignment::getCost).sum();
            result.setAssignments(bestSolution);
            result.setTotalCost(totalCost);
            result.setTotalPollution(bestPollution);
            result.setFeasible(true);
            trace.add("Best pollution found: " + bestPollution + " with cost=" + totalCost);
        }

        double pruneRate = visitedNodes == 0 ? 0.0 : (prunedNodes * 100.0 / visitedNodes);
        result.setPruneRate(pruneRate);
        result.setStepTrace(new ArrayList<>(trace));
        return result;
    }

    private void solveRecursive(int farmIndex, int remainingBudget, int currentPollution, List<Assignment> currentAssignments) {
        visitedNodes++;

        if (currentPollution >= bestPollution) {
            prunedNodes++;
            trace.add("PRUNE: index=" + farmIndex + " currentPollution=" + currentPollution
                    + " >= bestPollution=" + bestPollution);
            return;
        }

        if (farmIndex == farms.size()) {
            bestPollution = currentPollution;
            bestSolution = new ArrayList<>(currentAssignments);
            trace.add("SUCCESS: full assignment reached with pollution=" + currentPollution);
            return;
        }

        Farm farm = farms.get(farmIndex);
        boolean advanced = false;

        for (ClearingMethod method : ClearingMethod.values()) {
            if (method.getDays() > farm.getTimeWindow()) {
                prunedNodes++;
                trace.add("PRUNE: " + farm.getId() + " method=" + method.getMethodName() + " deadline violated");
                continue;
            }

            if (method.getCost() > remainingBudget) {
                prunedNodes++;
                trace.add("PRUNE: " + farm.getId() + " method=" + method.getMethodName() + " budget exceeded");
                continue;
            }

            advanced = true;
            Assignment assignment = new Assignment(
                    farm.getId(),
                    method.getMethodName(),
                    method.getDays(),
                    method.getCost(),
                    method.getPollution());

            currentAssignments.add(assignment);
            trace.add("DECISION: farm=" + farm.getId() + " choose=" + method.getMethodName()
                    + " remainingBudget=" + (remainingBudget - method.getCost()));

            solveRecursive(
                    farmIndex + 1,
                    remainingBudget - method.getCost(),
                    currentPollution + method.getPollution(),
                    currentAssignments
            );

            currentAssignments.remove(currentAssignments.size() - 1);
        }

        if (!advanced) {
            prunedNodes++;
            trace.add("PRUNE: no feasible method for farm " + farm.getId());
        }
    }
}
