describe("Parcours inscription et liste", () => {
  const data = {
    email: `test-${Date.now()}@test.com`, //je génère un email dynamiquement pour le test, pour m'éviter d'avoir des doublons
    password: "Mot2Pa553Kipa553?",
    name: "NomDeTest",
    firstname: "PrénomDeTest",
  };

  it("Test d'inscription", () => {
    cy.visit("http://localhost:3000/auth/inscription"); // page de départ
    cy.get('input[name="email"]').type(data.email); // On tape l'email prédéfini
    cy.get('input[name="password"]').type(data.password); // On tape le password prédéfini
    cy.get('input[name="password2"]').type(data.password);
    cy.get('input[name="firstname"]').type(data.firstname);
    cy.get('input[name="name"]').type(data.name);
    cy.get('[data-testid="accept-cgu-checkbox"]')
      .find('input[type="checkbox"]')
      .check();

    cy.get('button[type="submit"]').contains("SUIVANT").click(); // on submit via un bouton avec le texte SUIVANT dedans

    cy.contains(`Bien joué! Vous avez maintenant un compte chez nous!`); // le message qui va avec
    cy.url().should("eq", "http://localhost:3000/"); // on devrait arriver ici
  });

  it("Test de connexion et affichage profil + logout", () => {
    cy.visit("http://localhost:3000/auth/login"); // page de départ
    cy.get('input[name="email"]').type(data.email); // On tape l'email prédéfini dans le champs d'email
    cy.get('input[name="password"]').type(data.password); // On tape le password prédéfini dans le champs d'password

    cy.get('button[type="submit"]').click();

    cy.contains(`Salut! Viens parkourir le monde !`);
    cy.url().should("eq", "http://localhost:3000/");

    // ---

    cy.visit("http://localhost:3000/user/profil");
    cy.url().should("eq", "http://localhost:3000/user/profil");

    cy.get('a[href="/user/logout"]').should("be.visible").click(); // logout

    cy.url().should("eq", "http://localhost:3000/auth/login");
  });
});
