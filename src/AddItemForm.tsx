import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
            props.addItem(newTaskTitle);
            setNewTitle("");
        }
    }
    const [error, setError] = useState<string | null>(null);
    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle.trim());
            setNewTitle("");
        } else {
            setError("Fiel is required")
        }
    };
    return (
        <div>
            <input type="text"
                   value={newTaskTitle}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTaskHandler}>+</button>
            {error && <div className="errorMessage">Field is required</div>}
        </div>
    )
}