import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Crosshair, 
  X, 
  ExternalLink, 
  TrendingUp, 
  BarChart3, 
  Database, 
  Cpu, 
  Layers, 
  ChevronLeft, 
  ChevronRight, 
  ShieldAlert, 
  Sparkles,
  FileSpreadsheet,
  Activity,
  GitBranch,
  Filter,
  CheckCircle2
} from 'lucide-react';
import FadeIn from './FadeIn';
import { PerspectiveCarousel } from './ui/perspective-carousel';
import ScrollFadeElement from './ScrollFadeElement';
import { Boxes } from './ui/background-boxes';
import { StarsBackground } from './ui/stars-background';
import { ShootingStars } from './ui/shooting-stars';

// Define the type for our custom Analyst Projects
interface Project {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  image: string;
  color: string;
  glowColor: string;
  accentGrad: string;
  borderStyle: string;
  textGrad: string;
  badgeText: string;
  skills: string[];
  tools: string[];
  details: {
    objective: string;
    datasetScope: string;
    dataCleaning: string[];
    keyInsights: string[];
    businessImpact: string;
    analystDeepDive: string;
  };
}

const PROJECTS: Project[] = [
  {
    id: 'supply-chain',
    title: 'Global Supply Chain & Logistics Analytics',
    category: 'Supply Chain & Operations',
    shortDesc: 'Optimized transit delays and safety-stock allocation across multi-region hubs.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    color: '#00F2FE',
    glowColor: 'rgba(0, 242, 254, 0.45)',
    accentGrad: 'from-[#00F2FE]/20 to-[#4FACFE]/20',
    borderStyle: 'border-[#00F2FE]/30 group-hover:border-[#00F2FE]/80',
    textGrad: 'from-cyan-400 to-blue-400',
    badgeText: 'Predictive Operations',
    skills: ['Transit Log Modeling', 'SLA Breach Classification', 'Safety Stock Optimization', 'Geographic Congestion Mapping'],
    tools: ['SQL (PostgreSQL)', 'Python (Pandas / SciPy)', 'Power BI', 'Linear Programming'],
    details: {
      objective: 'Identify bottlenecks in transit durations and minimize warehousing holding overhead by modeling shipping logs.',
      datasetScope: '1.2M historical log entries from shipping routes crossing North America, EMEA, and APAC hubs.',
      dataCleaning: [
        'Resolved 14% missing timestamps using forward-filling heuristics conditioned on specific carrier route baselines.',
        'Pruned anomalous outlier durations exceeding 3x the route’s moving median (e.g., customs strikes, clerical entry errors).',
        'Standardized disparate timezone offsets into UTC to ensure cohesive hourly queue measurements.'
      ],
      keyInsights: [
        'Discovered that bottleneck congestion at 2 specific East Coast ports accounted for 68% of total SLA delivery breaches.',
        'A correlation analysis revealed a strong positive relationship (r = 0.72) between carrier handover delays and weekend processing schedules.',
        'Optimized route paths reduced safety stock requirements by 12% at regional warehouses.'
      ],
      businessImpact: 'Saved an estimated $420,000 annually in holding cost expenses while improving on-time SLA fulfillment from 81% to 94.5%.',
      analystDeepDive: 'Deep-dive perspective: By setting up dynamic safety stock calculation based on daily standard deviation of demand rather than using a static 30-day average, we eliminated stock-outs during high-volatility quarters without locking up working capital.'
    }
  },
  {
    id: 'customer-rfm',
    title: 'E-Commerce Customer Lifecycle & RFM Analytics',
    category: 'Customer Intelligence',
    shortDesc: 'Segmented consumer behavior profiles to optimize promotional spend and forecast churn.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    color: '#FF529E',
    glowColor: 'rgba(255, 82, 158, 0.45)',
    accentGrad: 'from-[#FF529E]/20 to-[#B600A8]/20',
    borderStyle: 'border-[#FF529E]/30 group-hover:border-[#FF529E]/80',
    textGrad: 'from-pink-400 to-purple-400',
    badgeText: 'Customer Cohorts',
    skills: ['RFM Behavioral Clustering', 'Cohort Survival Metrics', 'Customer Lifetime Value (LTV)', 'Promo Elasticity Modeling'],
    tools: ['Python (Sklearn / Seaborn)', 'SQL', 'Tableau Desktop', 'Excel VBA Modeling'],
    details: {
      objective: 'Segment active customer base based on purchase recency, purchase frequency, and net monetary spend to prevent churn.',
      datasetScope: '450,000 transaction records spanning 2 years, with multi-currency dynamic product lines.',
      dataCleaning: [
        'Identified and reversed negative transaction values (returns) by linking return records back to their parent invoice IDs.',
        'Standardized postal codes using geographic lookup databases to repair user-entered address fields.',
        'Imputed sparse missing demographic attributes utilizing mode value grouping by localized zip-code profiles.'
      ],
      keyInsights: [
        'Identified 5 distinct customer groups. The "At Risk High-Value" tier generated 28% of quarterly revenue but exhibited a 35% churn risk.',
        'Cohort analysis proved that users who did not make a secondary purchase within 45 days had a 78% drop-off curve in subsequent quarters.',
        'Tailored discount triggers on day 30 of customer inactivity boosted overall retention likelihood by 2.4x.'
      ],
      businessImpact: 'Enabled marketing teams to redeploy promotional spend from low-ROI generic ads to high-ROI retargeting, boosting segment sales conversion by 19%.',
      analystDeepDive: 'Deep-dive perspective: The data indicated that "Frequency" was a far stronger driver of long-term loyalty than high initial "Monetary" value. Shifting the marketing objective from pushing high-ticket single items to promoting low-cost subscription items grew LTV.'
    }
  },
  {
    id: 'saas-churn',
    title: 'SaaS Subscription Retention & Churn Engine',
    category: 'Product Analytics',
    shortDesc: 'Modeled user engagement metrics to predict subscription subscription cancellations.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    color: '#FFB800',
    glowColor: 'rgba(255, 184, 0, 0.45)',
    accentGrad: 'from-[#FFB800]/20 to-[#FF529E]/20',
    borderStyle: 'border-[#FFB800]/30 group-hover:border-[#FFB800]/80',
    textGrad: 'from-amber-400 to-orange-400',
    badgeText: 'Retention Modeling',
    skills: ['Churn Factor Analysis', 'Engagement Scoring', 'Feature Correlation Pruning', 'Survival Function Analysis'],
    tools: ['SQL (BigQuery)', 'Python', 'Scikit-Learn', 'Matplotlib / Seaborn'],
    details: {
      objective: 'Build a predictive behavioral framework to flag high-risk SaaS subscribers prior to active contract termination.',
      datasetScope: '85,000 active global monthly subscribers containing 14 distinct feature matrices.',
      dataCleaning: [
        'Scaled continuous engagement metrics using standard robust scalar transformations to suppress massive usage outliers.',
        'Handled high target class imbalance (only 7% churn rate) using synthetic minority over-sampling (SMOTE) techniques.',
        'Pruned highly collinear variables (r > 0.85) to optimize model compute speed and increase prediction clarity.'
      ],
      keyInsights: [
        'Discovered that log-in frequency dropping below 2 times per week was the single most powerful lead indicator for upcoming cancellations.',
        'Users who failed to set up an core account preference during their initial 7 days had a 4x higher probability of canceling after month 1.',
        'An increase in support ticket turnaround duration from 4 to 12 hours was strongly correlated with a 15% drop-off in user sentiment score.'
      ],
      businessImpact: 'Prevented subscriber leakage, resulting in an estimated 8.4% absolute reduction in quarterly customer churn.',
      analystDeepDive: 'Deep-dive perspective: By creating a daily "Engagement Health Score" and piping it into the sales team\'s CRM, customer success managers were able to reach out to lagging accounts 2 weeks before their contract renewal window, completely changing retention dynamics.'
    }
  },
  {
    id: 'financial-risk',
    title: 'Financial Portfolio Risk & Sentiment Analytics',
    category: 'Quantitative Finance',
    shortDesc: 'Conducted Value-at-Risk (VaR) modeling and news sentiment asset correlation.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    color: '#8A2BE2',
    glowColor: 'rgba(138, 43, 226, 0.45)',
    accentGrad: 'from-[#8A2BE2]/20 to-[#4B0082]/20',
    borderStyle: 'border-[#8A2BE2]/30 group-hover:border-[#8A2BE2]/80',
    textGrad: 'from-violet-400 to-indigo-400',
    badgeText: 'Risk Analysis',
    skills: ['Value-at-Risk (VaR) Estimation', 'Monte Carlo Market Simulation', 'Sharpe Ratio Optimization', 'Sentiment Correlation'],
    tools: ['Python (NumPy / SciPy)', 'SQL', 'Pandas Datareader', 'NLP (TextBlob)'],
    details: {
      objective: 'Perform quantitative risk profiling on asset weight allocations and align market feeds to sentiment trends.',
      datasetScope: '5 years of historical price closing data for 50 major index components, paired with news headlines.',
      dataCleaning: [
        'Adjusted price sequences for historical stock splits and corporate dividends to ensure baseline data integrity.',
        'Synchronized trading calendars across multi-region international stock markets, imputing non-matching dates.',
        'Filtered financial article headlines to remove redundant noise, keeping feed timestamps synced with trading hours.'
      ],
      keyInsights: [
        'Calculated portfolio Value-at-Risk (VaR) at a 95% confidence interval, optimizing portfolio asset balance.',
        'Monte Carlo simulations mapping 10,000 runs identified an efficient asset allocation Frontier with maximized Sharpe Ratio.',
        'Discovered a 14-hour leading correlation between sharp bearish financial news sentiment peaks and intra-day equity volatility spikes.'
      ],
      businessImpact: 'Provided data-driven risk reallocation, dropping expected portfolio downside variance by 12.5% without reducing returns.',
      analystDeepDive: 'Deep-dive perspective: Integrating simple natural language sentiment tracking onto financial media feeds proved that public perception affects short-term market fluctuation much quicker than technical price momentum indicators alone.'
    }
  },
  {
    id: 'healthcare-flow',
    title: 'Clinical Operations & Patient Flow Analytics',
    category: 'Healthcare Operations',
    shortDesc: 'Modeled ER patient queuing and staff allocation schedules to lower patient discharge delay.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    color: '#00E676',
    glowColor: 'rgba(0, 230, 118, 0.45)',
    accentGrad: 'from-[#00E676]/20 to-[#00B0FF]/20',
    borderStyle: 'border-[#00E676]/30 group-hover:border-[#00E676]/80',
    textGrad: 'from-green-400 to-emerald-400',
    badgeText: 'Operational Queueing',
    skills: ['Queuing Flow Modeling', 'Triage Score Optimization', 'Operational Bottleneck Auditing', 'Shift Resource Alignment'],
    tools: ['Python (SimPy Simulation)', 'SQL', 'Seaborn Visualization', 'Power BI Dashboards'],
    details: {
      objective: 'Identify workflow bottlenecks in hospital emergency rooms and optimize clinical staff rosters to match incoming patient curves.',
      datasetScope: '18 months of patient check-in, triage scores, practitioner handovers, and discharge stamps.',
      dataCleaning: [
        'Reconciled duplicate intake timestamps triggered during emergency batch processing.',
        'Filtered clinical records missing vital triage levels, employing classification trees to impute baseline scores.',
        'Created high-resolution elapsed time duration metrics: Wait Time, Treatment Duration, and Discharge Latency.'
      ],
      keyInsights: [
        'Wait times jumped by 45% during shift handovers due to an administrative resource deficit at triage desks.',
        'Discovered that non-emergent patient queues (Triage Levels 4 and 5) could be rerouted to a dedicated fast-track clinical nurse.',
        'A predictive staffing schedule simulation matched nursing staff numbers with peak intake hours (4 PM - 9 PM).'
      ],
      businessImpact: 'Reduced average emergency room wait-to-treatment duration by 22 minutes per patient, raising patient satisfaction by 30%.',
      analystDeepDive: 'Deep-dive perspective: Healthcare bottlenecks are almost always communication bottlenecks. Shifting the triage workflow from sequential handoffs to a collaborative rapid-assessment pod cut down idle patient wait times substantially.'
    }
  }
];

// Custom interactive SVG chart simulator matching the projects theme to enrich details inside the modal
const AnalyticalModalChart: React.FC<{ type: string; color: string }> = ({ type, color }) => {
  if (type === 'supply-chain') {
    return (
      <div className="w-full h-44 bg-neutral-950/80 rounded-xl border border-white/5 p-4 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">Warehouse Capacity vs Logistics Cost</span>
          <span className="text-[10px] font-mono text-cyan-400 font-bold">Optimal Point Identified</span>
        </div>
        <div className="h-28 w-full mt-2 relative">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100">
            {/* Grid Lines */}
            <line x1="10" y1="10" x2="290" y2="10" stroke="white" strokeOpacity="0.03" strokeDasharray="3 3" />
            <line x1="10" y1="50" x2="290" y2="50" stroke="white" strokeOpacity="0.03" strokeDasharray="3 3" />
            <line x1="10" y1="90" x2="290" y2="90" stroke="white" strokeOpacity="0.08" />
            <line x1="150" y1="10" x2="150" y2="90" stroke="white" strokeOpacity="0.03" strokeDasharray="3 3" />

            {/* Curves */}
            {/* Cost Line */}
            <path 
              d="M10 80 Q 90 75, 150 40 T 290 15" 
              fill="none" 
              stroke={color} 
              strokeWidth="2" 
              strokeLinecap="round"
            />
            {/* Holding Cost Line */}
            <path 
              d="M10 15 Q 120 30, 150 40 T 290 90" 
              fill="none" 
              stroke="#E9D5FF" 
              strokeWidth="1.5" 
              strokeDasharray="2 2"
              strokeOpacity="0.6"
            />
            
            {/* Optimum Circle */}
            <circle cx="150" cy="40" r="5" fill={color} className="animate-pulse" />
            <line x1="150" y1="40" x2="150" y2="90" stroke={color} strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.5" />
            <line x1="10" y1="40" x2="150" y2="40" stroke={color} strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.5" />

            {/* Labels */}
            <text x="12" y="75" fill={color} fontSize="7" fontFamily="monospace" opacity="0.8">Transit Delay Cost</text>
            <text x="12" y="25" fill="#E9D5FF" fontSize="7" fontFamily="monospace" opacity="0.8">Inventory Holding Cost</text>
            <text x="156" y="36" fill="white" fontSize="8" fontFamily="monospace" fontWeight="bold">Min Cost Zone</text>
          </svg>
        </div>
      </div>
    );
  }
  
  if (type === 'customer-rfm') {
    return (
      <div className="w-full h-44 bg-neutral-950/80 rounded-xl border border-white/5 p-4 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">Cohort Retention Matrix (% Active)</span>
          <span className="text-[10px] font-mono text-pink-400 font-bold">Month 1-5 Performance</span>
        </div>
        <div className="grid grid-cols-5 gap-1.5 mt-3 h-28 items-center">
          {/* Cohort Grid simulator */}
          {[
            { label: 'Jan Cohort', vals: [100, 82, 64, 48, 41] },
            { label: 'Feb Cohort', vals: [100, 84, 69, 52, 45] },
            { label: 'Mar Cohort', vals: [100, 87, 72, 59, 50] },
            { label: 'Apr Cohort', vals: [100, 89, 78, 65, 58] },
            { label: 'May Cohort', vals: [100, 91, 84, 72, 66] }
          ].map((row, rIdx) => (
            <div key={rIdx} className="flex flex-col gap-1 w-full">
              <span className="text-[6.5px] font-mono text-white/30 truncate block">{row.label}</span>
              <div className="flex gap-1 h-3.5">
                {row.vals.map((v, cIdx) => (
                  <div 
                    key={cIdx} 
                    className="flex-1 rounded-sm text-[6.5px] font-mono font-bold flex items-center justify-center text-black/80"
                    style={{ 
                      backgroundColor: color,
                      opacity: 0.15 + (v / 100) * 0.85
                    }}
                    title={`Month ${cIdx}: ${v}%`}
                  >
                    {v}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'saas-churn') {
    return (
      <div className="w-full h-44 bg-neutral-950/80 rounded-xl border border-white/5 p-4 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">Subscriber Engagement Churn Probability</span>
          <span className="text-[10px] font-mono text-amber-400 font-bold">Log-in Freq Hazard Function</span>
        </div>
        <div className="h-28 w-full mt-2">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100">
            <line x1="10" y1="10" x2="290" y2="10" stroke="white" strokeOpacity="0.03" strokeDasharray="2 2" />
            <line x1="10" y1="90" x2="290" y2="90" stroke="white" strokeOpacity="0.08" />
            <line x1="110" y1="10" x2="110" y2="90" stroke="#FF529E" strokeOpacity="0.3" strokeDasharray="3 3" />

            {/* Threshold Line */}
            <path 
              d="M10 88 C 60 88, 90 85, 110 50 C 130 15, 200 10, 290 8" 
              fill="none" 
              stroke={color} 
              strokeWidth="2" 
            />
            <path 
              d="M10 88 C 60 88, 90 85, 110 50 C 130 15, 200 10, 290 8 L 290 90 L 10 90 Z" 
              fill={`url(#grad-churn-${color.replace('#', '')})`} 
              opacity="0.1" 
            />
            <defs>
              <linearGradient id={`grad-churn-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>

            {/* Risk Indicator Anchor */}
            <circle cx="110" cy="50" r="4.5" fill={color} />
            <line x1="110" y1="50" x2="110" y2="90" stroke={color} strokeWidth="1" strokeDasharray="2 2" />

            <text x="116" y="48" fill="white" fontSize="7.5" fontFamily="monospace" fontWeight="bold">Critical Threshold (&lt;2 Logins/Wk)</text>
            <text x="200" y="80" fill="white" fillOpacity="0.3" fontSize="7" fontFamily="monospace">Active Usage Scale &gt;</text>
            <text x="12" y="45" fill={color} fontSize="7" fontFamily="monospace" fontWeight="semibold">Churn Probability</text>
          </svg>
        </div>
      </div>
    );
  }

  if (type === 'financial-risk') {
    return (
      <div className="w-full h-44 bg-neutral-950/80 rounded-xl border border-white/5 p-4 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">Portfolio Efficient Frontier (Max Sharpe)</span>
          <span className="text-[10px] font-mono text-purple-400 font-bold">Risk vs Expected Return</span>
        </div>
        <div className="h-28 w-full mt-2">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100">
            {/* Grid */}
            <line x1="10" y1="10" x2="290" y2="10" stroke="white" strokeOpacity="0.03" />
            <line x1="10" y1="90" x2="290" y2="90" stroke="white" strokeOpacity="0.08" />

            {/* Frontier Hyperbola curve */}
            <path 
              d="M20 90 Q 30 50, 80 35 T 260 18" 
              fill="none" 
              stroke={color} 
              strokeWidth="2.2" 
            />
            
            {/* Simulated Random Portfolios scattered around */}
            {[
              { x: 50, y: 78 }, { x: 72, y: 65 }, { x: 95, y: 58 }, { x: 120, y: 52 },
              { x: 155, y: 48 }, { x: 180, y: 45 }, { x: 210, y: 42 }, { x: 240, y: 38 },
              { x: 65, y: 82 }, { x: 88, y: 74 }, { x: 110, y: 68 }, { x: 140, y: 61 }
            ].map((pt, i) => (
              <circle key={i} cx={pt.x} cy={pt.y} r="1.5" fill="#E9D5FF" opacity="0.3" />
            ))}

            {/* Optimal Tangency Point */}
            <circle cx="80" cy="35" r="5" fill="#FFB800" className="animate-pulse" />
            <line x1="80" y1="35" x2="80" y2="90" stroke="#FFB800" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.6" />
            <line x1="10" y1="35" x2="80" y2="35" stroke="#FFB800" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.6" />

            <text x="88" y="32" fill="#FFB800" fontSize="8" fontFamily="monospace" fontWeight="bold">Max Sharpe Ratio (1.82)</text>
            <text x="15" y="25" fill={color} fontSize="7" fontFamily="monospace">Efficient Frontier</text>
            <text x="235" y="84" fill="white" fillOpacity="0.3" fontSize="7.5" fontFamily="monospace">Portfolio Variance (Risk)</text>
          </svg>
        </div>
      </div>
    );
  }

  // default clinical queue flow simulation
  return (
    <div className="w-full h-44 bg-neutral-950/80 rounded-xl border border-white/5 p-4 flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">Hospital Emergency Queuing Queue Density</span>
        <span className="text-[10px] font-mono text-emerald-400 font-bold">Standard vs Adaptive Staffing</span>
      </div>
      <div className="h-28 w-full mt-2">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100">
          <line x1="10" y1="10" x2="290" y2="10" stroke="white" strokeOpacity="0.03" />
          <line x1="10" y1="90" x2="290" y2="90" stroke="white" strokeOpacity="0.08" />

          {/* Regular Waiting curve */}
          <path 
            d="M10 82 Q 80 80, 130 30 T 250 85" 
            fill="none" 
            stroke="#EF4444" 
            strokeWidth="1.5" 
            strokeDasharray="2 2"
            strokeOpacity="0.6"
          />

          {/* Optimized waiting curve */}
          <path 
            d="M10 82 Q 80 80, 130 65 T 250 82" 
            fill="none" 
            stroke={color} 
            strokeWidth="2.2" 
          />

          <text x="12" y="72" fill="#EF4444" fontSize="7" fontFamily="monospace" opacity="0.8">Legacy Intake Queue Delay</text>
          <text x="120" y="55" fill={color} fontSize="7.5" fontFamily="monospace" fontWeight="semibold">Optimized Nurse Scheduling Desk</text>
          <text x="210" y="96" fill="white" fillOpacity="0.3" fontSize="7" fontFamily="monospace">Daily Peak Influx Hour</text>
        </svg>
      </div>
    </div>
  );
};

export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(2); // Start with central card active (middle card at index 2)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dimensions, setDimensions] = useState({ cardWidth: 240, gap: 24 });

  // Handle perfect fluid responsiveness calculations for viewport dimensions
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newCardWidth = 240;
      let newGap = 24;

      if (width < 640) {
        newCardWidth = 140;
        newGap = 10;
      } else if (width < 1024) {
        newCardWidth = 200;
        newGap = 16;
      } else {
        newCardWidth = 240;
        newGap = 24;
      }

      setDimensions(prev => {
        if (
          prev.cardWidth === newCardWidth &&
          prev.gap === newGap
        ) {
          return prev;
        }

        return {
          cardWidth: newCardWidth,
          gap: newGap,
        };
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial resize calculations

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Triggers slide target index alignment and centers card
  const handleCardClick = useCallback((index: number) => {
    if (index === activeIndex) {
      setSelectedProject(PROJECTS[index]);
    } else {
      setActiveIndex(index);
    }
  }, [activeIndex]);

  const carouselItems = useMemo(() => PROJECTS, []);

  return (
    <section
      id="projects"
      className="relative flex flex-col items-center justify-center bg-transparent px-0 pt-24 pb-24 sm:pt-32 sm:pb-32 overflow-hidden select-none border-t border-[#D7E2EA]/5"
    >
      {/* Viewport content */}
      <div className="w-full z-10 flex flex-col items-center">
        
        {/* Title Block with elegant layout matching about and internships */}
        <div className="text-center mb-8 sm:mb-10 px-5 w-full">
          <FadeIn delay={0} y={15} as="div" className="w-full">
            <ScrollFadeElement className="hero-heading font-black uppercase leading-[1.1] tracking-normal text-[clamp(3.5rem,11.5vw,165px)] text-[#D7E2EA] py-2">
              Projects
            </ScrollFadeElement>
          </FadeIn>
        </div>

        {/* 3D Curved Carousel stage & navigational controls */}
        <div className="w-full max-w-5xl z-20">
          <PerspectiveCarousel
            items={carouselItems}
            activeIndex={activeIndex}
            onChangeActiveIndex={setActiveIndex}
            onCardClick={handleCardClick}
            slideWidth={dimensions.cardWidth}
          />
        </div>

        {/* Dynamic Active Caption - Styled precisely like "street with mount fuji" in the user's image */}
        <div className="text-center mt-2 h-10 flex flex-col items-center justify-center pointer-events-none px-6 z-20">
          <FadeIn delay={0} y={15} as="div">
            <p className="text-white/20 font-mono tracking-[0.2em] text-[10px] uppercase">
              click active card to open
            </p>
          </FadeIn>
        </div>

        {/* Spacing alignment */}
        <div className="mt-4" />
      </div>

      {/* Premium Data-Analyst Case Study Detailed Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center p-4 overflow-y-auto">
            {/* Matte Glass black background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/92 backdrop-blur-md"
            />

            {/* Modal Panel Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-[580px] bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden p-5 sm:p-7 z-10 flex flex-col gap-5 shadow-[0_30px_70px_rgba(0,0,0,0.95)] max-h-[92vh] overflow-y-auto my-auto scrollbar-thin scrollbar-thumb-white/10"
            >
              
              {/* Header section of modal */}
              <div className="flex justify-between items-start border-b border-white/5 pb-4 gap-4 w-full">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="rounded-xl p-2 bg-white/5 border border-white/10 shrink-0">
                    <Database className="w-5 h-5" style={{ color: selectedProject.color }} />
                  </div>
                  <div className="min-w-0">
                    <span className="block font-mono text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest leading-none mb-1">
                      {selectedProject.category} Case Study
                    </span>
                    <h4 className="text-base sm:text-lg md:text-xl font-black uppercase text-white tracking-wide leading-tight">
                      {selectedProject.title}
                    </h4>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 sm:p-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all shrink-0 shadow-lg"
                  aria-label="Close Case Study"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Case Study Content body */}
              <div className="flex flex-col gap-4 text-left">
                
                {/* Simulated Interactive Analytical Dashboard inside the modal */}
                <div>
                  <span className="block text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-white/30 mb-2">
                    Case Study Interactive Analytics Simulation
                  </span>
                  <AnalyticalModalChart type={selectedProject.id} color={selectedProject.color} />
                </div>

                {/* 1. Core Business Objective */}
                <div className="bg-white/[0.01] border border-white/5 rounded-xl p-3.5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Activity className="w-3.5 h-3.5 text-white/60" style={{ color: selectedProject.color }} />
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/40">
                      Core Business Objective
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                    {selectedProject.details.objective}
                  </p>
                </div>

                {/* 2. Tools Stack & Skills Matrix */}
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/40">
                    Data Analyst Tools & Technical Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tools.map((tool, idx) => (
                      <span 
                        key={idx}
                        className="rounded-md bg-white/5 border border-white/10 text-white font-mono text-[9px] sm:text-[10px] px-2.5 py-1"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. The Data Cleaning & Prep Process (The dirty data details!) */}
                <div className="flex flex-col gap-2 border-t border-white/5 pt-4">
                  <div className="flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5 text-white/40" />
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/40">
                      Data Cleaning & Preprocessing Pipeline
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 mt-1">
                    {selectedProject.details.dataCleaning.map((step, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start">
                        <span className="font-mono text-[9px] sm:text-[10px] mt-0.5 px-1.5 py-0.5 rounded bg-white/5 text-white/50 border border-white/10 shrink-0">
                          0{idx + 1}
                        </span>
                        <p className="text-xs text-white/70 leading-relaxed font-light">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Core Insights & Analytical Discoveries */}
                <div className="flex flex-col gap-2 border-t border-white/5 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white/40" />
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/40">
                      Analytical Insights Discovered
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 mt-1">
                    {selectedProject.details.keyInsights.map((insight, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start">
                        <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: selectedProject.color }} />
                        <p className="text-xs text-white/70 leading-relaxed font-light">
                          {insight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Business Impact & ROI Delivery */}
                <div className="border-t border-white/5 pt-4 pb-2">
                  <div className="rounded-xl bg-gradient-to-r from-neutral-900 to-black border border-white/10 p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-emerald-400/80 font-bold">
                        Quantifiable Business Impact
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-300/95 leading-relaxed font-medium">
                      {selectedProject.details.businessImpact}
                    </p>
                  </div>
                </div>

                {/* 6. Deep Analyst Technical Commentary */}
                <div className="border-t border-white/5 pt-4">
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-1.5">
                    Data Analyst Technical Commentary
                  </span>
                  <p className="text-xs text-white/50 leading-relaxed italic font-light">
                    &ldquo;{selectedProject.details.analystDeepDive}&rdquo;
                  </p>
                </div>

              </div>

              {/* Footer action bar */}
              <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-2">
                <div className="text-left">
                  <span className="block text-[8px] font-mono uppercase tracking-widest text-white/30">
                    Portfolio Author
                  </span>
                  <span className="block text-xs font-bold text-white/80 leading-normal">
                    Muhammad Javed (Aspiring Analyst)
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="rounded-full bg-white/5 border border-white/10 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 px-4 py-2 cursor-pointer shadow-lg"
                >
                  Close Case Study
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}