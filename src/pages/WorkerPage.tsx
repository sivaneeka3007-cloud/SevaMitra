import React from 'react';
import { WorkerDashboard } from '../components/worker/WorkerDashboard';
import { useFairShiftStore } from '../hooks/useFairShiftStore';

interface WorkerPageProps {
  store: ReturnType<typeof useFairShiftStore>;
}

export const WorkerPage: React.FC<WorkerPageProps> = ({ store }) => {
  const {
    currentWorker,
    workers,
    setActiveWorkerId,
    currentActiveShift,
    shifts,
    logs,
    currentLocalizedSectorConfig,
    language,
    currentPayslip,
    checkInWorker,
    checkOutWorker,
  } = store;

  return (
    <WorkerDashboard
      worker={currentWorker}
      allWorkers={workers}
      onSelectWorker={setActiveWorkerId}
      activeShift={currentActiveShift}
      shifts={shifts}
      logs={logs}
      sectorConfig={currentLocalizedSectorConfig}
      language={language}
      payslip={currentPayslip}
      onCheckIn={checkInWorker}
      onCheckOut={checkOutWorker}
      onSelectLanguage={store.setLanguage}
    />
  );
};
