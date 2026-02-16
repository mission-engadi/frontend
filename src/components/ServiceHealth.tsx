'use client';

import { useQuery } from '@tanstack/react-query';
import { checkHealth } from '../../lib/api';
import { Activity, Server, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

/**
 * ServiceHealth Component - Neo-Brutalist Design
 *
 * Displays the health status of the platform services
 * with hard shadows, thick borders, and bold colors.
 */

export default function ServiceHealth() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['health'],
    queryFn: checkHealth,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 bg-white border-[3px] border-black shadow-[6px_6px_0px_#000]">
        <div className="animate-spin h-8 w-8 border-[3px] border-black border-t-[#0066FF]"></div>
        <span className="ml-3 text-black font-bold">Checking system status...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-[#FF3333]/10 border-[3px] border-[#FF3333] p-6 shadow-[6px_6px_0px_#FF3333]">
        <div className="flex items-center text-[#FF3333] mb-2">
          <AlertCircle className="w-5 h-5 mr-2" />
          <h3 className="font-bold">System Unreachable</h3>
        </div>
        <p className="text-black font-medium text-sm">
          Could not connect to the API Gateway. Please ensure the backend services are running.
        </p>
        <div className="mt-4 text-xs font-mono bg-[#FF3333]/20 p-3 border-[2px] border-[#FF3333]">
          {(error as Error).message}
        </div>
      </div>
    );
  }

  const isHealthy = data?.status === 'healthy';

  return (
    <div className="bg-white border-[3px] border-black shadow-[6px_6px_0px_#000] overflow-hidden">
      {/* Header */}
      <div className="bg-[#F5F5F5] px-6 py-4 border-b-[3px] border-black flex justify-between items-center">
        <h3 className="text-lg font-bold text-black flex items-center">
          <Activity className="w-5 h-5 mr-2 text-[#0066FF]" />
          System Status
        </h3>
        <span
          className={`inline-flex items-center px-4 py-2 border-[2px] border-black text-sm font-bold ${
            isHealthy
              ? 'bg-[#00CC66] text-white'
              : 'bg-[#FF3333] text-white'
          }`}
        >
          {isHealthy ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Operational
            </>
          ) : (
            <>
              <XCircle className="w-4 h-4 mr-2" />
              Issues Detected
            </>
          )}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Gateway Service Info */}
          <div className="flex items-center justify-between p-4 bg-[#0066FF]/10 border-[2px] border-black">
            <div className="flex items-center">
              <Server className="w-5 h-5 text-[#0066FF] mr-3" />
              <div>
                <p className="text-sm font-bold text-black">
                  {data?.service || 'Gateway Service'}
                </p>
                <p className="text-xs text-black/60 font-medium">
                  v{data?.version || '1.0.0'} | {data?.environment || 'production'}
                </p>
              </div>
            </div>
            <div className="w-4 h-4 bg-[#00CC66] border-[2px] border-black animate-pulse" />
          </div>

          {/* Timestamp */}
          <div className="flex items-center justify-between p-4 bg-[#F5F5F5] border-[2px] border-black">
            <div className="flex items-center">
              <Activity className="w-5 h-5 text-black/50 mr-3" />
              <div>
                <p className="text-sm font-bold text-black">Last Check</p>
                <p className="text-xs text-black/60 font-medium" suppressHydrationWarning>
                  {data?.timestamp
                    ? new Date(data.timestamp).toLocaleString()
                    : 'Just now'}
                </p>
              </div>
            </div>
            <CheckCircle className="w-5 h-5 text-[#00CC66]" />
          </div>
        </div>
      </div>
    </div>
  );
}
