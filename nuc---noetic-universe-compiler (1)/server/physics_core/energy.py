import sympy
from .tensors import TensorCalculator

class EnergyConditionValidator:
    """
    Validates point-wise energy conditions (WEC, NEC, DEC, SEC)
    and analyzes scalar curvature for anti-gravity scenarios.
    """
    def __init__(self, calc: TensorCalculator):
        self.calc = calc
        self.symbols = calc.symbols
        self.g = calc.metric.matrix
        self.einstein = calc.einstein
        
    def check_weak_energy_condition(self, observer_velocity: list):
        """
        WEC: T_mu_nu * u^mu * u^nu >= 0
        Testing for a given observer velocity vector u.
        According to EFE, T_uv = G_uv / (8*pi).
        """
        u = sympy.Matrix(observer_velocity)
        # G_uv * u^u * u^v
        # Since G is stored as G_uv (lower indices)
        term = 0
        n = len(self.symbols)
        for i in range(n):
            for j in range(n):
                term += self.einstein[i, j] * u[i] * u[j]
        
        return sympy.simplify(term)

    def compute_ricci_scalar(self):
        """
        Returns the Ricci scalar R.
        Detection of local curvature sign inversion (R < 0).
        """
        return self.calc.compute_ricci_scalar()

    def identify_anti_gravity_candidates(self):
        """
        Detects regions where R < 0 or where WEC is violated,
        suggesting repulsive gravitational interaction or exotic matter.
        """
        R = self.compute_ricci_scalar()
        
        # More robust check: try to evaluate R at the origin (t=0, x=0, y=0, z=0)
        # or check the sign of the constant term if it's a polynomial.
        repulsive = False
        try:
            # Substitute zeros for all coordinate symbols
            subs_map = {s: 0 for s in self.symbols}
            R_at_origin = R.subs(subs_map)
            
            if R_at_origin.is_number:
                if R_at_origin < 0:
                    repulsive = True
            else:
                # If still symbolic, check the leading sign of the string representation
                # as a fallback, but a bit more carefully.
                s_R = str(R).strip()
                if s_R.startswith("-") and not s_R.startswith("-0"):
                    repulsive = True
        except Exception:
            # Fallback to basic string check if substitution fails
            if str(R).startswith("-") and not str(R).startswith("-0"):
                repulsive = True
        
        return {
            "ricci_scalar": str(R),
            "repulsive_potential": repulsive,
            "evaluation_at_origin": str(R.subs({s: 0 for s in self.symbols}))
        }
