import useNextAndPreviousPage from "../../../src/composables/useNextAndPreviousPage";
import { ref } from "vue";

describe("useNextAndPreviousPage", () => {
  it("calculates previous page", () => {
    const currentPage = ref(8);
    const maxPage = ref(10)
    const { previousPage } = useNextAndPreviousPage(currentPage, maxPage);
    expect(previousPage.value).toBe(7);
  });

  describe("when current page is 1 page", () => {
    it("doesn't show previous page", () => {
      const currentPage = ref(1);
      const maxPage = ref(1);
      const { previousPage } = useNextAndPreviousPage(currentPage, maxPage);
      expect(previousPage.value).toBeUndefined();
    });
  });
  it("calculates next page", () => {
    const currentPage = ref(8);
    const maxPage = ref(9);
    const { nextPage } = useNextAndPreviousPage(currentPage, maxPage);
    expect(nextPage.value).toBe(9);
  });

  describe("when current page is the last page", () => {
    it("doesn't show next page", () => {
      const currentPage = ref(8);
      const maxPage = ref(8);
      const { nextPage } = useNextAndPreviousPage(currentPage, maxPage);
      expect(nextPage.value).toBeUndefined();
    });
  });
});
