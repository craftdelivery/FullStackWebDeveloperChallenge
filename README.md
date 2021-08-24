# Overview

A react app with a serverless backend to search, remove and update sets of words

## Strategy

It was clear that using postgres to perform trigram word similarity queries would be the most effective way to solve the problem, as the data needed to be stores somewhere in any case

## Database Seeding

see `/server/util` for scripts that clean up the data and populate the db

1) `init.sql` sets up the tables, sililarity index and inserts the Man and the Sea corpus

2) `gen_list.sh` generates a sorted and unique list of words found in the text

3) `populate.js` inserts the words into postges using a single query using unwrap

## Client

Hosted on Netlify: [site](https://eloquent-fermat-678284.netlify.app/)

A react app using @redux-tools, created with create-react-app using the redux template

### Screenshots
![image](https://user-images.githubusercontent.com/40546869/130661280-6462055d-539f-49f2-8748-acedb818bee3.png)

### REST

Use axios to call the server

## Server

Hosted on AWS Lambda using the serverless framework

The base url is the same for all endpoints with the last segment being a query param

| Action   |     Method  | Route          |
|----------|:------------|:---------------|
| Remove   |  DELETE    | /search/:word   |
| Search   |  GET       | /search/:query  |
| Update   |  PUT       | /search/:word   |
