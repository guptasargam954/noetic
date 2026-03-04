import sympy
from .metric import SpacetimeMetric

class TensorCalculator:
    """
    Symbolic tensor calculus engine for Spacetime Metrics.
    Computes Christoffel, Riemann, Ricci, and Einstein tensors.
    """
    def __init__(self, metric: SpacetimeMetric):
        self.metric = metric
        self.symbols = metric.symbols
        self.g = metric.matrix
        self.g_inv = metric.inverse
        
        self.christoffel = None
        self.riemann = None
        self.ricci = None
        self.ricci_scalar = None
        self.einstein = None

    def compute_christoffel(self):
        """
        Compute Christoffel symbols of the second kind.
        Gamma^k_ij = 0.5 * g^kl * (dg_lj/dx^i + dg_li/dx^j - dg_ij/dx^l)
        """
        n = len(self.symbols)
        gamma = sympy.MutableDenseNDimArray.zeros(n, n, n)
        
        for k in range(n):
            for i in range(n):
                for j in range(n):
                    sum_val = 0
                    for l in range(n):
                        term = (
                            sympy.diff(self.g[l, j], self.symbols[i]) +
                            sympy.diff(self.g[l, i], self.symbols[j]) -
                            sympy.diff(self.g[i, j], self.symbols[l])
                        )
                        sum_val += 0.5 * self.g_inv[k, l] * term
                    gamma[k, i, j] = sum_val
        
        # Simplify the entire array once at the end
        self.christoffel = gamma.applyfunc(sympy.simplify)
        return self.christoffel

    def compute_riemann(self):
        """
        Compute Riemann Curvature Tensor R^p_qrs.
        R^p_qrs = dGamma^p_qs/dx^r - dGamma^p_qr/dx^s + Gamma^p_mr * Gamma^m_qs - Gamma^p_ms * Gamma^m_qr
        """
        if self.christoffel is None:
            self.compute_christoffel()
            
        n = len(self.symbols)
        riemann = sympy.MutableDenseNDimArray.zeros(n, n, n, n)
        
        for p in range(n):
            for q in range(n):
                for r in range(n):
                    for s in range(n):
                        term1 = sympy.diff(self.christoffel[p, q, s], self.symbols[r])
                        term2 = sympy.diff(self.christoffel[p, q, r], self.symbols[s])
                        
                        term3 = 0
                        term4 = 0
                        for m in range(n):
                            term3 += self.christoffel[p, m, r] * self.christoffel[m, q, s]
                            term4 += self.christoffel[p, m, s] * self.christoffel[m, q, r]
                            
                        riemann[p, q, r, s] = term1 - term2 + term3 - term4
                        
        # Global simplify
        self.riemann = riemann.applyfunc(sympy.simplify)
        return self.riemann

    def compute_ricci(self):
        """
        Compute Ricci Tensor R_uv = R^a_uav.
        """
        if self.riemann is None:
            self.compute_riemann()
            
        n = len(self.symbols)
        ricci = sympy.Matrix.zeros(n, n)
        
        for u in range(n):
            for v in range(n):
                sum_val = 0
                for a in range(n):
                    sum_val += self.riemann[a, u, a, v]
                ricci[u, v] = sum_val
                
        self.ricci = ricci.applyfunc(sympy.simplify)
        return self.ricci

    def compute_ricci_scalar(self):
        """
        Compute Ricci Scalar R = g^uv R_uv.
        """
        if self.ricci is None:
            self.compute_ricci()
            
        n = len(self.symbols)
        r_scalar = 0
        for u in range(n):
            for v in range(n):
                r_scalar += self.g_inv[u, v] * self.ricci[u, v]
                
        self.ricci_scalar = sympy.simplify(r_scalar)
        return self.ricci_scalar

    def compute_einstein(self):
        """
        Compute Einstein Tensor G_uv = R_uv - 0.5 * R * g_uv.
        """
        if self.ricci_scalar is None:
            self.compute_ricci_scalar()
            
        n = len(self.symbols)
        einstein = sympy.Matrix.zeros(n, n)
        
        for u in range(n):
            for v in range(n):
                einstein[u, v] = self.ricci[u, v] - 0.5 * self.ricci_scalar * self.g[u, v]
                
        self.einstein = einstein.applyfunc(sympy.simplify)
        return self.einstein
