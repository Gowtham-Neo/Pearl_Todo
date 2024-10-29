
import { create } from "zustand";
const useTaskStore = create((set) => ({
  task: {
    title: "",
    description: null, 
    startDate: "",
    endDate: null,
    recurrenceType: null,
    customInterval: null,
    specificDaysOfWeek: [],
    nthDayOfMonth: null,
    isActive: true,
  },
  updateTask: (field, value) =>
    set((state) => ({
      task: { ...state.task, [field]: value },
    })),
  resetTask: () =>
    set({
      task: {
        title: "",
        description: "",
        startDate: "",
        endDate: null,
        recurrenceType: null,
        customInterval: null,
        specificDaysOfWeek: null,
        nthDayOfMonth: null,
        isActive: true,
      },
    }),
}));

export default useTaskStore;
