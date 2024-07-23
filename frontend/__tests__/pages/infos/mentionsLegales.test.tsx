import { render } from "@testing-library/react";
import MentionsLegales from "@/pages/infos/mentionsLegales";

describe.only("mentionsLegales", () => {
  it("renders correctly when loading", () => {
    const { asFragment } = render(<MentionsLegales />);
    expect(asFragment()).toMatchSnapshot();
  });
});
