// src/features/tasks/DynamicTaskItem.tsx
import React from 'react';
import { ListItem, ListItemButton, ListItemIcon, Checkbox, ListItemText, IconButton, TextField } from '@mui/material';
import { Delete, Edit, Save, Cancel } from '@mui/icons-material';

interface DynamicTaskItemProps {
  id: number;
  text: string;
  checked: boolean;
  handleToggle: (taskId: number) => void;
  handleDelete: (taskId: number) => void;
  handleEdit: (value: string) => void;
  onEdit: () => void;
  isEditing: boolean;
  editedText: string;
  onSave: (taskId: number, editedText: string) => void;
  onCancel: () => void;
}

const DynamicTaskItem: React.FC<DynamicTaskItemProps> = ({
  id,
  text,
  checked,
  handleToggle,
  handleDelete,
  handleEdit,
  onEdit,
  isEditing,
  editedText,
  onSave,
  onCancel
}) => {
  const textDecorationStyle = checked ? 'line-through' : 'none';
  return (
    <ListItem key={id} disablePadding>
      <ListItemButton role={undefined} onClick={() => handleToggle(id)} dense>
        <ListItemIcon>
          <Checkbox edge="start" checked={checked} tabIndex={-1} disableRipple />
        </ListItemIcon>
        {isEditing ? (
          <TextField
            value={editedText}
            onChange={(e) => handleEdit(e.target.value)} // Call onSave when edited
            label="Edit task"
            fullWidth
            variant="outlined"
          />
        ) : (
          <ListItemText primary={text} style={{ textDecoration: textDecorationStyle }} />
        )}
      </ListItemButton>
      {isEditing ? (
        <>
        <IconButton onClick={() => onSave(id, editedText)} aria-label="save">
          <Save />
        </IconButton>
          <IconButton onClick={onCancel} aria-label="cancel">
            <Cancel />
          </IconButton></>
      ) : (
        <>
          <IconButton onClick={onEdit} aria-label="edit">
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDelete(id)} aria-label="delete">
            <Delete />
          </IconButton>
        </>
      )}
    </ListItem>
  );
};

export default DynamicTaskItem;