import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Box,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationDialog from "./ConfirmationDialog";
import { useConfirmationDialog } from "./useConfirmationDialog";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskDescription, setTaskDescription] = useState("");
  const [error, setError] = useState("");
  const { isOpen, dialogData, openDialog, closeDialog } =
    useConfirmationDialog();

  const addTask = () => {
    if (taskDescription.trim() === "") {
      setError("Task description cannot be empty!");
      return;
    }
    if (
      tasks.some(
        (task) =>
          task.description.toLowerCase() ===
          taskDescription.trim().toLowerCase()
      )
    ) {
      setError("Task description already exists! Please enter a unique task.");
      return;
    }
    setTasks([
      ...tasks,
      { id: tasks.length + 1, description: taskDescription, completed: false },
    ]);
    setTaskDescription("");
    setError("");
  };

  const handleDelete = () => {
    setTasks(tasks.filter((task) => task.id !== dialogData.id));
    closeDialog();
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        React To-Do List
      </Typography>

      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Enter a new task"
          placeholder="Enter a new task"
  variant="outlined"
  value={taskDescription}
          onChange={(e) => {
            setTaskDescription(e.target.value);
            setError("");
          }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={addTask}
        >
          Add Task
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <List>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            secondaryAction={
              <IconButton
                edge="end" 
                data-testid={`delete-task-${task.id}`}
                onClick={() =>
                  openDialog({
                    id: task.id,
                    description: task.description,
                  })
                }
              >
                <DeleteIcon />
              </IconButton>
            }
            sx={{
              backgroundColor: task.completed ? "#e0f7fa" : "#ffffff",
              mb: 1,
              borderRadius: 1,
              boxShadow: 1,
            }}
          >
            <Checkbox
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <ListItemText
              primary={task.description}
              data-testid={`task-text-${task.id}`}
              sx={{
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "gray" : "black",
              }}
            />
          </ListItem>
        ))}
      </List>

      {tasks.length === 0 && (
        <Typography variant="body1" color="textSecondary">
          No tasks available. Add a task to get started!
        </Typography>
      )}

      <ConfirmationDialog
        open={isOpen}
        onClose={closeDialog}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        content={`Are you sure you want to delete the task "${dialogData?.description}"? This action cannot be undone.`}
      />
    </Container>
  );
}

export default App;
