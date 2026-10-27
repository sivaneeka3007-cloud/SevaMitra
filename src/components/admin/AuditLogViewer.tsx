import React, { useState } from 'react';
import { Search, ShieldCheck, Hash, ArrowUpRight, ArrowDownLeft, FileText } from 'lucide-react';
import { TimeLogEvent } from '../../types';

interface AuditLogViewerProps {
  logs: TimeLogEvent[];
  sectorName: string;
}

export const AuditLogViewer: React.FC<AuditLogViewerProps> = ({ logs, sectorName }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = logs
    .filter((log) => {
      const q = searchTerm.toLowerCase();
      return (
        log.workerName.toLowerCase().includes(q) ||
        log.receiptCode.toLowerCase().includes(q) ||
        log.hash.toLowerCase().includes(q) ||
        log.group.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="bg-white rounded-2xl border-2 border-[#E6DCBF] p-6 shadow-xs space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-[#FAF6EF]">
        <div>
          <div className="flex items-center gap-2 text-[#0E8373] text-xs font-black uppercase tracking-wider">
            <ShieldCheck className="w-5 h-5 text-[#0E8373]" />
            <span>Append-Only Tamper-Evident Ledger</span>
          </div>
          <h3 className="text-2xl font-black text-[#1F2421] mt-1">
            Worker Time Event Audit Trail
          </h3>
          <p className="text-xs font-bold text-[#585A56] mt-0.5">
            Cryptographically chained check-in & check-out receipts for {sectorName}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-5 h-5 text-[#585A56] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search worker, receipt, or hash..."
            className="w-full min-h-[48px] pl-11 pr-3.5 py-2.5 bg-[#FAF6EF] border-2 border-[#D4C5A5] rounded-xl text-sm font-bold text-[#1F2421] focus:border-[#D9531E]"
          />
        </div>
      </div>

      {filteredLogs.length === 0 ? (
        <div className="text-center py-12 text-[#585A56] text-sm font-bold">
          No audit logs matching "{searchTerm}".
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-[#E6DCBF] text-[#585A56] font-black uppercase tracking-wider text-xs bg-[#FAF6EF]">
                <th className="py-3 px-3.5">Time</th>
                <th className="py-3 px-3.5">Worker</th>
                <th className="py-3 px-3.5">Action</th>
                <th className="py-3 px-3.5">Location</th>
                <th className="py-3 px-3.5">Receipt Code</th>
                <th className="py-3 px-3.5">Ledger Signature</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6DCBF]">
              {filteredLogs.slice(0, 25).map((log) => {
                const isCheckIn = log.eventType === 'CHECK_IN';
                return (
                  <tr key={log.id} className="hover:bg-[#FAF6EF]/60 transition-colors">
                    <td className="py-3.5 px-3.5 font-mono text-[#585A56] whitespace-nowrap text-xs">
                      {new Date(log.timestamp).toLocaleString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-3.5 px-3.5 font-black text-[#1F2421] whitespace-nowrap">
                      {log.workerName}
                    </td>
                    <td className="py-3.5 px-3.5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 font-black text-xs px-2.5 py-1 rounded-full border ${
                          isCheckIn
                            ? 'bg-[#DCFCE7] text-[#166534] border-[#86EFAC]'
                            : 'bg-[#F3F4F6] text-[#374151] border-[#D1D5DB]'
                        }`}
                      >
                        {isCheckIn ? (
                          <ArrowDownLeft className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        )}
                        {log.eventType}
                      </span>
                    </td>
                    <td className="py-3.5 px-3.5 text-[#585A56] font-bold whitespace-nowrap">
                      {log.group}
                    </td>
                    <td className="py-3.5 px-3.5 font-mono font-black text-[#1F2421] whitespace-nowrap">
                      <span className="bg-[#FAF6EF] border border-[#D4C5A5] px-2.5 py-1 rounded-md text-xs">
                        {log.receiptCode}
                      </span>
                    </td>
                    <td className="py-3.5 px-3.5 font-mono text-xs text-[#585A56] whitespace-nowrap">
                      <span title={log.hash}>{log.hash.slice(0, 14)}...</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
