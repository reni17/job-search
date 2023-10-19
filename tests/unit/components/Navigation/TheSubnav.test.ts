import { render, screen } from "@testing-library/vue";
import TheSubnav from "@/components/Navigation/TheSubnav.vue";
import { createTestingPinia } from "@pinia/testing";
import { useJobsStore } from "@/stores/jobs";
import { useRoute } from "vue-router";
import type { Mock } from "vitest";
vi.mock("vue-router")

const useRouteMock = useRoute as Mock

describe("TheSubnav", () => {
  const pinia = createTestingPinia();
  const jobsStore = useJobsStore();
  useRouteMock.mockReturnValue({name: "JobsResults"})
  const renderTheSubnav = () => {
    render(TheSubnav, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });
    return { jobsStore };
  };
  describe("when the user is on jobs page", () => {
    it("displays job count",async () => {
      useRouteMock.mockReturnValue({name: "JobsResults"})
      
      const { jobsStore } = renderTheSubnav();
      const numberJobs = 16;
      // @ts-expect-error: Getter is read only
      jobsStore.FILTERED_JOBS = Array(numberJobs).fill({});
      const jobCount = await screen.findByText(numberJobs);
      expect(jobCount).toBeInTheDocument();
    });
  });
  describe("when user is NOT on jobs page", () => {
    it("does NOT display job count", () => {
      useRouteMock.mockReturnValue({name: "Home"})
      const { jobsStore } = renderTheSubnav();
      const numberJobs = 16;
      // @ts-expect-error: Getter is read only
      jobsStore.FILTERED_JOBS = Array(numberJobs).fill({});

      const jobCount = screen.queryByText(numberJobs);
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
