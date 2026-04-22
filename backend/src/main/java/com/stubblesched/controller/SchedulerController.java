package com.stubblesched.controller;

import com.stubblesched.model.AlgorithmResult;
import com.stubblesched.model.AllAlgorithmsResponse;
import com.stubblesched.model.ScheduleRequest;
import com.stubblesched.solver.BacktrackingSolver;
import com.stubblesched.solver.DPSolver;
import com.stubblesched.solver.GreedySolver;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/schedule")
@CrossOrigin(origins = "http://localhost:3000")
public class SchedulerController {

    private final GreedySolver greedySolver;
    private final DPSolver dpSolver;
    private final BacktrackingSolver backtrackingSolver;

    public SchedulerController(GreedySolver greedySolver, DPSolver dpSolver, BacktrackingSolver backtrackingSolver) {
        this.greedySolver = greedySolver;
        this.dpSolver = dpSolver;
        this.backtrackingSolver = backtrackingSolver;
    }

    @PostMapping("/greedy")
    public AlgorithmResult runGreedy(@Valid @RequestBody ScheduleRequest request) {
        return greedySolver.solve(request.getFarms(), request.getBudget());
    }

    @PostMapping("/dp")
    public AlgorithmResult runDp(@Valid @RequestBody ScheduleRequest request) {
        return dpSolver.solve(request.getFarms(), request.getBudget());
    }

    @PostMapping("/backtrack")
    public AlgorithmResult runBacktrack(@Valid @RequestBody ScheduleRequest request) {
        return backtrackingSolver.solve(request.getFarms(), request.getBudget());
    }

    @PostMapping("/all")
    public AllAlgorithmsResponse runAll(@Valid @RequestBody ScheduleRequest request) {
        AlgorithmResult greedy = greedySolver.solve(request.getFarms(), request.getBudget());
        AlgorithmResult dp = dpSolver.solve(request.getFarms(), request.getBudget());
        AlgorithmResult backtrack = backtrackingSolver.solve(request.getFarms(), request.getBudget());

        AllAlgorithmsResponse response = new AllAlgorithmsResponse();
        response.setGreedy(greedy);
        response.setDp(dp);
        response.setBacktrack(backtrack);
        response.setBestAlgorithm(findBest(greedy, dp, backtrack));
        return response;
    }

    private String findBest(AlgorithmResult... results) {
        String best = "N/A";
        int bestPollution = Integer.MAX_VALUE;

        for (AlgorithmResult result : results) {
            if (result != null && result.isFeasible() && result.getTotalPollution() < bestPollution) {
                bestPollution = result.getTotalPollution();
                best = result.getAlgorithmName();
            }
        }
        return best;
    }
}
