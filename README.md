[![Netlify Status](https://api.netlify.com/api/v1/badges/3c8f40b5-f302-419d-8666-bda2107375b3/deploy-status)](https://app.netlify.com/sites/z-challenge/deploys)

# Z Challenge
This project implements the feature outlined in the Z Challenge.

## Approach
Please see my approach for each section below.

### Components 
I've broken out the feature into a number of different components and they
appear in the `src/components` folder. Some of these components are high level
styled components which are then extended in other components to permit reuse.

The functional areas of the feature are broken out in to two main components:

* RoleList
  * RoleListItem
* CustomerList
  * CustomerListItem

I've implemented the feature in this manner in order to seperate the concerns.
Furthermore I can test each of these components in isolation.

### Data
In order to fetch the data from the graphql api I decided to use the
`@apollo/client` library, I made this decision as the documentation was very
clear and I also really liked the `useQuery` hook which abstracted the data
fetching. I did think of creating my own hook using `aws-ampilify` but wanted to
keep the implementation clear and simple.

### Styling 
I've used the `styled-components` library for the styling of components across the
application. This is the first time I've used the library, I really enjoyed how
easy it was to compose these components. I used to define base components which
could then be extended easily to adapt the styles for what I needed e.g. `Text`
-> `RoleText`. 

If the component was used globally it appears in the `src/components` folder
otherwise it will appear inline in the relevant file if only used once.

### Testing
I've ensured that we have almost complete code coverage across the entire
application. I've ensured that all components have unit tests and the code
coverage for these files is 100%.

I've also added cypress tests which ensures the application works as intended
from a system test perspective.

### Types
I've added global types to the `src/types.ts` file. When a type is only used
once I've included this inline within the appropriate files. Please note that
when ci unit tests are run as part of the project the type check is also run.

## Setup Guidelines

### Local Development
To run in development mode run `yarn start`. Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

### Testing
The tests for this project are broken out into unit and system tests, in order
to run these please see the commands below:

* Unit tests: `yarn test`
* Unit tests (with coverage): `yarn test --watchAll=false --coverage`
* System tests:  `yarn test:cypress`
* Typechecking: `yarn tsc --noEmit`

### Production
Open [https://z-challenge.netlify.app/](https://z-challenge.netlify.app/) to view the latest production version in the browser.
