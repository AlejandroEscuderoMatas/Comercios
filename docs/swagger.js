const swaggerJsdoc = require("swagger-jsdoc")

const options = {
    definition: {
      openapi: "3.0.3",
      info: {
        title: "Tracks - Express API with Swagger (OpenAPI 3.0)",
        version: "0.1.0",
        description:
          "This is a CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "u-tad",
          url: "https://u-tad.com",
          email: "alejandro.escudero@u-tad.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
      components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer"
            },
        },
        schemas:{
            user: {
                type: "object",
                required: ["name", "age", "email", "password", "city", "interests", "accept"],
                properties: {
                  name: {
                      type: "string",
                      example: "Marcosebre"
                  },
                  age: {
                      type: "integer",
                      example: 20
                  },
                  email: {
                      type: "string",
                      example: "marcosebre@google.com"
                  },
                  password: {
                      type: "string"
                  },
                  city: {
                      type: "string",
                      example: "Madrid"
                  },
                  interests: {
                      type: "[string]"
                  },
                  accept: {
                      type: "boolean",
                      example: "true"
                  },
                  role: {
                      type: "string",
                      example: "admin / user"
                  }
              },
            },
            commerce: {
              type: "object",
              required: ["name", "CIF", "email", "direction", "phone"],
              properties: {
                  name: {
                      type: "string",
                      example: "Commerce1"
                  },
                  CIF: {
                      type: "string",
                      example: "204563G"
                  },
                  email: {
                      type: "string",
                      example: "commerce1@google.com"
                  },
                  direction: {
                      type: "string"
                  },
                  phone: {
                      type: "integer",
                      example: 564738653
                  }
              },
            },
            web: {
              type: "object",
              required: ["city", "activity", "title", "resume", "texts", "images", "data.scoring", "data.scoring_ammount", "data.scoringSummatory", "data.reviews"],
              properties: {
                  city: {
                      type: "string",
                      example: "Madrid"
                  },
                  activity: {
                      type: "enum",
                      example: "sport, food"
                  },
                  title: {
                      type: "string",
                      example: "WebCommerce"
                  },
                  resume: {
                      type: "string"
                  },
                  texts: {
                      type: "[string]"
                  },
                  images: {
                    type: "[string]"
                  },
                  data_scoring: {
                    type: "integer"
                  },
                  data_scoring_ammount: {
                    type: "integer"
                  },
                  data_scoreSummatory: {
                    type: "integer"
                  },
                  data_reviews: {
                    type: "[string]"
                  },
              },
            },
            login: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: {
                    type: "string",
                    example: "miemail@google.com"
                  },
                  password: {
                    type: "string"
                  },
                }
            },
            register: {
              type: "object",
              required: ["name", "email", "password", "age", "city", "accept", "interests"],
              properties: {
                name: {
                  type: "string",
                  example: "Peter"
                },
                email: {
                  type: "string",
                  example: "miemail@google.com"
                },
                age: {
                  type: "integer",
                  example: 22
                },
                city: {
                  type: "string",
                  example: "Madrid"
                },
                accept: {
                  type: "boolean",
                  example: true
                },
                interests: {
                  type: "[string]",
                  example: "cars"
                }
              }
            }
        },
      },
    },
    apis: ["./routes/*.js"],
  };
  
module.exports = swaggerJsdoc(options)