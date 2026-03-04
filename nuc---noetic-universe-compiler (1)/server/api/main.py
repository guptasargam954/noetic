
from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import uuid
import time

app = FastAPI(title="NUC: Spacetime Modeling API")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "NUC: Spacetime Modeling API is ACTIVE", "version": "1.0.0"}

class ExperimentRequest(BaseModel):
    name: str
    axioms: Dict[str, Any]
    metric_symbolic: List[List[str]]
    coordinates: str = "t x y z"

class ExperimentStatus(BaseModel):
    job_id: str
    status: str
    result: Dict[str, Any] = None

jobs = {}

def run_physics_computation(job_id: str, data: dict):
    from ..physics_core.metric import SpacetimeMetric
    from ..physics_core.tensors import TensorCalculator
    from ..physics_core.energy import EnergyConditionValidator
    from ..services.interpretation import InterpretationService
    import asyncio
    
    jobs[job_id]["status"] = "PROCESSING"
    ai_service = InterpretationService()
    
    try:
        # If axioms are provided but no specific metric, let AI derive it
        metric_expr = data.get("metric_symbolic")
        if not metric_expr or (isinstance(metric_expr, list) and "-1" in str(metric_expr[0][0]) and len(data.get("axioms", {})) > 0):
             # Derive from AI if it's the default or missing
             metric_expr = asyncio.run(ai_service.translate_axioms_to_symbolic(data.get("axioms", {})))

        metric = SpacetimeMetric(data["name"], coords=data["coordinates"])
        metric.define_symbolic(metric_expr)
        
        calc = TensorCalculator(metric)
        calc.compute_einstein()
        
        validator = EnergyConditionValidator(calc)
        report = validator.identify_anti_gravity_candidates()
        
        # Add AI explanation
        explanation = asyncio.run(ai_service.explain_results({"ricci_scalar": str(calc.ricci_scalar), "report": report}))
        
        jobs[job_id]["status"] = "COMPLETED"
        jobs[job_id]["result"] = {
            "ricci_scalar": str(calc.ricci_scalar),
            "anti_gravity_analysis": report,
            "ai_explanation": explanation,
            "derived_metric": str(metric_expr)
        }
    except Exception as e:
        jobs[job_id]["status"] = "FAILED"
        jobs[job_id]["result"] = {"error": str(e)}

@app.post("/experiments", response_model=ExperimentStatus)
async def create_experiment(request: ExperimentRequest, background_tasks: BackgroundTasks):
    job_id = str(uuid.uuid4())
    jobs[job_id] = {"status": "QUEUED", "result": None}
    background_tasks.add_task(run_physics_computation, job_id, request.dict())
    return {"job_id": job_id, "status": "QUEUED"}

@app.get("/experiments/{job_id}", response_model=ExperimentStatus)
async def get_experiment_status(job_id: str):
    if job_id not in jobs:
        raise HTTPException(status_code=404, detail="Job ID not found")
    return {"job_id": job_id, **jobs[job_id]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
