import React, {ChangeEvent, useState} from "react";

type EditableSpanType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanType) {
    let [editMode, seteditMode] = useState(false)
    let [title, setTitle] = useState("")
    const activateEditMode = () => {
        seteditMode(true);
        setTitle(props.title)
    }
    const activateViewMode = () => {
        seteditMode(false);
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (

        editMode ? <input value={title}
                          onBlur={activateViewMode}
                          autoFocus
                          onChange={onChangeTitleHandler}/> :
            <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}