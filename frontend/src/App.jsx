import { Routes , Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
// import EditorPage from './pages/EditorPage';
import Editor from './pages/Editor'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute';
import SignIn from './pages/SignIn';
import Login from './pages/Login';

const App = () => {
  

  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />

        <Route path="/edit/:projectId/folder/:folderId" element={
          <ProtectedRoute>
            <Editor />
          </ProtectedRoute>}
           />
      </Routes>

      <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"  // 👈 light, dark, colored options hain
    />
    </>
  )
}

export default App;