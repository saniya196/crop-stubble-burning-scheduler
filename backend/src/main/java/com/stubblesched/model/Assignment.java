package com.stubblesched.model;

public class Assignment {
    private String farmId;
    private String methodName;
    private int days;
    private int cost;
    private int pollution;
    private String ecoGrade;

    public Assignment() {
    }

    public Assignment(String farmId, String methodName, int days, int cost, int pollution) {
        this.farmId = farmId;
        this.methodName = methodName;
        this.days = days;
        this.cost = cost;
        this.pollution = pollution;
        this.ecoGrade = computeEcoGrade(methodName, pollution);
    }

    public static String computeEcoGrade(String methodName, int pollution) {
        if ("UNASSIGNED".equalsIgnoreCase(methodName)) {
            return "NA";
        }
        if (pollution <= 5) {
            return "A+";
        }
        if (pollution <= 20) {
            return "B";
        }
        return "F";
    }

    public String getFarmId() {
        return farmId;
    }

    public void setFarmId(String farmId) {
        this.farmId = farmId;
    }

    public String getMethodName() {
        return methodName;
    }

    public void setMethodName(String methodName) {
        this.methodName = methodName;
        this.ecoGrade = computeEcoGrade(this.methodName, this.pollution);
    }

    public int getDays() {
        return days;
    }

    public void setDays(int days) {
        this.days = days;
    }

    public int getCost() {
        return cost;
    }

    public void setCost(int cost) {
        this.cost = cost;
    }

    public int getPollution() {
        return pollution;
    }

    public void setPollution(int pollution) {
        this.pollution = pollution;
        this.ecoGrade = computeEcoGrade(this.methodName, this.pollution);
    }

    public String getEcoGrade() {
        return ecoGrade;
    }

    public void setEcoGrade(String ecoGrade) {
        this.ecoGrade = ecoGrade;
    }
}
