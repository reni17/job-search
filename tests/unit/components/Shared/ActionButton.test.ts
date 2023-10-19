import { render, screen } from "@testing-library/vue";
import ActionButton from "@/components/Shared/ActionButton.vue";

describe("ActionButton", () => {
  it("renders text", () => {
    render(ActionButton, {
      props: {
        text: "Sign in",
        type: "primary",
      },
    });
    const button = screen.getByRole("button", {
      name: /Sign in/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("applies styles to button", () => {
    render(ActionButton, {
      props: {
        text: "Sign in",
        type: "primary",
      },
    });
    const button = screen.getByRole("button", {
      name: /Sign in/i,
    });
    expect(button).toHaveClass("primary");
  });
});
