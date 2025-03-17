describe('Swiper Gallery Test', function () {
  it('Checks if second slide contains "United Kingdom"', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-button-next').click();
    cy.get('.swiper-slide-active').should('contain', 'United Kingdom');
  });
});

describe('Swiper Gallery Test', function () {
  it('Checks if third slide contains "Paris"', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-button-next').click();
    cy.wait(2000);
    cy.get('.swiper-button-next').click({ force: true });
    cy.wait(2000);
    cy.get('.swiper-slide-active').should('contain', 'Paris');
  });
});

describe('Swiper Gallery Test', function () {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should allow navigation to the next and previous slides', function () {
    cy.get('.swiper-slide-active').then(($slide1) => {
      cy.get('.swiper-button-next').click();
      cy.get('.swiper-slide-active').should('not.equal', $slide1);
    });

    cy.get('.swiper-slide-active').then(($slide2) => {
      cy.get('.swiper-button-prev').click();
      cy.get('.swiper-slide-active').should('not.equal', $slide2);
    });
  });

  it('should navigate to the next slide and verify content', function () {
    cy.get('.swiper-slide-active').within(() => {
      cy.get('h1').should('have.text', 'Rome');
      cy.get('p').should('have.text', 'Italy');
    });

    cy.get('.swiper-button-next').click();
    cy.wait(2000);
    cy.get('.swiper-slide-active').within(() => {
      cy.get('h1').should('have.text', 'London');
      cy.get('p').should('have.text', 'United Kingdom');
    });

    cy.get('.swiper-button-next').click();
    cy.wait(2000);
    cy.get('.swiper-slide-active').within(() => {
      cy.get('h1').should('have.text', 'Paris');
      cy.get('p').should('have.text', 'France');
    });
  });

  it('should navigate back to the previous slide', function () {
    cy.get('.swiper-button-next').click();
    cy.get('.swiper-button-next').click();

    cy.get('.swiper-button-prev').click();
    cy.get('.swiper-slide-active').within(() => {
      cy.get('h1').should('have.text', 'London');
      cy.get('p').should('have.text', 'United Kingdom');
    });

    cy.get('.swiper-button-prev').click();
    cy.get('.swiper-slide-active').within(() => {
      cy.get('h1').should('have.text', 'London');
      cy.get('p').should('have.text', 'United Kingdom');
    });
  });
  
  it('should verify gallery responsiveness on different devices', function () {
    const viewports = [
      { device: 'iPhone X', width: 375, height: 812 },
      { device: 'iPad', width: 768, height: 1024 },
      { device: 'MacBook', width: 1280, height: 800 }
    ];
  
    viewports.forEach((viewport) => {
      cy.viewport(viewport.width, viewport.height);
  
      // Krok 2: Sprawdzenie, czy układ galerii dostosowuje się do ekranu
      cy.get('.swiper').should('be.visible');
  
      // Krok 3: Upewnienie się, że przyciski nawigacji są dostępne i klikalne
      cy.get('.swiper-button-next').should('be.visible').click();
      cy.get('.swiper-button-prev').should('be.visible').click();
    });
  });
  
  it('should verify that all gallery elements are correctly displayed', function () {
    // Krok 1: Sprawdzenie, czy galeria została wczytana
    cy.get('.swiper').should('be.visible');
  
    // Krok 2: Sprawdzenie, czy główny kontener galerii istnieje
    cy.get('.swiper-wrapper').should('be.visible');
  
    // Krok 3: Sprawdzenie, czy trzy slajdy są obecne
    cy.get('.swiper-slide').should('have.length', 3);
  
    // Krok 4: Sprawdzenie, czy przyciski nawigacji są obecne i klikalne
    cy.get('.swiper-button-next').should('be.visible').click();
    cy.get('.swiper-button-prev').should('be.visible').click();
  
    // Krok 5: Sprawdzenie, czy paginacja (kropki) jest widoczna
    cy.get('.swiper-pagination').should('be.visible');
  });
  
});