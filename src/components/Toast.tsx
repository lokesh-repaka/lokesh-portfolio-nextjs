"use client";

import React from "react";

interface ToastProps {
  show: boolean;
  message: string;
  icon?: string;
}

export const Toast: React.FC<ToastProps> = ({ show, message, icon = "✅" }) => {
  return (
    <div className={`toast ${show ? "show" : ""}`} id="toastBox">
      <span id="toastIcon">{icon}</span>
      <span id="toastMsg">{message}</span>
    </div>
  );
};
