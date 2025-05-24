"use client";
import React, { useState, useEffect } from "react";
import { Plus, Trash2, Save, Edit3, X, Check } from "lucide-react";

// Enhanced Workout Display Component
const WorkoutPlanDisplay = ({
  workoutPlan,
  onUpdateWorkout,
  onSaveWorkout,
}) => {
  const [activeTab, setActiveTab] = useState("all");
  const [exercises, setExercises] = useState([]);
  const [availableExercises, setAvailableExercises] = useState([]);
  const [editingExercise, setEditingExercise] = useState(null);
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize exercises from workout plan
  // Initialize exercises from workout plan and match with available exercises
  useEffect(() => {
    if (workoutPlan?.exercises && availableExercises.length > 0) {
      const enhancedExercises = workoutPlan.exercises.map((exercise, index) => {
        // Find matching exercise from availableExercises
        const matchingExercise = availableExercises.find(
          (availEx) => availEx.exerciseId === exercise.exerciseId
        );

        return {
          ...exercise,
          id: `${exercise.exerciseId}-${exercise.day}-${index}`,
          exerciseName:
            matchingExercise?.exerciseName ||
            `Exercise #${exercise.exerciseId}`,
          description:
            matchingExercise?.description || "No description available.",
          targetMuscleGroup: matchingExercise?.targetMuscleGroup || "Unknown",
        };
      });
      setExercises(enhancedExercises);
    }
  }, [workoutPlan, availableExercises]);

  // Fetch available exercises for adding
  useEffect(() => {
    fetchAvailableExercises();
  }, []);

  const fetchAvailableExercises = async () => {
    try {
      const response = await fetch("http://localhost:8080/exercises", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setAvailableExercises(data);
        console.log(data);
      } else {
        console.error("Failed to fetch exercises");
      }
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  // Get unique days
  const getDays = () => {
    if (!exercises.length) return [];
    const days = new Set(exercises.map((ex) => ex.day));
    const weekdayOrder = {
      MONDAY: 1,
      TUESDAY: 2,
      WEDNESDAY: 3,
      THURSDAY: 4,
      FRIDAY: 5,
      SATURDAY: 6,
      SUNDAY: 7,
    };
    return Array.from(days).sort(
      (a, b) => (weekdayOrder[a] || 999) - (weekdayOrder[b] || 999)
    );
  };

  const days = getDays();

  // Filter exercises by day
  const getExercisesByDay = (day) => {
    return exercises.filter(
      (exercise) => day === "all" || exercise.day === day
    );
  };

  const currentExercises = getExercisesByDay(activeTab);

  // Update exercise (sets/reps)
  const updateExercise = (exerciseId, field, value) => {
    setExercises((prev) => {
      const updated = prev.map((ex) =>
        ex.id === exerciseId ? { ...ex, [field]: value } : ex
      );
      onUpdateWorkout?.(updated);
      return updated;
    });
  };

  // Delete exercise
  const deleteExercise = (exerciseId) => {
    setExercises((prev) => {
      const updated = prev.filter((ex) => ex.id !== exerciseId);
      onUpdateWorkout?.(updated);
      return updated;
    });
  };

  // Add new exercise
  const addExercise = (exerciseData, day, sets, reps) => {
    const newExercise = {
      id: `${exerciseData.id}-${day}-${Date.now()}`,
      exerciseId: exerciseData.id,
      day: day,
      sets: parseInt(sets),
      reps: reps,
      exerciseName: exerciseData.name || exerciseData.exerciseName,
      description: exerciseData.description || "No description available.",
      targetMuscleGroup:
        exerciseData.targetMuscleGroup ||
        exerciseData.muscleGroups?.join(", ") ||
        "Unknown",
    };

    setExercises((prev) => {
      const updated = [...prev, newExercise];
      onUpdateWorkout?.(updated);
      return updated;
    });
    setShowAddExercise(false);
  };

  // Save workout plan
  const saveWorkoutPlan = async () => {
    const uuid = localStorage.getItem("user_uuid");
    setIsSaving(true);
    try {
      const workoutData = {
        exercises: exercises.map((ex) => ({
          exerciseId: ex.exerciseId,
          day: ex.day,
          sets: parseInt(ex.sets),
          reps: ex.reps.toString(),
        })),
      };

      const response = await fetch(
        `http://localhost:8080/workout-plans/create?userUuid=${uuid}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(workoutData),
        }
      );

      if (response.ok) {
        onSaveWorkout?.("success", "Workout plan saved successfully!");
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to save workout plan");
      }
    } catch (error) {
      console.error("Save error:", error);
      onSaveWorkout?.("error", error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (!exercises.length) {
    return (
      <div className="text-zinc-400 flex flex-col items-center justify-center h-64">
        <p>
          Fill out the form and submit to generate your personalized workout
          plan.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Save Button */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Workout Plan</h2>
        <button
          onClick={saveWorkoutPlan}
          disabled={isSaving}
          className="flex items-center gap-2 bg-[#05A31D] hover:bg-[#05A31D]/80 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
        >
          <Save size={16} />
          {isSaving ? "Saving..." : "Save Workout"}
        </button>
      </div>

      {/* Tabs for days */}
      <div className="flex overflow-x-auto mb-6 -mx-1 pb-1">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 mx-1 whitespace-nowrap rounded transition-colors ${
            activeTab === "all"
              ? "bg-[#05A31D] text-white"
              : "bg-zinc-800 hover:bg-zinc-700"
          }`}
        >
          All Days
        </button>
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setActiveTab(day)}
            className={`px-4 py-2 mx-1 whitespace-nowrap rounded transition-colors ${
              activeTab === day
                ? "bg-[#05A31D] text-white"
                : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            {day.charAt(0).toUpperCase() + day.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Add Exercise Button */}
      <div className="mb-4">
        <button
          onClick={() => setShowAddExercise(true)}
          className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-[#05A31D] text-[#05A31D] px-4 py-2 rounded transition-colors"
        >
          <Plus size={16} />
          Add Exercise
        </button>
      </div>

      {/* Exercise cards */}
      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {currentExercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            isEditing={editingExercise === exercise.id}
            onEdit={() => setEditingExercise(exercise.id)}
            onSave={() => setEditingExercise(null)}
            onCancel={() => setEditingExercise(null)}
            onUpdate={updateExercise}
            onDelete={deleteExercise}
          />
        ))}
      </div>

      {/* Add Exercise Modal */}
      {showAddExercise && (
        <AddExerciseModal
          availableExercises={availableExercises}
          days={[
            "MONDAY",
            "TUESDAY",
            "WEDNESDAY",
            "THURSDAY",
            "FRIDAY",
            "SATURDAY",
            "SUNDAY",
          ]}
          onAdd={addExercise}
          onClose={() => setShowAddExercise(false)}
        />
      )}

      {/* Summary section */}
      {currentExercises.length > 0 && (
        <div className="mt-6 pt-4 border-t border-zinc-800">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Workout Summary</h3>
            <span className="text-sm text-[#05A31D]">
              {currentExercises.length}{" "}
              {currentExercises.length === 1 ? "exercise" : "exercises"}
            </span>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="bg-[#1C1C1C] p-3 rounded border border-zinc-800">
              <span className="text-xs text-zinc-400">Total Sets</span>
              <p className="text-xl font-semibold mt-1">
                {currentExercises.reduce(
                  (total, ex) => total + (parseInt(ex.sets) || 0),
                  0
                )}
              </p>
            </div>
            <div className="bg-[#1C1C1C] p-3 rounded border border-zinc-800">
              <span className="text-xs text-zinc-400">Days</span>
              <p className="text-xl font-semibold mt-1">{days.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Exercise Card Component
const ExerciseCard = ({
  exercise,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onUpdate,
  onDelete,
}) => {
  const [editSets, setEditSets] = useState(exercise.sets);
  const [editReps, setEditReps] = useState(exercise.reps);

  const handleSave = () => {
    onUpdate(exercise.id, "sets", editSets);
    onUpdate(exercise.id, "reps", editReps);
    onSave();
  };

  const handleCancel = () => {
    setEditSets(exercise.sets);
    setEditReps(exercise.reps);
    onCancel();
  };

  return (
    <div className="bg-[#1C1C1C] rounded-lg p-4 border border-[#05A31D] hover:border-[#05A31D]/80 transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold">{exercise.exerciseName}</h3>
            <span className="inline-block bg-[#05A31D]/20 text-[#05A31D] text-xs font-medium px-2 py-1 rounded">
              {exercise.day}
            </span>
          </div>

          {isEditing ? (
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center gap-2">
                <label className="text-sm text-zinc-400">Sets:</label>
                <input
                  type="number"
                  value={editSets}
                  onChange={(e) => setEditSets(e.target.value)}
                  className="w-16 bg-zinc-800 border border-zinc-600 rounded px-2 py-1 text-sm"
                  min="1"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-zinc-400">Reps:</label>
                <input
                  type="text"
                  value={editReps}
                  onChange={(e) => setEditReps(e.target.value)}
                  className="w-20 bg-zinc-800 border border-zinc-600 rounded px-2 py-1 text-sm"
                  placeholder="8-12"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="p-1 bg-[#05A31D] text-white rounded hover:bg-[#05A31D]/80"
                >
                  <Check size={14} />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-1 bg-zinc-600 text-white rounded hover:bg-zinc-500"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 mb-2">
              <div className="bg-zinc-900 px-3 py-1 rounded-full text-sm">
                {exercise.sets} sets × {exercise.reps} reps
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 ml-4">
          {!isEditing && (
            <button
              onClick={onEdit}
              className="p-2 text-zinc-400 hover:text-[#05A31D] transition-colors"
            >
              <Edit3 size={16} />
            </button>
          )}
          <button
            onClick={() => onDelete(exercise.id)}
            className="p-2 text-zinc-400 hover:text-red-400 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <p className="text-zinc-400 mt-2 text-sm">{exercise.description}</p>

      <div className="mt-3">
        <span className="text-xs uppercase tracking-wider text-zinc-500">
          Target muscles
        </span>
        <p className="text-sm mt-1">{exercise.targetMuscleGroup}</p>
      </div>
    </div>
  );
};

// Add Exercise Modal Component
const AddExerciseModal = ({ availableExercises, days, onAdd, onClose }) => {
  const [selectedExercise, setSelectedExercise] = useState("");
  const [selectedDay, setSelectedDay] = useState("MONDAY");
  const [sets, setSets] = useState("3");
  const [reps, setReps] = useState("10");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedExercise) return;

    const exercise = availableExercises.find(
      (ex) => ex.id.toString() === selectedExercise
    );
    onAdd(exercise, selectedDay, sets, reps);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1C1C1C] border border-[#05A31D] rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add Exercise</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Exercise</label>
            <select
              value={selectedExercise}
              onChange={(e) => setSelectedExercise(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-600 rounded p-2"
              required
            >
              <option value="">Select an exercise</option>
              {availableExercises.map((exercise) => (
                <option key={exercise.id} value={exercise.id}>
                  {exercise.name || exercise.exerciseName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Day</label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-600 rounded p-2"
            >
              {days.map((day) => (
                <option key={day} value={day}>
                  {day.charAt(0) + day.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Sets</label>
              <input
                type="number"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-600 rounded p-2"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Reps</label>
              <input
                type="text"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-600 rounded p-2"
                placeholder="8-12"
                required
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              className="flex-1 bg-[#05A31D] text-white py-2 rounded hover:bg-[#05A31D]/80 transition-colors"
            >
              Add Exercise
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-zinc-600 text-white py-2 rounded hover:bg-zinc-500 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Workout Planner Form Component
const WorkoutPlannerForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    primaryFitnessGoal: "",
    experienceLevel: "beginner",
    availableEquipment: [],
    workoutDaysPerWeek: 3,
    preferredWorkoutDurationPerSessionInMinutes: 60,
    focusAreas: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEquipmentChange = (equipment) => {
    setFormData((prev) => ({
      ...prev,
      availableEquipment: prev.availableEquipment.includes(equipment)
        ? prev.availableEquipment.filter((item) => item !== equipment)
        : [...prev.availableEquipment, equipment],
    }));
  };

  const handleFocusAreaChange = (area) => {
    setFormData((prev) => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(area)
        ? prev.focusAreas.filter((item) => item !== area)
        : [...prev.focusAreas, area],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const equipmentOptions = [
    "Dumbbells",
    "Barbell",
    "Bench",
    "Kettlebell",
    "Resistance Bands",
    "Pull-up Bar",
    "No Equipment",
  ];

  const focusAreaOptions = [
    "Upper body",
    "Lower body",
    "Core",
    "Cardio",
    "Full body",
  ];

  const experienceLevelOptions = ["beginner", "intermediate", "advanced"];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="primaryFitnessGoal" className="block font-medium">
          Primary Fitness Goal
        </label>
        <input
          type="text"
          id="primaryFitnessGoal"
          name="primaryFitnessGoal"
          value={formData.primaryFitnessGoal}
          onChange={handleInputChange}
          placeholder="e.g. Build muscle, Weight loss, Improve endurance"
          required
          className="w-full bg-zinc-800 border border-zinc-700 focus:border-[#05A31D] rounded p-2 outline-none focus:ring-1 focus:ring-[#05A31D]"
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Experience Level</label>
        <div className="grid grid-cols-3 gap-2">
          {experienceLevelOptions.map((level) => (
            <div key={level} className="relative">
              <input
                type="radio"
                id={level}
                name="experienceLevel"
                value={level}
                checked={formData.experienceLevel === level}
                onChange={handleInputChange}
                className="peer absolute opacity-0 w-full h-full cursor-pointer"
              />
              <label
                htmlFor={level}
                className="block text-center border border-zinc-700 rounded py-2 px-3 cursor-pointer transition-all peer-checked:bg-[#05A31D]/20 peer-checked:border-[#05A31D] hover:bg-zinc-800"
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Available Equipment</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {equipmentOptions.map((equipment) => (
            <div key={equipment} className="relative">
              <input
                type="checkbox"
                id={equipment.replace(/\s+/g, "")}
                checked={formData.availableEquipment.includes(equipment)}
                onChange={() => handleEquipmentChange(equipment)}
                className="peer absolute opacity-0 w-full h-full cursor-pointer"
              />
              <label
                htmlFor={equipment.replace(/\s+/g, "")}
                className="block text-center border border-zinc-700 rounded py-2 px-1 cursor-pointer transition-all peer-checked:bg-[#05A31D]/20 peer-checked:border-[#05A31D] hover:bg-zinc-800"
              >
                {equipment}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="workoutDaysPerWeek" className="block font-medium">
          Workout Days Per Week
        </label>
        <select
          id="workoutDaysPerWeek"
          name="workoutDaysPerWeek"
          value={formData.workoutDaysPerWeek}
          onChange={handleInputChange}
          className="w-full bg-zinc-800 border border-zinc-700 focus:border-[#05A31D] rounded p-2 outline-none"
        >
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <option key={num} value={num}>
              {num} {num === 1 ? "day" : "days"}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="preferredWorkoutDurationPerSessionInMinutes"
          className="block font-medium"
        >
          Workout Duration (minutes)
        </label>
        <input
          type="number"
          id="preferredWorkoutDurationPerSessionInMinutes"
          name="preferredWorkoutDurationPerSessionInMinutes"
          value={formData.preferredWorkoutDurationPerSessionInMinutes}
          onChange={handleInputChange}
          min="1"
          max="300"
          required
          className="w-full bg-zinc-800 border border-zinc-700 focus:border-[#05A31D] rounded p-2 outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Focus Areas</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {focusAreaOptions.map((area) => (
            <div key={area} className="relative">
              <input
                type="checkbox"
                id={area.replace(/\s+/g, "")}
                checked={formData.focusAreas.includes(area)}
                onChange={() => handleFocusAreaChange(area)}
                className="peer absolute opacity-0 w-full h-full cursor-pointer"
              />
              <label
                htmlFor={area.replace(/\s+/g, "")}
                className="block text-center border border-zinc-700 rounded py-2 px-1 cursor-pointer transition-all peer-checked:bg-[#05A31D]/20 peer-checked:border-[#05A31D] hover:bg-zinc-800"
              >
                {area}
              </label>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#05A31D] hover:bg-[#05A31D]/80 text-white font-bold py-3 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Generating Workout Plan..." : "Generate Workout Plan"}
      </button>
    </form>
  );
};

// Main Application Component
export default function EnhancedWorkoutPlanner() {
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);

  const handleSubmitForm = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const dataWithUuid = {
        userUuid: localStorage.getItem("user_uuid"),
        ...formData,
      };

      console.log("Submitting workout request:", dataWithUuid);

      const response = await fetch(
        "http://localhost:8080/user/ai-generate-workout",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataWithUuid),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `HTTP ${response.status}: Failed to generate workout plan`
        );
      }

      const data = await response.json();
      console.log("Received workout plan:", data);
      setWorkoutPlan(data);
    } catch (err) {
      console.error("Error generating workout:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateWorkout = (updatedExercises) => {
    if (workoutPlan) {
      setWorkoutPlan({
        ...workoutPlan,
        exercises: updatedExercises.map((ex) => ({
          exerciseId: ex.exerciseId,
          day: ex.day,
          sets: ex.sets,
          reps: ex.reps,
        })),
      });
    }
  };

  const handleSaveWorkout = (status, message) => {
    setSaveStatus({ type: status, message });
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Save Status Notification */}
      {saveStatus && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg border ${
            saveStatus.type === "success"
              ? "bg-green-900/20 border-green-700/30 text-green-200"
              : "bg-red-900/20 border-red-700/30 text-red-200"
          }`}
        >
          {saveStatus.message}
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-[#1C1C1C] p-6 rounded-lg border border-[#05A31D]">
            <h2 className="text-2xl font-bold mb-6">
              Create Your Workout Plan
            </h2>
            <WorkoutPlannerForm
              onSubmit={handleSubmitForm}
              isLoading={isLoading}
            />
          </div>

          {/* Workout Display Section */}
          <div className="bg-[#1C1C1C] p-6 rounded-lg border border-[#05A31D]">
            <h2 className="text-2xl font-bold mb-6">Your AI Workout Plan</h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#05A31D]"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 p-4 bg-red-900/20 rounded border border-red-700/30">
                <p>Error: {error}</p>
                <p className="mt-2">Please try again later.</p>
              </div>
            ) : workoutPlan ? (
              <WorkoutPlanDisplay
                workoutPlan={workoutPlan}
                onUpdateWorkout={handleUpdateWorkout}
                onSaveWorkout={handleSaveWorkout}
              />
            ) : (
              <div className="text-zinc-400 flex flex-col items-center justify-center h-64">
                <p>
                  Fill out the form and submit to generate your personalized
                  workout plan.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
