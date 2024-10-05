import { createSlice } from "@reduxjs/toolkit"



interface Initial {
    editDialog : boolean,
    usernameEdit : boolean,
    passwordEdit : boolean,
}

const initialState : Initial = {
    editDialog : false,
    usernameEdit : false,
    passwordEdit : false,
}   


const slice = createSlice({
    name : "misc",
    initialState,
    reducers : {
        setEditDialogOpen(state) {
            state.editDialog = true;
        },
        setEditDialogClose(state) {
            state.editDialog = false;
        },
        setUsernameEditTrue(state) {
            state.usernameEdit = true;
        },
        setUsernameEditFalse(state) {
            state.usernameEdit = false;
        }
    }
})

export const {setEditDialogClose,setEditDialogOpen} = slice.actions;

export default slice.reducer;