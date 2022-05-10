import ChatContainer from "./components/ChatContainer";

import {
    BrowserRouter as Router, Routes, Route,
} from "react-router-dom";
import SignUp from "./components/UserAuth/SignUp";
import SignIn from "./components/UserAuth/SignIn";
import {CurrentUserProvider} from "./context/CurrentUserContext";
import {NewestConvoProvider} from "./context/NewestConvoContext";

function App() {

    return (
        <CurrentUserProvider>
            <NewestConvoProvider>
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
            </NewestConvoProvider>
        </CurrentUserProvider>

    );
}

export default App;