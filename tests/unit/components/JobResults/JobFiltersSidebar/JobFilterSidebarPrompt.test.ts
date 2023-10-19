import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import { useUserStore } from "@/stores/user";
import JobFilterSidebarPrompt from "@/components/JobResults/JobFiltersSidebar/JobFilterSidebarPrompt.vue";

describe("JobFilterSidebarPromptVue", () => {
  describe("when user clicks clear filters button", () => {
    it("sends message to clear all filters", async () => {
      const pinia = createTestingPinia();
      const userStore = useUserStore();
      render(JobFilterSidebarPrompt, {
        global: {
          plugins: [pinia],
        },
      });

      const button = screen.getByRole("button", { name: /clear filters/i });
      await userEvent.click(button);
      expect(userStore.CLEAR_JOB_FILTERS).toHaveBeenCalled();
    });
  });
});
