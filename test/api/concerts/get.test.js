const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server");
const Concert = require("../../../models/concert.model");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;
describe("GET /api/concerts", () => {
  before(async () => {
    const testConOne = new Concert({
      _id: "5d9f1140f10a81216cfd4408",
      day: 1,
      performer: "John Mayer",
      genre: "Pop",
      price: "28",
      image: "test.jpg",
    });
    await testConOne.save();

    const testConTwo = new Concert({
      _id: "5d9f1159f81ce8d1ef2bee48",
      day: 1,
      performer: "Jennifer Dias",
      genre: "Rock",
      price: "38",
      image: "test.jpg",
    });
    await testConTwo.save();
  });

  after(async () => {
    await Concert.deleteMany({ image: "test.jpg" });
  });
  it("/should return all concerts", async () => {
    const res = await request(server).get("/api/concerts");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.equal(4);
  });

  it("/:id should return one Concert with :id ", async () => {
    const res = await request(server).get(
      "/api/concerts/5d9f1140f10a81216cfd4408"
    );
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("object");
    expect(res.body).to.not.be.null;
  });

  it("/:day should return all concerts on the day ", async () => {
    const res = await request(server).get("/api/concerts/day/1");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body).to.not.be.null;
  });
  it("/:performer should return all concert of the performer ", async () => {
    const res = await request(server).get(
      "/api/concerts/performer/Jennifer%20Dias"
    );
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body).to.not.be.null;
  });

  it("/:price should return all concert in price scope ", async () => {
    const res = await request(server).get("/api/concerts/price/24/30");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body).to.not.be.null;
    expect(res.body.length).to.be.equal(2);
  });

  it("/random should return one random concert", async () => {
    const res = await request(server).get("/api/concerts/random");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("object");
    expect(res.body).to.not.be.null;
  });
});