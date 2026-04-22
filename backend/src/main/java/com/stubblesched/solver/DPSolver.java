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
public class DPSolver {

    private static final int INF = 1_000_000_000;

    public AlgorithmResult solve(List<Farm> farms, int budget) {
        AlgorithmResult result = new AlgorithmResult();
        result.setAlgorithmName("Dynamic Programming");
        result.setTimeComplexity("O(n x B)");
        result.setSpaceComplexity("O(n x B)");

        List<String> trace = new ArrayList<>();
        int n = farms.size();

        int[][] dp = new int[n + 1][budget + 1];
        int[][] choice = new int[n + 1][budget + 1];

        for (int i = 0; i <= n; i++) {
            for (int b = 0; b <= budget; b++) {
                dp[i][b] = INF;
                choice[i][b] = -1;
            }
        }

        for (int b = 0; b <= budget; b++) {
            dp[0][b] = 0;
        }

        for (int i = 1; i <= n; i++) {
            Farm farm = farms.get(i - 1);
            for (int b = 0; b <= budget; b++) {
                for (ClearingMethod method : ClearingMethod.values()) {
                    if (method.getDays() > farm.getTimeWindow()) {
                        continue;
                    }
                    if (method.getCost() > b) {
                        continue;
                    }
                    int prev = dp[i - 1][b - method.getCost()];
                    if (prev == INF) {
                        continue;
                    }
                    int candidate = prev + method.getPollution();
                    if (candidate < dp[i][b]) {
                        dp[i][b] = candidate;
                        choice[i][b] = method.ordinal();
                    }
                }
            }
            trace.add("Computed DP row for farm " + farm.getId() + " with window=" + farm.getTimeWindow());
        }

        int bestBudget = -1;
        int bestPollution = INF;
        for (int b = 0; b <= budget; b++) {
            if (dp[n][b] < bestPollution) {
                bestPollution = dp[n][b];
                bestBudget = b;
            }
        }

        if (bestBudget == -1 || bestPollution == INF) {
            result.setAssignments(Collections.emptyList());
            result.setTotalCost(0);
            result.setTotalPollution(0);
            result.setFeasible(false);
            trace.add("No feasible assignment set found by DP.");
            result.setStepTrace(trace);
            return result;
        }

        List<Assignment> reversed = new ArrayList<>();
        int remainingBudget = bestBudget;
        int totalCost = 0;

        for (int i = n; i >= 1; i--) {
            Farm farm = farms.get(i - 1);
            int methodOrdinal = choice[i][remainingBudget];
            if (methodOrdinal < 0) {
                result.setAssignments(Collections.emptyList());
                result.setTotalCost(0);
                result.setTotalPollution(0);
                result.setFeasible(false);
                trace.add("Backtrack failed at farm " + farm.getId() + ": no choice recorded.");
                result.setStepTrace(trace);
                return result;
            }

            ClearingMethod method = ClearingMethod.values()[methodOrdinal];
            reversed.add(new Assignment(farm.getId(), method.getMethodName(), method.getDays(), method.getCost(), method.getPollution()));
            remainingBudget -= method.getCost();
            totalCost += method.getCost();
            trace.add("Backtrack select " + method.getMethodName() + " for " + farm.getId() + ", remainingBudget=" + remainingBudget);
        }

        Collections.reverse(reversed);

        result.setAssignments(reversed);
        result.setTotalCost(totalCost);
        result.setTotalPollution(bestPollution);
        result.setFeasible(true);
        result.setStepTrace(trace);
        return result;
    }
}
