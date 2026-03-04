import sys
import os
import asyncio
import json

# Add project root to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from server.physics_core.metric import SpacetimeMetric
from server.physics_core.tensors import TensorCalculator
from server.physics_core.energy import EnergyConditionValidator
from server.services.interpretation import InterpretationService

async def verify_backend():
    print("--- NUC BACKEND VERIFICATION ---")
    
    # 1. Define a Schwarzschild-like metric or a custom one
    # ds^2 = -(1-2M/r)dt^2 + (1-2M/r)^-1 dr^2 + r^2 dOmega^2
    # For simplicity, let's use a metric that should have non-zero curvature
    print("\n1. Defining Metric...")
    metric = SpacetimeMetric("Test_Universe", coords="t x y z")
    
    # Example metric: ds^2 = -dt^2 + exp(2*t)*dx^2 + exp(2*t)*dy^2 + exp(2*t)*dz^2
    # This is a de Sitter-like expansion
    import sympy
    t, x, y, z = metric.symbols
    expr = [
        [-1, 0, 0, 0],
        [0, sympy.exp(2*t), 0, 0],
        [0, 0, sympy.exp(2*t), 0],
        [0, 0, 0, sympy.exp(2*t)]
    ]
    metric.define_symbolic(expr)
    print("Metric Matrix defined.")

    # 2. Compute Tensors
    print("\n2. Computing Tensors (this may take a moment)...")
    calc = TensorCalculator(metric)
    
    print("Computing Ricci Scalar...")
    r_scalar = calc.compute_ricci_scalar()
    print(f"Ricci Scalar: {r_scalar}")

    # 3. Energy Conditions
    print("\n3. Validating Energy Conditions...")
    validator = EnergyConditionValidator(calc)
    report = validator.identify_anti_gravity_candidates()
    print(f"Anti-Gravity Report: {json.dumps(report, indent=2)}")

    # 4. AI Interpretation (Optional, needs API key)
    print("\n4. AI Interpretation...")
    if os.getenv("GEMINI_API_KEY") and os.getenv("GEMINI_API_KEY") != "YOUR_API_KEY_HERE":
        service = InterpretationService()
        try:
            explanation = await service.explain_results({
                "ricci_scalar": str(r_scalar),
                "report": report
            })
            print(f"AI Explanation: {explanation}")
        except Exception as e:
            print(f"AI Interpretation failed: {e}")
    else:
        print("Skipping AI interpretation (GEMINI_API_KEY not set).")

    print("\n--- VERIFICATION COMPLETE ---")

if __name__ == "__main__":
    asyncio.run(verify_backend())
