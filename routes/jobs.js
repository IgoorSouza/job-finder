import { Router } from "express";
import { Op } from "sequelize";
import { Job } from "../models/Job.js";

export const router = Router();

router.get("/", (req, res) => {
  Job.findAll({ order: [["createdAt", "DESC"]], limit: 3 }).then((jobs) => {
    res.json(jobs);
  });
});

router.get("/jobs", (req, res) => {
  Job.findAll({ order: [["createdAt", "DESC"]] }).then((jobs) => {
    res.json(jobs);
  });
});

router.get("/jobs/:title", (req, res) => {
  Job.findAll({
    where: { title: { [Op.like]: "%" + req.params.title + "%" } },
  }).then((jobs) => {
    res.json(jobs);
  });
});

router.get("/jobs/view/:id", (req, res) => {
  Job.findByPk(req.params.id).then((job) => {
    res.json(job);
  });
});

router.post("/jobs/new", (req, res) => {
  let { title, description, company, email, salary } = req.body;

  Job.create({
    title,
    description,
    company,
    email,
    salary,
  }).catch((error) => {
    console.log(error);
    return;
  });

  res.send("Adicionado com sucesso.");
});