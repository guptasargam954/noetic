from celery import Celery
import os

# Configure Celery to use Redis as the broker
CELERY_BROKER_URL = os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0")
CELERY_RESULT_BACKEND = os.getenv("CELERY_RESULT_BACKEND", "redis://localhost:6379/0")

celery_app = Celery("nuc_tasks", broker=CELERY_BROKER_URL, backend=CELERY_RESULT_BACKEND)

@celery_app.task(name="process_experiment")
def process_experiment(experiment_data: dict):
    """
    Background task to run the Physics Core computation.
    """
    from ..physics_core.metric import SpacetimeMetric
    from ..physics_core.tensors import TensorCalculator
    from ..physics_core.energy import EnergyConditionValidator
    
    # 1. Initialize Metric
    metric = SpacetimeMetric(experiment_data["name"], coords=experiment_data["coordinates"])
    metric.define_symbolic(experiment_data["metric_symbolic"])
    
    # 2. Compute Tensors
    calc = TensorCalculator(metric)
    calc.compute_einstein()
    
    # 3. Validate Energy Conditions
    validator = EnergyConditionValidator(calc)
    anti_grav_report = validator.identify_anti_gravity_candidates()
    
    return {
        "metric_summary": metric.get_summary(),
        "ricci_scalar": str(calc.ricci_scalar),
        "anti_gravity_analysis": anti_grav_report
    }
