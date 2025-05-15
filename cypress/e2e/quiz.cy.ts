
describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:3001/');

    cy.get('[data-testid="cypress-button"]').click();
    cy.contains('Loading...').should('exist');

  })
})

// cypress/e2e/quiz.cy.ts

describe('Quiz App E2E', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/questions/random', {
      statusCode: 200,
      body: [
        {
          question: 'What is 2 + 2?',
          answers: [
            { text: '3', isCorrect: false },
            { text: '4', isCorrect: true },
            { text: '5', isCorrect: false }
          ]
        }
      ]
    }).as('getQuestions');

    cy.visit('http://127.0.0.1:3001/');
  });

  it('starts the quiz and shows the question', () => {
    cy.get('[data-testid="cypress-button"]').click();

    cy.wait('@getQuestions');

    cy.contains('What is 2 + 2?').should('exist');
    cy.contains('3').should('exist');
    cy.contains('4').should('exist');
    cy.contains('5').should('exist');
  });

  it('completes the quiz and shows the score', () => {
    cy.get('[data-testid="cypress-button"]').click();
    cy.wait('@getQuestions');

    cy.contains('4').click(); // correta
    cy.wait(3000); // wait for the answer to be processed
    cy.contains(/You got 1\/1 correct/i , { timeout: 8000 }).should('exist');
  });
});
