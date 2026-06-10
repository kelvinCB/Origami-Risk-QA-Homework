
# Origami-Risk-QA-Homework

## Description

Origami-Risk-QA-Homework is a Playwright JavaScript test automation framework for validating the login functionality of [The Internet Login Page](https://the-internet.herokuapp.com/login).

The project uses Page Object Model, reusable fixtures, centralized test data, environment-based configuration, and Playwright reports to keep the test suite readable, maintainable, and easy to execute locally or in CI.

## Scope

Current implemented suite validates:

- Successful login with valid credentials.
- Login error for an invalid username.
- Login error for an invalid password.

The suite is independent, can run in any order, and each test receives an isolated browser context from Playwright.

## Prerequisites

Required tools:

- Node.js 20 or newer
- npm
- Git

Verify Node.js:

```bash
node --version
```

Verify npm:

```bash
npm --version
```

Verify Git:

```bash
git --version
```

Install project dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Setup

1. Clone the repository.

```bash
git clone <repository-url>
cd Origami-Risk-QA-Homework
```

2. Install dependencies.

```bash
npm install
```

3. Install Playwright browsers.

```bash
npx playwright install
```

4. Create the `.env` file from the example file.

Linux/macOS:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

5. Use the current environment values.

These values are safe to share because they belong to a public demo application:

```env
BASE_URL=https://the-internet.herokuapp.com
LOGIN_PATH=/login
LOGIN_USERNAME=tomsmith
LOGIN_PASSWORD=SuperSecretPassword!
HEADLESS=true
PW_WORKERS=2
```

Environment variables:

- `BASE_URL`: target host.
- `LOGIN_PATH`: login route.
- `LOGIN_USERNAME`: valid username.
- `LOGIN_PASSWORD`: valid password.
- `HEADLESS`: runs browsers hidden when `true`; visible when `false`.
- `PW_WORKERS`: number of parallel workers.

## Test Execution

Run all tests headless:

```bash
npm test
```

Run all tests headed:

```bash
npm run test:headed
```

Run all mandatory tests:

```bash
npm run test:mandatory
```

Run all extra tests identified by Kelvin Calcano:

```bash
npm run test:extra
```

Run all positive tests:

```bash
npm run test:positive
```

Run all negative tests:

```bash
npm run test:negative
```

Open the HTML report:

```bash
npm run report
```

## Tech Stack

- JavaScript
- Playwright Test
- dotenv for environment configuration
- GitHub Actions for CI

## Project Structure

```text
.
|-- .github/workflows/       # CI pipeline
|-- api/                     # API clients/controllers placeholder for future hybrid flows
|-- docs/                    # Test catalog and framework notes
|-- fixtures/                # Playwright test fixtures and hooks
|-- reports/                 # Generated reports (ignored by git)
|-- test-data/               # Test users and data builders
|-- tests/                   # Business-flow specs
|-- ui/pages/                # Page Objects
|-- utils/                   # Config, constants, helpers, logger
|-- playwright.config.js     # Playwright execution config
`-- package.json
```

## Reports And Evidence

- HTML report: `reports/playwright-html`
- JUnit report: `reports/junit/results.xml`
- Screenshots are retained only on failure.
- Traces are retained only on failure.
- Videos are retained only on failure.

## Design Principles

- Tests describe business intent only.
- Page Objects own locators and UI actions.
- Fixtures provide reusable test setup.
- Test data is centralized under `test-data/`.
- No hard waits. Assertions and Playwright auto-waiting handle synchronization.
- No shared browser state between tests.
- Config and credentials come from environment variables with safe defaults.
- Main branch is protected; changes should go through short PRs.

## Contact

For questions or collaboration, contact me on LinkedIn:

https://www.linkedin.com/in/kelvin-calcano-qa-automation/
