import { type Ref, computed } from "vue";

const useNextAndPreviousPage = (currentPage: Ref<number>, maxPage: Ref<number>) => {
  const nextPage = computed(() => {
    const nextPage = currentPage.value + 1;
    return nextPage <= maxPage.value ? nextPage : undefined;
  });

  const previousPage = computed(() => {
    const previousPage = currentPage.value - 1;
    const firstPage = 1;
    return previousPage >= firstPage ? previousPage : undefined;
  });

  return { nextPage, previousPage };
};

export default useNextAndPreviousPage;
