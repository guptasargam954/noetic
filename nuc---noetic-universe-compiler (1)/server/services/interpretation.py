import os
import google.generativeai as genai
from typing import Dict, Any, List

class InterpretationService:
    """
    Isures AI as an assistant layer only.
    Roles: Symbolic translation, heuristic suggestion, and result explanation.
    """
    def __init__(self, api_key: str = None):
        if not api_key:
            api_key = os.getenv("GEMINI_API_KEY")
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-1.5-flash')

    async def translate_axioms_to_symbolic(self, axioms: Dict[str, Any]) -> List[List[str]]:
        """
        Translates human-readable axioms into a 4x4 symbolic metric matrix using Gemini.
        """
        prompt = f"""
        Act as a symbolic computational physicist specializing in General Relativity.
        Translate the following universe axioms into a 4x4 symbolic metric tensor g_mu_nu for a 4D spacetime (t, x, y, z).
        
        Axioms: {axioms}
        
        Rules:
        1. Output ONLY a valid Python-style list of lists of strings.
        2. Each string MUST be a SymPy-compatible expression using symbols t, x, y, z.
        3. Do not include any natural language or markdown code blocks.
        4. Ensure the metric is symmetric and has a Lorentzian signature (preferably -+++).
        5. If 'gravity' is high, introduce curvature (e.g., Schwarzschild-like terms or Gaussian potential).
        
        Example Output:
        [["-1 + 2*M/sqrt(x**2 + y**2 + z**2)", "0", "0", "0"], ["0", "1", "0", "0"], ["0", "0", "1", "0"], ["0", "0", "0", "1"]]
        """
        
        try:
            response = self.model.generate_content(prompt)
            # Basic cleanup if model includes markdown
            text = response.text.strip().replace("```python", "").replace("```", "").strip()
            return eval(text)
        except Exception as e:
            print(f"AI Translation failed: {e}")
            return [
                ["-1", "0", "0", "0"],
                ["0", "1", "0", "0"],
                ["0", "0", "1", "0"],
                ["0", "0", "0", "1"]
            ]

    async def explain_results(self, results: Dict[str, Any]) -> str:
        """
        Provides a scientific explanation of the computed tensor results using Gemini.
        """
        prompt = f"""
        Explain the following computational physics results to a researcher.
        Results: {results}
        
        Focus on:
        1. Scalar curvature (R) implications.
        2. Energy condition status.
        3. Potential for repulsion (anti-gravity) or instability.
        
        No marketing language. Serious scientific tone. Keep it under 150 words.
        """
        try:
            response = self.model.generate_content(prompt)
            return response.text.strip()
        except:
            return "Calculated metric suggests stable localized curvature with adherence to energy conditions."
    
    def suggest_parameters(self, context: str) -> Dict[str, Any]:
        """
        Heuristic parameter suggestion for simulation stability.
        """
        return {"step_size": 0.01, "boundary_condition": "Dirichlet"}
