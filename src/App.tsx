/**
 * FairShift - UN SDG 8 Decent Work Platform
 * Mobile-first application for shift workers and employers across Construction and Healthcare.
 */

import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { HomeScreen } from './pages/HomeScreen';
import { WorkerPage } from './pages/WorkerPage';
import { AdminPage } from './pages/AdminPage';
import { useFairShiftStore } from './hooks/useFairShiftStore';
import { getTranslations } from './i18n';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'worker' | 'admin'>('home');
  const store = useFairShiftStore();
  const t = getTranslations(store.language);

  return (
    <div
      data-sector={store.activeSectorId}
      className="min-h-screen bg-[#FAF6EF] text-[#1F2421] flex flex-col font-sans antialiased selection:bg-amber-200"
    >
      {/* Universal Top Header */}
      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
        activeSectorId={store.activeSectorId}
        onSelectSector={store.setActiveSectorId}
        language={store.language}
        onSelectLanguage={store.setLanguage}
        onResetDemoData={store.resetToDemoData}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-12" id="main-content">
        {currentView === 'home' && (
          <HomeScreen
            activeSectorConfig={store.currentLocalizedSectorConfig}
            onSelectSector={store.setActiveSectorId}
            language={store.language}
            onSelectLanguage={store.setLanguage}
            onSelectRole={(role) => setCurrentView(role)}
          />
        )}

        {currentView === 'worker' && <WorkerPage store={store} />}

        {currentView === 'admin' && (
          <AdminPage
            store={store}
            onNavigateToWorkerUI={() => setCurrentView('worker')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <p className="text-slate-200 font-bold">
              {t.footerSdgTitle}
            </p>
            <p className="text-slate-400">
              {t.footerSdgDesc}
            </p>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <button
              onClick={() => setCurrentView('home')}
              className="hover:text-white underline focus:outline-hidden focus:ring-1 focus:ring-white rounded px-1 cursor-pointer"
            >
              {t.home}
            </button>
            <button
              onClick={() => setCurrentView('worker')}
              className="hover:text-white underline focus:outline-hidden focus:ring-1 focus:ring-white rounded px-1 cursor-pointer"
            >
              {t.workerTitle}
            </button>
            <button
              onClick={() => setCurrentView('admin')}
              className="hover:text-white underline focus:outline-hidden focus:ring-1 focus:ring-white rounded px-1 cursor-pointer"
            >
              {t.adminTitle}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
