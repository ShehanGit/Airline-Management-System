package com.airlinemanagementsystem.airline_management_system.model;

public enum WeightType {
    DISTANCE, COST, TIME;

    public static WeightType fromString(String weightType) {
        for (WeightType wt : WeightType.values()) {
            if (wt.name().equalsIgnoreCase(weightType)) {
                return wt;
            }
        }
        throw new IllegalArgumentException("Invalid weight type: " + weightType);
    }
}
