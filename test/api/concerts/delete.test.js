const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server");
const Concert = require("../../../models/concert.model");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe("DELETE /api/Concerts", () => {
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
    await Concert.deleteMany({ image: "test.jpg" });
  });

  it("/:id should delete chosen document and return success", async () => {
    const res = await request(server).delete(
      "/api/Concerts/5d9f1140f10a81216cfd4408"
    );
    const deletedConcert = await Concert.findOne({
      _id: "5d9f1140f10a81216cfd4408",
    });
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal("OK");
    expect(deletedConcert).to.be.null;
  });
});