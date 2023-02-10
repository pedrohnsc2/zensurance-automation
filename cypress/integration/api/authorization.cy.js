describe('GET - Authorized User', () => {

    it('GET - Authorized User with Success', () => {
        const expectedId = 54646532;
        const expectedUsername = 'Zen Test Assessment';
        const expectedEmail = 'zentestassessment@hotmail.com';

        cy.request({
            method: 'GET',
            url: Cypress.env('baseUrlApi') + '/user',
            headers: {
                Authorization: Cypress.env('auth'),
                'Content-type': 'application/json; charset=UTF-8'
            },
        })
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('user');
                expect(response.body.user).to.be.an('object');
                expect(response.body.user.id).to.eq(expectedId)
                expect(response.body.user.username).to.eq(expectedUsername)
                expect(response.body.user.email).to.eq(expectedEmail)
            });
    });

    it('GET - Try to get authorized users without auth header', () => {
        cy.request({
            method: 'GET',
            failOnStatusCode: false,
            url: Cypress.env('baseUrlApi') + '/user',
            headers: {
                Authorization: "",
                'Content-type': 'application/json; charset=UTF-8'
            },
        })
            .then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body.err).to.eq("Authorization header required");
            });
    })

    it('GET - handles incorrect URL', () => {
        cy.request({
            method: 'GET',
            url: Cypress.env('baseUrlApi') + '/incorrect-url',
            headers: {
                Authorization: Cypress.env('auth'),
                'Content-type': 'application/json; charset=UTF-8'
            },
            failOnStatusCode: false,
        })
            .then((response) => {
                expect(response.status).to.eq(404);
            });
    });
})

describe('GET - Get Authorized Teams (Workspace)', () => {

    it('Get Authorized Teams (Workspace)', () => {
        const workspaceId = "36805086";
        const workspaceName = 'Zen Test Workspace';
        const workspaceColor = '#4169E1';

        const memberId = 54646532;
        const memberUsername = 'Zen Test Assessment';
        const memberEmail = 'zentestassessment@hotmail.com';
        const memberColor = '#4169E1';
        const memberInitials = 'ZA';
        cy.request({
            method: 'GET',
            url: Cypress.env('baseUrlApi') + '/team',
            headers: {
                Authorization: Cypress.env('auth'),
                'Content-type': 'application/json; charset=UTF-8'
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.teams[0]).to.have.property('id', workspaceId);
            expect(response.body.teams[0]).to.have.property('name', workspaceName);
            expect(response.body.teams[0]).to.have.property('color', workspaceColor);
            expect(response.body.teams[0].members[0].user).to.be.an('object');
            expect(response.body.teams[0].members[0].user).to.have.property('id', memberId);
            expect(response.body.teams[0].members[0].user).to.have.property('username', memberUsername);
            expect(response.body.teams[0].members[0].user).to.have.property('email', memberEmail);
            expect(response.body.teams[0].members[0].user).to.have.property('color', memberColor);
            expect(response.body.teams[0].members[0].user).to.have.property('initials', memberInitials);
        })
    })

    it('GET - Try to get authorized teams withoud auth header', ()=>{
        cy.request({
            method: 'GET',
            failOnStatusCode: false,
            url: Cypress.env('baseUrlApi') + '/team',
            headers: {
                Authorization: "",
                'Content-type': 'application/json; charset=UTF-8'
            },
        })
            .then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body.err).to.eq("Authorization header required");
            });
    })
})