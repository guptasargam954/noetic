from sqlalchemy import Column, Integer, String, JSON, DateTime, ForeignKey, Float, Boolean, Text
from sqlalchemy.orm import relationship, declarative_base
import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    experiments = relationship("Experiment", back_populates="owner")

class Experiment(Base):
    __tablename__ = "experiments"
    id = Column(String(36), primary_key=True) # UUID
    name = Column(String(100), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    status = Column(String(20), default="PENDING")
    
    # Snapshot for Reproducibility
    system_snapshot = Column(JSON) # versions, params, env state
    
    # Input config
    axioms = Column(JSON)
    metric_specification = Column(Text) # Symbolic string
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    completed_at = Column(DateTime)
    
    owner = relationship("User", back_populates="experiments")
    results = relationship("TensorResult", back_populates="experiment")

class TensorResult(Base):
    __tablename__ = "tensor_results"
    id = Column(Integer, primary_key=True)
    experiment_id = Column(String(36), ForeignKey("experiments.id"))
    
    tensor_type = Column(String(50)) # e.g., 'EINSTEIN', 'RICCI'
    data = Column(JSON) # Serialized tensor data
    
    experiment = relationship("Experiment", back_populates="results")

class ValidationReport(Base):
    __tablename__ = "validation_reports"
    id = Column(Integer, primary_key=True)
    experiment_id = Column(String(36), ForeignKey("experiments.id"))
    
    ricci_scalar = Column(Float)
    energy_conditions = Column(JSON) # {WEC: true, SEC: false, ...}
    stability_score = Column(String(20))
    anti_gravity_flag = Column(Boolean, default=False)
    
    report_text = Column(Text) # Detailed scientific diagnostics
