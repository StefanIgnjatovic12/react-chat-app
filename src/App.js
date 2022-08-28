// import ChatContainer, {ChatBackground} from "./components/ChatContainer";
import React, {Suspense} from "react";
import {
    BrowserRouter as Router, Routes, Route,
} from "react-router-dom";
import SignUp from "./components/UserAuth/SignUp";
import SignIn from "./components/UserAuth/SignIn";
import SignOut from "./components/UserAuth/SignOut";
import Profile from "./components/UserProfile/Profile";
import {CurrentUserProvider} from "./context/CurrentUserContext";
import {ActiveConvoProvider} from "./context/ActiveConvoContext";
import {ImageUploadDataProvider} from "./context/ImageUploadDataContext";
import {CreateNewChatProvider} from "./context/CreateNewChatContext";
import {TogglerStateProvider} from "./context/TogglerStateContext";
import {ProfileInfoProvider} from "./context/ProfileInfoContext";
import RequireAuth from "./components/UserAuth/RequireAuth";
import {ChatBackground} from "./components/ChatContainer";
import {BeatLoader} from "react-spinners";

const ChatContainer = React.lazy(() => {
  return Promise.all([
    import('./components/ChatContainer'),
    new Promise(resolve => setTimeout(resolve, 1000))
  ])
  .then(([moduleExports]) => moduleExports);
});


function App() {

    return (
        <CurrentUserProvider>
            <ActiveConvoProvider>
                <ImageUploadDataProvider>
                    <CreateNewChatProvider>
                        <TogglerStateProvider>
                            <ProfileInfoProvider>
                                <Router>
                                    <Routes>
                                        <Route>
                                            <Route element={<RequireAuth/>}>
                                                <Route path="chat" element={
                                                    <Suspense fallback={<ChatBackground><BeatLoader/></ChatBackground>}>
                                                        <ChatBackground>
                                                            <ChatContainer/>
                                                        </ChatBackground>
                                                    </Suspense>
                                                }/>
                                                <Route path="profile" element={<Profile/>}/>
                                                <Route path="signout" element={<SignOut/>}/>
                                            </Route>
                                            <Route path="signup" element={<SignUp/>}/>
                                            <Route path="signin" element={<SignIn/>}/>
                                            <Route path="/" element={<SignIn/>}/>
                                        </Route>
                                    </Routes>
                                </Router>
                            </ProfileInfoProvider>
                        </TogglerStateProvider>
                    </CreateNewChatProvider>
                </ImageUploadDataProvider>
            </ActiveConvoProvider>
        </CurrentUserProvider>

    );
}

export default App;