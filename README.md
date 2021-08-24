# Overview

WIP

## Client

Hosted on ??

A react app using @redux-tools, created with create-react-app using the redux template

### REST

Use axios to call the server

## Server

Hosted on AWS Lambda using the serverless framework

The base url is the same for all endpoints with the last segment being a query param

| Action   |     Method  | Route           |
|----------|:------------|:----------------|
| Remove   |  /DELETE    | /search/:word   |
| Search   |  /GET       | /search/:query  |
| Update   |  /PUT       | /search/:word   |