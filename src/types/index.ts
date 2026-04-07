// Global type definitions for AdoptAI
export interface RoadmapStage {
  id: number;
  title: string;
  description: string;
  phase: string;
  focus: string;
  validation: string;
  result: string;
  color: string;
}

export interface BusinessContext {
  mainChallenge: string;
  affectedArea: string;
  currentConsequence: string;
  objective: string;
}

export interface DiagnosticSession {
  id: string;
  clientName: string;
  email: string;
  company: string;
  scheduledAt: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
}

export interface RoadmapRequest {
  id: string;
  clientName: string;
  email: string;
  company: string;
  problemStatement: string;
  expectedImpact: string;
  successMetric: string;
  createdAt: Date;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

export interface PDFGenerationTask {
  id: string;
  roadmapRequestId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  downloadUrl?: string;
  createdAt: Date;
  completedAt?: Date;
}
