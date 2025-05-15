import { Question } from '../../client/src/models/Question';


describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:3001/');

    cy.get('[data-testid="cypress-button"]').click();
  });
});

describe('Quiz App E2E', () => {
  beforeEach(() => {
    // Intercepta o GET da API e usa a fixture com as perguntas
    cy.intercept('GET', '/api/questions/random', { fixture: 'quiz-questions.json' }).as('getQuestions');
    cy.visit('http://127.0.0.1:3001/');
  });

  it('starts the quiz and shows the first question with answers', () => {
    cy.get('[data-testid="cypress-button"]').click();
    cy.wait('@getQuestions');
    cy.contains('What does HTML stand for?').should('exist');
    cy.contains('Hyper Text Markup Language').should('exist');
    cy.contains('Hot Mail').should('exist');
    cy.contains('How To Make Lasagna').should('exist');
    cy.contains('Hyperlinks and Text Markup Language').should('exist');
  });

  it('completes the quiz and shows the final score', () => {
    cy.get('[data-testid="cypress-button"]').click();
    cy.wait('@getQuestions');

    cy.fixture('quiz-questions.json').then((questions) => {
      questions.forEach((question: Question, index: number) => {
        // Verifica que o <h2> contenha a pergunta atual
        cy.contains('h2', question.question).should('exist');
      
        // Clica na resposta correta
        const correctAnswer = question.answers.find(ans => ans.isCorrect);
        if (correctAnswer) {
          cy.contains(correctAnswer.text).click();
        }
      
        if (index < questions.length - 1) {
          const nextQuestion = questions[index + 1].question;
      
          // Espera o título da próxima pergunta aparecer
          cy.get('h2', { timeout: 30000 }).should('contain.text', nextQuestion);
        }
      });
      

      // Verifica que o quiz terminou e mostra a pontuação
      cy.contains('Quiz Completed').should('exist');
      cy.contains('Your score:').should('exist');

      // Reinicia o quiz
      cy.contains('Take New Quiz').click();
    });
  });
});
