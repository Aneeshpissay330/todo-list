import {
  Add,
  Delete,
  Edit,
  RadioButtonChecked,
  RadioButtonUnchecked
} from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  ThemeProvider,
  Typography,
  createTheme
} from "@mui/material";
import React from "react";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins"].join(","),
  },
});

function App() {
  const [checked, setChecked] = React.useState<number[]>([]);

  const handleToggle = (value: any) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container flexDirection="row" justifyContent="center">
        <Grid container flexDirection="column" alignItems="center">
          <Grid item sx={{ my: 3 }}>
            <Typography variant="h4">Todo List</Typography>
          </Grid>
        </Grid>
        <TextField
          label="Create a new todo"
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => console.log("add")}>
                  <Add />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            maxHeight: window.innerHeight * 0.55,
            overflow: "auto",
            mt: 2
          }}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <>
                <ListItem
                  key={value}
                  secondaryAction={
                    <Grid container flexDirection="row" gap={3}>
                      <IconButton edge="end" aria-label="comments">
                        <Edit />
                      </IconButton>
                      <IconButton edge="end" aria-label="comments">
                        <Delete />
                      </IconButton>
                    </Grid>
                  }
                  disablePadding
                >
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(value)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        icon={<RadioButtonUnchecked />}
                        checkedIcon={<RadioButtonChecked />}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={`Line item ${value + 1}`}
                      sx={{
                        textDecorationLine:
                          checked.indexOf(value) !== -1
                            ? "line-through"
                            : "none",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            );
          })}
        </List>
        <Grid container sx={{ m: 2 }} justifyContent="space-between">
          <Typography>{10 - checked.length} items left</Typography>
          <Button sx={{ p: 0 }}>Clear completed</Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
