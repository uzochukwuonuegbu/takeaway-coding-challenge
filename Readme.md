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


Basic Architecture Diagram: [https://github.com/uzochukwuonuegbu/takeaway-coding-challenge/issues/1](https://github.com/uzochukwuonuegbu/takeaway-coding-challenge/issues/1#issue-2119291574)

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
