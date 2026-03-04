import { create } from 'zustand';

interface Experiment {
    job_id: string;
    name: string;
    status: 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
    axioms?: any;
    result?: any;
}

interface NUCState {
    experiments: Experiment[];
    activeJobId: string | null;
    addExperiment: (exp: Experiment) => void;
    updateExperiment: (jobId: string, updates: Partial<Experiment>) => void;
    setActiveJobId: (jobId: string | null) => void;
}

export const useNUCStore = create<NUCState>((set) => ({
    experiments: [],
    activeJobId: null,
    addExperiment: (exp) => set((state) => ({
        experiments: [exp, ...state.experiments]
    })),
    updateExperiment: (jobId, updates) => set((state) => ({
        experiments: state.experiments.map((exp) =>
            exp.job_id === jobId ? { ...exp, ...updates } : exp
        )
    })),
    setActiveJobId: (jobId) => set({ activeJobId: jobId }),
}));
