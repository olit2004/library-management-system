import React from 'react'
import DashboardLayout from './components/layout/DashBoardLayout'
import Discover from './pages/Member/Discover'
import { AuthProvider } from './hooks/useAuth.jsx'
import MyLoans from './pages/Member/MyLoans.jsx'
import Reservations from "./pages/Member/Reservations.jsx"
import History from './pages/Member/History.jsx'

function App() {
  return (
  

    <AuthProvider >
        <div>
            <DashboardLayout>
            </DashboardLayout>
        </div>
    </AuthProvider>
  )
}

export default App



