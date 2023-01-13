import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  Autocomplete,
  Popper,
  TextField,
  Box,
  Button,
  Grid,
  Container,
  Alert,
  AlertTitle,
} from "@mui/material";
import axios from "../api/axios";
import { useEffect } from "react";
import useRefresh from "../context/useRefresh";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import PropTypes from "prop-types";

const UPLOAD_URL = "/notes";

const UploadNote = () => {
  const theme = useTheme();

  const drop = React.useRef(null);

  const [error, setError] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [fileName, setFileName] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [code, setCode] = React.useState("");
  const [language, setLanguage] = React.useState("");
  const [year, setYear] = React.useState(null);
  const [errMsg, setErrMsg] = React.useState("");
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = ["Upload File", "Add Details", "Completed"];
  const fileTypes = ["pdf", "docx"];

  const onUpload = (file) => {
    setFile(file);
  };

  React.useEffect(() => {
    const instance = drop.current;
    instance.addEventListener("dragover", handleDragOver);
    instance.addEventListener("drop", handleDrop);
    return () => {
      instance.removeEventListener("dragover", handleDragOver);
      instance.removeEventListener("drop", handleDrop);
    };
  }, []);

  const refresh = useRefresh();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };
  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { files } = e.dataTransfer;
    const f = files.item(0);

    if (
      fileTypes &&
      !fileTypes.some((format) =>
        f.name.toLowerCase().endsWith(format.toLowerCase())
      )
    ) {
      setError(
        `Only following file formats are acceptable: ${fileTypes.join(", ")}`
      );
      return;
    }

    if (files && files.length) {
      setError("");
      onUpload(f);
      setFileName(f.name);
      setActiveStep(1);
    }
  };

  useEffect(() => {
    setErrMsg("");
  }, [title, code, year, language, file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newToken = await refresh();
      const formdata = new FormData();
      formdata.append(
        "data",
        JSON.stringify({
          title: title,
          code: code,
          language: language,
          filename: fileName,
          year: year,
        })
      );
      formdata.append("file", file);
      const response = await axios.post(UPLOAD_URL, formdata, {
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
      });
      setFile(null);
      setFileName("");
      setError("");
      setTitle("");
      setCode("");
      setLanguage("");
      setYear(null);
      setActiveStep(2);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("* No Server Response");
      } else {
        setErrMsg("* Upload Failed");
        console.log(err.response);
      }
    }
  };

  return (
    <>
      <Box
        fullwidth
        sx={{
          height: "400px",
          background: `linear-gradient(180deg,${theme.palette.primary.main} 80%,${theme.palette.greywhite.main} 20%)`,
        }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        position="relative"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            position: "absolute",
            bottom: 0,
            width: "60%",
          }}
        >
          <Typography
            sx={{
              fontSize: "5rem",
              fontWeight: 900,
              userSelect: "none",
              color: theme.palette.greywhite.main,
            }}
          >
            Upload Your Notes
          </Typography>
          <Typography
            sx={{ marginTop: "1rem", color: theme.palette.greywhite.main }}
          >
            Upload Your summaries and other study documents to NoteBank.
          </Typography>
          <Box
            sx={{
              bgcolor: "white",
              height: "120px",
              borderRadius: "16px",
              width: "100%",
              marginTop: "2rem",
            }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              sx={{ width: "100%" }}
            >
              {steps.map((label) => {
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Box>
        </Box>
      </Box>
      {activeStep === 2 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>success</Typography>
          <Typography onClick={() => {}}>View My Notes</Typography>
          <Typography>Search Notes</Typography>
        </Box>
      ) : (
        <>
          {errMsg != "" ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {errMsg}
            </Alert>
          ) : (
            <></>
          )}
          <Box
            ref={drop}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "40px",
              justifyContent: "space-between",
              flexDirection: "column",
              color: "#555555",
              border: "3px #c3c3c3 dashed",
              borderRadius: 3,
              width: "50vw",
              height: "30vh",
              margin: "50px auto",
            }}
          >
            <CloudUploadOutlinedIcon sx={{ width: "100px", height: "100px" }} />
            <Typography>Drop your document here</Typography>
            <Typography sx={{ color: "green" }}>{fileName}</Typography>
            {error != "" ? (
              <Typography sx={{ color: "red" }}>* {error}</Typography>
            ) : (
              <></>
            )}
          </Box>
          <Container>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Title"
                      autoFocus
                      onChange={handleTitleChange}
                      value={title}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      freeSolo
                      disablePortal={true}
                      disableClearable
                      options={top100Films.map((option) => option.title)}
                      PopperComponent={({ style, ...props }) => (
                        <Popper
                          {...props}
                          style={{ ...style, height: 0 }} // width is passed in 'style' prop
                        />
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          InputProps={{
                            ...params.InputProps,
                          }}
                          required
                          label="Course code"
                          autoFocus
                          onChange={handleCodeChange}
                          value={code}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Language"
                      onChange={handleLanguageChange}
                      value={language}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Year taken"
                      type="number"
                      onChange={handleYearChange}
                      value={year}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Upload Note
                </Button>
              </Box>
            </Box>
          </Container>
        </>
      )}
    </>
  );
};

UploadNote.propTypes = {
  onUpload: PropTypes.func.isRequired,
};

export default UploadNote;

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
  {
    title:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { title: "The Great Dictator", year: 1940 },
  { title: "Cinema Paradiso", year: 1988 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Grave of the Fireflies", year: 1988 },
  { title: "Paths of Glory", year: 1957 },
  { title: "Django Unchained", year: 2012 },
  { title: "The Shining", year: 1980 },
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Princess Mononoke", year: 1997 },
  { title: "Aliens", year: 1986 },
  { title: "Oldboy", year: 2003 },
  { title: "Once Upon a Time in America", year: 1984 },
  { title: "Witness for the Prosecution", year: 1957 },
  { title: "Das Boot", year: 1981 },
  { title: "Citizen Kane", year: 1941 },
  { title: "North by Northwest", year: 1959 },
  { title: "Vertigo", year: 1958 },
  {
    title: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { title: "Reservoir Dogs", year: 1992 },
  { title: "Braveheart", year: 1995 },
  { title: "M", year: 1931 },
  { title: "Requiem for a Dream", year: 2000 },
  { title: "Amélie", year: 2001 },
  { title: "A Clockwork Orange", year: 1971 },
  { title: "Like Stars on Earth", year: 2007 },
  { title: "Taxi Driver", year: 1976 },
  { title: "Lawrence of Arabia", year: 1962 },
  { title: "Double Indemnity", year: 1944 },
  {
    title: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { title: "Amadeus", year: 1984 },
  { title: "To Kill a Mockingbird", year: 1962 },
  { title: "Toy Story 3", year: 2010 },
  { title: "Logan", year: 2017 },
  { title: "Full Metal Jacket", year: 1987 },
  { title: "Dangal", year: 2016 },
  { title: "The Sting", year: 1973 },
  { title: "2001: A Space Odyssey", year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: "Toy Story", year: 1995 },
  { title: "Bicycle Thieves", year: 1948 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 },
  { title: "Monty Python and the Holy Grail", year: 1975 },
];
