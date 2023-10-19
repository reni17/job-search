import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";

import JobListing from "@/components/JobResults/JobListing.vue";

import { createJob } from "tests/utils/createJob";
import type { Job } from "@/api/types";

describe("JobListing", () => {
createJob

  const renderJobListing = (job: Job) => {
    render(JobListing, {
      global: {
        stubs: {
          "router-link": RouterLinkStub,
        },
      },
      props: {
        job: {
         ...job
        },
      },
    });
  };
  it("renders job title", () => {
    const jobProps = createJob({title: "Vue Developer"})
    renderJobListing(jobProps)
    expect(screen.getByText("Vue Developer")).toBeInTheDocument();
  });

  it("renders job organization", () => {
    const jobProps = createJob({organization: "AirBnB"})
    renderJobListing(jobProps)
    expect(screen.getByText("AirBnB")).toBeInTheDocument();
  });
  it("renders job locations", () => {
    const jobProps = createJob({
        locations: ["Orlando", "NYS"]
    })
    renderJobListing(jobProps)
    expect(screen.getByText("Orlando")).toBeInTheDocument()
    expect(screen.getByText("NYS")).toBeInTheDocument()
  })
  it("renders job qualifications", () => {
    const jobProps = createJob({
        minimumQualifications: ["Code", "Develop"]
    })
    renderJobListing(jobProps)
    expect(screen.getByText("Code")).toBeInTheDocument()
    expect(screen.getByText("Develop")).toBeInTheDocument()
  })

  
});
