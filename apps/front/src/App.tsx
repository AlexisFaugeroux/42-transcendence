import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { JSX } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RequireAuth } from './auth/RequireAuth';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Home } from './pages/Home/Home';
import { Landing } from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

const queryClient = new QueryClient();

export function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<RequireAuth />}>
            <Route path="/home" element={<Home />} />
            <Route path="/settings" element={<Dashboard />} />
          </Route>

          {/*
          <Route element={<AppLayout />}>
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/samples" element={<Samples />} />
            <Route path="/exports" element={<Exports />} />
            <Route path="/following" element={<Following />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/liked" element={<Liked />} />
            <Route path="/playlists" element={<Playlists />} />
          </Route>
        */}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
export default App;
