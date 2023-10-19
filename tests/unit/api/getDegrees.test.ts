import axios from "axios";
import type { Mock } from "vitest";
import getDegrees from "@/api/getDegrees";

vi.mock("axios");
const axiosGetMock = axios.get as Mock

describe("getDegrees", () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          degree: "Master's",
        },
      ],
    });
  });
  it("fetches degrees", async () => {
    await getDegrees();
    expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/degrees");
  });

  it("extracts jobs from response", async () => {
    const degrees = await getDegrees();
    expect(degrees).toEqual([
      {
        id: 1,
        degree: "Master's",
      },
    ],)
  });
});
