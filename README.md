![picture alt](/cypress/images/zensurance.png "Zensurance Logo")

# QA Challenge for Zensurance
[![E2E library: Cypress](https://img.shields.io/badge/E2E%20Framework-Cypress-blue)](https://www.cypress.io/)

---

# All of the test scenarios can be found in the dedicated 'Integration' folder for streamlined and efficient access, the tests are divided in e2e and api.

## Execution

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) installed.

### Installing the dependencies and running the tests

All the commands below are executed in the command _prompt_.

**1** - Download the project and access the created directory:

```sh
cd zensurance-automation
```

**2** - Install the necessary dependencies to run the tests:

```sh
npm install
```

**3** - You can choose to open GUI Tests or Headless tests, to run with GUI Test, type the following command, and after this, choose what spec you want to run:

```sh
npm run open
```

**4** - To run Headless Mode, type:

```sh
npm run cy:run
```
---

NOTE: There's 2 scenarios failing due to a bug in the user "problem user"
![picture alt](/cypress/images/test-screenshot.png "Tests")

[License MIT](/LICENSE)