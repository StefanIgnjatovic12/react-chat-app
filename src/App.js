

import ChatContainer from "./components/ChatContainer";

import {
    BrowserRouter as Router, Routes, Route,
} from "react-router-dom";
import SignUp from "./components/UserAuth/SignUp";
import SignIn from "./components/UserAuth/SignIn";
import {CurrentUserProvider} from "./context/CurrentUserContext";

function App() {

    return (
        <CurrentUserProvider>
        <Router>
            <Routes>
                <Route>
                    <Route path="chat" element={<ChatContainer/>}/>
                    <Route path="signup" element={<SignUp/>}/>
                    <Route path="signin" element={<SignIn/>}/>

                </Route>
            </Routes>
        </Router>
        </CurrentUserProvider>

    );
}

export default App;