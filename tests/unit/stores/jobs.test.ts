import { createPinia, setActivePinia } from "pinia";
import axios from "axios";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import type { Mock } from "vitest";
import { create } from "domain";
import { createJob } from "tests/utils/createJob";
vi.mock("axios");
const axiosGetMock = axios.get as Mock;

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("stores jobs listings", () => {
    const store = useJobsStore();
    expect(store.jobs).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("FETCH_JOBS", () => {
    it("makes api request and stores received jobs", async () => {
      axiosGetMock.mockResolvedValue({ data: ["Job 1", "Job 2"] });

      const store = useJobsStore();
      await store.FETCH_JOBS();
      expect(store.jobs).toEqual(["Job 1", "Job 2"]);
    });
  });
});

describe("getters", () => {


  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("UNIQUE_ORGANIZATIONS", () => {
    it("finds unique organizations", () => {
      const store = useJobsStore();
      store.jobs = [
        createJob({ organization: "Google" }),
        createJob({ organization: "Amazon" }),
        createJob({ organization: "Amazon" }),
      ];
      const result = store.UNIQUE_ORGANIZATIONS;
      expect(result).toEqual(new Set(["Google", "Amazon"]));
    });
  });

  describe("UNIQUE_JOB_TYPES", () => {
    it("finds unique job types from list of jobs", () => {
      const store = useJobsStore();
      store.jobs = [
        createJob({ jobType: "full-time" }),
        createJob({ jobType: "temporary" }),
        createJob({ jobType: "full-time" }),
      ];

      const result = store.UNIQUE_JOB_TYPES;
      expect(result).toEqual(new Set(["full-time", "temporary"]));
    });
  });

  describe("INCLUDE_JOB_BY_ORGANIZATION", () => {
    describe("when user has NOT selected any organizations", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        userStore.selectedOrganizations = [];
        const store = useJobsStore();

        const job =  createJob({ organization: "Google" });
        const result = store.INCLUDE_JOB_BY_ORGANIZATION(job);

        expect(result).toBe(true);
      });
    });
    it("identifies jobs that are associated with the given organizations", () => {
      const userStore = useUserStore();
      userStore.selectedOrganizations = ["Google", "Microsoft"];
      const store = useJobsStore();

      const job =   createJob({ organization: "Google" }) 
      const result = store.INCLUDE_JOB_BY_ORGANIZATION(job);
      expect(result).toBe(true);
    });
  });

  describe("INCLUDE_JOB_BY_JOB_TYPE", () => {
    describe("when user has NOT selected any job type", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        userStore.selectedJobTypes = [];
        const store = useJobsStore();

        const job =   createJob({ jobType: "full-time" })
        const result = store.INCLUDE_JOB_BY_JOB_TYPE(job);

        expect(result).toBe(true);
      });
    });
    it("identifies jobs that are associated with the given job types", () => {
      const userStore = useUserStore();
      userStore.selectedJobTypes = ["full-time", "part-time"];
      const store = useJobsStore();

      const job =   createJob({ jobType: "part-time" })
      const result = store.INCLUDE_JOB_BY_JOB_TYPE(job);
      expect(result).toBe(true);
    });
  });

  describe("INCLUDE_JOB_BY_JOB_DEGREE", () => {
    describe("when user has NOT selected any job degree", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        userStore.selectedDegrees = [];
        const jobsStore = useJobsStore();

        const job = createJob()
        const result = jobsStore.INCLUDE_JOB_BY_DEGREE(job);

        expect(result).toBe(true);
      });
    });
    it("identifies jobs that are associated with the given degrees", () => {
      const userStore = useUserStore();
      userStore.selectedDegrees = ["Master's"];
      const store = useJobsStore();

      const job = createJob({ degree: "Master's" })
      const result = store.INCLUDE_JOB_BY_DEGREE(job);
      expect(result).toBe(true);
    });
  });
});
