import { Entry } from "../../types";

const PatientEntryList = ({ entries }: { entries: Entry[] }) => {
  console.log(entries);
  return (
    <div>
      <h3>Entries</h3>
      {entries.map((entry: Entry) => (
        <div key={entry.id}>
          <span>{entry.date} </span>
          <i>{entry.description}</i>
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>{code}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default PatientEntryList;
