import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import DisplayComment from "@/components/parkour/displayComment";

// Mock ButtonForComment
jest.mock("@/components/admin/buttonForComment", () => () => (
  <div>ButtonForComment</div>
));

// Mock data
const mockComment = {
  user: {
    id: "1",
    firstname: "John",
    name: "Doe",
    imageProfil: "https://example.com/profile.jpg",
  },
  note: "4.5",
  commentaire: "This is a test comment",
};

describe("DisplayComment", () => {
  it("renders the couverture image if available", () => {
    render(
      <DisplayComment
        comment={mockComment}
        parkourId="123"
        isAdmin={false}
        isClient={false}
      />
    );
    expect(screen.getByAltText("")).toHaveAttribute(
      "src",
      "https://example.com/profile.jpg"
    );
  });

  it("renders a default image if no images are available", () => {
    const mockCommentWithoutProfileImage = {
      ...mockComment,
      user: { ...mockComment.user, imageProfil: null },
    };
    render(
      <DisplayComment
        comment={mockCommentWithoutProfileImage}
        parkourId="123"
        isAdmin={false}
        isClient={false}
      />
    );
    expect(screen.getByAltText("")).toHaveAttribute("src", "/userDefault.png");
  });

  it("renders the user's name", () => {
    render(
      <DisplayComment
        comment={mockComment}
        parkourId="123"
        isAdmin={false}
        isClient={false}
      />
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders the comment text", () => {
    render(
      <DisplayComment
        comment={mockComment}
        parkourId="123"
        isAdmin={false}
        isClient={false}
      />
    );
    expect(screen.getByText("This is a test comment")).toBeInTheDocument();
  });

  it("renders the rating", () => {
    render(
      <DisplayComment
        comment={mockComment}
        parkourId="123"
        isAdmin={false}
        isClient={false}
      />
    );
    expect(screen.getByRole("img", { name: /4.5 Stars/i })).toBeInTheDocument();
  });

  it("renders ButtonForComment if user is admin", () => {
    render(
      <DisplayComment
        comment={mockComment}
        parkourId="123"
        isAdmin={true}
        isClient={false}
      />
    );
    expect(screen.getAllByText("ButtonForComment")).toHaveLength(1);
  });

  it("renders ButtonForComment if user is client", () => {
    render(
      <DisplayComment
        comment={mockComment}
        parkourId="123"
        isAdmin={false}
        isClient={true}
      />
    );
    expect(screen.getAllByText("ButtonForComment")).toHaveLength(1);
  });

  it("does not render ButtonForComment if user is neither admin nor client", () => {
    render(
      <DisplayComment
        comment={mockComment}
        parkourId="123"
        isAdmin={false}
        isClient={false}
      />
    );
    expect(screen.queryByText("ButtonForComment")).toBeNull();
  });
});
