# Takeaway Senior NodeJS Engineer Challenge

## Getting Started:

    - Clone this repository to your local machine.
    - Navigate to the project directory and run npm install to install the necessary dependencies.


## Running the Application on DOCKER

  - Run:
      docker compose up

## Running the Application on local machine
  - Run:
      npm run start

*The server should now be running on http://localhost:3000*


Basic Architecture Diagram: [https://github.com/uzochukwuonuegbu/takeaway-coding-challenge/issues/1#issue-2119291574](https://private-user-images.githubusercontent.com/26324423/302404468-5ea5fb8b-c21d-46d3-816b-5603015e8ecd.jpeg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDcxNjExODAsIm5iZiI6MTcwNzE2MDg4MCwicGF0aCI6Ii8yNjMyNDQyMy8zMDI0MDQ0NjgtNWVhNWZiOGItYzIxZC00NmQzLTgxNmItNTYwMzAxNWU4ZWNkLmpwZWc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwMjA1JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDIwNVQxOTIxMjBaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT03N2FkMjMzZDg5ZWM5ZDY4NDExYWFhOWRmNjU4OGZjODMxYTQ0NzkwZDBhNzE2ZDQ4ZmI1MTY4NGY1MTJlMjE1JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.d_FjCtEtT50mApl3emSR-OfYt3FQNgtWO6q88WBUxvA)

## Endpoints(Samples)

1. curl --request POST \
  --url http://localhost:3000/players/register \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.6.0' \
  --data '{
	"email": "uzo3@gmail.com"
}'

2. curl --request GET \
  --url http://localhost:3000/players \
  --header 'User-Agent: insomnia/8.6.0'

3. curl --request POST \
  --url http://localhost:3000/game/start \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.6.0' \
  --data '{
	"startNumber": 25,
	"player1": "609ad316-7e2d-4b2c-be0c-bbe477a10cfd"
}'

4. curl --request GET \
  --url http://localhost:3000/game \
  --header 'User-Agent: insomnia/8.6.0'

5. curl --request POST \
  --url http://localhost:3000/game/3704896d-7fbe-427f-b11a-8cac31a26cf7/join \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.6.0' \
  --data '{
	"player2": "5ea89556-bafe-4495-9bd6-5c4bcfe077d2",
	"inputNumber": -1
}'

6. curl --request POST \
  --url http://localhost:3000/game/3704896d-7fbe-427f-b11a-8cac31a26cf7/player/5ea89556-bafe-4495-9bd6-5c4bcfe077d2 \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.6.0' \
  --data '{
	"inputNumber": 20
}'

Testing using webSockets: 
 Domain Events - 
  - {
    "type": "start-game",
    "startNumber": 25,
    "player1": "609ad316-7e2d-4b2c-be0c-bbe477a10cfd"
    }
  - {
    "type": "join-game",
    "gameId": "591ff1bd-c302-43eb-a321-8958b32b84e6",
    "playerId": "c27df9de-aec3-412a-a17f-2dfc7b7ea46a",
    "inputNumber": 0
    }
  - {
    "type": "make-move",
    "gameId": "591ff1bd-c302-43eb-a321-8958b32b84e6",
    "playerId": "c27df9de-aec3-412a-a17f-2dfc7b7ea46a",
    "inputNumber": 0
    }

## Testing

  Unit Tests: 
      - Run:
          npm test


## API Docs

NB: make sure the server is running
- http://localhost:3000/docs/
