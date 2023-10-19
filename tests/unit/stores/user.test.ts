import { createPinia, setActivePinia } from "pinia";

import { useUserStore } from "../../../src/stores/user";

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("keeps track of if user is logged in", () => {
    const store = useUserStore();
    expect(store.isLoggedIn).toBe(false);
  });

  it("stores organizations that the user would like to filter jobs by", () => {
    const store = useUserStore()
    expect(store.selectedOrganizations).toEqual([])
  })
  it("stores job types that the user filter jobs by", () => {
    const store = useUserStore()
    expect(store.selectedJobTypes).toEqual([])
  })

  it("stores degrees which user filter jobs by", () => {
    const userStore = useUserStore()
    expect(userStore.selectedDegrees).toEqual([])
  })
  it("stores search for skills", () => {
    const userStore = useUserStore()
    expect(userStore.skillsSearch).toBe("")
  })

});

describe("actions", () => {
  describe("LOGIN_USER", () => {
    it("logs the user in", () => {
      const store = useUserStore();
      store.LOGIN_USER();
      expect(store.isLoggedIn).toBe(true);
    });
  });

  describe("ADD_SELECTED_ORGANIZATIONS", () => {
    it("updates organizations the user has chosen to filter by", () => {
      const store = useUserStore()
      store.ADD_SELECTED_ORGANIZATIONS(["org1", "org2"])
      expect(store.selectedOrganizations).toEqual(["org1", "org2"])
    })
  })

  describe("ADD_SELECTED_JOB_TYPES", () => {
    it("updates job types that the user has filtered", () => {
      const store = useUserStore()
      store.ADD_SELECTED_JOB_TYPES(["full-time", "part-time"])
      expect(store.selectedJobTypes).toEqual(["full-time", "part-time"])
    })
  })

  describe("ADD_SELECTED_DEGREES", () => {
    it("includes degrees that the user has filtered", () => {
      const store = useUserStore()
      store.ADD_SELECTED_DEGREES(["Bachalor's", "Master's"])
      expect(store.selectedDegrees).toEqual(["Bachalor's", "Master's"])
    })
  })

  describe("CLEAR_JOB_FILTERS", () => {
    it("removes all job filters", () => {
      const userStore = useUserStore()
      userStore.selectedJobTypes = ["Random job type"]
      userStore.selectedDegrees = ["Random degree"]
      userStore.selectedOrganizations = ["Random organization"]

      userStore.CLEAR_JOB_FILTERS()

      expect(userStore.selectedJobTypes).toEqual([])
      expect(userStore.selectedDegrees).toEqual([])
      expect(userStore.selectedOrganizations).toEqual([])
    })
  })
});
