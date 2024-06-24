import { v1 as uuid } from "uuid";
import {
  NonSensitivePatient,
  Patient,
  NewPatient,
  Entry,
  NewEntry,
} from "../types";
import patients from "../../data/patients";

const getAll = (): Patient[] => {
  return patients;
};

const getNonSensitive = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const add = (entry: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...entry,
    entries: [],
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: NewEntry): Entry => {
  const patient = patients.find((p) => p.id === id)!;
  const newEntry = { id: uuid(), ...entry } as Entry;
  patient.entries = patient.entries.concat(newEntry);
  return newEntry;
};

export default { getAll, getNonSensitive, add, getById, addEntry };
