// cypress/support/component.ts
import { mount } from 'cypress/react';
import 'cypress-react-selector'; // opcional, útil para debug

// Faz o `mount` ficar disponível globalmente nos testes
Cypress.Commands.add('mount', mount);

// Tipagem opcional (se você quiser autocomplete em `cy.mount(...)`)
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}
