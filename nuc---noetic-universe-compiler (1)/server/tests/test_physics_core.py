import sympy
import pytest
from ..physics_core.metric import SpacetimeMetric
from ..physics_core.tensors import TensorCalculator

def test_minkowski_flatness():
    """
    Verify that flat Minkowski space has zero Riemann curvature.
    """
    minkowski = SpacetimeMetric("Minkowski")
    minkowski.define_symbolic([
        ["-1", "0", "0", "0"],
        ["0", "1", "0", "0"],
        ["0", "0", "1", "0"],
        ["0", "0", "0", "1"]
    ])
    
    calc = TensorCalculator(minkowski)
    riemann = calc.compute_riemann()
    
    # Assert all components of Riemann are zero
    for p in range(4):
        for q in range(4):
            for r in range(4):
                for s in range(4):
                    assert riemann[p, q, r, s] == 0

def test_schwarzschild_vacuum():
    """
    Verify that the Schwarzschild metric is a vacuum solution (Ricci = 0).
    Metric: ds^2 = -(1-2M/r)dt^2 + (1-2M/r)^-1 dr^2 + r^2 d_theta^2 + r^2 sin^2(theta) d_phi^2
    """
    # Coordinates: t, r, theta, phi
    M = sympy.Symbol('M')
    r = sympy.Symbol('r')
    theta = sympy.Symbol('theta')
    
    coords = "t r theta phi"
    schwarz = SpacetimeMetric("Schwarzschild", coords=coords)
    
    A = 1 - 2*M/r
    schwarz.define_symbolic([
        [-A, 0, 0, 0],
        [0, 1/A, 0, 0],
        [0, 0, r**2, 0],
        [0, 0, 0, r**2 * sympy.sin(theta)**2]
    ])
    
    calc = TensorCalculator(schwarz)
    ricci = calc.compute_ricci()
    
    # Ricci tensor should be zero for vacuum solutions
    for i in range(4):
        for j in range(4):
            assert sympy.simplify(ricci[i, j]) == 0

if __name__ == "__main__":
    # Internal validation run
    test_minkowski_flatness()
    print("Minkowski: PASS")
    test_schwarzschild_vacuum()
    print("Schwarzschild: PASS")
