import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import TasksPage from './pages/TasksPage';
import ProfilePage from './pages/ProfilePage';
import TaskFormPage from './pages/TaskFormPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './ProtectedRoute';
import { TaskProvider } from './context/TasksContext';
import Navbar from "./components/Navbar"

function App() {
  return (
    <AuthProvider> {/* Todos los elementos dentro de este, tienen acceso al contexto */}
      <TaskProvider>
        <BrowserRouter>
       
       <main className='container mx-auto px-10'>
       <Navbar/>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Rutas privadas */}
            <Route element={<ProtectedRoute />}>  {/* Este elemento padre hereda sus características a sus hijos*/}

              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/add-task" element={<TaskFormPage />} />
              <Route path="/task/:id" element={<TaskFormPage />} />
              <Route path="/profile" element={<ProfilePage />} />

            </Route>

          </Routes>

       </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App;