package com.stubblesched.model;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;

import java.util.ArrayList;
import java.util.List;

public class ScheduleRequest {
    @Valid
    @NotEmpty(message = "farms must not be empty")
    private List<Farm> farms = new ArrayList<>();

    @Min(value = 0, message = "budget must be non-negative")
    private int budget;

    public List<Farm> getFarms() {
        return farms;
    }

    public void setFarms(List<Farm> farms) {
        this.farms = farms;
    }

    public int getBudget() {
        return budget;
    }

    public void setBudget(int budget) {
        this.budget = budget;
    }
}
