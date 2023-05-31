import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Pnf from "./Components/pnf/PNF";
import Allchats from "./Components/All-chats/Allchats";
import Allgroups from "./Components/All-groups/Allgropus";
import Profile from "./Components/Profile/Profile";
import Chat from "./Components/Chat/Chat";

function App() {
 
  return (
  <BrowserRouter>
   <Routes>
     <Route path="/" element={<Login></Login>}></Route>
     <Route path="/signup" element={<Signup></Signup>}></Route>
     <Route path="/home/chats" element={<Allchats></Allchats>}></Route>
     <Route path="/home/groups" element={<Allgroups></Allgroups>}></Route>
     <Route path="/home/profile" element={<Profile></Profile>}></Route>
     <Route path="/home/chats/:id" element={<Chat></Chat>}></Route>
     <Route path="*" element={<Pnf></Pnf>}></Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
