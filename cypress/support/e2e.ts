// cypress/support/component.ts
import { mount } from 'cypress/react';
import 'cypress-react-selector';
 

Cypress.Commands.add('mount', mount);

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}
