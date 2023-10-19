import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useRoute } from "vue-router";
vi.mock("vue-router");
import MainNav from "@/components/Navigation/MainNav.vue";

import type { Mock } from "vitest";

const useRouteMock = useRoute as Mock;

describe("MainNav", () => {
  const renderMainNav = () => {
    const pinia = createTestingPinia({ stubActions: false }); //replacement for the real instance , with stubActions: false we said that it should use the real props of the store
    useRouteMock.mockReturnValue({ name: "Home" });
    render(MainNav, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub,
        },
      },
    });
  };
  it("displays company name", () => {
    renderMainNav();
    const companyName = screen.getByText("Bobo Careers");
    expect(companyName).toBeInTheDocument();
  });

  it("displays menu items for navigation", () => {
    renderMainNav();
    const navMenuItems = screen.getAllByRole("listitem");
    const navMenuTexts = navMenuItems.map((el) => el.textContent);
    expect(navMenuTexts).toEqual([
      "Teams",
      "Location",
      "Life at Bobo Corp",
      "How we hire",
      "Students",
      "Jobs",
    ]);
  });

  describe("when the user logs in", () => {
    it("displays user profile picture", async () => {
      renderMainNav();

      let profieImage = screen.queryByRole("img", {
        name: /user profile image/i,
      });
      expect(profieImage).not.toBeInTheDocument();

      const loginButton = screen.getByRole("button", { name: /Sign in/i });
      await userEvent.click(loginButton);
      profieImage = screen.getByRole("img", {
        name: /user profile image/i,
      });
      expect(profieImage).toBeInTheDocument();
    });
  });
});
