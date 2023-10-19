import { render, screen } from "@testing-library/vue";
import { nextTick } from "vue"; //async
import TheHeadline from "@/components/JobSearch/TheHeadline.vue";
import { vi } from "vitest";

describe("TheHeadline", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    afterEach(() => {
      vi.useRealTimers();
    });
  });
  it("Displays introductory action verbs", () => {
    render(TheHeadline);
    const actionPhrase = screen.getByRole("heading", {
      name: /build for everyone/i,
    });
    expect(actionPhrase).toBeInTheDocument();
  });

  it("changes action verb st s consistent interval", () => {
    const mock = vi.fn();
    vi.stubGlobal("setInterval", mock);
    render(TheHeadline);
    expect(mock).toHaveBeenCalled();
  });
  it("swaps action verb after interval", async () => {
    render(TheHeadline);
    vi.advanceTimersToNextTimer();
    await nextTick();
    const actionPhrase = screen.getByRole("heading", {
      name: /create for everyone/i,
    });
    expect(actionPhrase).toBeInTheDocument();
  });
});
