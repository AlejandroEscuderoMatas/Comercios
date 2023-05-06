const request = require("supertest");
const app = require("../app");
const commerce = require("../models/commerce");

var commerceToken = "";
var adminToken = "";

describe("Pruebas ADMIN", () => {
  let adminId = "";
  let commerceId = "";

  it("An admin should log in as the admin", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .set("Accept", "application/json")
      .send({
        email: "admin@utad.com",
        password: "password",
      })
      .expect(200);

    adminToken = res.body.token;
    adminId = res.body.user._id;
  });

  it("An admin should register a commerce", async () => {
    const response = await request(app)
      .post("/api/commerce/")
      .send({
        "name": "Estanco Manolo",
        "CIF": "22745347H",
        "email": "estancoManolo@gmail.com",
        "direction": "calle Comercio numero 3",
        "phone": 567345723,
        "mediaId": "0123456789abcdef01234569"
      })
      .auth(adminToken, { type: "bearer" })
      .set("Accept", "application/json")
      .expect(200);

    expect(response.body.commerce.email).toEqual("estancoManolo@gmail.com");
    commerceToken = response.body.token;
    commerceName = response.body.commerce.name;
    commerceId = response.body.commerce._id;
  });

  it("An admin should get the commerce requested", async () => {
    const response = await request(app)
      .get("/api/commerce/" + commerceId)
      .auth(adminToken, { type: "bearer" })
      .set("Accept", "application/json")
      .expect(200);
    expect(response.body.name).toEqual(commerceName);
  });

  it("An admin should get all commerces", async () => {
    const response = await request(app)
      .get("/api/commerce/")
      .auth(adminToken, { type: "bearer" })
      .set("Accept", "application/json")
      .expect(200);

    expect(response.body).toBeDefined();
  });

  it("An admin should update a commerce", async () => {
    const res = await request(app)
      .put("/api/commerce/" + commerceId)
      .auth(adminToken, { type: "bearer" })
      .send({
        name: "Estanco Luisa",
        CIF: "22745337H",
        email: "estancoLuisa@gmail.com",
        direction: "calle Comercio numero 3",
        phone: 568345789,
        mediaId: "0123476789abcdef01234569"
      })
      .set("Accept", "application/json")
      .expect(200);
    expect(res.body.name).toEqual("Estanco Luisa");
  });
  
  it("An admin should delete a commerce", async () => {
    const res = await request(app)
      .delete("/api/commerce/" + commerceId)
      .auth(adminToken, { type: "bearer" })
      .expect(200);
  });
});

describe("Pruebas COMMERCE", () => {
  
  let commerceId = "";
  let commerceWebId = "";
  it("An admin should register a commerce", async () => {
    const response = await request(app)
      .post("/api/commerce/")
      .send({
        "name": "Carniceria",
        "CIF": "22745747H",
        "email": "Carniceria@gmail.com",
        "direction": "calle Comercio numero 4",
        "phone": 567348723,
        "mediaId": "0123456789atcdef01234569"
      })
      .auth(adminToken, { type: "bearer" })
      .set("Accept", "application/json")
      .expect(200);

    expect(response.body.commerce.email).toEqual("Carniceria@gmail.com");
    commerceToken = response.body.token;
    commerceName = response.body.commerce.name;
    commerceId = response.body.commerce._id;
    commerceWebId = commerceId;
  });
  it("A commerce should upload content to its website", async () => {
    const response = await request(app)
      .post("/api/web/")
      .send({
        city: "Madrid",
        activity: "cars",
        title: "Coches de moda",
        resume: "Esto es de coches",
      })
      .auth(commerceToken, { type: "bearer" })
      .set("Accept", "application/json")
      .expect(200);
    expect(response.body.city).toEqual("Madrid");
    expect(response.body.activity).toEqual("cars");
  });
  it("A commerce should update their content", async () => {
    const res = await request(app)
      .put("/api/web/" + commerceWebId)
      .auth(commerceToken, { type: "bearer" })
      .send({
        city: "Barcelona",
        activity: "cars",
        title: "Coches de moda",
        resume: "Esto es de coches"
      })
      .set("Accept", "application/json")
      .expect(200);
    expect(res.body.city).toEqual("Barcelona");
  });
  it("A commerce should introduce new text to their content", async () => {
    const res = await request(app)
      .post("/api/web/texts/" + commerceWebId)
      .auth(commerceToken, { type: "bearer" })
      .send({
        texts: ["Texto web 1", "Texto web 2"],
      })
      .set("Accept", "application/json")
      .expect(200);
    expect(res.body.texts).toHaveLength(2);
  });
  it("A commerce should get users of city which has accept = true", async () => {
    const response = await request(app)
      .get("/api/user/search/madrid")
      .auth(commerceToken, { type: "bearer" })
      .set("Accept", "application/json")
      .expect(200);

    expect(response.body).toBeDefined();
  });
  it("A commerce should delete its website", async () => {
    const res = await request(app)
      .delete("/api/web/" + commerceWebId)
      .auth(commerceToken, { type: "bearer" })
      .expect(200);
  });
});

describe("Pruebas USER", () => {
  var userToken = "";
  var userId = "";
  var idSportWeb = "6455414b25d35e52dd567d21";
  it("A public user should get all webpages", async () => {
    const response = await request(app)
      .get("/api/web/")
      .set("Accept", "application/json")
      .expect(200);
    expect(response.body).toBeDefined();
  });
  it("A public user should get a commerce webpage", async () => {
    const response = await request(app)
      .get("/api/web/" + idSportWeb)
      .set("Accept", "application/json")
      .expect(200);
    expect(response.body).toBeDefined();
    expect(response.body.activity).toEqual("sport");
  });
  it("A public user should get webpages by city", async () => {
    const response = await request(app)
      .get("/api/web/search/Madrid")
      .set("Accept", "application/json")
      .expect(200);
    expect(response.body).toBeDefined();
    expect(response.body[0].activity).toEqual("sport");
  });
  it("A public user should get webpages by city and activity", async () => {
    const response = await request(app)
      .get("/api/web/search/Madrid/sport")
      .set("Accept", "application/json")
      .expect(200);
    expect(response.body).toBeDefined();
    expect(response.body[0].activity).toEqual("sport");
  });
  it("A public user should register a user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Alex",
        email: "alexito@utad.com",
        password: "password1",
        age: 22,
        city: "Madrid",
        accept: true,
        interests: ["sport"],
        role: "user"
      })
      .set("Accept", "application/json")
      .expect(200);
    expect(response.body.user.email).toEqual("alexito@utad.com");
  });
  it("A public user should log in a user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .set("Accept", "application/json")
      .send({
        email: "Tia@utad.com",
        password: "password",
      })
      .expect(200);
    userToken = res.body.token;
    userId = res.body.user._id;
  });
  it("A registered user should update a user", async () => {
    const res = await request(app)
      .put("/api/auth/update/" + userId)
      .auth(userToken, { type: "bearer" })
      .send({
        name: "Javier",
        email: "Javier@utad.com",
        password: "password",
        age: 22,
        city: "Madrid",
        accept: true,
        interests: ["sport"],
        role: "user",
      })
      .set("Accept", "application/json")
      .expect(200);
    expect(res.body.name).toEqual("Javier");
  });
  it("A public user should give a unauthorized because user not logged in", async () => {
    const response = await request(app)
      .patch("/api/web/" + idSportWeb)
      .send({
        score: [8],
        review: ["Second web Review"],
      })
      .set("Accept", "application/json")
      .expect(401);
  });
  it("A registered user should patch a review and scoring to webpage", async () => {
    const response = await request(app)
      .patch("/api/web/" + idSportWeb)
      .auth(userToken, { type: "bearer" })
      .send({
        score: 8,
        review: ["Second web Review"],
      })
      .set("Accept", "application/json")
      .expect(200);
    expect(response.body.activity).toEqual("sport");
  });
  it("A registered user should delete its user", async () => {
    const res = await request(app)
      .delete("/api/auth/delete/" + userId)
      .auth(userToken, { type: "bearer" })
      .expect(200);
  });
});
