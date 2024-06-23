import { v1 as uuid } from 'uuid';
import {
  NonSensitivePatientEntry,
  PatientEntry,
  NewPatientEntry,
} from '../types';
import patientEntries from '../../data/patients';

const getEntries = (): PatientEntry[] => {
  return patientEntries;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
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

const addEntry = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry: PatientEntry = {
    id: uuid(),
    ...entry,
  };
  patientEntries.push(newPatientEntry);
  return newPatientEntry;
};

export default { getEntries, getNonSensitiveEntries, addEntry };
