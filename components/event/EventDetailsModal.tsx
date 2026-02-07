"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Globe2 } from "lucide-react";

/* ----------------------------------
   Updated EventItem (extended safely)
----------------------------------- */
export type EventItem = {
  id: number;
  format: string;
  title: string;
  description: string;
  is_srm_only: boolean;

  mode?: string;
  team_size?: string;
  participation_type?: string;
};

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  events: EventItem[];
}

export default function EventDetailsModal({
  isOpen,
  onClose,
  title,
  description,
  events,
}: EventDetailsModalProps) {
  // Re-enabled scroll lock
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="indian-dark-bg border-2 border-[#C9A24D]/30 w-full max-w-3xl max-h-[85vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col pointer-events-auto relative">

              {/* Header */}
              <div className="p-6 border-b border-[#C9A24D]/20 flex justify-between items-start bg-[#0B0B0F]/90 relative z-10">
                <div>
                  <h2 className="text-2xl text-white tracking-tight font-serif uppercase">
                    {title}
                  </h2>
                  <p className="text-[#C9A24D]/80 text-sm mt-1 font-medium tracking-wide">{description}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 bg-white/5 hover:bg-[#C9A24D]/10 rounded-full text-neutral-400 hover:text-[#C9A24D] transition-colors border border-transparent hover:border-[#C9A24D]/30">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto p-6 space-y-4 custom-scrollbar bg-transparent relative z-10">
                {events.length === 0 ? (
                  <p className="text-neutral-500 text-center py-10 italic">
                    No events listed for this category yet.
                  </p>
                ) : (
                  events.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group p-5 rounded-2xl bg-[#FDFBF7]/5 border border-[#C9A24D]/10 hover:border-[#C9A24D] hover:bg-[#C9A24D]/5 transition-all duration-300 relative overflow-hidden">

                      {/* Card Content */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                        <div className="space-y-2">
                          {/* Title */}
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg text-white group-hover:text-[#C9A24D] transition-colors uppercase tracking-tight">
                              {item.title}
                            </h3>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#C9A24D]/10 text-[#C9A24D] border border-[#C9A24D]/20">
                              {item.format}
                            </span>
                          </div>

                          {/* Description */}
                          <p className="text-neutral-400 text-sm leading-relaxed max-w-xl font-light">
                            {item.description}
                          </p>

                          {/* Metadata Row */}
                          {(item.mode ||
                            item.team_size ||
                            item.participation_type) && (
                              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-500 pt-1 font-mono uppercase tracking-tight">
                                {item.mode && <span>Mode: <span className="text-neutral-300">{item.mode}</span></span>}
                                {item.participation_type && (
                                  <span>Type: <span className="text-neutral-300">{item.participation_type}</span></span>
                                )}
                                {item.team_size && (
                                  <span>Team: <span className="text-neutral-300">{item.team_size}</span></span>
                                )}
                              </div>
                            )}
                        </div>

                        {/* Eligibility */}
                        <div className="shrink-0">
                          {item.is_srm_only ? (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C9A24D]/10 border border-[#C9A24D]/20 text-[#C9A24D] text-xs font-bold uppercase tracking-wide shadow-[0_0_10px_rgba(201,162,77,0.1)]">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Non SRM Students Only</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0F766E]/10 border border-[#0F766E]/20 text-[#2DD4BF] text-xs font-bold uppercase tracking-wide shadow-[0_0_10px_rgba(15,118,110,0.2)]">
                              <Globe2 className="w-3.5 h-3.5" />
                              <span>Open to All</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-[#C9A24D]/20 bg-[#0B0B0F]/90 text-center relative z-10">
                <p className="text-xs text-[#C9A24D]/60 tracking-widest uppercase font-bold">
                  Select an event to view registration details (Coming Soon)
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
