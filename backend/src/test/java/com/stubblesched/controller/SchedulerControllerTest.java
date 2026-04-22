package com.stubblesched.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class SchedulerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private String sampleRequestJson() throws Exception {
        Map<String, Object> body = Map.of(
                "farms", List.of(
                        Map.of("id", "F-01", "harvestDay", 1, "deadline", 4),
                        Map.of("id", "F-02", "harvestDay", 2, "deadline", 9),
                        Map.of("id", "F-03", "harvestDay", 3, "deadline", 6)
                ),
                "budget", 15000
        );
        return objectMapper.writeValueAsString(body);
    }

    @Test
    void greedyEndpointShouldReturnResultPayload() throws Exception {
        mockMvc.perform(post("/api/schedule/greedy")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(sampleRequestJson()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.algorithmName").value("Greedy"))
                .andExpect(jsonPath("$.assignments").isArray())
                .andExpect(jsonPath("$.timeComplexity").value("O(n log n)"));
    }

    @Test
    void dpEndpointShouldReturnResultPayload() throws Exception {
        mockMvc.perform(post("/api/schedule/dp")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(sampleRequestJson()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.algorithmName").value("Dynamic Programming"))
                .andExpect(jsonPath("$.assignments").isArray())
                .andExpect(jsonPath("$.spaceComplexity").value("O(n x B)"));
    }

    @Test
    void backtrackEndpointShouldReturnPruneRate() throws Exception {
        mockMvc.perform(post("/api/schedule/backtrack")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(sampleRequestJson()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.algorithmName").value("Backtracking"))
                .andExpect(jsonPath("$.pruneRate").exists())
                .andExpect(jsonPath("$.stepTrace").isArray());
    }

    @Test
    void allEndpointShouldReturnComparisonPayload() throws Exception {
        mockMvc.perform(post("/api/schedule/all")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(sampleRequestJson()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.greedy.algorithmName").value("Greedy"))
                .andExpect(jsonPath("$.dp.algorithmName").value("Dynamic Programming"))
                .andExpect(jsonPath("$.backtrack.algorithmName").value("Backtracking"))
                .andExpect(jsonPath("$.bestAlgorithm").isString());
    }
}
