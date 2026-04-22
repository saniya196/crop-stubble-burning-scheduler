package com.stubblesched.model;

import java.util.ArrayList;
import java.util.List;

public class AlgorithmResult {
    private String algorithmName;
    private List<Assignment> assignments = new ArrayList<>();
    private int totalCost;
    private int totalPollution;
    private boolean feasible;
    private String timeComplexity;
    private String spaceComplexity;
    private Double pruneRate;
    private List<String> stepTrace = new ArrayList<>();

    public String getAlgorithmName() {
        return algorithmName;
    }

    public void setAlgorithmName(String algorithmName) {
        this.algorithmName = algorithmName;
    }

    public List<Assignment> getAssignments() {
        return assignments;
    }

    public void setAssignments(List<Assignment> assignments) {
        this.assignments = assignments;
    }

    public int getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(int totalCost) {
        this.totalCost = totalCost;
    }

    public int getTotalPollution() {
        return totalPollution;
    }

    public void setTotalPollution(int totalPollution) {
        this.totalPollution = totalPollution;
    }

    public boolean isFeasible() {
        return feasible;
    }

    public void setFeasible(boolean feasible) {
        this.feasible = feasible;
    }

    public String getTimeComplexity() {
        return timeComplexity;
    }

    public void setTimeComplexity(String timeComplexity) {
        this.timeComplexity = timeComplexity;
    }

    public String getSpaceComplexity() {
        return spaceComplexity;
    }

    public void setSpaceComplexity(String spaceComplexity) {
        this.spaceComplexity = spaceComplexity;
    }

    public Double getPruneRate() {
        return pruneRate;
    }

    public void setPruneRate(Double pruneRate) {
        this.pruneRate = pruneRate;
    }

    public List<String> getStepTrace() {
        return stepTrace;
    }

    public void setStepTrace(List<String> stepTrace) {
        this.stepTrace = stepTrace;
    }
}
