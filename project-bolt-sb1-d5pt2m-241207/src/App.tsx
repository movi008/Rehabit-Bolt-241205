import { Routes, Route } from 'react-router-dom';
import { useAppSelector } from './hooks';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Upgrade } from './pages/Upgrade';
import { Profile } from './pages/Profile';
import { Subscription } from './pages/Subscription';
import { Settings } from './pages/Settings';
import { CreateVision } from './pages/CreateVision';
import { PublicHome } from './pages/PublicHome';
import { Start } from './pages/Start';
import { TV } from './pages/TV';
import { InviteMembers } from './pages/InviteMembers';
import { Referrals } from './pages/Referrals';
import { ManageVision } from './pages/ManageVision';
import { AffirmationCreate } from './pages/products/AffirmationCreate';
import { MantraCreate } from './pages/products/MantraCreate';
import { VisualizationCreate } from './pages/products/VisualizationCreate';
import { AvatarCreate } from './pages/products/AvatarCreate';
import { MeditationCreate } from './pages/products/MeditationCreate';
import { ManifestoCreate } from './pages/products/ManifestoCreate';
import { ScenesCreate } from './pages/products/ScenesCreate';
import { ShotCreate } from './pages/products/ShotCreate';
import { ClipCreate } from './pages/products/ClipCreate';
import { TrailerCreate } from './pages/products/TrailerCreate';
import { SessionCreate } from './pages/products/SessionCreate';
import { BoardCreate } from './pages/products/BoardCreate';
import { Create } from './pages/Create';
import { Sessions } from './pages/Sessions';
import { Teams } from './pages/Teams';
import { Surveys } from './pages/Surveys';
import { Developer } from './pages/Developer';
import { ProjectDashboard } from './pages/ProjectDashboard';
import { Journal } from './pages/Journal';
import { Editor } from './pages/Editor';
import { Habits } from './pages/Habits';
import { Images } from './pages/media/Images';
import { Documents } from './pages/media/Documents';
import { Audio } from './pages/media/Audio';
import { Videos } from './pages/media/Videos';
import { Library } from './pages/media/Library';
import { Windows } from './pages/Windows';
import { Help } from './pages/Help';
import { Privacy } from './pages/help/Privacy';
import { Terms } from './pages/help/Terms';
import { Changelog } from './pages/help/Changelog';
import { BoltChangelog } from './components/help/BoltChangelog';
import { Roadmap } from './pages/help/Roadmap';
import { PersonaGraph } from './pages/personas/PersonaGraph';
import { PersonaProfile } from './pages/personas/PersonaProfile';
import { PersonaMotivations } from './pages/personas/PersonaMotivations';
import { PersonaPersonality } from './pages/personas/PersonaPersonality';

export default function App() {
  const theme = useAppSelector(state => state.ui.theme);

  return (
    <ErrorBoundary>
      <div className={theme}>
        <Routes>
          <Route path="/login" element={<PublicHome />} />
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/start" element={<Layout><Start /></Layout>} />
          <Route path="/projects" element={<Layout><Projects /></Layout>} />
          <Route path="/projects/:id" element={<Layout><ProjectDashboard /></Layout>} />
          <Route path="/upgrade" element={<Layout><Upgrade /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/subscription" element={<Layout><Subscription /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          <Route path="/create" element={<Layout><Create /></Layout>} />
          <Route path="/create/vision" element={<Layout><CreateVision /></Layout>} />
          <Route path="/create/affirmation" element={<Layout><AffirmationCreate /></Layout>} />
          <Route path="/create/mantra" element={<Layout><MantraCreate /></Layout>} />
          <Route path="/create/visualization" element={<Layout><VisualizationCreate /></Layout>} />
          <Route path="/create/avatar" element={<Layout><AvatarCreate /></Layout>} />
          <Route path="/create/meditation" element={<Layout><MeditationCreate /></Layout>} />
          <Route path="/create/manifesto" element={<Layout><ManifestoCreate /></Layout>} />
          <Route path="/create/scenes" element={<Layout><ScenesCreate /></Layout>} />
          <Route path="/create/shot" element={<Layout><ShotCreate /></Layout>} />
          <Route path="/create/clip" element={<Layout><ClipCreate /></Layout>} />
          <Route path="/create/trailer" element={<Layout><TrailerCreate /></Layout>} />
          <Route path="/create/session" element={<Layout><SessionCreate /></Layout>} />
          <Route path="/create/board" element={<Layout><BoardCreate /></Layout>} />
          <Route path="/tv" element={<TV />} />
          <Route path="/invite-members" element={<Layout><InviteMembers /></Layout>} />
          <Route path="/referrals" element={<Layout><Referrals /></Layout>} />
          <Route path="/manage-vision/:id" element={<Layout><ManageVision /></Layout>} />
          <Route path="/sessions" element={<Layout><Sessions /></Layout>} />
          <Route path="/teams" element={<Layout><Teams /></Layout>} />
          <Route path="/surveys" element={<Layout><Surveys /></Layout>} />
          <Route path="/journal" element={<Layout><Journal /></Layout>} />
          <Route path="/habits" element={<Layout><Habits /></Layout>} />
          <Route path="/developer" element={<Layout><Developer /></Layout>} />
          <Route path="/editor" element={<Layout><Editor /></Layout>} />
          <Route path="/windows" element={<Layout><Windows /></Layout>} />
          {/* Persona Routes */}
          <Route path="/personas/graph" element={<Layout><PersonaGraph /></Layout>} />
          <Route path="/personas/profile" element={<Layout><PersonaProfile /></Layout>} />
          <Route path="/personas/motivations" element={<Layout><PersonaMotivations /></Layout>} />
          <Route path="/personas/personality" element={<Layout><PersonaPersonality /></Layout>} />
          {/* Media Library Routes */}
          <Route path="/media/images" element={<Layout><Images /></Layout>} />
          <Route path="/media/documents" element={<Layout><Documents /></Layout>} />
          <Route path="/media/audio" element={<Layout><Audio /></Layout>} />
          <Route path="/media/videos" element={<Layout><Videos /></Layout>} />
          <Route path="/media/library" element={<Layout><Library /></Layout>} />
          {/* Help Routes */}
          <Route path="/help" element={<Layout><Help /></Layout>} />
          <Route path="/help/privacy" element={<Layout><Privacy /></Layout>} />
          <Route path="/help/terms" element={<Layout><Terms /></Layout>} />
          <Route path="/help/changelog" element={<Layout><Changelog /></Layout>} />
          <Route path="/help/changelog/bolt" element={<Layout><BoltChangelog /></Layout>} />
          <Route path="/help/roadmap" element={<Layout><Roadmap /></Layout>} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
}