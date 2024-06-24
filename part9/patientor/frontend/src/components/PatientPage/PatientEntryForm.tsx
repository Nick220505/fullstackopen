import { SyntheticEvent, useState, useEffect } from "react";
import { EntryFormValues, EntryType } from "../../types";
import diagnosisService from "../../services/diagnoses";
import {
  Typography,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { HealthCheckRating, Diagnosis } from "../../types";

interface Props {
  onEntrySubmit: (formValues: EntryFormValues) => Promise<boolean>;
}

const PatientEntryForm = ({ onEntrySubmit }: Props) => {
  const theme = useTheme();
  const [entryType, setEntryType] = useState<EntryType>(EntryType.Hospital);

  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [specialist, setSpecialist] = useState("");

  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );

  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState<Dayjs | null>(null);
  const [sickLeaveEnd, setSickLeaveEnd] = useState<Dayjs | null>(null);

  const [dischargeDate, setDischargeDate] = useState<Dayjs | null>(null);
  const [criteria, setCriteria] = useState("");

  const [availableDiagnosisCodes, setAvailableDiagnosisCodes] = useState<
    Array<Diagnosis["code"]>
  >([]);
  const [selectedDiagnosisCodes, setSelectedDiagnosisCodes] = useState<
    Array<Diagnosis["code"]>
  >([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      setAvailableDiagnosisCodes(diagnoses.map((d) => d.code));
    };
    fetchDiagnoses();
  }, []);

  const handleReset = () => {
    setDescription("");
    setDate(null);
    setSpecialist("");
    setHealthCheckRating(HealthCheckRating.Healthy);
    setEmployerName("");
    setSickLeaveStart(null);
    setSickLeaveEnd(null);
    setDischargeDate(null);
    setCriteria("");
    setSelectedDiagnosisCodes([]);
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const formValues = {
      description,
      date: date ? date.format("YYYY-MM-DD").toString() : "",
      specialist,
      diagnosisCodes:
        selectedDiagnosisCodes.length > 0 ? selectedDiagnosisCodes : undefined,
    };

    let success = false;

    switch (entryType) {
      case EntryType.HealthCheck:
        success = await onEntrySubmit({
          ...formValues,
          type: "HealthCheck",
          healthCheckRating,
        });
        break;
      case EntryType.OccupationalHealthcare:
        if (sickLeaveStart && sickLeaveEnd) {
          success = await onEntrySubmit({
            ...formValues,
            type: "OccupationalHealthcare",
            employerName,
            sickLeave: {
              startDate: sickLeaveStart.format("YYYY-MM-DD").toString(),
              endDate: sickLeaveEnd.format("YYYY-MM-DD").toString(),
            },
          });
        } else {
          success = await onEntrySubmit({
            ...formValues,
            type: "OccupationalHealthcare",
            employerName,
          });
        }
        break;
      case EntryType.Hospital:
        success = await onEntrySubmit({
          ...formValues,
          type: "Hospital",
          discharge: {
            date: dischargeDate
              ? dischargeDate.format("YYYY-MM-DD").toString()
              : "",
            criteria,
          },
        });
        break;
    }

    if (success) {
      handleReset();
    }
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ border: "2px dashed black", padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {Object.values(EntryType).map((value) => (
            <Button
              key={value}
              variant="outlined"
              onClick={() => setEntryType(value)}
            >
              {value}
            </Button>
          ))}
        </div>
        <Typography variant="h5" sx={{ marginTop: 2, marginBottom: 2 }}>
          New {entryType} entry
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <DatePicker
            sx={{ width: "100%", marginBottom: 2 }}
            value={date}
            onChange={(date) => setDate(date)}
          />
          <TextField
            id="specialist"
            label="Specialist"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
          />
          {entryType === EntryType.HealthCheck ? (
            <>
              <InputLabel id="health-check-rating-label">
                Healthcheck rating
              </InputLabel>
              <Select
                labelId="health-check-rating-label"
                id="health-check-rating"
                label="Healthcheck rating"
                fullWidth
                sx={{ marginBottom: 2 }}
                value={healthCheckRating}
                onChange={(e) => setHealthCheckRating(Number(e.target.value))}
              >
                {Object.entries(HealthCheckRating)
                  .filter(([key]) => !isNaN(Number(key)))
                  .map(([value, label]) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
              </Select>
            </>
          ) : entryType === EntryType.OccupationalHealthcare ? (
            <>
              <TextField
                id="employer-name"
                label="Employer Name"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2 }}
                value={employerName}
                onChange={(e) => setEmployerName(e.target.value)}
              />
              <Typography variant="h6">Sick Leave</Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginTop: 5,
                  marginBottom: 15,
                }}
              >
                <DatePicker
                  sx={{ width: "100%" }}
                  value={sickLeaveStart}
                  onChange={(date) => setSickLeaveStart(date)}
                />
                <DatePicker
                  sx={{ width: "100%" }}
                  value={sickLeaveEnd}
                  onChange={(date) => setSickLeaveEnd(date)}
                />
              </div>
            </>
          ) : (
            <>
              <Typography variant="h6">Discharge</Typography>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <DatePicker
                  sx={{ width: "100%", marginBottom: 2 }}
                  value={dischargeDate}
                  onChange={(date) => setDischargeDate(date)}
                />
                <TextField
                  id="criteria"
                  label="Criteria"
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  value={criteria}
                  onChange={(e) => setCriteria(e.target.value)}
                />
              </div>
            </>
          )}
          {availableDiagnosisCodes && (
            <>
              <InputLabel id="diagnosis-codes-label">
                Diagnosis codes
              </InputLabel>
              <Select
                labelId="diagnosis-codes-label"
                id="diagnosis-codes"
                multiple
                value={selectedDiagnosisCodes}
                onChange={({ target }) => {
                  setSelectedDiagnosisCodes(
                    typeof target.value === "string"
                      ? target.value.split(",")
                      : target.value
                  );
                }}
                input={<OutlinedInput label="Diagnosis Codes" />}
                MenuProps={MenuProps}
                sx={{ marginBottom: 2 }}
              >
                {availableDiagnosisCodes.map((code) => (
                  <MenuItem
                    key={code}
                    value={code}
                    style={{
                      fontWeight:
                        selectedDiagnosisCodes.indexOf(code) === -1
                          ? theme.typography.fontWeightRegular
                          : theme.typography.fontWeightMedium,
                    }}
                  >
                    {code}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="secondary" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="contained" color="success" type="submit">
              Add
            </Button>
          </div>
        </form>
      </div>
    </LocalizationProvider>
  );
};

export default PatientEntryForm;
