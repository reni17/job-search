import { createPinia, setActivePinia } from "pinia";
import { useDegreesStore } from "@/stores/degrees";
import axios from "axios";
import type { Mock } from "vitest";
import { createDegree } from "../../utils/createDegree";

const axiosGetMock = axios.get as Mock;

vi.mock("axios");

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("stores all degrees", () => {
    const store = useDegreesStore();
    expect(store.degrees).toEqual([]);
  });

  describe("actions", () => {
    beforeEach(() => {
      setActivePinia(createPinia());
    });

    describe("FETCH_DEGREES", () => {
      it("makes api request and stores received degrees", async () => {
        axiosGetMock.mockResolvedValue({
          data: [
            {
              id: 1,
              degree: "Bachelor's",
            },
          ],
        });

        const store = useDegreesStore();
        await store.FETCH_DEGREES();
        expect(store.degrees).toEqual([
          {
            id: 1,
            degree: "Bachelor's",
          },
        ]);
      });
    });
  });
});

describe("getters", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("UNIQUE_DEGREES", () => {
    it("describes unique degrees", () => {
      const degreeStore = useDegreesStore();
      degreeStore.degrees = [
        createDegree({ degree: "Master's" }),
        createDegree({ degree: "Bachelor's" }),
      ];

      const result = degreeStore.UNIQUE_DEGREES;
      expect(result).toEqual(["Master's", "Bachelor's"]);
    });
  });
});
