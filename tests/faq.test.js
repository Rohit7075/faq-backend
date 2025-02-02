const request = require("supertest");
const app = require("../index");
const FAQ = require("../models/faqModel");
const mongoose = require("mongoose");

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("FAQ API", () => {
    let faqId = "";

    it("should add a new FAQ", async () => {
        const response = await request(app).post("/api/faqs").send({
            question: "What is Node.js?",
            answer: "Node.js is a runtime environment."
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("question", "What is Node.js?");
        faqId = response.body._id;
    });

    it("should fetch FAQs", async () => {
        const response = await request(app).get("/api/faqs");
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it("should delete an FAQ", async () => {
        const response = await request(app).delete(`/api/faqs/${faqId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "FAQ deleted successfully");
    });
});
