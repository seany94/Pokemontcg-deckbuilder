# Pokemontcg-deckbuilder
Using node.js, react.js, express, postgres, DOM, AJAX and bootstrap

Heroku Link:- https://pokemondeckbuilder.herokuapp.com/

Login using my account if you do not want to signup:- Username: seanc, Password: sc123

(Pending fix for remove card bug)

Requirements:-
1. Display database of Pokemon cards. All users can view them
2. Allow users to sort cards typing ex: Pokemon/trainer/energy
3. Allow users to click on card image and a pop up modal will show the card’s details with high resolution image
4. Allow users to sign up/sign in to use website features
5. Upon sign in user will be able to create a deck of 60 cards and saved uniquely to each user in database.
6. User can edit/delete his own deck while logged in.
7. User that are log in are able to access deck tab to see other users’ created decks and they can add comment/review and rate them
8. The decks list users created will be sorted by date created/edited/rating
9. Use external api/npm for database of cards https://pokemontcg.io/
10. Allows user to see similar type of deck with same typing as theirs as recommended

Additional stuff:-
1. Build using MVC
2. Upload user profile image
3. Create user profile with their decks they created
4. Create rules to deck creation
5. Limit guess features only allow sign in user to access those features

Milestone:-

MVP: Display database of Pokemon cards. All users can view them. Allow users to sort cards typing ex: Pokemon/trainer/energy

Further: Sign in/up form and use ajax for api request. Use dom to append api data

Further: Only allow create, edit and deck when sign in and only sign in user can edit and delete their own respective decks.

Further: Allow user to see their own profile tab when sign in

Further: Allow user to view deck they or other users created in respective profile or under user tab

Further: Restrict signed in user to edit and delete only their own deck. Redirect them to their own profile when signed in user attempt to edit or delete other users deck

Further: Validate user login to avoid re-sign in

Further: Allow users to click on card image and a pop up modal will show the card’s details with high resolution image

Further: Search filter function for cards

Further: List of decks users created can be sorted by date created/edited/name/deck_id/rating

------Done till here------

Further: User that are log in are able to access deck tab to see other users’ created decks and they can add comment/review and rate them

Further: Allows user to see similar type of deck with same typing as theirs as recommended

Further: Add create deck logic

Further: Allow user to upload profile image