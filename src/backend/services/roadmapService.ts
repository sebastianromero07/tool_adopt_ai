import { RoadmapRequest } from '../../types';

export async function createRoadmapRequest(
  clientName: string,
  email: string,
  company: string,
  problemStatement: string,
  expectedImpact: string,
  successMetric: string
): Promise<RoadmapRequest> {
  // Always return a mock response for now
  // In production with proper Supabase config, this would save to DB
  console.warn('Returning mock roadmap request. Configure Supabase to enable real storage.');
  
  return {
    id: 'roadmap-' + Math.random().toString(36).substr(2, 9),
    clientName,
    email,
    company,
    problemStatement,
    expectedImpact,
    successMetric,
    status: 'pending',
    createdAt: new Date(),
  };
}

export async function generateRoadmap(
  requestId: string,
  industry: string = 'General'
): Promise<string> {
  // Mock implementation - configure Supabase for real storage
  console.warn('Supabase not configured. Generating mock roadmap.');
  return JSON.stringify({
    status: 'MOCK',
    message: 'Configure Supabase to generate real roadmaps',
  });
}

export async function getRoadmapRequest(id: string): Promise<RoadmapRequest | null> {
  // Mock implementation - configure Supabase for real storage
  console.warn('Supabase not configured. Returning null.');
  return null;
}
