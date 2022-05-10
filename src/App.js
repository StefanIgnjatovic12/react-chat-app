import ChatContainer from "./components/ChatContainer";

import {
    BrowserRouter as Router, Routes, Route,
} from "react-router-dom";
import SignUp from "./components/UserAuth/SignUp";
import SignIn from "./components/UserAuth/SignIn";
import {CurrentUserProvider} from "./context/CurrentUserContext";
import {ActiveConvoProvider} from "./context/ActiveConvoContext";

function App() {

    return (
        <CurrentUserProvider>
            <ActiveConvoProvider>
                <Router>
                    <Routes>
                        <Route>

                            <Route path="chat" element={<ChatContainer/>}/>

                            <Route path="signup" element={<SignUp/>}/>
                            <Route path="signin" element={<SignIn/>}/>
                            <Route path="/" element={<SignIn/>}/>

                        </Route>
                    </Routes>
                </Router>
            </ActiveConvoProvider>
        </CurrentUserProvider>

    );
}

export default App;