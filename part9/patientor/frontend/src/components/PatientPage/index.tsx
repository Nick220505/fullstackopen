import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Patient, Gender } from "../../types";
import { AxiosError } from "axios";
import { EntryFormValues } from "../../types";
import Typography from "@mui/material/Typography";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import PatientEntryForm from "./PatientEntryForm";
import PatientEntryList from "./PatientEntryList";
import Alert from "@mui/material/Alert";

interface Notification {
  type: "success" | "error";
  value: string;
}

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [message, setMessage] = useState<Notification | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patient = await patientService.getById(id!);
        setPatient(patient);
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          setErrorMessage(error.response.statusText);
        } else {
          setErrorMessage(String(error));
        }
      }
    };
    fetchPatient();
  }, [id]);

  const onEntrySubmit = async (
    formValues: EntryFormValues
  ): Promise<boolean> => {
    try {
      const addedEntry = await patientService.addEntry(id ?? "", formValues);
      setPatient((prevPatient) => ({
        ...prevPatient!,
        entries: [...prevPatient!.entries, addedEntry],
      }));
      setMessage({
        type: "success",
        value: `Entry with description ${addedEntry.description} has been added`,
      });
      return true;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setMessage({ type: "error", value: error.response.data });
      } else {
        setMessage({ type: "error", value: String(error) });
      }
      return false;
    }
  };

  if (message) {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }

  if (errorMessage) {
    return <h3>{errorMessage}</h3>;
  }

  return (
    <div>
      {patient && (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "1em",
              marginBottom: "1em",
            }}
          >
            <Typography variant="h4">{patient.name}</Typography>
            <div style={{ marginLeft: 10 }}>
              {patient.gender === Gender.Male ? (
                <MaleIcon />
              ) : patient.gender === Gender.Female ? (
                <FemaleIcon />
              ) : (
                <TransgenderIcon />
              )}
            </div>
          </div>
          <div style={{ marginBottom: 10 }}>
            <div>Ssn: {patient.ssn}</div>
            <div>Occupation: {patient.occupation}</div>
            <div>Date of Birth: {patient.dateOfBirth}</div>
          </div>
          {message && <Alert severity={message.type}>{message.value}</Alert>}
          <PatientEntryForm onEntrySubmit={onEntrySubmit} />
          <PatientEntryList entries={patient.entries} />
        </div>
      )}
    </div>
  );
};

export default PatientPage;
