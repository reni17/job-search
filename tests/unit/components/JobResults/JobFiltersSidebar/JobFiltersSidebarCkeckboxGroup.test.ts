import { render, screen } from "@testing-library/vue";
import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import { vi, type Mock } from "vitest";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const useRouterMock = useRouter as Mock

vi.mock("vue-router");
describe("JobFiltersSidebarCheckboxGroup", () => {
  interface CheckboxGroupProps {
    uniqueValues: Set<string>,
    action: Mock
  }

  const createProps = (props: Partial<CheckboxGroupProps> = {}) => ({
    header: "Some header",
    uniqueValues: new Set(["ValueA", "ValueB"]),
    action: vi.fn(),
    ...props,
  });
  const renderJobFiltersSidebarCheckboxGroup = (props: CheckboxGroupProps) => {
    const pinia = createTestingPinia({stubActions: false});  //actions are real, not mocked
    const userStore = useUserStore()

    render(JobFiltersSidebarCheckboxGroup, {
      props: {
        ...props,
      },
      global: {
        plugins: [pinia],
      },
    });
    return {userStore}
  };

  
  it("renders unique list of values", () => {
    const props = createProps({
      uniqueValues: new Set(["full-time", "part-time"]),
    });
    renderJobFiltersSidebarCheckboxGroup(props);


    const jobTypesListItems = screen.getAllByRole("listitem");
    const jobTypes = jobTypesListItems.map((node) => node.textContent);
    expect(jobTypes).toEqual(["full-time", "part-time"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for values", async () => {
      useRouterMock.mockReturnValue({ push: vi.fn() });
      const action = vi.fn()
      const props = createProps({
        uniqueValues: new Set(["full-time", "part-time"]),
        action
      });
      renderJobFiltersSidebarCheckboxGroup(props);

      const fullTimeCheckbox = screen.getByRole("checkbox", {
        name: /full-time/i,
      });
      await userEvent.click(fullTimeCheckbox);
      expect(action).toHaveBeenCalledWith([
        "full-time",
      ]);
    });

    it("navigates user to job results page to see filtered jobs", async () => {
      const push = vi.fn();
      useRouterMock.mockReturnValue({ push });
      const props = createProps({
        uniqueValues: new Set(["full-time"]),

      });
      renderJobFiltersSidebarCheckboxGroup(props);

      const fullTimeCheckbox = screen.getByRole("checkbox", {
        name: /full-time/i,
      });
      await userEvent.click(fullTimeCheckbox);
      expect(push).toHaveBeenCalledWith({ name: "JobsResults" });
    });
  });

  describe("when user clears all filters", () => {
    it("unchecks any checked checkboxes", async() => {
      useRouterMock.mockReturnValue({ push: vi.fn() });
      const props = createProps({
        uniqueValues: new Set(["full-time"]),

      });
      const {userStore} = renderJobFiltersSidebarCheckboxGroup(props);

      const fullTimeCheckboxBeforeAciton = screen.getByRole<HTMLInputElement>("checkbox", {
        name: /full-time/i,
      });
      await userEvent.click(fullTimeCheckboxBeforeAciton);
      expect(fullTimeCheckboxBeforeAciton.checked).toBe(true)

      userStore.CLEAR_JOB_FILTERS()

      const fullTimeCheckboxAfterAciton = await screen.findByRole<HTMLInputElement>("checkbox", {
        name: /full-time/i,
      });
      expect(fullTimeCheckboxAfterAciton.checked).toBe(false)

    })
  })
});
