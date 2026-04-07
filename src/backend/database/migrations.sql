-- ==========================================
-- TABLA: diagnostic_sessions
-- ==========================================
CREATE TABLE IF NOT EXISTS diagnostic_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Información de contacto
  client_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  company VARCHAR(255) NOT NULL,
  position VARCHAR(255),
  employee_count VARCHAR(50),
  
  -- Datos del diagnóstico
  main_challenge TEXT NOT NULL,
  custom_challenge TEXT,
  context TEXT NOT NULL,
  
  -- Metadatos
  scheduled_at TIMESTAMP DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices para búsquedas rápidas (usando IF NOT EXISTS)
CREATE INDEX IF NOT EXISTS idx_diagnostic_email ON diagnostic_sessions(email);
CREATE INDEX IF NOT EXISTS idx_diagnostic_company ON diagnostic_sessions(company);
CREATE INDEX IF NOT EXISTS idx_diagnostic_status ON diagnostic_sessions(status);
CREATE INDEX IF NOT EXISTS idx_diagnostic_created ON diagnostic_sessions(created_at DESC);

-- ==========================================
-- TABLA: roadmap_results
-- ==========================================
CREATE TABLE IF NOT EXISTS roadmap_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  diagnostic_session_id UUID REFERENCES diagnostic_sessions(id) ON DELETE CASCADE,
  
  -- Contenido del roadmap
  roadmap_content JSONB,
  stages JSONB,
  recommendations TEXT,
  roi_estimate DECIMAL(10, 2),
  timeline_months INTEGER,
  
  -- Metadatos
  generated_at TIMESTAMP DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'pending'
);

CREATE INDEX IF NOT EXISTS idx_roadmap_session ON roadmap_results(diagnostic_session_id);
CREATE INDEX IF NOT EXISTS idx_roadmap_result_status ON roadmap_results(status);

-- ==========================================
-- TABLA: leads_analytics
-- ==========================================
CREATE TABLE IF NOT EXISTS leads_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Información del lead
  client_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  company VARCHAR(255) NOT NULL,
  challenge VARCHAR(255),
  
  -- Información de conversión
  diagnostic_completed BOOLEAN DEFAULT TRUE,
  roadmap_generated BOOLEAN DEFAULT FALSE,
  email_sent BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_leads_created ON leads_analytics(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_completed ON leads_analytics(diagnostic_completed);

-- ==========================================
-- TABLA: roadmap_requests (LA TABLA QUE FALTABA)
-- ==========================================
CREATE TABLE IF NOT EXISTS roadmap_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  success_metric TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_roadmap_requests_email ON roadmap_requests(email);
CREATE INDEX IF NOT EXISTS idx_roadmap_requests_status ON roadmap_requests(status);

-- ==========================================
-- TABLA: roadmaps
-- ==========================================
CREATE TABLE IF NOT EXISTS roadmaps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id UUID NOT NULL REFERENCES roadmap_requests(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  pdf_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_roadmaps_request_id ON roadmaps(request_id);

-- ==========================================
-- TABLA: pdf_generation_tasks
-- ==========================================
CREATE TABLE IF NOT EXISTS pdf_generation_tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  roadmap_id UUID NOT NULL REFERENCES roadmaps(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'pending',
  download_url VARCHAR(500),
  error_message TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_pdf_tasks_status ON pdf_generation_tasks(status);