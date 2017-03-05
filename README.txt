DESCRIPTION:
Simple search client for the Google Images. Uses Google Custom Search API (https://developers.google.com/custom-search/json-api/v1/overview) for acquiring the images. Pictures can be saved
between sessions to the local browser cache or nodejs based server.

TIPS:
Server installation:
npm install
node server.js

DESIGN USE CASES:
U1. Search pictures
User can initiate the search by writing the search query to a input field. Search results are displayed in a grid below the input field.
U2. Pin pictures
User can save a desired result to the persistent database by pressing the pin icon. Saved pictures are displayed on top of the search results.
U3. Change view
User has the option to select how the results are displayed. Small view contains three results side by side. Mixed view contains two results side by side with variable height. Big view contain
the results in original size.
U4. Display picture
A full sized picture is displayed in a popup when clicking a single search result.

TECHINAL REQUIREMENTS:
T1. NodeJS server for exposing the interface (Optional)
T2. MongoDB database for saving the models (Optional)

USED TIME:
study: 2h
design: 1h
programming: ~10h
