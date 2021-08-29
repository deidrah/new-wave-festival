const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server");
const Concert = require("../../../models/concert.model");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe("PUT /api/concerts", () => {
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
  });

  after(async () => {
    await Concert.deleteOne({ _id: "5d9f1140f10a81216cfd4408" });
  });

  it("/:id should update chosen document and return success", async () => {
    const res = await request(server)
      .put("/api/concerts/5d9f1140f10a81216cfd4408")
      .send({ day: 2 });
    const updatedConcert = await Concert.findOne({
      _id: "5d9f1140f10a81216cfd4408",
    });
    expect(res.status).to.be.equal(200);
    expect(res.body).to.not.be.null;
    expect(res.body).to.be.an("object");
    expect(updatedConcert.day).to.be.equal(2);
  });
});