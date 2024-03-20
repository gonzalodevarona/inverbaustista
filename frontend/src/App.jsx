import './App.css'
import theme from './utils/theme'
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, Typography, Button } from "@mui/material";
import { getLocalData } from './utils/CommonFunctions';
import Constants from './utils/Constants';
import ProtectedRoute from './utils/ProtectedRoute';
import PersonalInfo from './views/PaymentForm/PersonalInfo';
import Checkout from './views/PaymentForm/Checkout';
import Result from './views/Payment/Result';
import Raffles from './views/Raffles';
import SingleRaffle from './views/SingleRaffle';
import Landing from './views/Landing';
import Header from './layout/Header';
import SideMenu from './layout/SideMenu';
import Footer from './layout/Footer';
import Dashboard from './views/ISC/Dashboard';
import ManageRaffle from './views/ISC/ManageRaffle';
import ManageTicket from './views/ISC/ManageTicket';
import ManageClient from './views/ISC/ManageClient';
import FormRaffle from './views/ISC/ManageRaffle/FormRaffle';
import FormTickets from './views/ISC/ManageTicket/FormTickets';
import { useNavigate } from 'react-router-dom';
import IscLayout from './layout/IscLayout';
import MainLayout from './layout/MainLayout';
import Login from './views/ISC/Login';


function App() {



  return (
    <ThemeProvider theme={theme}>

      <Router >

        <Routes>
          <Route element={<MainLayout />}>
            <Route path="*" element={<Typography variant='p'>Error 404: No hay nada aqui!</Typography>} />
            <Route
              path="/"
              element={
                <Landing />
              }
            />

            <Route
              path="/raffles"
              element={
                <Raffles />
              }
            />

            <Route
              path="/raffle/:id"
              element={
                <SingleRaffle />
              }
            />

            <Route
              path="/info/:id/:quantity"
              element={
                <PersonalInfo />
              }
            />
            <Route
              path="/checkout"
              element={
                <Checkout />
              }
            />

            <Route
              path="/pay/result"
              element={
                <Result />
              }
            />

          </Route>


          <Route
            path="/isc/login"
            element={
              <Login />
            }
          />

          <Route element={<IscLayout />}>
            <Route
              path="/isc/dashboard"
              element={
                <ProtectedRoute>
                  <>

                    <Dashboard />
                  </>
                </ProtectedRoute>
              }
            />

            <Route
              path="/isc"
              element={
                <ProtectedRoute>
                  <>
                    <Navigate to="/isc/dashboard" replace />
                  </>
                </ProtectedRoute>
              }
            />

            <Route
              path="/isc/raffle"
              element={
                <ProtectedRoute>
                  <>

                    <ManageRaffle />
                  </>
                </ProtectedRoute>
              }



            />

            <Route
              path="/isc/raffle/create"
              element={
                <ProtectedRoute>
                  <>
                    <FormRaffle mode={"create"} />
                  </>
                </ProtectedRoute>
              }

            />

            <Route
              path="/isc/raffle/edit/:id"
              element={
                <ProtectedRoute>
                  <>
                    <FormRaffle mode={"edit"} />
                  </>
                </ProtectedRoute>
              }

            />


            <Route
              path="/isc/ticket"
              element={
                <ProtectedRoute>
                  <>
                    <ManageTicket />
                  </>
                </ProtectedRoute>
              } />

            <Route
              path="/isc/ticket/edit"
              element={
                <ProtectedRoute>
                  <>
                    <FormTickets />
                  </>
                </ProtectedRoute>
              } />

            <Route
              path="/isc/client"
              element={
                <ProtectedRoute>
                  <>
                    <ManageClient />
                  </>
                </ProtectedRoute>
              }

            />

          </Route>

        </Routes>

      </Router>

    </ThemeProvider>
  )
}

export default App
