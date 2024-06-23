import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Patient, Gender } from "../../types";
import { AxiosError } from "axios";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patient = await patientService.getById(id!);
        setPatient(patient);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            setErrorMessage(error.response?.statusText);
          }
        } else {
          setErrorMessage(String(error));
        }
      }
    };
    fetchPatient();
  }, [id]);

  if (errorMessage) {
    return <h3>{errorMessage}</h3>;
  }

  return (
    <div>
      {patient && (
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h2>{patient.name}</h2>
            <div style={{ margin: 10 }}>
              {patient.gender === Gender.Male ? (
                <MaleIcon />
              ) : patient.gender === Gender.Female ? (
                <FemaleIcon />
              ) : (
                <TransgenderIcon />
              )}
            </div>
          </div>
          <p>Ssn: {patient.ssn}</p>
          <p>Occupation: {patient.occupation}</p>
          <p>Date of Birth: {patient.dateOfBirth}</p>
        </div>
      )}
    </div>
  );
};

export default PatientPage;
