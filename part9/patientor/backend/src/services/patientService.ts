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

const addEntry = (object: NewPatientEntry): PatientEntry => {
  const newPatient: PatientEntry = {
    id: uuid(),
    ...object,
  };
  patientEntries.push(newPatient);
  return newPatient;
};

export default { getEntries, getNonSensitiveEntries, addEntry };
