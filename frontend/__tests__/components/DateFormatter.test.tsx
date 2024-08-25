import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import DateFormatter from "@/components/DateFormatter";

describe("DateFormatter", () => {
  test("affiche la date formatée correctement pour une date valide", () => {
    render(<DateFormatter datetime="2024-07-22T10:00:00Z" />);
    expect(screen.getByText("22 juillet 2024")).toBeInTheDocument();
  });

  test("affiche 'Date invalide' pour une date invalide", () => {
    render(<DateFormatter datetime="date-invalide" />);
    expect(screen.getByText("Date invalide")).toBeInTheDocument();
  });
});
