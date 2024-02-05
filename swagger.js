module.exports = {
    basePath: "/",
    definitions: {
      InvalidResponse: {
        properties: {
          message: {
            type: "string",
          },
          statusCode: {
            type: "string",
          },
        },
        type: "object",
      },
      GameResponse: {
        properties: {
          data: {
            type: "object",
            properties: {
              playerId: {
                type: "string",
              },
            },
          },
        },
        type: "object",
      },
    },
    host: "localhost:3000",
    info: {
      description: "This houses the configuration for our swagger docs",
      title: "Game Of Three API",
      version: "1.0.0",
    },
    paths: {
      "/game": {
        get: {
          description: "Get all Games",
          parameters: [],
          produces: ["application/json"],
          responses: {
            200: {
              description: "Success",
              schema: {
                $ref: "#/definitions/GameResponse",
              },
            },
            400: {
              description: "Invalid request",
              schema: {
                $ref: "#/definitions/InvalidResponse",
              },
            },
          },
        },
      },

      "/game/start": {
        post: {
          description: "Start a Game",
          parameters: [],
          produces: ["application/json"],
          responses: {
            201: {
              description: "Game started successfully",
              schema: {
                $ref: "#/definitions/GameResponse",
              },
            },
            400: {
              description: "Invalid request",
              schema: {
                $ref: "#/definitions/InvalidResponse",
              },
            },
          },
        },
      },

      "/game/:id/join": {
        post: {
          description: "Join a Game by ID",
          parameters: [],
          produces: ["application/json"],
          responses: {
            201: {
              description: "Game joined successfully",
              schema: {
                $ref: "#/definitions/GameResponse",
              },
            },
            400: {
              description: "Invalid request",
              schema: {
                $ref: "#/definitions/InvalidResponse",
              },
            },
          },
        },
      },

      "/game/:id/player/:playerId": {
        post: {
          description: "Player Make a Move",
          parameters: [],
          produces: ["application/json"],
          responses: {
            201: {
              description: "Played successfully",
              schema: {
                $ref: "#/definitions/GameResponse",
              },
            },
            400: {
              description: "Invalid request",
              schema: {
                $ref: "#/definitions/InvalidResponse",
              },
            },
          },
        },
      },

      "/game/{id}": {
        get: {
          description: "Get a game by ID",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              type: "string",
            },
          ],
          produces: ["application/json"],
          responses: {
            200: {
              description: "Success",
              schema: {
                $ref: "#/definitions/GameResponse",
              },
            },
            404: {
              description: "Game not found",
              schema: {
                $ref: "#/definitions/InvalidResponse",
              },
            },
          },
        },
      },
    },
    schemes: ["http"],
    swagger: "2.0",
  };