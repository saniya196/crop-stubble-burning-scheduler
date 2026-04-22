package com.stubblesched.model;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public enum ClearingMethod {
    BURNING("Burning", 1, 0, 100),
    MULCHING("Mulching", 3, 3000, 0),
    BIO_DECOMPOSER("Bio-decomposer", 7, 500, 5),
    MANUAL_REMOVAL("Manual Removal", 5, 1500, 10);

    private final String methodName;
    private final int days;
    private final int cost;
    private final int pollution;

    ClearingMethod(String methodName, int days, int cost, int pollution) {
        this.methodName = methodName;
        this.days = days;
        this.cost = cost;
        this.pollution = pollution;
    }

    public String getMethodName() {
        return methodName;
    }

    public int getDays() {
        return days;
    }

    public int getCost() {
        return cost;
    }

    public int getPollution() {
        return pollution;
    }

    public static List<ClearingMethod> byLowestPollution() {
        return Arrays.stream(values())
                .sorted(Comparator.comparingInt(ClearingMethod::getPollution)
                        .thenComparingInt(ClearingMethod::getCost)
                        .thenComparingInt(ClearingMethod::getDays))
                .toList();
    }
}
