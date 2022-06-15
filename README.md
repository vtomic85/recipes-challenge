# Frontend Challenge Solution

This application was created as a part of the interview process for Tx Services.

## Technologies & Tools

- [React](https://reactjs.org/)
- [Lodash](https://lodash.com/) (for debouncing)
- [Cypress](https://www.cypress.io/) (for testing)

## How to run the application?

- Clone the repository and go into the folder where it was cloned
- Run `npm install`
- Run `npm start`
- The application will run at http://localhost:3000

## How to run the tests?

Run `npm run cypress` or `npx cypress open`

## Assumptions and choices made by the author

- If there are more than 2 pages before or after the current page, the Pagination widget will show three dots (`...`) on that side.
- Color of the pagination buttons wasn't specified so it was chosen by the author.
- Filter text field changes background color when focused and it has an "`X`" button to clear its contents.
- `Lodash` library was installed for debouncing purposes.
- `Cypress` was chosen for testing.
- The API URL was stored in the `.env` file
- When a user changes a page or filters the list, a new call to the API is made instead of just working with the local copy of the data (in case that the recipes list was changed in the meantime)
- In case that an error occurs, a relevant message will be shown. The style of the message was chosen by the author.
- All boilerplate code which is not relevant to this challenge was removed for brevity sake (images, comments, analytics...)
