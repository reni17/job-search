import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

describe("CollapsibleAccordion", () => {
  const renderCollapsibleAccordion = (config = {}) => {
    render(CollapsibleAccordion, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
      props: {
        header: "My Category",
      },
      slots: {
        //default is the default name which vue gives to slot
        default: "<h3>My nested html</h3>",
      },
      ...config,
    });
  };
  it("renders child content", async () => {
    const props = {
      header: "My Category",
    };
    //default is the default name which vue gives to slot
    const slots = {
      default: "<h3>My nested html</h3>",
    };

    renderCollapsibleAccordion({ props, slots });

    //use query because returns result or null and won't fail
    expect(screen.queryByText("My nested html")).not.toBeInTheDocument();
    const button = screen.getByRole("button", { name: /my category/i });
    await userEvent.click(button);
    expect(screen.getByText("My nested html")).toBeInTheDocument();
  });

  it("renders default content", async () => {
    const props = {
      header: "My Category",
    };

    const slots = {};
    renderCollapsibleAccordion({ props, slots });
    const button = screen.getByRole("button", {
      name: /my category/i,
    });
    await userEvent.click(button);
    expect(
      screen.getByText("You forgot to populate this!")
    ).toBeInTheDocument();
  });
});
