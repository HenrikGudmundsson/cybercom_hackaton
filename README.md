# Cybercom hackaton

Welcome to the Cybercom hackaton. 🥳 🍻 🍺 🦖

### Competition

Tip: Begin by selecting a team captain or divide the team up however you like. 🧑🏽‍✈

The end goal is to have a hosted web page which can be used to see and add beer reviews.
Worst case, we can run them locally when rating them.

### Database

The database is hosted on firebase. The you can find the config and connection file under `config/firestore_example.js`. This file you should rename to `firestore.js` and insert the config sent during the hackaton. You will have two collections, one for test and one for production (which will be used during the voting). The test collection is called for example `team1-test` and the production one is called `team1-prod`.

We created 4 fields in the collection called `name (string)`, `description (string)`, `img (string)` and `rating (number)`. The ID's for the fields is auto generated. If you fancy using other fields, by all means change them to something more creative.

Important: You will find that the firestore config will be empty. This will be sent to you during the hackaton.

Tip: For more help regarding how to use firebase firestore database, here is the [documentation](https://firebase.google.com/docs/firestore/quickstart?authuser=0#web-v8_4).

### Hosting

The hosting process you will have to solve by yourselves.
Tip: Herokuapp or Firebase both have free hosting.

### Scoring critera

You can use your own scoring critera if you want, but here are some examples as guidelines:

- Design
- Functionality (UX)
- Hosting done or not
- Favicon
- Swag 😎
