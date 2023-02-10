import { faker } from "@faker-js/faker";

let id;
describe('Comment API tests', () => {
    it('POST - Comment with success', () => {
        cy.request({
            method: 'POST',
            url: Cypress.env('baseUrlApi') + '/task/2wakgt7/comment',
            body: {
                comment_text: faker.lorem.words(),
                assignee: 183,
                notify_all: true
            },
            headers: {
                Authorization: Cypress.env('auth'),
                'Content-type': 'application/json; charset=UTF-8'
            },
        })
            .then((response) => {
                expect(response.status).to.eq(200);
                id = response.body.id
            });
    });

    it('PUT - Change the comment with success', () => {
        cy.request({
            method: 'PUT',
            url: Cypress.env('baseUrlApi') + '/comment/' + id,
            body: {
                comment_text: faker.lorem.words(),
                assignee: 183,
                resolved: true
            },
            headers: {
                Authorization: Cypress.env('auth'),
                'Content-type': 'application/json; charset=UTF-8'
            },
        })
            .then((response) => {
                expect(response.status).to.eq(200);
            })
    })

    it('DELETE - Delete the comment with success', () => {
        cy.request({
            method: 'DELETE',
            url: Cypress.env('baseUrlApi') + '/comment/' + id,
            headers: {
                Authorization: Cypress.env('auth'),
                'Content-type': 'application/json; charset=UTF-8'
            },
        })
            .then((response) => {
                expect(response.status).to.eq(200);
            })
    })


    it('GET - Get the comment with success', () => {
        cy.request({
            method: 'GET',
            url: Cypress.env('baseUrlApi') + '/task/2wakgt7/comment',
            headers: {
                Authorization: Cypress.env('auth'),
                'Content-type': 'application/json; charset=UTF-8'
            },
        })
            .then((response) => {
                expect(response.status).to.eq(200);
            });
    });
})
