package com.stubblesched.model;

public class Farm {
    private String id;
    private int harvestDay;
    private int deadline;

    public Farm() {
    }

    public Farm(String id, int harvestDay, int deadline) {
        this.id = id;
        this.harvestDay = harvestDay;
        this.deadline = deadline;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getHarvestDay() {
        return harvestDay;
    }

    public void setHarvestDay(int harvestDay) {
        this.harvestDay = harvestDay;
    }

    public int getDeadline() {
        return deadline;
    }

    public void setDeadline(int deadline) {
        this.deadline = deadline;
    }

    public int getTimeWindow() {
        return Math.max(0, deadline - harvestDay);
    }

    public String getRiskLevel() {
        int window = getTimeWindow();
        if (window <= 3) {
            return "HIGH";
        }
        if (window <= 7) {
            return "MED";
        }
        return "LOW";
    }
}
