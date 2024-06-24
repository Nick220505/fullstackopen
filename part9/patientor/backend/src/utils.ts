import {
  NewPatient,
  NewEntry,
  Discharge,
  HealthCheckRating,
  Diagnosis,
  NewBaseEntry,
} from "./types";
import { Gender } from "./types";

const isValidObject = (param: unknown): param is Object => {
  return (
    param !== undefined &&
    param !== null &&
    typeof param === "object" &&
    Object.entries(param).length > 0
  );
};

const isString = (param: unknown): param is string => {
  return typeof param === "string" || param instanceof String;
};

const isNumber = (param: unknown): param is number => {
  return typeof param === "number" || param instanceof Number;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name: " + name);
  }
  return name;
};

const isDate = (param: string): boolean => {
  return Boolean(Date.parse(param));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn: " + ssn);
  }
  return ssn;
};

export const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

export const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation: " + occupation);
  }
  return occupation;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!isValidObject(object)) {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };
    return newPatient;
  }

  throw new Error("Incorrect data: some fields are missing");
};

const parseType = (
  type: unknown
): "Hospital" | "OccupationalHealthcare" | "HealthCheck" => {
  if (
    !isString(type) ||
    (type !== "Hospital" &&
      type !== "OccupationalHealthcare" &&
      type !== "HealthCheck")
  ) {
    throw new Error("Incorrect or missing type");
  }
  return type;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }
  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object") {
    return [] as Array<Diagnosis["code"]>;
  }
  return object as Array<Diagnosis["code"]>;
};

const isDischarge = (param: unknown): param is Discharge => {
  return isValidObject(param) && "date" in param && "criteria" in param;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (
    !isDischarge(discharge) ||
    !discharge.date ||
    !discharge.criteria ||
    !isString(discharge.date) ||
    !isString(discharge.criteria)
  ) {
    throw new Error("Incorrect or missing discharge");
  }
  return discharge;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Incorrect or missing employerName");
  }
  return employerName;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((value) => Number(value.toString()))
    .includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error("Incorrect or missing healthCheckRating");
  }
  return healthCheckRating;
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!isValidObject(object)) {
    throw new Error("Incorrect or missing data");
  }

  if (
    "type" in object &&
    "description" in object &&
    "date" in object &&
    "specialist" in object
  ) {
    let baseEntry: NewBaseEntry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
    };

    if ("diagnosisCodes" in object) {
      baseEntry = {
        ...baseEntry,
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      };
    }

    const entryType = parseType(object.type);

    switch (entryType) {
      case "Hospital":
        if ("discharge" in object) {
          const hospitalEntry: NewEntry = {
            ...baseEntry,
            type: entryType,
            discharge: parseDischarge(object.discharge),
          };
          return hospitalEntry;
        }
        throw new Error("discharge field is missing for Hospital entry type");
      case "OccupationalHealthcare":
        if ("employerName" in object) {
          const occupationalHealthcareEntry: NewEntry = {
            ...baseEntry,
            type: entryType,
            employerName: parseEmployerName(object.employerName),
          };
          return occupationalHealthcareEntry;
        }
        throw new Error(
          "employerName field missing for OccupationalHealthcare entry type"
        );
      case "HealthCheck":
        if ("healthCheckRating" in object) {
          const healthCheckEntry: NewEntry = {
            ...baseEntry,
            type: entryType,
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };
          return healthCheckEntry;
        }
        throw new Error(
          "healthCheckRating field missing for HealthCheck entry type"
        );
    }
  }

  throw new Error("Incorrect data some fields are missing");
};
