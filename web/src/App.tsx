import { Box, Stack } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import Header from "./components/Header";
import Login from "./layouts/Login";
import { iContext, useAccount } from "./utils/useAccount";
import NotFound from "./layouts/NotFound";
import Users from "./layouts/Users";
import User from "./layouts/User";
import Questions from "./layouts/Questions";
import SingleQuestion from "./layouts/SingleQuestion";

function App() {
  const { sid }: iContext = useAccount();
  return (
    <div className="App">
      <Stack>
        {sid && <Header />}
        <Box p="5">
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users/:id"
                element={
                  <ProtectedRoute>
                    <User />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/questions"
                element={
                  <ProtectedRoute>
                    <Questions />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/questions/:id"
                element={
                  <ProtectedRoute>
                    <SingleQuestion />
                  </ProtectedRoute>
                }
              />

              {/* <Route path="teams" element={<Teams />}>
              <Route path=":teamId" element={<Team />} />
              <Route path="new" element={<NewTeamForm />} />
              <Route index element={<LeagueStandings />} />
            </Route> */}

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </Stack>
    </div>
  );
}

export default App;
