import sympy
from typing import Dict, Any

class SpacetimeMetric:
    """
    Representation of a 4D Spacetime Metric g_mu_nu.
    """
    def __init__(self, name: str, coords: str = "t x y z"):
        self.name = name
        self.symbols = sympy.symbols(coords)
        self.matrix = None
        self.inverse = None

    def define_symbolic(self, expression_matrix: list):
        """
        Define the metric tensor using symbolic SymPy expressions.
        """
        self.matrix = sympy.Matrix(expression_matrix)
        self.inverse = self.matrix.inv()

    def get_summary(self) -> Dict[str, Any]:
        return {
            "name": self.name,
            "coordinates": [str(s) for s in self.symbols],
            "metric_tensor": str(self.matrix)
        }
