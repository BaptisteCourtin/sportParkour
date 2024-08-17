import CardEpreuve from "../../src/components/epreuve/cardEpreuve"; // Assurez-vous d'ajuster le chemin d'importation

describe("CardEpreuve.cy.tsx", () => {
  it("affiche correctement le titre de l'épreuve", () => {
    const mockEpreuve = {
      id: "1",
      title: "Test Épreuve",
      images: [],
    };

    cy.mount(<CardEpreuve epreuve={mockEpreuve} />);

    cy.get(".cardEpreuve p").should("contain", "Test Épreuve");
  });

  it("affiche l'image de l'épreuve si elle existe", () => {
    const mockEpreuve = {
      id: "1",
      title: "Test Épreuve",
      images: [{ lien: "https://example.com/image.jpg" }],
    };

    cy.mount(<CardEpreuve epreuve={mockEpreuve} />);

    cy.get(".cardEpreuve img").should(
      "have.attr",
      "src",
      "https://example.com/image.jpg"
    );
  });

  it("affiche une image par défaut si l'épreuve n'a pas d'image", () => {
    const mockEpreuve = {
      id: "1",
      title: "Test Épreuve",
      images: [],
    };

    cy.mount(<CardEpreuve epreuve={mockEpreuve} />);

    cy.get(".cardEpreuve img")
      .should("have.attr", "src")
      .and("include", "free-nature-images.jpg");
  });

  it("crée un lien correct vers la page de l'épreuve", () => {
    const mockEpreuve = {
      id: "1",
      title: "Test Épreuve",
      images: [],
    };

    cy.mount(<CardEpreuve epreuve={mockEpreuve} />);

    cy.get(".cardEpreuve").should("have.attr", "href", "/epreuve/1");
  });
});
