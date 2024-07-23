import { render } from "@testing-library/react";
import PlanDuSite from "@/pages/infos/planDuSite";

describe("planDuSite", () => {
  it("renders correctly when loading", () => {
    const { asFragment } = render(<PlanDuSite />);
    expect(asFragment()).toMatchSnapshot();
  });
});
