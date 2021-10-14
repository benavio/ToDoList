import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "@mui/material";
import {IconButton, TextField} from "@material-ui/core";
import AddIcon from '@mui/icons-material/Add';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTitle] = useState("");
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            if (newTaskTitle.trim() !== "") {
                props.addItem(newTaskTitle.trim());
                setNewTitle("");
            } else {
                setError("Field is required")
            }
        }
    }
    const [error, setError] = useState<string | null>(null);
    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle.trim());
            setNewTitle("");
        } else { setError("Field is required") }
    };
    return (
        <div>
            <TextField type="text" id="standard-basic" variant="outlined" label="Type value:"
                   value={newTaskTitle}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={!!error}
                   helperText={error}
            />
            <IconButton onClick={addTaskHandler} color={'primary'}><AddIcon /></IconButton>
        </div>
    )
}