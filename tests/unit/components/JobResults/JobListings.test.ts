import { render, screen } from "@testing-library/vue";
import JobListings from "@/components/JobResults/JobListings.vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useJobsStore } from "@/stores/jobs";
import { useRoute } from "vue-router";
import type { Mock } from "vitest";
import { useDegreesStore } from "@/stores/degrees";
vi.mock("vue-router");
vi.mock("axios");
const useRouteMock = useRoute as Mock

describe("JobListings", () => {
  const renderJobListings = () => {
    const pinia = createTestingPinia();
    const jobStore = useJobsStore();
    // @ts-expect-error
    jobStore.FILTERED_JOBS = Array(15).fill({});
    const degreeStore = useDegreesStore()

    render(JobListings, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    return { jobStore, degreeStore };
  };

  it("fetches jobs", () => {
    useRouteMock.mockReturnValue({ query: {} });
    const { jobStore } = renderJobListings();

    expect(jobStore.FETCH_JOBS).toHaveBeenCalled();
  });

  it("fetches degrees", () => {
    useRouteMock.mockReturnValue({ query: {} });
    const { degreeStore } = renderJobListings();

    expect(degreeStore.FETCH_DEGREES).toHaveBeenCalled();
  });

  it("displays max of 10 listings", async () => {
    useRouteMock.mockReturnValue({ query: { page: "1" } });

    const { jobStore } = renderJobListings();
    // @ts-expect-error
    jobStore.FILTERED_JOBS = Array(15).fill({});
    const jobLisitngs = await screen.findAllByRole("listitem");
    expect(jobLisitngs).toHaveLength(10);
  });

  describe("when params exclude page number", () => {
    it("displays page number 1", () => {
      useRouteMock.mockReturnValue({ query: {} });

      renderJobListings();

      expect(screen.getByText("Page 1"));
    });
  });

  describe("when params include page number", () => {
    it("displays page number 1", () => {
      useRouteMock.mockReturnValue({ query: { page: "3" } });
      renderJobListings();
      expect(screen.getByText("Page 3")).toBeInTheDocument();
    });
  });

  describe("When user is on first page", () => {
    it("doesn't show previous page", async () => {
      useRouteMock.mockReturnValue({ query: { page: "1" } });
      const { jobStore } = renderJobListings();
    // @ts-expect-error
      jobStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /previous/i });
      expect(previousLink).not.toBeInTheDocument();
    });

    it("shows link to next page", async () => {
      useRouteMock.mockReturnValue({ query: { page: "1" } });

      const { jobStore } = renderJobListings();
    // @ts-expect-error
      jobStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      expect(nextLink).toBeInTheDocument();
    });
  });

  describe("when user is on last page", () => {
    it("doesn't shows link to next page", async () => {
      useRouteMock.mockReturnValue({ query: { page: "2" } });

      const { jobStore } = renderJobListings();
    // @ts-expect-error
      jobStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      expect(nextLink).not.toBeInTheDocument();
    });

    it("shows link to previous page", async () => {
      useRouteMock.mockReturnValue({ query: { page: "2" } });

      const { jobStore } = renderJobListings();
    // @ts-expect-error
      jobStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /previous/i });
      expect(previousLink).toBeInTheDocument();
    });
  });
});
