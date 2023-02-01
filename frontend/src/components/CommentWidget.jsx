import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Avatar,
  TextField,
  Typography,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import axios from "../api/axios";
import useRefresh from "../context/useRefresh";

export default function CommentWidget({ info }) {
  const refresh = useRefresh();
  const [focused, setFocused] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    async function getData() {
      const newToken = await refresh();
      const response = await axios.get("/users/basicinfo", {
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
      });
      setUser(response["data"]);
    }
    getData();
  }, []);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <Card variant="outlined" sx={{ mt: "1rem", borderRadius: 3 }}>
      {user ? (
        <>
          <CardHeader
            title={info[1] + " comments"}
            action={<Button startIcon={<SortIcon />}>Filter</Button>}
            sx={{ pb: 0 }}
          />
          <CardActions
            sx={{
              display: "flex",
              alignItems: "flex-end",
              pt: 0,
              pb: 1,
              mx: 2,
            }}
          >
            <Avatar sx={{ width: 24, height: 24, bgcolor: "red" }}>
              {user.username.charAt(0).toUpperCase()}
            </Avatar>
            <TextField
              label="Write a comment"
              variant="standard"
              sx={{ width: "100%" }}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </CardActions>
          {focused && (
            <CardActions sx={{ pt: 1, pb: 5, mx: 6 }}>
              <Button variant="outlined" size="small">
                Cancel
              </Button>
              <Button variant="outlined" size="small" disabled={!inputValue}>
                Post
              </Button>
            </CardActions>
          )}
        </>
      ) : (
        <Typography>Sign in to comment</Typography>
      )}
    </Card>
  );
}
