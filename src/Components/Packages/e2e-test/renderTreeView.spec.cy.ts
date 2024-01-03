function getData() {
  return new Array(6)
    .fill(null)
    .map((_, i) => ({ name: 'User ' + i, email: `user${i}@gmail.com` }));
}
describe('Add Nodes', () => {
  before(() => {
    cy.visit('/');
    cy.contains('Hierarchy').click().wait(200);
  });

  it('add first level nodes', () => {
    let users = getData();
    users.forEach((user) => {
      cy.get('.fa-plus').last().click().wait(200);
      let inputs = cy.get('.test-container').last().find('input[type=text]');

      inputs.each((input, i) => {
        if (i == 0) cy.wrap(input).type(user.name);
        else cy.wrap(input).type(user.email);
      });
      cy.get('.btn').last().click().wait(20);
    });

    let lis = cy.get('.tree-ul li');
    lis.should('have.length', users.length + 1);

    lis.each((li, i) => {
      if (i < users.length) {
        let txtbxs = cy.wrap(li).find('input[type=text]');
        cy.wrap(li)
          .find('input[type=text]')
          .eq(0)
          .invoke('val')
          .then((k) => k)
          .should('equal', users[i].name);

        cy.wrap(li)
          .find('input[type=text]')
          .eq(1)
          .invoke('val')
          .then((k) => k)
          .should('equal', users[i].email);
      }
    });
  });
});

export {};
