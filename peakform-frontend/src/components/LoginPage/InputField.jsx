import React from "react";

function InputField({ label, type = "text", placeholder, value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-white">{label}</label>
      <div className="flex items-center p-4 h-8 rounded-md bg-zinc-900">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full text-sm font-semibold text-white border-[none] bg-transparent outline-none"
        />
      </div>
    </div>
  );
}

export default InputField;
