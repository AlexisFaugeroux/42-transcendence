import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { JSX } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RequireAuth } from './auth/RequireAuth';
import { AppLayout } from './layout/AppLayout';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Following } from './pages/Following/Following';
import { Home } from './pages/Home/Home';
import { Landing } from './pages/Landing/Landing';
import { Legal } from './pages/Legal/Legal';
import Login from './pages/Login/Login';
import { Messages } from './pages/Messages/Messages';
import { NotFound } from './pages/NotFound/NotFound';
import { Privacy } from './pages/Privacy/Privacy';
import { ProducerProfile } from './pages/Producers/ProducerProfile';
import { Producers } from './pages/Producers/Producers';
import Register from './pages/Register/Register';
import { Samples } from './pages/Samples/Samples';
import { Sessions } from './pages/Sessions/Sessions';
import { Terms } from './pages/Terms/Terms';
import { Tracks } from './pages/Tracks/Tracks';

const queryClient = new QueryClient();

export function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/legal" element={<Legal />} />
          <Route element={<RequireAuth />}>
            <Route element={<AppLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/library" element={<Samples />} />
              <Route path="/tracks" element={<Tracks />} />
              <Route path="/sessions" element={<Sessions />} />
              <Route path="/settings" element={<Dashboard />} />
              <Route path="/producers" element={<Producers />} />
              <Route path="/producers/:handle" element={<ProducerProfile />} />
              <Route path="/following" element={<Following />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/messages/:conversationId" element={<Messages />} />
              {/*
              <Route path="/exports" element={<Exports />} />
              <Route path="/liked" element={<Liked />} />
              <Route path="/playlists" element={<Playlists />} />
              */}
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      {import.meta.env.DEV ? <ReactQueryDevtools initialIsOpen={false} /> : null}
    </QueryClientProvider>
  );
}
export default App;
