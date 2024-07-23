import { render } from "@testing-library/react";
import PolitiqueDeConfidentialite from "@/pages/infos/politiqueDeConfidentialite";

describe.only("politiqueDeConfidentialite", () => {
  it("renders correctly when loading", () => {
    const { asFragment } = render(<PolitiqueDeConfidentialite />);
    expect(asFragment()).toMatchSnapshot();
  });
});
