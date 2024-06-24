import { useState, useEffect } from "react";
import diagnosisService from "../../services/diagnoses";
import { Entry, Diagnosis, HealthCheckRating } from "../../types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";

const PatientEntryList = ({ entries }: { entries: Entry[] }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const currentDiagnoses = await diagnosisService.getAll();
      setDiagnoses(currentDiagnoses);
    };
    fetchDiagnoses();
  }, []);

  return (
    <div>
      {entries.length !== 0 ? <h3>Entries</h3> : <h3>No entries were found</h3>}
      {entries.map((entry: Entry) => (
        <div
          key={entry.id}
          style={{
            border: "2px solid black",
            borderRadius: "5px",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <div>
            {entry.date}{" "}
            {entry.type === "HealthCheck" ? (
              <MedicalServicesIcon />
            ) : entry.type === "Hospital" ? (
              <LocalHospitalIcon />
            ) : (
              <WorkIcon />
            )}
          </div>
          <i>{entry.description}</i>
          {entry.diagnosisCodes && diagnoses && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code} {diagnoses.find((d) => d.code === code)?.name}
                </li>
              ))}
            </ul>
          )}
          {entry.type === "Hospital" ? (
            <div>
              <strong>Discharge:</strong>
              <div>date: {entry.discharge.date}</div>
              <div>criteria: {entry.discharge.criteria}</div>
            </div>
          ) : entry.type === "OccupationalHealthcare" ? (
            <div>
              <strong>Employer name:</strong> {entry.employerName}
              {entry.sickLeave && (
                <div>
                  <strong>Sick leave:</strong>
                  <div>start date: {entry.sickLeave.startDate}</div>
                  <div>end date: {entry.sickLeave.endDate}</div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <strong>Health check rating: </strong>
              <div style={{ display: "flex", alignItems: "center" }}>
                {entry.healthCheckRating === HealthCheckRating.Healthy ? (
                  <>
                    <span>Healthy</span>
                    <FavoriteIcon sx={{ color: "green" }} />
                  </>
                ) : entry.healthCheckRating === HealthCheckRating.LowRisk ? (
                  <>
                    <span>Low risk</span>
                    <FavoriteIcon sx={{ color: "yellow" }} />
                  </>
                ) : entry.healthCheckRating === HealthCheckRating.HighRisk ? (
                  <>
                    <span>High risk</span>
                    <FavoriteIcon sx={{ color: "orange" }} />
                  </>
                ) : (
                  <>
                    <span>Critical risk</span>
                    <FavoriteIcon sx={{ color: "red" }} />
                  </>
                )}
              </div>
            </div>
          )}
          <div>diagnose by {entry.specialist}</div>
        </div>
      ))}
    </div>
  );
};

export default PatientEntryList;
