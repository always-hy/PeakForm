"use client";
import React, { useState } from "react";

function PasswordInput({ label, placeholder, value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-white">{label}</label>
      <div className="flex justify-between items-center p-4 h-8 rounded-md bg-zinc-900">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full text-sm font-semibold text-white border-[none] bg-transparent outline-none"
        />
        <button
          onClick={togglePasswordVisibility}
          type="button"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="eye-icon"
            style={{ width: "11.383px", height: "11.383px" }}
          >
            <path
              d="M8.58191 6.75886C8.67272 6.51619 8.71879 6.25907 8.71788 5.99997C8.71788 5.42467 8.48934 4.87294 8.08255 4.46614C7.67575 4.05935 7.12402 3.83081 6.54872 3.83081C6.29281 3.83111 6.03902 3.87716 5.79932 3.96678L6.3084 4.49168C6.38579 4.4793 6.46402 4.47295 6.5424 4.4727C6.94917 4.47185 7.33976 4.63199 7.62887 4.91814C7.91798 5.20429 8.08213 5.59321 8.08547 5.99997C8.08521 6.07834 8.07887 6.15657 8.0665 6.23396L8.58191 6.75886Z"
              fill="#C7D2D6"
            ></path>
            <path
              d="M11.4593 5.85137C10.3937 3.88142 8.52493 2.68933 6.45696 2.68933C5.89391 2.69065 5.33464 2.78137 4.80005 2.9581L5.30914 3.47035C5.68411 3.37345 6.06967 3.32353 6.45696 3.32174C8.23718 3.32174 9.85615 4.31462 10.8206 5.98734C10.4668 6.60792 9.99779 7.15526 9.43876 7.59998L9.88777 8.04899C10.5347 7.52704 11.0721 6.88225 11.4688 6.15176L11.551 5.99998L11.4593 5.85137Z"
              fill="#C7D2D6"
            ></path>
            <path
              d="M2.15661 2.13606L3.56688 3.54633C2.67547 4.12027 1.94694 4.91415 1.45148 5.85145L1.36926 6.00007L1.45148 6.15185C2.51708 8.1218 4.38584 9.31388 6.45382 9.31388C7.26098 9.31372 8.05765 9.13104 8.78424 8.7795L10.3653 10.3605L10.9186 9.88621L2.69732 1.66492L2.15661 2.13606ZM5.2396 5.21905L7.34235 7.3218C7.10476 7.46886 6.83125 7.54763 6.55184 7.54947C6.34882 7.54947 6.14779 7.50933 5.96034 7.43135C5.77289 7.35337 5.60271 7.23909 5.45959 7.09509C5.31647 6.95109 5.20324 6.78021 5.12641 6.59228C5.04959 6.40435 5.01068 6.20309 5.01193 6.00007C5.01549 5.72389 5.0942 5.45389 5.2396 5.21905ZM4.7811 4.76055C4.48527 5.17775 4.34661 5.68617 4.38968 6.1958C4.43274 6.70542 4.65475 7.18336 5.01639 7.54501C5.37803 7.90665 5.85598 8.12866 6.3656 8.17172C6.87522 8.21478 7.38365 8.07613 7.80085 7.7803L8.30677 8.28622C7.72109 8.53657 7.09076 8.66565 6.45382 8.66567C4.67359 8.66567 3.05463 7.67279 2.09021 6.00007C2.55304 5.18054 3.2196 4.49437 4.02537 4.00799L4.7811 4.76055Z"
              fill="#C7D2D6"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default PasswordInput;
