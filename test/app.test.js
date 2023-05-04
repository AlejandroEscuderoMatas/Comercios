const request = require("supertest");
const app = require("../app");
const commerce = require("../models/commerce");

describe("Pruebas ADMIN", () => {
  let adminToken = "";
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
        CIF: "22745357H",
        email: "estancoLuisa@gmail.com",
        direction: "calle Comercio numero 3",
        phone: 567345789,
        mediaId: "0123456789abcdef01234569"
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

describe("Pruebas MERCHANT", () => {
  let merchantToken = "";
  let merchantId = "";
  let merchantWebId = "";

  it("[MERCHANT]should log in a merchant", async () => {
    const res = await request(app)
      .post("/api/commerce/login")
      .set("Accept", "application/json")
      .send({
        email: "adidas@gmail.com",
        password: "nikeesmejor123",
      })
      .expect(200);
    merchantToken = res.body.data.token;
    merchantId = res.body.data.merchant._id;
    merchantWebId = res.body.data.merchant.pageId;
  });
  it("[MERCHANT]should give error, merchant tried to upload content to another commerce or non-existing website", async () => {
    const response = await request(app)
      .post("/api/webpages/" + "123" + merchantWebId)
      .send({
        city: "madrid",
        activity: "futbol",
        title: "Partido de futbol",
        summary: "partido de futbol con pele y maradona",
      })
      .auth(merchantToken, { type: "bearer" })
      .set("Accept", "application/json")
      .expect(500);
  });
  it("[MERCHANT]should upload content to commerce website", async () => {
    const response = await request(app)
      .post("/api/webpages/" + merchantWebId)
      .send({
        city: "madrid",
        activity: "futbol",
        title: "Partido de futbol",
        summary: "partido de futbol con pele y maradona",
      })
      .auth(merchantToken, { type: "bearer" })
      .set("Accept", "application/json")
      .expect(200);
    expect(response.body.webpage.city).toEqual("madrid");
    expect(response.body.webpage.activity).toEqual("futbol");
  });
  it("[MERCHANT]should update their content", async () => {
    const res = await request(app)
      .put("/api/webpages/" + merchantWebId)
      .auth(merchantToken, { type: "bearer" })
      .send({
        city: "barcelona",
        // activity: "badminton", demostrando que se hace put con lo q quieras
        // title: "Partido de badminton",
      })
      .set("Accept", "application/json")
      .expect(200);
    expect(res.body.city).toEqual("barcelona");
    // expect(res.body.activity).toEqual("badminton");
    // expect(res.body.title).toEqual("Partido de badminton");
  });
  it("[MERCHANT]should introduce new text to their content", async () => {
    const res = await request(app)
      .post("/api/webpages/" + merchantWebId + "/texts")
      .auth(merchantToken, { type: "bearer" })
      .send({
        texts: ["nuevotexto1", "textonuevo2"],
      })
      .set("Accept", "application/json")
      .expect(200);
    expect(res.body.response.texts).toHaveLength(2);
  });
  it("[MERCHANT]should delete the content in their website", async () => {
    const res = await request(app)
      .delete("/api/webpages/" + merchantWebId)
      .auth(merchantToken, { type: "bearer" })
      .expect(200);
  });
  it("[MERCHANT]should get users of city which has receiveOffers:true", async () => {
    const response = await request(app)
      .get("/api/users/" + "madrid")
      .auth(merchantToken, { type: "bearer" })
      .set("Accept", "application/json")
      .expect(200);

    expect(response.body).toBeDefined();
  });
});

describe("Pruebas USER", () => {
  var userToken = "";
  var userId = "";
  var nikeWebId = "747074ee-e99e-4d57-8c08-d9ffdc3a439c";
  it("[PUBLIC_USER]should get all webpages", async () => {
    const response = await request(app)
      .get("/api/webpages/" + nikeWebId)
      .set("Accept", "application/json")
      .expect(200);
    expect(response.body).toBeDefined();
  });
  it("[PUBLIC_USER]should get a commerce webpage", async () => {
    const response = await request(app)
      .get("/api/webpages/")
      .set("Accept", "application/json")
      .expect(200);
    expect(response.body).toBeDefined();
    expect(response.body.contents[0].activity).toEqual("baloncesto");
  });
  it("[PUBLIC_USER]should get webpages by city ordered by scoring", async () => {
    const response = await request(app)
      .get("/api/webpages/search/barcelona/sort")
      .set("Accept", "application/json")
      .expect(200);
    expect(response.body).toBeDefined();
    expect(response.body.webpages[0].activity).toEqual("baloncesto");
  });
  it("[PUBLIC_USER]should get webpages by city and activity", async () => {
    const response = await request(app)
      .get("/api/webpages/search/barcelona/baloncesto")
      .set("Accept", "application/json")
      .expect(200);
    expect(response.body).toBeDefined();
    expect(response.body.webpages[0].activity).toEqual("baloncesto");
  });
  it("[PUBLIC_USER]should register a user", async () => {
    const response = await request(app)
      .post("/api/users/register")
      .send({
        name: "Javier",
        age: 21,
        email: "javii@gmail.com",
        password: "abc123..",
        city: "madrid",
        interests: "futbol",
        allowOffers: "true",
      })
      .set("Accept", "application/json")
      .expect(200);
    expect(response.body.data.user.email).toEqual("javii@gmail.com");
  });
  it("[PUBLIC_USER]should log in a user", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "javii@gmail.com",
        password: "abc123..",
      })
      .expect(200);
    userToken = res.body.data.token;
    userId = res.body.data.user._id;
  });
  it("[REGISTERED_USER]should update a user", async () => {
    const res = await request(app)
      .put("/api/users/" + userId)
      .auth(userToken, { type: "bearer" })
      .send({
        name: "Javier Eustaquio",
        age: 22,
      })
      .set("Accept", "application/json")
      .expect(200);
    expect(res.body.name).toEqual("Javier Eustaquio");
  });
  it("[REGISTERED_USER]should give a unauthorized because user not logged in", async () => {
    const response = await request(app)
      .patch("/api/webpages/" + nikeWebId)
      .send({
        nonEditable: {
          scoring: [10],
          reviews: ["Increible partido, que bueno es el lstool"],
        },
      })
      .set("Accept", "application/json")
      .expect(401);
  });
  it("[REGISTERED_USER]should patch a review and scoring to webpage", async () => {
    const response = await request(app)
      .patch("/api/webpages/" + nikeWebId)
      .auth(userToken, { type: "bearer" })
      .send({
        nonEditable: {
          scoring: [10],
          reviews: ["Increible partido, que bueno es el lstool"],
        },
      })
      .set("Accept", "application/json")
      .expect(200);
    expect(response.body.activity).toEqual("baloncesto");
  });
  it("[REGISTERED_USER]should delete the user", async () => {
    const res = await request(app)
      .delete("/api/users/" + userId)
      .auth(userToken, { type: "bearer" })
      .expect(200);
  });
});
