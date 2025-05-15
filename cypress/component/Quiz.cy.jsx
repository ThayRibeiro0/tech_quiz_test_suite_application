import React from 'react';
import Quiz from '../../src/components/Quiz';
import questions from '../fixtures/questions.json';

describe('<Quiz />', () => {
  it('should render the first question and options', () => {
    cy.mount(<Quiz questions={questions} />);
    
    // Verifica se a primeira pergunta aparece
    cy.contains(questions[0].question).should('exist');

    // Verifica se todas as opções estão visíveis
    questions[0].options.forEach(option => {
      cy.contains(option).should('exist');
    });
  });

  it('should go to the next question when an option is selected', () => {
    cy.mount(<Quiz questions={questions} />);
    
    cy.contains(questions[0].options[0]).click();
    
    // Verifica se mudou para a próxima pergunta
    cy.contains(questions[1].question).should('exist');
  });

  it('should show result after all questions', () => {
    cy.mount(<Quiz questions={questions} />);
    
    questions.forEach((q) => {
      cy.contains(q.options[0]).click(); // seleciona qualquer opção
    });

    cy.contains(/Your score/i).should('exist');
  });
});
