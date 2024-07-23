import { render } from "@testing-library/react";
import Cgu from "@/pages/infos/cgu";

describe.only("cgu", () => {
  it("renders correctly when loading", () => {
    const { asFragment } = render(<Cgu />);
    expect(asFragment()).toMatchSnapshot();
  });
});
