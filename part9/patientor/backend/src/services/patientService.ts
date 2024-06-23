import { v1 as uuid } from "uuid";
import { NonSensitivePatient, Patient, NewPatient } from "../types";
import patientEntries from "../../data/patients";

const getEntries = (): Patient[] => {
  return patientEntries;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
};

const getEntryById = (id: string): Patient | undefined => {
  return patientEntries.find((patient) => patient.id === id);
};

const addEntry = (entry: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...entry,
    entries: [],
  };
  patientEntries.push(newPatient);
  return newPatient;
};

export default { getEntries, getNonSensitiveEntries, addEntry, getEntryById };
