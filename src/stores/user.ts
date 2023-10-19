import { defineStore } from "pinia";
import { ref } from "vue";
export const ADD_SELECTED_JOB_TYPES = "ADD_SELECTED_JOB_TYPES";
export const ADD_SELECTED_ORGANIZATIONS = "ADD_SELECTED_ORGANIZATIONS";
export const ADD_SELECTED_DEGREES = "ADD_SELECTED_DEGREES";
export const CLEAR_JOB_FILTERS = "CLEAR_JOB_FILTERS";


export const useUserStore = defineStore("user", () => {
  const isLoggedIn = ref(false);
  const selectedOrganizations = ref<string[]>([]);
  const selectedJobTypes = ref<string[]>([]);
  const selectedDegrees = ref<string[]>([]);

  const LOGIN_USER = () => (isLoggedIn.value = true);

  const ADD_SELECTED_ORGANIZATIONS = (organizations: string[]) =>
    (selectedOrganizations.value = organizations);

  const ADD_SELECTED_JOB_TYPES = (jobTypes: string[]) =>
    (selectedJobTypes.value = jobTypes);

  const ADD_SELECTED_DEGREES = (jobDegrees: string[]) =>
    (selectedDegrees.value = jobDegrees);

  const CLEAR_JOB_FILTERS = () => {
    selectedDegrees.value = [];
    selectedJobTypes.value = [];
    selectedOrganizations.value = [];
  };

  return {
    isLoggedIn,
    selectedOrganizations,
    selectedJobTypes,
    selectedDegrees,
    LOGIN_USER,
    ADD_SELECTED_ORGANIZATIONS,
    ADD_SELECTED_JOB_TYPES,
    ADD_SELECTED_DEGREES,
    CLEAR_JOB_FILTERS
  };
});


