import { BrowserRouter, Form, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import AllJobs from "./components/All-jobs/Alljobs";
import AppliedJobs from "./components/applied-jobs/Applied";
import Profile from "./components/profile/Profile";
import Editprofile from "./components/edit-profile/Editprofile";
import Forgot from "./components/forgot/Forgot";
import Pass from "./components/set-password/Pass";
import PostJobs from "./recruiter/postjob/Postjobs";
import YourJobs from "./recruiter/your-job/Yourjob";
import Interested from "./recruiter/interested/Interested";
import Recprofile from "./recruiter/profile/Profile";
import Editrecprofile from "./recruiter/edit-profile/Editprofile";
import Details from "./recruiter/job-details/Jobdetails";
import EditJob from "./recruiter/edit-job/Editjob";
import JobDetails from "./components/job-details/Jobdetails";
import AppliedDetails from "./components/applied-details/Applieddetails";
import Pnf from "./components/pagenotfound/Pnf";


function App() {
 
  return (
  <BrowserRouter>
   <Routes>
    <Route path="/signup" element={<Signup></Signup>}/>
    <Route path="/" element={<Login></Login>}/>
    <Route path="/home/alljobs" element={<AllJobs></AllJobs>}/>
    <Route path="/home/alljobs/details/:id" element={<JobDetails></JobDetails>}/>
    <Route path="/home/appliedjobs" element={<AppliedJobs></AppliedJobs>}/>
    <Route path="/home/profile" element={<Profile></Profile>}/>
    <Route path="/home/profile/edit" element={<Editprofile></Editprofile>}/>
    <Route path="/forgot" element={<Forgot></Forgot>}/>
    <Route path="/forgot/:id" element={<Pass></Pass>}/>
    <Route path="/rec/postjob" element={<PostJobs></PostJobs>}/>
    <Route path="/rec/yourjobs" element={<YourJobs></YourJobs>}/>
    <Route path="/rec/interested" element={<Interested></Interested>}/>
    <Route path="/rec/profile" element={<Recprofile></Recprofile>}/>
    <Route path="/rec/profile/edit" element={<Editrecprofile></Editrecprofile>}/>
    <Route path="/rec/yourjobs/details/:id" element={<Details></Details>}/>
    <Route path="/rec/yourjobs/details/edit/:id" element={<EditJob></EditJob>}/>
    <Route path="/home/appliedjobs/details/:id" element={<AppliedDetails></AppliedDetails>}/>
    <Route path="*" element={<Pnf></Pnf>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
