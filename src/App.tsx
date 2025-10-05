import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import DocumentationHub from './pages/DocumentationHub';
import WorkflowExplorer from './pages/WorkflowExplorer';
import ArchitectureViewer from './pages/ArchitectureViewer';
import ImplementationGuide from './pages/ImplementationGuide';
import PlatformAnalysis from './pages/PlatformAnalysis';
import DownloadCenter from './pages/DownloadCenter';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/documentation" element={<DocumentationHub />} />
            <Route path="/workflows" element={<WorkflowExplorer />} />
            <Route path="/architecture" element={<ArchitectureViewer />} />
            <Route path="/implementation" element={<ImplementationGuide />} />
            <Route path="/analysis" element={<PlatformAnalysis />} />
            <Route path="/downloads" element={<DownloadCenter />} />
          </Routes>
        </Layout>
        <Toaster position="top-right" />
      </Router>
    </ThemeProvider>
  );
}

export default App;