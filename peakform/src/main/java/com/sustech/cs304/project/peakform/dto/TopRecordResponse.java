package com.sustech.cs304.project.peakform.dto;

import java.util.List;

public record TopRecordResponse(
        List<TopBenchPressRecordResponse> topBenchPressUsers,
        List<TopSquatRecordResponse> topSquatUsers,
        List<TopDeadliftRecordResponse> topDeadliftUsers
) {
}
