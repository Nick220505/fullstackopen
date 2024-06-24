import express from "express";
import patientService from "../services/patientService";
import { NewPatient } from "../types";
import { toNewPatient, toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitive());
});

router.get("/:id", (req, res) => {
  const patient = patientService.getById(req.params.id);
  if (!patient) {
    return res.sendStatus(404);
  }
  return res.json(patient);
});

router.post("/", (req, res) => {
  try {
    const newPatient: NewPatient = toNewPatient(req.body);
    const addedPatient = patientService.add(newPatient);
    res.status(201).json(addedPatient);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
    res.status(500).send(String(error));
  }
});

router.post("/:id/entries", (req, res) => {
  const { id } = req.params;

  if (!patientService.getById(id)) {
    return res.sendStatus(404);
  }

  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(id, newEntry);
    return res.status(201).json(addedEntry);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send(error.message);
    }
    return res.status(500).send(String(error));
  }
});

export default router;
