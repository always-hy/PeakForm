import { useState } from "react";

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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEquipmentChange = (equipment) => {
    if (formData.availableEquipment.includes(equipment)) {
      setFormData({
        ...formData,
        availableEquipment: formData.availableEquipment.filter(
          (item) => item !== equipment
        ),
      });
    } else {
      setFormData({
        ...formData,
        availableEquipment: [...formData.availableEquipment, equipment],
      });
    }
  };

  const handleFocusAreaChange = (area) => {
    if (formData.focusAreas.includes(area)) {
      setFormData({
        ...formData,
        focusAreas: formData.focusAreas.filter((item) => item !== area),
      });
    } else {
      setFormData({
        ...formData,
        focusAreas: [...formData.focusAreas, area],
      });
    }
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
      {/* Primary Fitness Goal */}
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

      {/* Experience Level */}
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

      {/* Available Equipment */}
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

      {/* Workout Days Per Week */}
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

      {/* Workout Duration */}
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
        <div className="flex justify-between text-sm text-zinc-400 px-1">
          <span>1 min</span>
          <span>300 mins</span>
        </div>
      </div>

      {/* Focus Areas */}
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

      {/* Submit Button */}
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

export default WorkoutPlannerForm;
