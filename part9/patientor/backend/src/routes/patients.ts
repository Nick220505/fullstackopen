import express from 'express';
import patientService from '../services/patientService';
import { NewPatientEntry } from '../types';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry: NewPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addEntry(newPatientEntry);
    res.status(201).json(addedEntry);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.send(errorMessage);
  }
});

export default router;
