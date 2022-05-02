

import ChatContainer from "./components/ChatContainer";

import {
    BrowserRouter as Router, Routes, Route,
} from "react-router-dom";
import SignUp from "./components/UserAuth/SignUp";
import SignIn from "./components/UserAuth/SignIn";

function App() {

    return (
        <Router>
            <Routes>
                <Route>
                    <Route path="chat" element={<ChatContainer/>}/>
                    <Route path="signup" element={<SignUp/>}/>
                    <Route path="signin" element={<SignIn/>}/>

                </Route>
            </Routes>
        </Router>

    );
}

export default App;