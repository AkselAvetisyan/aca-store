import { auth } from "../../firebase/Firebase";


export function authChanged() {
    return function (dispatch) {
        auth.onAuthStateChanged(user => {
            dispatch({
                type: LOGGED_IN,
                currentUser: user
            })
        })
    }
}
