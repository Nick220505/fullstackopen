import { useState, useEffect } from "react";
import diagnosisService from "../../services/diagnoses";
import { Entry, Diagnosis } from "../../types";

const PatientEntryList = ({ entries }: { entries: Entry[] }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const currentDiagnoses = await diagnosisService.getAll();
      setDiagnoses(currentDiagnoses);
    };
    fetchDiagnoses();
  }, []);

  console.log(diagnoses);

  return (
    <div>
      <h3>Entries</h3>
      {entries.map((entry: Entry) => (
        <div key={entry.id}>
          <span>{entry.date} </span>
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
        </div>
      ))}
    </div>
  );
};

export default PatientEntryList;
