import ChatContainer from "./components/ChatContainer";

import {
    BrowserRouter as Router, Routes, Route,
} from "react-router-dom";
import SignUp from "./components/UserAuth/SignUp";
import SignIn from "./components/UserAuth/SignIn";
import SignOut from "./components/UserAuth/SignOut";
import Profile from "./components/UserProfile/Profile";
import {CurrentUserProvider} from "./context/CurrentUserContext";
import {ActiveConvoProvider} from "./context/ActiveConvoContext";
import {ProfileRevealProvider} from "./context/ProfileRevealContext";

function App() {

    return (
        <CurrentUserProvider>
            <ActiveConvoProvider>
                <ProfileRevealProvider>
                    <Router>
                        <Routes>
                            <Route>

                                <Route path="chat" element={<ChatContainer/>}/>
                                <Route path="signup" element={<SignUp/>}/>
                                <Route path="signin" element={<SignIn/>}/>
                                <Route path="signout" element={<SignOut/>}/>
                                <Route path="/" element={<SignIn/>}/>
                                <Route path="profile" element={<Profile/>}/>


                            </Route>
                        </Routes>
                    </Router>
                </ProfileRevealProvider>
            </ActiveConvoProvider>
        </CurrentUserProvider>

    );
}

export default App;