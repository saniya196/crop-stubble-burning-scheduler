package com.stubblesched.model;

public class AllAlgorithmsResponse {
    private AlgorithmResult greedy;
    private AlgorithmResult dp;
    private AlgorithmResult backtrack;
    private String bestAlgorithm;

    public AlgorithmResult getGreedy() {
        return greedy;
    }

    public void setGreedy(AlgorithmResult greedy) {
        this.greedy = greedy;
    }

    public AlgorithmResult getDp() {
        return dp;
    }

    public void setDp(AlgorithmResult dp) {
        this.dp = dp;
    }

    public AlgorithmResult getBacktrack() {
        return backtrack;
    }

    public void setBacktrack(AlgorithmResult backtrack) {
        this.backtrack = backtrack;
    }

    public String getBestAlgorithm() {
        return bestAlgorithm;
    }

    public void setBestAlgorithm(String bestAlgorithm) {
        this.bestAlgorithm = bestAlgorithm;
    }
}
