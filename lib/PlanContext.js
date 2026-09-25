"use client";



import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const PlanContext = createContext(null);

const PLAN_KEY = "fitlog_plan";
const SAVED_KEY = "fitlog_saved";
const PLAN_CAP = 5;

function readStorage(key) {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [hydrated, setHydrated] = useState(false);


  useEffect(() => {
    setPlan(readStorage(PLAN_KEY));
    setSaved(readStorage(SAVED_KEY));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan, hydrated]);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);

  const isPlanFull = plan.length >= PLAN_CAP;

  function addToPlan(workout) {
    if (plan.some((w) => w.id === workout.id)) {
      toast("এই workout টা আগে থেকেই তোমার plan এ আছে");
      return;
    }
    if (isPlanFull) {
      toast.error("আজকের plan ফুল (max 5 lifts)");
      return;
    }
    setPlan((prev) => [...prev, { ...workout, done: false }]);
    toast.success("Added to today's plan");
  }

  function addToSaved(workout) {
    if (saved.some((w) => w.id === workout.id)) {
      toast("এই workout টা আগে থেকেই Saved এ আছে");
      return;
    }
    setSaved((prev) => [...prev, workout]);
    toast.success("Saved for later");
  }

  function removeFromPlan(id) {
    setPlan((prev) => prev.filter((w) => w.id !== id));
    toast("Plan থেকে বাদ দেওয়া হয়েছে");
  }

  function removeFromSaved(id) {
    setSaved((prev) => prev.filter((w) => w.id !== id));
    toast("Saved থেকে বাদ দেওয়া হয়েছে");
  }

  function toggleDone(id) {
    setPlan((prev) =>
      prev.map((w) => (w.id === id ? { ...w, done: !w.done } : w))
    );
    toast.success("Marked as done");
  }

  const value = {
    plan,
    saved,
    isPlanFull,
    addToPlan,
    addToSaved,
    removeFromPlan,
    removeFromSaved,
    toggleDone,
    planCount: plan.length,
    savedCount: saved.length,
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside PlanProvider");
  return ctx;
}
