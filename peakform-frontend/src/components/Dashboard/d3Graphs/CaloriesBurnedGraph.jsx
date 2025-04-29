"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const CaloriesBurnedGraph = ({ value, target }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (value == null || target == null || target === 0) return;
    const dataset = {
      caloriesBurned: [value, target],
    };

    const colors = ["#0ADE1E", "#05A31D"];

    const width = 200;
    const height = 100;
    const margin = 40;
    const thickness = 30;
    const radius = Math.min(width, 2 * height) / 2;
    const angleRange = 0.5 * Math.PI;

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 3}, ${height - margin / 2})`);

    const arc = d3
      .arc()
      .innerRadius(radius - margin - thickness)
      .outerRadius(radius - margin);

    // Full background arc (dark green)
    svg
      .append("path")
      .datum({ startAngle: -angleRange, endAngle: angleRange })
      .attr("fill", colors[1])
      .attr("d", arc);

    // Progress arc (light green)
    const progress = svg
      .append("path")
      .datum({ startAngle: -angleRange, endAngle: -angleRange })
      .attr("fill", colors[0])
      .attr("d", arc);

    progress
      .transition()
      .duration(2000)
      .attrTween("d", () => {
        const interpolate = d3.interpolate(
          { startAngle: -angleRange, endAngle: -angleRange },
          {
            startAngle: -angleRange,
            endAngle:
              -angleRange +
              angleRange *
                2 *
                (dataset.caloriesBurned[0] / dataset.caloriesBurned[1]),
          }
        );
        return (t) => arc(interpolate(t));
      });

    // Label
    svg
      .append("text")
      .attr("dy", "-.3em")
      .attr("dx", "-1.5em")
      .attr("color", "white")
      .attr("font-size", "12px")
      .attr("font-family", "sans-serif");
  }, []);

  if (target === 0) return;

  return <svg ref={ref}></svg>;
};

export default CaloriesBurnedGraph;
