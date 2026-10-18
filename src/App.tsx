import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, LayoutDashboard, BookOpen, Code2, Settings, X, 
  CheckCircle2, Target, Menu, Play, Pause, RotateCcw, Timer, ExternalLink, 
  Trash2, Plus, FolderGit2, Award, Github, Link as LinkIcon, 
  Eye, EyeOff, Star, Trophy, Sun, Moon, Flame, Medal, Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATALOG_DATA, CERTIFICATIONS_DATA } from './data';
import { AddToCalendarButton } from 'add-to-calendar-button-react';

// --- TIPOS ---
interface Lesson {
  id: string; title: string; minutes: number; url: string; type: string;
  phaseId: string; phaseTitle: string; moduleTitle: string; status: 'not_started' | 'completed';
}
interface Phase {
  id: string; title: string; period: string; goal: string; lessons: Lesson[]; progress: number;
}
interface ProgressState { [lessonId: string]: { status: 'not_started' | 'completed'; completedAt?: string; } }
interface SessionState { totalMinutes: number; history: { date: string; minutes: number }[]; }
interface Project { id: string; name: string; description: string; tech: string; demoUrl: string; repoUrl: string; status: 'planning' | 'in_progress' | 'done'; }

// --- COMPONENTE PRINCIPAL ---
export default function App() {
  const initialPhases = useMemo(() => {
    return CATALOG_DATA.phases.map(phase => {
      const lessons: Lesson[] = phase.modules.flatMap(mod => 
        mod.lessons.map(l => ({ ...l, phaseId: phase.id, phaseTitle: phase.title, moduleTitle: mod.title, status: 'not_started' }))
      );
      return { id: phase.id, title: phase.title, period: phase.period, goal: phase.goal, lessons, progress: 0 };
    });
  }, []);

  const [phases, setPhases] = useState<Phase[]>(initialPhases);
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('devpath_projects');
    return saved ? JSON.parse(saved) : [];
  });
  
  // UI States
  const [theme, setTheme] = useState<'dark' | 'light'>(() => (localStorage.getItem('devpath_theme') as 'dark' | 'light') || 'dark');
  const [currentView, setCurrentView] = useState<'dashboard' | 'certifications' | 'roadmap' | 'projects' | 'achievements' | 'settings'>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showStats, setShowStats] = useState(true); 
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);

  // Persistence
  const [progress, setProgress] = useState<ProgressState>(() => JSON.parse(localStorage.getItem('devpath_progress_v2') || '{}'));
  const [favorites, setFavorites] = useState<string[]>(() => JSON.parse(localStorage.getItem('devpath_favorites') || '[]'));
  const [sessions, setSessions] = useState<SessionState>(() => JSON.parse(localStorage.getItem('devpath_sessions_v2') || '{"totalMinutes":0,"history":[]}'));

  // Timer
  const [timerMinutes, setTimerMinutes] = useState(15);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Efectos
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('devpath_theme', theme);
  }, [theme]);

  useEffect(() => {
    const checkScreen = () => {
      const width = window.innerWidth;
      setIsMobile(width < 1024);
      if (width >= 1024) setSidebarOpen(true);
      if (width < 1280) setShowStats(false); 
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  useEffect(() => {
    setPhases(prev => prev.map(p => {
      const newLessons = p.lessons.map(l => ({ ...l, status: progress[l.id]?.status || 'not_started' }));
      const completed = newLessons.filter(l => l.status === 'completed').length;
      return { ...p, lessons: newLessons, progress: newLessons.length ? Math.round((completed / newLessons.length) * 100) : 0 };
    }));
  }, [progress]);

  useEffect(() => { localStorage.setItem('devpath_progress_v2', JSON.stringify(progress)); }, [progress]);
  useEffect(() => { localStorage.setItem('devpath_favorites', JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem('devpath_sessions_v2', JSON.stringify(sessions)); }, [sessions]);
  useEffect(() => { localStorage.setItem('devpath_projects', JSON.stringify(projects)); }, [projects]);

  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      timerRef.current = window.setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      handleTimerComplete();
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isTimerRunning, timeLeft]);

  // Lógica
  const handleTimerComplete = () => {
    setIsTimerRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    playSound();
    setSessions(prev => ({
      totalMinutes: prev.totalMinutes + timerMinutes,
      history: [...prev.history, { date: new Date().toISOString(), minutes: timerMinutes }]
    }));
    alert(`¡Sesión de ${timerMinutes} minutos completada!`);
    setTimeLeft(timerMinutes * 60);
  };

  const playSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.type = 'sine'; osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.5, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);
      osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 1);
    } catch (e) {}
  };

  const toggleLessonStatus = (lessonId: string) => {
    setProgress(prev => {
      const current = prev[lessonId]?.status || 'not_started';
      const next = current === 'completed' ? 'not_started' : 'completed';
      return { ...prev, [lessonId]: { status: next, completedAt: next === 'completed' ? new Date().toISOString() : undefined } };
    });
  };

  const toggleFavorite = (lessonId: string) => {
    setFavorites(prev => prev.includes(lessonId) ? prev.filter(id => id !== lessonId) : [...prev, lessonId]);
  };

  const filteredPhases = useMemo(() => {
    return phases.map(phase => {
      const filteredLessons = phase.lessons.filter(l => {
        const matchesSearch = l.title.toLowerCase().includes(searchTerm.toLowerCase()) || phase.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFav = filterFavorites ? favorites.includes(l.id) : true;
        return matchesSearch && matchesFav;
      });
      return { ...phase, lessons: filteredLessons };
    }).filter(phase => phase.lessons.length > 0);
  }, [phases, searchTerm, filterFavorites, favorites]);

  const globalStats = useMemo(() => {
    let total = 0, comp = 0;
    phases.forEach(p => p.lessons.forEach(l => { total++; if (l.status === 'completed') comp++; }));
    return { total, comp };
  }, [phases]);

  const studyHours = Math.floor(sessions.totalMinutes / 60);

  const achievements = [
    { id: 'a1', title: 'Primer Paso', desc: 'Completa tu primera lección.', icon: <CheckCircle2 size={32} />, unlocked: globalStats.comp >= 1 },
    { id: 'a2', title: 'Estudiante Dedicado', desc: 'Acumula 5 horas de estudio.', icon: <Timer size={32} />, unlocked: studyHours >= 5 },
    { id: 'a3', title: 'Maratonista', desc: 'Acumula 20 horas de estudio.', icon: <Flame size={32} />, unlocked: studyHours >= 20 },
    { id: 'a4', title: 'Cazador de Certificados', desc: 'Completa una fase entera.', icon: <Medal size={32} />, unlocked: phases.some(p => p.progress === 100) },
  ];

  const calendarDays = useMemo(() => {
    const days = [];
    const today = new Date();
    for (let i = 27; i >= 0; i--) {
      const d = new Date(today); d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const active = sessions.history.some(h => h.date.startsWith(dateStr));
      days.push({ date: dateStr, active });
    }
    return days;
  }, [sessions]);

  return (
    <div className="app-container">
      {isMobile && (sidebarOpen || showStats) && (
        <div className="overlay" onClick={() => { setSidebarOpen(false); setShowStats(false); }} />
      )}

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="logo-area">
          <Code2 size={28} color="var(--accent-green)" />
          <span className="logo-text">DevPath 2027</span>
          {isMobile && <button className="icon-btn close-sidebar" onClick={() => setSidebarOpen(false)}><X size={20} /></button>}
        </div>

        <nav className="nav-menu">
          <button className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`} onClick={() => { setCurrentView('dashboard'); if(isMobile) setSidebarOpen(false); }}><LayoutDashboard size={20} /> Dashboard</button>
          <button className={`nav-item ${currentView === 'achievements' ? 'active' : ''}`} onClick={() => { setCurrentView('achievements'); if(isMobile) setSidebarOpen(false); }}><Trophy size={20} /> Logros</button>
          <button className={`nav-item ${currentView === 'certifications' ? 'active' : ''}`} onClick={() => { setCurrentView('certifications'); if(isMobile) setSidebarOpen(false); }}><Award size={20} /> Certificaciones</button>
          <button className={`nav-item ${currentView === 'roadmap' ? 'active' : ''}`} onClick={() => { setCurrentView('roadmap'); if(isMobile) setSidebarOpen(false); }}><BookOpen size={20} /> Mi Ruta</button>
          <button className={`nav-item ${currentView === 'projects' ? 'active' : ''}`} onClick={() => { setCurrentView('projects'); if(isMobile) setSidebarOpen(false); }}><Code2 size={20} /> Proyectos</button>
        </nav>

        <div className="sidebar-footer">
          <button className={`nav-item ${currentView === 'settings' ? 'active' : ''}`} onClick={() => { setCurrentView('settings'); if(isMobile) setSidebarOpen(false); }}><Settings size={20} /> Ajustes</button>
          <div className="user-profile">
            <div className="avatar">WJ</div>
            <div className="user-info"><span className="user-name">WilkyJamse Dev</span><span className="user-role">Full-Stack Dev</span></div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-header">
          <div className="header-left">
            {isMobile && <button className="icon-btn" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button>}
            <h1 className="page-title">
              {currentView === 'dashboard' && 'Plan de Estudios'}
              {currentView === 'achievements' && 'Mis Logros'}
              {currentView === 'certifications' && 'Certificaciones'}
              {currentView === 'roadmap' && 'Mi Ruta'}
              {currentView === 'projects' && 'Proyectos'}
              {currentView === 'settings' && 'Ajustes'}
            </h1>
          </div>

          <div className="header-actions">
            {currentView === 'dashboard' && (
              <>
                <div className="search-bar">
                  <Search size={18} color="var(--text-muted)" />
                  <input type="text" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <button className={`icon-btn ${filterFavorites ? 'active' : ''}`} onClick={() => setFilterFavorites(!filterFavorites)} title="Filtrar Favoritos" style={{color: filterFavorites ? 'var(--accent-gold)' : ''}}>
                  <Star size={20} fill={filterFavorites ? "currentColor" : "none"} />
                </button>
              </>
            )}
            <button className="icon-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="icon-btn stats-toggle" onClick={() => setShowStats(!showStats)}>
              {showStats ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </header>

        {currentView === 'dashboard' && (
          <div className="kanban-board">
            {filteredPhases.map((phase) => (
              <div key={phase.id} className="kanban-column">
                <div className="column-header">
                  <div>
                    <h2 className="column-title">{phase.title}</h2>
                    <p className="column-period">{phase.period}</p>
                  </div>
                  <span className="task-count">{phase.progress}%</span>
                </div>
                <div className="phase-progress-bar"><div className="progress-fill" style={{ width: `${phase.progress}%`, backgroundColor: 'var(--accent-green)' }} /></div>
                <div className="phase-goal">{phase.goal}</div>
                <div className="task-list">
                  {phase.lessons.map((lesson) => (
                    <div key={lesson.id} className={`task-card ${lesson.status === 'completed' ? 'completed' : ''}`} onClick={() => setSelectedPhase(phase)}>
                      <button className={`favorite-btn ${favorites.includes(lesson.id) ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); toggleFavorite(lesson.id); }}>
                        <Star size={18} fill={favorites.includes(lesson.id) ? "currentColor" : "none"} />
                      </button>
                      <div className="task-tags">
                        <span className="tag" style={{ backgroundColor: 'rgba(96,165,250,0.15)', color: 'var(--accent-blue)' }}>{lesson.type.toUpperCase()}</span>
                        <span className="tag" style={{ backgroundColor: 'rgba(160,160,160,0.15)', color: 'var(--text-muted)' }}>{lesson.minutes} min</span>
                      </div>
                      <h3 className="task-title">{lesson.title}</h3>
                      <div className="task-footer">
                        <div className="task-meta"><span>{lesson.moduleTitle.substring(0, 20)}...</span></div>
                        <div className="task-actions">
                          <button className={`status-btn ${lesson.status === 'completed' ? 'done' : ''}`} onClick={(e) => { e.stopPropagation(); toggleLessonStatus(lesson.id); }}>
                            {lesson.status === 'completed' ? <CheckCircle2 size={16} /> : <Timer size={16} />}
                          </button>
                          <a href={lesson.url} target="_blank" rel="noopener noreferrer" className="link-btn" onClick={(e) => e.stopPropagation()}><ExternalLink size={16} /></a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {currentView === 'achievements' && (
          <div className="achievements-grid">
            {achievements.map(a => (
              <div key={a.id} className={`achievement-card ${a.unlocked ? 'unlocked' : ''}`}>
                <div className="achievement-icon">{a.icon}</div>
                <div className="achievement-info"><h3>{a.title}</h3><p>{a.desc}</p></div>
              </div>
            ))}
          </div>
        )}

        {currentView === 'certifications' && (
          <div className="certifications-grid">
            {CERTIFICATIONS_DATA.map((cert) => (
              <div key={cert.id} className="cert-card">
                <div className="cert-header">
                  <div className="cert-icon" style={{ backgroundColor: cert.color + '22', color: cert.color }}><Award size={24} /></div>
                  <span className={`cert-badge ${cert.type.includes('Gratis') ? 'free' : 'paid'}`}>{cert.type}</span>
                </div>
                <h3>{cert.title}</h3><div className="cert-platform">{cert.platform}</div>
                <div className="cert-footer"><a href={cert.url} target="_blank" rel="noopener noreferrer" className="btn-glass" style={{ width: '100%', justifyContent: 'center' }}>Abrir Curso <ExternalLink size={16} /></a></div>
              </div>
            ))}
          </div>
        )}

        {currentView === 'roadmap' && (
          <div className="roadmap-view">
            {phases.map((phase) => (
              <div key={phase.id} className="roadmap-phase-card">
                <div className="roadmap-header"><h2>{phase.title}</h2><span className="badge">{phase.period}</span></div>
                <p className="roadmap-goal">{phase.goal}</p>
                <div className="roadmap-lessons">
                  {phase.lessons.map(l => (
                    <div key={l.id} className={`roadmap-lesson ${l.status === 'completed' ? 'done' : ''}`}>
                      <div className="roadmap-lesson-info">
                        <button className="check-btn" onClick={() => toggleLessonStatus(l.id)}>{l.status === 'completed' ? <CheckCircle2 size={20} color="var(--accent-green)" /> : <div className="empty-circle" />}</button>
                        <div><h4>{l.title} {l.type === 'certificate' && <Award size={14} color="#facc15" style={{display:'inline', marginLeft:4}}/>}</h4><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{l.moduleTitle} • {l.minutes} min</span></div>
                      </div>
                      <a href={l.url} target="_blank" rel="noopener noreferrer" className="btn-secondary">Ver <ExternalLink size={14} /></a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {currentView === 'projects' && (
          <div className="projects-view">
            <div className="add-project-card">
              <h3><Plus size={20} /> Añadir Proyecto</h3>
              <form onSubmit={(e) => {
                e.preventDefault(); const fd = new FormData(e.currentTarget);
                setProjects([...projects, { id: `p-${Date.now()}`, name: fd.get('name') as string, tech: fd.get('tech') as string, description: fd.get('description') as string, demoUrl: fd.get('demoUrl') as string, repoUrl: fd.get('repoUrl') as string, status: 'planning' }]);
                e.currentTarget.reset();
              }}>
                <input type="text" name="name" placeholder="Nombre del Proyecto" required />
                <input type="text" name="tech" placeholder="Tecnologías (ej. React, Node)" required />
                <textarea name="description" placeholder="Breve descripción..." required></textarea>
                <input type="url" name="demoUrl" placeholder="Link de la Demo (Opcional)" />
                <input type="url" name="repoUrl" placeholder="Link del Repositorio / GitHub (Opcional)" />
                <button type="submit" className="btn-primary">Crear Proyecto</button>
              </form>
            </div>
            <div className="projects-grid">
              {projects.map(p => (
                <div key={p.id} className="project-card">
                  <div className="project-header"><FolderGit2 size={24} color="var(--accent-blue)" /><span className={`status-badge ${p.status}`}>Planeación</span></div>
                  <h3>{p.name}</h3><p>{p.description}</p><div className="project-tech"><strong>Tech:</strong> {p.tech}</div>
                  {(p.demoUrl || p.repoUrl) && (
                    <div className="project-links">
                      {p.demoUrl && <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary"><LinkIcon size={14} /> Demo</a>}
                      {p.repoUrl && <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary"><Github size={14} /> Código</a>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'settings' && (
          <div className="settings-view">
            <div className="settings-card">
              <h3>Gestión de Datos</h3>
              <p>Tu progreso se guarda automáticamente en este navegador.</p>
              <button className="btn-danger" onClick={() => { if(window.confirm('¿Borrar todo?')) { localStorage.clear(); window.location.reload(); } }}><Trash2 size={18} /> Borrar datos</button>
            </div>
          </div>
        )}
      </main>

      <AnimatePresence>
        {showStats && (
          <motion.aside className="stats-panel" initial={{ width: 0, opacity: 0, overflow: 'hidden' }} animate={{ width: 340, opacity: 1 }} exit={{ width: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="stats-header"><h2 className="stats-title">Estadísticas</h2><button className="icon-btn" onClick={() => setShowStats(false)}><X size={20} /></button></div>
            <div className="stat-card"><div className="stat-icon-wrapper"><Target size={24} color="var(--accent-green)" /></div><div className="stat-info"><h3 className="stat-value">{globalStats.comp} / {globalStats.total}</h3><p className="stat-label">Lecciones</p></div></div>
            <div className="stat-card highlight-green"><div className="stat-icon-wrapper bg-white"><CheckCircle2 size={24} color="var(--accent-green)" /></div><div className="stat-info"><h3 className="stat-value text-dark">{studyHours}</h3><p className="stat-label text-dark-muted">Horas</p></div></div>
            
            <div className="progress-chart-card">
              <div className="chart-header"><h3 className="chart-title">Cronómetro</h3><Timer size={18} /></div>
              <div className="timer-display">{Math.floor(timeLeft/60).toString().padStart(2,'0')}:{(timeLeft%60).toString().padStart(2,'0')}</div>
              <div className="timer-controls">
                <select value={timerMinutes} onChange={(e) => { setTimerMinutes(Number(e.target.value)); setTimeLeft(Number(e.target.value)*60); setIsTimerRunning(false); }} disabled={isTimerRunning} className="timer-select">
                  <option value={15}>15 min</option><option value={30}>30 min</option><option value={60}>1 hora</option>
                </select>
                <button className="btn-icon-timer" onClick={() => { if(timeLeft===0) setTimeLeft(timerMinutes*60); setIsTimerRunning(!isTimerRunning); }}>{isTimerRunning ? <Pause size={20} /> : <Play size={20} />}</button>
                <button className="btn-icon-timer" onClick={() => { setIsTimerRunning(false); setTimeLeft(timerMinutes * 60); }}><RotateCcw size={20} /></button>
              </div>
            </div>

            <div className="progress-chart-card">
              <div className="chart-header"><h3 className="chart-title">Racha de Estudio</h3><Flame size={18} color="var(--accent-orange)" /></div>
              <div className="calendar-grid">
                {calendarDays.map((d, i) => <div key={i} className={`calendar-day ${d.active ? 'active' : ''}`} title={d.date}></div>)}
              </div>
            </div>

            <div className="footer-credit">WilkyJamse Dev</div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* MODAL DE LECCIÓN CON BOTÓN DE CALENDARIO */}
      <AnimatePresence>
        {selectedPhase && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedPhase(null)}>
            <motion.div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header"><h2>{selectedPhase.title}</h2><button className="icon-btn" onClick={() => setSelectedPhase(null)}><X size={20} /></button></div>
              <div className="modal-lessons">
                {selectedPhase.lessons.map(l => (
                  <div key={l.id} className={`modal-lesson-item ${l.status === 'completed' ? 'done' : ''}`}>
                    <div className="modal-lesson-info">
                      <h4>{l.title}</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{l.minutes} min</span>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {/* BOTÓN AÑADIR AL CALENDARIO */}
                      <AddToCalendarButton
                        name={l.title}
                        description={`Lección de DevPath 2027: ${l.title}. Duración: ${l.minutes} minutos.`}
                        startDate={new Date().toISOString().split('T')[0]}
                        startTime="19:00"
                        endTime={`${19 + Math.floor(l.minutes / 60)}:${(l.minutes % 60).toString().padStart(2, '0')}`}
                        location="Online - DevPath"
                        options="'Google','Apple','Outlook.com'"
                        buttonsList
                        hideTextLabelButton
                        lightMode={theme === 'light' ? 'light' : 'dark'}
                        styleLight="--btn-background: #f3f4f6; --btn-text: #111827;"
                        styleDark="--btn-background: #2a2a2a; --btn-text: #ffffff;"
                      />
                      
                      <button className={`btn-secondary ${l.status === 'completed' ? 'done' : ''}`} onClick={() => toggleLessonStatus(l.id)}>
                        {l.status === 'completed' ? 'Completado' : 'Marcar'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}