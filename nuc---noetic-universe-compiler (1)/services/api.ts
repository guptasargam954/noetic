// Mocking the API to disconnect the frontend from the backend as requested
// Revert this if you want to reconnect to the real FastAPI server at http://localhost:8000

export interface ExperimentRequest {
    name: string;
    axioms: Record<string, any>;
    metric_symbolic: string[][];
    coordinates: string;
}

export const nucApi = {
    createExperiment: async (data: ExperimentRequest) => {
        console.log("MOCK API: Creating experiment", data);
        // Simulate a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
            job_id: `mock_job_${Date.now()}`,
            status: 'QUEUED'
        };
    },
    getExperimentStatus: async (jobId: string) => {
        console.log("MOCK API: Checking status", jobId);
        await new Promise(resolve => setTimeout(resolve, 500));

        // Randomly "complete" the mock job after some time
        const isComplete = Math.random() > 0.7;

        if (isComplete) {
            return {
                job_id: jobId,
                status: 'COMPLETED',
                result: {
                    RICCI_SCALAR: "-0.42 + 0.12*t^2",
                    ANTI_GRAV: "POTENTIAL_DETECTED",
                    interpretation: "Mock derivation suggests a stable anti-gravity field in the t-axis."
                }
            };
        }

        return {
            job_id: jobId,
            status: 'PROCESSING'
        };
    }
};
