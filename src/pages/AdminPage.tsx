import React from 'react';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { useFairShiftStore } from '../hooks/useFairShiftStore';

interface AdminPageProps {
  store: ReturnType<typeof useFairShiftStore>;
  onNavigateToWorkerUI: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ store, onNavigateToWorkerUI }) => {
  const {
    currentLocalizedSectorConfig,
    workers,
    shifts,
    logs,
    language,
    setActiveWorkerId,
  } = store;

  const handleSelectWorkerForPreview = (workerId: string) => {
    setActiveWorkerId(workerId);
    onNavigateToWorkerUI();
  };

  return (
    <AdminDashboard
      sectorConfig={currentLocalizedSectorConfig}
      workers={workers}
      shifts={shifts}
      logs={logs}
      language={language}
      onSelectWorkerForPreview={handleSelectWorkerForPreview}
      onNavigateToWorkerUI={onNavigateToWorkerUI}
    />
  );
};
