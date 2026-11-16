import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home/Home';
import FindResults from '@/pages/FindResults';
import UniversityDetails from '@/pages/UniversityDetails';
import ComingSoon from '@/pages/ComingSoon';
import NotFound from '@/pages/NotFound';

const stub = (props) => <ComingSoon {...props} />;

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="find" element={<FindResults />} />
        <Route path="university/:id" element={<UniversityDetails />} />
        <Route path="department/:id" element={stub({ title: 'Department Details', phase: 'Phase 3' })} />
        <Route path="compare" element={stub({ title: 'Compare Universities', phase: 'Phase 5' })} />
        <Route path="international" element={stub({ title: 'International Universities', phase: 'Phase 3' })} />
        <Route path="preparation" element={stub({ title: 'Admission Preparation', phase: 'Phase 7' })} />
        <Route path="dashboard" element={stub({ title: 'Student Dashboard', phase: 'Phase 5' })} />
        <Route path="login" element={stub({ title: 'Log in', phase: 'Phase 2' })} />
        <Route path="signup" element={stub({ title: 'Sign up', phase: 'Phase 2' })} />
        <Route path="admin" element={stub({ title: 'Admin Dashboard', phase: 'Phase 6' })} />
        <Route path="about" element={stub({ title: 'About UniMatch' })} />
        <Route path="contact" element={stub({ title: 'Contact Us' })} />
        <Route path="faq" element={stub({ title: 'FAQ' })} />
        <Route path="privacy" element={stub({ title: 'Privacy Policy' })} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
