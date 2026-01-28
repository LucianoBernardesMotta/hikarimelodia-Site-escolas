import React, { useState, useEffect, useMemo } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { 
  Music, 
  Brain, 
  Users, 
  Target, 
  ChevronRight, 
  Heart, 
  Star, 
  ShieldCheck, 
  CheckCircle2,
  Zap,
  X,
  BookOpen,
  ArrowLeft,
  Baby,
  Play,
  QrCode,
  Sparkles,
  Gift,
  Maximize2,
  ChevronLeft,
  RotateCw,
  MessageSquare,
  Pause,
  ArrowRight,
  Shield,
  Lock,
  BarChart3,
  TrendingUp,
  Calendar,
  MapPin,
  ClipboardList,
  GraduationCap,
  School,
  Clock,
  Globe,
  Book,
  ClipboardCheck,
  Flower2,
  Sun,
  Lightbulb,
  Rocket,
  Trophy
} from 'lucide-react';

// --- Types & Data ---

interface MethodologyDetail {
  id: string;
  icon: any;
  title: string;
  description: string;
  color: string;
  copy: string;
  scientificBase: string;
  sources: string[];
}

interface Subscriber {
  id: string;
  childName: string;
  age: string;
  parentName: string;
  address: string;
  whatsapp: string;
  plan: string;
  date: string;
}

const METHODOLOGY_DATA: MethodologyDetail[] = [
  {
    id: 'neuro',
    icon: Brain,
    title: "Ativação Neuroquímica",
    description: "A música libera dopamina e oxitocina, transformando o estudo em um momento de prazer.",
    color: "bg-purple-500",
    copy: "A música não é apenas entretenimento; é um 'hack' biológico. Quando seu filho ouve e canta as melodias do Hikari, o cérebro dele entra em estado de fluxo (Flow State). A dopamina facilita a formation de novas sinapses, transformando o que seria uma 'decoreba' cansativa em um registro de memória de longo prazo emocionalmente marcado.",
    scientificBase: "Estudos de neuroimagem mostram que o sistema de recompensa do cérebro é ativado intensamente pela música, liberando dopamina no estriado dorsal e ventral. Isso reduz os níveis de cortisol, eliminando o 'bloqueio afetivo' que impede muitas crianças de tentarem falar um novo idioma.",
    sources: [
      "Salimpoor, V. N., et al. (2011). 'Anatomically distinct dopamine release during anticipation and experience of peak emotion to music'. Nature Neuroscience.",
      "Zatorre, R. J. (2015). 'Musical pleasure and reward: From genes to networks'."
    ]
  },
  {
    id: 'auditory',
    icon: Music,
    title: "Córtex Auditivo",
    description: "Afinamos o ouvido da criança para distinguir fonemas complexos do japonês.",
    color: "bg-indigo-500",
    copy: "O japonês é uma língua de 'pitch accent' (acentuação tonal). Para uma criança brasileira, distinguir entre 'kaki' (caqui) e 'kaki' (ostra) exige um ouvido ultra-treinado. Através de frequências musicais específicas, o Hikari Melodia 'calibra' o córtex auditivo, tornando a percepção dos sons nativos automática e natural.",
    scientificBase: "Pesquisas indicam que o treinamento musical melhora a plasticidade do tronco cerebral auditivo. Músicos têm uma capacidade superior de detectar variações sutis em línguais tonais ou de acento rítmico, pois as áreas de processamento de altura (pitch) e tempo são compartilhadas entre música e fala.",
    sources: [
      "Patel, A. D. (2008). 'Music, Language, and the Brain'. Oxford University Press.",
      "Marques, C., et al. (2007). 'How musical training affects foreign language speech perception'. Cerebral Cortex."
    ]
  },
  {
    id: 'physio',
    icon: Target,
    title: "Fisioterapia Digital",
    description: "O Treinador de Pronúncia treina a musculatura da fala, prevenindo erros duradouros.",
    color: "bg-rose-500",
    copy: "Falar é um ato motor. Os músculos da língua e da face precisam de 'coreografia' para produzir sons japoneses sem sotaque pesado. O Hikari usa o ritmo (beat) para guiar o tempo de abertura da boca e a pressão do ar, funcionando como uma fisioterapia lúdica que instala a pronúncia correta na memória muscular.",
    scientificBase: "A Teoria do Entrainment Rítmico sugere que o ritmo musical sincroniza os disparos neuronais motores. Isso auxilia na coordenação da área de Broca (produção da fala), permitindo que a criança automatize sequências fonéticas complexas com menor esforço cognitivo.",
    sources: [
      "Stahl, B., et al. (2011). 'Singing aids the rehabilitation of speech in left-hemisphere stroke patients'. Brain.",
      "Fujii, S., & Wan, C. Y. (2014). 'The role of rhythm in speech and language rehabilitation'."
    ]
  },
  {
    id: 'social',
    icon: Users,
    title: "Vínculo Social",
    description: "O aprendizado em 'Alianças' combate a solidão e gera segurança emocional.",
    color: "bg-green-500",
    copy: "O isolamento é o maior inimigo do aprendizado. Ao participar de 'Alianças', seu filho ativa os neurônios-espelho através da co-ação rítmica. Cantar e aprender junto, mesmo que digitalmente, cria um senso de pertencimento (Ibasho) que é fundamental para a saúde mental da criança brasileira no Japão.",
    scientificBase: "A sincronização interpessoal mediada pela música aumenta os níveis de oxitocina, o hormônio do vínculo. Grupos que realizam atividades rítmicas juntos demonstram maior cooperação e empatia, reduzindo a ansiedade social associada ao uso da 'língua do outro'.",
    sources: [
      "Tarr, B., et al. (2014). 'Music and social bonding: self-other merging and neurohormonal mechanisms'. Frontiers in Psychology.",
      "Koelsch, S. (2014). 'Brain correlates of music-evoked emotions'."
    ]
  }
];

const PRESENTATION_IMAGES = [
  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2040&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1972&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=2072&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460518451285-97b6aa326961?q=80&w=2070&auto=format&fit=crop"
];

// --- Stats Helpers ---

const updateStats = (key: string, value: any = null) => {
  if (key === 'visit') {
    const current = Number(localStorage.getItem('hikari_total_visits') || 0);
    localStorage.setItem('hikari_total_visits', (current + 1).toString());
  } else if (key === 'registration_initiated') {
    const current = Number(localStorage.getItem('hikari_registrations_initiated') || 0);
    localStorage.setItem('hikari_registrations_initiated', (current + 1).toString());
  } else if (key === 'subscription_completed') {
    const current = Number(localStorage.getItem('hikari_subscriptions_completed') || 0);
    localStorage.setItem('hikari_subscriptions_completed', (current + 1).toString());
    const now = new Date().toLocaleString('pt-BR');
    localStorage.setItem('hikari_last_subscription_date', now);
    
    if (value) {
      const plans = JSON.parse(localStorage.getItem('hikari_plan_counts') || '{"mensal": 0, "anual": 0}');
      plans[value.plan] = (plans[value.plan] || 0) + 1;
      localStorage.setItem('hikari_plan_counts', JSON.stringify(plans));

      const subscribers: Subscriber[] = JSON.parse(localStorage.getItem('hikari_subscribers') || '[]');
      const newSubscriber: Subscriber = {
        id: Math.random().toString(36).substr(2, 9),
        childName: value.childName,
        age: value.age,
        parentName: value.parentName,
        address: value.address,
        whatsapp: value.whatsapp,
        plan: value.plan,
        date: now
      };
      subscribers.unshift(newSubscriber);
      localStorage.setItem('hikari_subscribers', JSON.stringify(subscribers.slice(0, 100)));
    }
  }
};

const getStats = () => {
  const plans = JSON.parse(localStorage.getItem('hikari_plan_counts') || '{"mensal": 0, "anual": 0}');
  const subscribers: Subscriber[] = JSON.parse(localStorage.getItem('hikari_subscribers') || '[]');
  const mostPopular = plans.anual >= plans.mensal ? 'Anual' : 'Mensal';
  
  return {
    visits: localStorage.getItem('hikari_total_visits') || '0',
    initiated: localStorage.getItem('hikari_registrations_initiated') || '0',
    completed: localStorage.getItem('hikari_subscriptions_completed') || '0',
    lastDate: localStorage.getItem('hikari_last_subscription_date') || 'Nenhuma até agora',
    subscribers,
    mostPopular
  };
};

// --- Shared Components ---

const SakuraBackground = () => {
  const petals = useMemo(() => Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 10}s`,
    duration: `${6 + Math.random() * 6}s`,
    size: `${10 + Math.random() * 15}px`,
    rotate: `${Math.random() * 360}deg`
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="sakura-petal"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            transform: `rotate(${petal.rotate})`
          }}
        />
      ))}
    </div>
  );
};

const MusicalBackground = () => {
  const notes = useMemo(() => {
    const symbols = ['♪', '♫', '♬', '♩'];
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      symbol: symbols[i % symbols.length],
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${15 + Math.random() * 15}s`,
      scale: 0.5 + Math.random() * 1.5,
      opacity: 0.1 + Math.random() * 0.3,
      blur: Math.random() > 0.7 ? 'blur(1px)' : 'none'
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {notes.map((note) => (
        <div
          key={note.id}
          className="absolute font-serif text-[#D4AF37] animate-note-float select-none drop-shadow-sm"
          style={{
            left: note.left,
            top: note.top,
            fontSize: `${note.scale * 2.5}rem`,
            opacity: note.opacity,
            filter: note.blur,
          }}
        >
          {note.symbol}
        </div>
      ))}
      <div className="hikari-cloud absolute top-[15%] left-[10%] w-72 h-32 bg-white/20 rounded-full blur-2xl"></div>
      <div className="hikari-cloud absolute bottom-[20%] right-[15%] w-96 h-40 bg-white/20 rounded-full blur-2xl"></div>
    </div>
  );
};

const SectionTitle = ({ title, subtitle, centered = true, light = false }: any) => (
  <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
    <h2 className={`text-h2 mb-4 font-baloo ${light ? 'text-white' : 'text-[#2D3436]'}`}>{title}</h2>
    {subtitle && <p className={`text-body max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-white/80' : 'text-slate-600'}`}>{subtitle}</p>}
  </div>
);

const ClayIcon = ({ icon: Icon, color, label }: { icon: any, color: string, label: string }) => (
  <div className="flex flex-col items-center gap-4 group cursor-default">
    <div className={`relative w-24 h-24 flex items-center justify-center rounded-[35%] transition-transform duration-500 group-hover:scale-105 clay-effect ${color} animate-clay-pulse`}>
      <Icon size={40} className="text-white drop-shadow-md" />
    </div>
    <span className="text-sm font-bold text-slate-700 text-center max-w-[120px] font-baloo leading-tight">{label}</span>
  </div>
);

const ImageCarousel = ({ images }: { images: string[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  return (
    <>
      <div className="relative group w-full overflow-hidden py-10">
        <div className="flex gap-4 overflow-x-auto pb-8 scrollbar-hide px-4 snap-x">
          {images.map((src, idx) => (
            <div 
              key={idx} 
              onClick={() => openLightbox(idx)}
              className="min-w-[280px] md:min-w-[400px] aspect-[16/9] rounded-2xl overflow-hidden shadow-lg cursor-pointer transform hover:scale-[1.02] transition-all snap-center relative border-4 border-white"
            >
              <img src={src} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                <Maximize2 className="text-white drop-shadow-lg" size={32} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2">
          {images.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-[#5DCCD6] w-6' : 'bg-slate-300'}`} />
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[200] bg-slate-900/98 backdrop-blur-xl flex flex-col items-center justify-center p-4">
          <button 
            onClick={() => setIsOpen(false)} 
            className="absolute top-6 right-6 z-[210] p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
          >
            <X size={24} />
          </button>
          
          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-yellow-400 text-slate-900 px-4 py-2 rounded-full font-bold text-xs animate-bounce shadow-xl">
            <RotateCw size={14} /> Coloque o celular na horizontal
          </div>

          <div className="relative w-full max-w-6xl aspect-video flex items-center justify-center group">
            <button onClick={prevSlide} className="absolute left-0 z-[210] p-4 text-white/50 hover:text-white transition-all">
              <ChevronLeft size={48} />
            </button>
            <img 
              src={images[currentIndex]} 
              alt="Slide Expanded" 
              className="w-full h-full object-contain rounded-xl shadow-2xl animate-in zoom-in duration-300" 
            />
            <button onClick={nextSlide} className="absolute right-0 z-[210] p-4 text-white/50 hover:text-white transition-all">
              <ChevronRight size={48} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// --- Modal Components ---

const CrecheModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[500] bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-3xl overflow-hidden flex flex-col relative animate-in zoom-in slide-in-from-bottom-8 duration-500">
        
        {/* Colorful Header */}
        <div className="h-40 bg-gradient-to-r from-[#5A9DFC] via-[#FFB3D9] to-[#FFD700] p-8 flex items-center justify-center relative overflow-hidden">
          <MusicalBackground />
          <div className="absolute top-6 right-6 z-10">
            <button onClick={onClose} className="p-2.5 bg-white/30 hover:bg-white/50 text-white rounded-full transition-all shadow-lg backdrop-blur-sm">
              <X size={24} strokeWidth={3} />
            </button>
          </div>
          <div className="relative z-10 flex flex-col items-center mt-4">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-[#5A9DFC] mb-2 animate-bounce-subtle">
              <Baby size={36} />
            </div>
            <h3 className="text-3xl font-black text-white font-baloo drop-shadow-md">Creche</h3>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-8 md:p-12 overflow-y-auto max-h-[70vh] bg-[#FDFDFD]">
          <div className="text-center mb-8">
            <h4 className="text-xl font-bold text-slate-800 font-baloo mb-2">Primeiros passos, primeiras conexões</h4>
            <div className="w-20 h-1 bg-[#FFB3D9] mx-auto rounded-full"></div>
          </div>

          <p className="text-slate-700 text-lg leading-relaxed mb-8 font-medium text-center italic">
            "Na Creche, cada gesto é descoberta, cada olhar é vínculo. Nosso ambiente acolhedor é pensado especialmente para bebês e crianças pequenas (0 a 3 anos), onde o cuidado afetuoso se une à intencionalidade pedagógica."
          </p>

          <div className="space-y-6">
            <h5 className="font-black text-[#D21E9D] text-sm uppercase tracking-widest mb-4">Aqui, o aprendizado acontece por meio de:</h5>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: Sparkles, color: "text-[#FFD700]", bg: "bg-[#FFD700]/10", text: "Brincadeiras sensoriais (texturas, sons, movimentos)" },
                { icon: ShieldCheck, color: "text-[#5A9DFC]", bg: "bg-[#5A9DFC]/10", text: "Rotinas previsíveis que constroem segurança emocional" },
                { icon: Users, color: "text-[#60D394]", bg: "bg-[#60D394]/10", text: "Interações suaves com pares e adultos, incentivando os primeiros laços sociais" },
                { icon: Flower2, color: "text-[#4CAF50]", bg: "bg-[#4CAF50]/10", text: "Contato com elementos naturais (água, areia, folhas, luz natural)" },
                { icon: Music, color: "text-[#FFB3D9]", bg: "bg-[#FFB3D9]/10", text: "Estímulos culturais lúdicos: canções em português e japonês" },
              ].map((item, i) => (
                <div key={i} className={`${item.bg} p-5 rounded-3xl flex gap-4 items-start transition-all hover:scale-[1.02]`}>
                  <div className={`shrink-0 ${item.color} mt-1`}>
                    <item.icon size={22} strokeWidth={2.5} />
                  </div>
                  <span className="text-slate-700 font-bold text-sm leading-snug">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 bg-slate-50 p-8 rounded-[35px] border-2 border-slate-100">
            <p className="text-slate-600 font-medium leading-relaxed">
              Nossa equipe observa atentamente os ritmos individuais de cada criança, respeitando seu tempo para engatinhar, falar, compartilhar ou apenas observar. 
              <br/><br/>
              <span className="text-slate-900 font-black">Porque nesta fase, brincar não é só diversão — é a linguagem do desenvolvimento.</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-center">
          <button 
            onClick={onClose}
            className="hikari-btn-primary px-10 py-4 font-black shadow-lg"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

const EducacaoInfantilModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[500] bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-3xl rounded-[40px] shadow-3xl overflow-hidden flex flex-col relative animate-in zoom-in slide-in-from-bottom-8 duration-500">
        
        {/* Colorful Header */}
        <div className="h-40 bg-gradient-to-r from-[#D21E9D] via-[#FFB3D9] to-[#5A9DFC] p-8 flex items-center justify-center relative overflow-hidden">
          <MusicalBackground />
          <div className="absolute top-6 right-6 z-10">
            <button onClick={onClose} className="p-2.5 bg-white/30 hover:bg-white/50 text-white rounded-full transition-all shadow-lg backdrop-blur-sm">
              <X size={24} strokeWidth={3} />
            </button>
          </div>
          <div className="relative z-10 flex flex-col items-center mt-4 text-center">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-[#D21E9D] mb-2 animate-bounce-subtle">
              <Sparkles size={36} fill="currentColor" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white font-baloo drop-shadow-md">Educação Infantil</h3>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-8 md:p-12 overflow-y-auto max-h-[70vh] bg-[#FDFDFD]">
          <div className="text-center mb-8">
            <h4 className="text-xl font-bold text-slate-800 font-baloo mb-2">Aprendizagem com propósito, celebração com sentido</h4>
            <div className="w-24 h-1 bg-[#D21E9D] mx-auto rounded-full"></div>
          </div>

          <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-8 font-medium">
            Na Educação Infantil, cada atividade tem um objetivo claro, cada brincadeira é uma oportunidade de desenvolvimento e cada conquista é observada, registrada e celebrada. 
            Nosso currículo, estruturado no sistema objetivo de ensino, define metas concretas para o desenvolvimento integral da criança de 3 a 6 anos, integrando:
          </p>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {[
                { 
                  icon: MessageSquare, 
                  color: "text-[#D21E9D]", 
                  bg: "bg-[#D21E9D]/5", 
                  title: "Competências linguísticas", 
                  desc: "Exposição diária a sons, ritmos e vocabulário em português e japonês, com foco em compreensão auditiva, pronúncia clara e uso funcional da língua." 
                },
                { 
                  icon: Heart, 
                  color: "text-[#FFB3D9]", 
                  bg: "bg-[#FFB3D9]/10", 
                  title: "Desenvolvimento socioemocional", 
                  desc: "Atividades colaborativas com metas coletivas, onde a criança aprende a compartilhar, esperar sua vez e expressar sentimentos com respeito — habilidades avaliadas continuamente." 
                },
                { 
                  icon: Sun, 
                  color: "text-[#FFD700]", 
                  bg: "bg-[#FFD700]/10", 
                  title: "Conexão com a Natureza", 
                  desc: "Vivências ligadas às estações do ano com objetivos sensoriais, cognitivos e culturais específicos (ex: observação do Hanami, festivais rítmicos)." 
                },
                { 
                  icon: Music, 
                  color: "text-[#5A9DFC]", 
                  bg: "bg-[#5A9DFC]/10", 
                  title: "Estímulo musical intencional", 
                  desc: "Canções bilíngues não são apenas diversão — são ferramentas para treinar discriminação auditiva, memória sequencial e coordenação motora, com progressão mensurável." 
                },
              ].map((item, i) => (
                <div key={i} className={`${item.bg} p-6 rounded-[30px] border border-transparent hover:border-slate-200 transition-all`}>
                  <div className="flex gap-4 items-start">
                    <div className={`shrink-0 ${item.color} mt-1 p-3 bg-white rounded-2xl shadow-sm`}>
                      <item.icon size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h5 className="font-black text-slate-800 text-lg mb-1">{item.title}</h5>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 bg-white p-8 rounded-[40px] border-2 border-slate-100 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <Trophy size={60} />
             </div>
             <p className="text-slate-700 font-medium leading-relaxed relative z-10">
              Tudo isso ocorre em um ambiente acolhedor, previsível e rico em estímulos, onde a rotina oferece segurança e a avaliação acontece de forma natural — por meio da observação contínua, registros descritivos e feedbacks visuais (como selos de conquista, painéis de progresso e celebrações coletivas).
              <br/><br/>
              <span className="text-slate-900 font-black text-lg block border-l-4 border-[#D21E9D] pl-4 italic">
                "Porque nesta fase, brincar com intencionalidade é o caminho mais eficaz para construir as bases de uma criança confiante, curiosa e preparada para os desafios do Ensino Fundamental."
              </span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-center">
          <button 
            onClick={onClose}
            className="hikari-btn-accent px-12 py-4 font-black shadow-lg"
          >
            Entendido!
          </button>
        </div>
      </div>
    </div>
  );
};

const EnsinoFundamentalModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[500] bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-3xl rounded-[40px] shadow-3xl overflow-hidden flex flex-col relative animate-in zoom-in slide-in-from-bottom-8 duration-500">
        
        {/* Colorful Header */}
        <div className="h-40 bg-gradient-to-r from-[#4CAF50] via-[#60D394] to-[#5A9DFC] p-8 flex items-center justify-center relative overflow-hidden">
          <MusicalBackground />
          <div className="absolute top-6 right-6 z-10">
            <button onClick={onClose} className="p-2.5 bg-white/30 hover:bg-white/50 text-white rounded-full transition-all shadow-lg backdrop-blur-sm">
              <X size={24} strokeWidth={3} />
            </button>
          </div>
          <div className="relative z-10 flex flex-col items-center mt-4 text-center">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-[#4CAF50] mb-2 animate-bounce-subtle">
              <BookOpen size={36} fill="currentColor" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white font-baloo drop-shadow-md">Ensino Fundamental</h3>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-8 md:p-12 overflow-y-auto max-h-[70vh] bg-[#FDFDFD]">
          <div className="text-center mb-8">
            <h4 className="text-xl font-bold text-slate-800 font-baloo mb-2">Construção sólida, pensamento crítico e pertencimento cultural</h4>
            <div className="w-24 h-1 bg-[#4CAF50] mx-auto rounded-full"></div>
          </div>

          <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-8 font-medium">
            No Ensino Fundamental, cada aluno é guiado por um currículo estruturado em objetivos mensuráveis, onde o conhecimento não é apenas transmitido — é construído, avaliado e celebrado com clareza e intencionalidade.
            <br/><br/>
            Nosso sistema objetivo de ensino define, mês a mês, metas concretas de aprendizagem em todas as áreas — <span className="text-[#4CAF50] font-black">Língua Portuguesa, Matemática, Ciências, História, Geografia e Língua Japonesa</span> — garantindo que nenhuma lacuna se acumule e que todo progresso seja visível para a família.
          </p>

          <div className="space-y-6">
            <h5 className="font-black text-[#4CAF50] text-sm uppercase tracking-widest mb-4">Como isso acontece na prática?</h5>
            
            <div className="grid grid-cols-1 gap-4">
              {[
                { 
                  icon: Target, 
                  color: "text-[#4CAF50]", 
                  bg: "bg-[#4CAF50]/5", 
                  title: "Avaliação formativa contínua", 
                  desc: "Atividades diagnósticas, formativas e somativas permitem ajustar o ritmo de cada aluno, respeitando seu tempo sem perder de vista a meta acadêmica." 
                },
                { 
                  icon: Users, 
                  color: "text-[#5A9DFC]", 
                  bg: "bg-[#5A9DFC]/10", 
                  title: "Desenvolvimento socioemocional intencional", 
                  desc: "Habilidades como colaboração, resolução de conflitos, autoconfiança e empatia são trabalhadas em situações reais de sala de aula, com metas observáveis e feedback descritivo." 
                },
                { 
                  icon: MessageSquare, 
                  color: "text-[#D21E9D]", 
                  bg: "bg-[#D21E9D]/5", 
                  title: "Língua japonesa funcional", 
                  desc: "O japonês não é ensinado apenas como disciplina, mas como ferramenta de comunicação — com ênfase em situações do cotidiano escolar e familiar (saudações, pedidos, descrição de rotinas)." 
                },
              ].map((item, i) => (
                <div key={i} className={`${item.bg} p-6 rounded-[30px] border border-transparent hover:border-slate-200 transition-all shadow-sm`}>
                  <div className="flex gap-5 items-start">
                    <div className={`shrink-0 ${item.color} mt-1 p-3 bg-white rounded-2xl shadow-sm`}>
                      <item.icon size={26} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h5 className="font-black text-slate-800 text-lg mb-1">{item.title}</h5>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 bg-slate-50 p-8 rounded-[40px] border-2 border-slate-100 relative overflow-hidden">
             <div className="absolute bottom-0 right-0 p-4 opacity-5">
                <Lightbulb size={120} />
             </div>
             <p className="text-slate-700 font-medium leading-relaxed relative z-10">
              Tudo isso ocorre em um ambiente organizado, previsível e acolhedor, onde a criança sabe o que se espera dela, entende seu progresso e sente-se segura para errar, perguntar e crescer.
              <br/><br/>
              <span className="text-slate-900 font-black text-xl block border-l-4 border-[#4CAF50] pl-5 italic mt-4">
                "Porque nesta fase, dominar o conhecimento não é decorar respostas — é saber fazer perguntas, buscar soluções e sentir-se capaz de contribuir para o mundo."
              </span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-center">
          <button 
            onClick={onClose}
            className="hikari-btn-primary px-14 py-4 font-black shadow-lg"
          >
            Entendido!
          </button>
        </div>
      </div>
    </div>
  );
};

const EnsinoMedioModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[500] bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-4xl rounded-[40px] shadow-3xl overflow-hidden flex flex-col relative animate-in zoom-in slide-in-from-bottom-8 duration-500">
        
        {/* Golden/Yellow Header */}
        <div className="h-40 bg-gradient-to-r from-[#FFD700] via-[#FFB3D9] to-[#D21E9D] p-8 flex items-center justify-center relative overflow-hidden">
          <MusicalBackground />
          <div className="absolute top-6 right-6 z-10">
            <button onClick={onClose} className="p-2.5 bg-white/30 hover:bg-white/50 text-white rounded-full transition-all shadow-lg backdrop-blur-sm">
              <X size={24} strokeWidth={3} />
            </button>
          </div>
          <div className="relative z-10 flex flex-col items-center mt-4 text-center">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-[#FFD700] mb-2 animate-bounce-subtle">
              <GraduationCap size={36} fill="currentColor" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white font-baloo drop-shadow-md">Ensino Médio</h3>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-8 md:p-12 overflow-y-auto max-h-[70vh] bg-[#FDFDFD]">
          <div className="text-center mb-10">
            <h4 className="text-xl font-bold text-slate-800 font-baloo mb-2">Aprendizagem com metas claras, avaliação contínua e foco em resultados</h4>
            <div className="w-24 h-1 bg-[#FFD700] mx-auto rounded-full"></div>
          </div>

          <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-10 font-medium">
            No Ensino Médio, nosso compromisso é com a formação acadêmica sólida, mensurável e orientada por objetivos específicos. Adotamos o <span className="text-[#D21E9D] font-black">Sistema Objetivo de Ensino</span>, no qual todo o currículo é estruturado em metas de aprendizagem explícitas, sequenciais e avaliáveis, garantindo que nenhuma conteúdo essencial seja negligenciado.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h5 className="font-black text-[#D21E9D] text-sm uppercase tracking-widest flex items-center gap-2">
                <Target size={18} /> Como funciona na prática?
              </h5>
              
              <div className="space-y-4">
                {[
                  { 
                    title: "Avaliação Diagnóstica e Formativa", 
                    desc: "Identificamos lacunas de aprendizado em tempo real, permitindo intervenções pedagógicas precisas antes que as dúvidas se acumulem." 
                  },
                  { 
                    title: "Metas de Aprendizagem Mensais", 
                    desc: "Alunos e famílias sabem exatamente o que será ensinado, o que se espera que o aluno domine e como será avaliado." 
                  },
                  { 
                    title: "Feedback Descritivo", 
                    desc: "Além de notas, oferecemos devolutivas que apontam caminhos para a melhoria contínua e celebram conquistas específicas." 
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-[#D21E9D]/10 text-[#D21E9D] flex items-center justify-center shrink-0 mt-1 font-bold text-xs">
                      {i + 1}
                    </div>
                    <div>
                      <h6 className="font-bold text-slate-800">{item.title}</h6>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-[30px] border border-slate-100">
              <h5 className="font-black text-[#5A9DFC] text-sm uppercase tracking-widest flex items-center gap-2 mb-6">
                <Rocket size={18} /> Diferenciais
              </h5>
              
              <ul className="space-y-4">
                {[
                  "Foco em exames vestibulares e certificações",
                  "Orientação vocacional integrada",
                  "Projetos interdisciplinares práticos",
                  "Suporte emocional para a fase adolescente"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 size={18} className="text-[#60D394] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 bg-[#FFD700]/10 rounded-full flex items-center justify-center text-[#FFD700]">
                  <Trophy size={20} />
                </div>
                <p className="text-xs text-slate-500 font-medium italic">
                  "Preparando jovens não apenas para provas, mas para a vida."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-center">
          <button 
            onClick={onClose}
            className="hikari-btn-primary px-14 py-4 font-black shadow-lg"
          >
            Entendido!
          </button>
        </div>
      </div>
    </div>
  );
};

const PlansSection = ({ onSelectPlan }: { onSelectPlan: (plan: 'mensal' | 'anual') => void }) => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Investimento no Futuro" 
          subtitle="Escolha o plano ideal para a jornada bilíngue do seu filho."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Plano Mensal */}
          <div className="bg-white p-8 rounded-[40px] shadow-lg border border-slate-100 flex flex-col relative hover:border-[#5DCCD6] transition-colors">
            <div className="mb-8">
              <h3 className="text-2xl font-bold font-baloo text-slate-800">Plano Mensal</h3>
              <p className="text-slate-500">Flexibilidade total</p>
            </div>
            <div className="mb-8">
              <span className="text-5xl font-black text-slate-900">¥500</span>
              <span className="text-slate-400 font-bold">/mês</span>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-start gap-3 text-slate-700 font-bold">
                <CheckCircle2 className="text-[#5DCCD6] shrink-0" size={20} />
                Acesso a 1 música por mês
              </li>
              <li className="flex items-start gap-3 text-slate-700 font-bold">
                <CheckCircle2 className="text-[#5DCCD6] shrink-0" size={20} />
                Material Impresso
              </li>
              <li className="flex items-start gap-3 text-slate-700 font-bold">
                <CheckCircle2 className="text-[#5DCCD6] shrink-0" size={20} />
                Certificado Digital de Conquista
              </li>
            </ul>
            <button 
              onClick={() => onSelectPlan('mensal')}
              className="w-full py-5 rounded-full font-bold text-slate-800 border-4 border-slate-100 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group"
            >
              Começar Mensal <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Plano Anual */}
          <div className="bg-white p-8 rounded-[40px] shadow-2xl border-4 border-[#FFD700] flex flex-col relative scale-105 z-10">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#FFD700] text-slate-900 px-6 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-lg">
              <Star size={12} fill="currentColor" /> Recomendado por 80% das famílias
            </div>
            
            <div className="mb-8 flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold font-baloo text-slate-800">Plano Anual</h3>
                <p className="text-[#D21E9D] font-bold">Economize ¥1.000</p>
              </div>
              <div className="w-12 h-12 bg-[#FFD700]/20 rounded-2xl flex items-center justify-center text-[#FFD700]">
                <Gift size={24} />
              </div>
            </div>
            <div className="mb-8">
              <span className="text-5xl font-black text-slate-900">¥5.000</span>
              <span className="text-slate-400 font-bold">/ano</span>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-start gap-3 text-slate-700 font-bold">
                <CheckCircle2 className="text-[#FFD700] shrink-0" size={20} />
                Pode cancelar a qualquer momento
              </li>
              <li className="flex items-start gap-3 text-slate-700 font-bold">
                <CheckCircle2 className="text-[#FFD700] shrink-0" size={20} />
                Acesso a 1 música por mês
              </li>
              <li className="flex items-start gap-3 text-slate-700 font-bold">
                <CheckCircle2 className="text-[#FFD700] shrink-0" size={20} />
                Material Impresso
              </li>
              <li className="flex items-start gap-3 text-slate-700 font-bold">
                <CheckCircle2 className="text-[#FFD700] shrink-0" size={20} />
                Certificado Digital e Impresso de Conquista Mensal
              </li>
              <li className="flex items-start gap-3 text-slate-700 font-bold">
                <CheckCircle2 className="text-[#FFD700] shrink-0" size={20} />
                Acesso Prioritário ao “Chat do Kotoba Sensei”
              </li>
            </ul>
            <button 
              onClick={() => onSelectPlan('anual')}
              className="hikari-btn-accent w-full py-6 font-black text-xl shadow-xl cta-pulse flex items-center justify-center gap-2"
            >
              QUERO O PLANO ANUAL <Zap size={20} fill="currentColor" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const MethodologyModal = ({ item, onClose }: { item: MethodologyDetail, onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[300] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]">
        <div className={`${item.color} p-8 text-white relative shrink-0`}>
          <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all">
            <X size={20} />
          </button>
          <div className="flex items-center gap-4 mb-4">
            <item.icon size={48} className="drop-shadow-lg" />
            <h3 className="text-3xl font-black font-baloo">{item.title}</h3>
          </div>
          <p className="text-white/90 font-medium text-lg">{item.description}</p>
        </div>
        
        <div className="p-8 md:p-10 space-y-8 overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#D21E9D]">
              <Zap size={20} fill="currentColor" />
              <h4 className="font-black uppercase tracking-widest text-sm">O que acontece?</h4>
            </div>
            <p className="text-slate-700 leading-relaxed font-medium">{item.copy}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-500">
              <Brain size={20} />
              <h4 className="font-black uppercase tracking-widest text-sm">Base Científica</h4>
            </div>
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 italic text-slate-600 text-sm leading-relaxed">
              {item.scientificBase}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-400">
              <BookOpen size={20} />
              <h4 className="font-black uppercase tracking-widest text-sm">Fontes Acadêmicas</h4>
            </div>
            <ul className="space-y-2">
              {item.sources.map((source, i) => (
                <li key={i} className="text-xs text-slate-400 font-medium list-disc ml-4">{source}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-all"
          >
            Entendido!
          </button>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = ({ initialPlan, onComplete, onCancel }: { initialPlan: string, onComplete: (data: any) => void, onCancel: () => void }) => {
  const [plan, setPlan] = useState(initialPlan);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    onComplete({ ...data, plan });
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <button onClick={onCancel} className="flex items-center gap-2 text-slate-500 mb-8 font-bold hover:text-slate-800 transition-colors">
          <ArrowLeft size={18} /> Voltar
        </button>

        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
          <div className="flex-1 p-8 md:p-12 bg-slate-50/50 border-r border-slate-100">
            <h2 className="text-3xl font-black font-baloo text-slate-800 mb-8">Resumo da Assinatura</h2>
            
            <div className="space-y-4 mb-10">
              <button 
                onClick={() => setPlan('mensal')}
                className={`w-full p-6 rounded-3xl border-4 transition-all flex justify-between items-center ${plan === 'mensal' ? 'border-[#5DCCD6] bg-white shadow-md' : 'border-transparent hover:bg-white/50'}`}
              >
                <div className="text-left">
                  <span className="block font-bold text-slate-800">Mensal</span>
                  <span className="text-sm text-slate-500">¥500/mês</span>
                </div>
                {plan === 'mensal' && <CheckCircle2 className="text-[#5DCCD6]" />}
              </button>

              <button 
                onClick={() => setPlan('anual')}
                className={`w-full p-6 rounded-3xl border-4 transition-all flex justify-between items-center ${plan === 'anual' ? 'border-[#FFD700] bg-white shadow-md' : 'border-transparent hover:bg-white/50'}`}
              >
                <div className="text-left">
                  <span className="block font-bold text-slate-800">Anual <span className="text-[#D21E9D] text-xs ml-2">POPULAR</span></span>
                  <span className="text-sm text-slate-500">¥5.000/ano</span>
                </div>
                {plan === 'anual' && <CheckCircle2 className="text-[#FFD700]" />}
              </button>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-3 text-slate-600 font-medium">
                <Shield size={18} /> 
                <span className="text-sm">Checkout Seguro & Criptografado</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 font-medium">
                <Heart size={18} className="text-[#D21E9D]" /> 
                <span className="text-sm">Assinatura Vitalícia da Aliança</span>
              </div>
            </div>
          </div>

          <div className="flex-[1.2] p-8 md:p-12">
            <h3 className="text-2xl font-bold font-baloo mb-8">Pronto para começar a jornada musical?</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 ml-2">Nome da criança</label>
                  <input required name="childName" type="text" placeholder="Ex: Hikari" className="w-full h-14 px-5 rounded-2xl border-2 border-slate-100 focus:border-[#5DCCD6] outline-none font-medium transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 ml-2">Idade (6–12 anos)</label>
                  <input required name="age" type="number" min="6" max="12" placeholder="Ex: 8" className="w-full h-14 px-5 rounded-2xl border-2 border-slate-100 focus:border-[#5DCCD6] outline-none font-medium transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 ml-2">Nome do responsável (Completo)</label>
                <input required name="parentName" type="text" placeholder="Nome Completo do Responsável" className="w-full h-14 px-5 rounded-2xl border-2 border-slate-100 focus:border-[#5DCCD6] outline-none font-medium transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 ml-2">Endereço completo no Japão (para envio do material)</label>
                <textarea 
                  required 
                  name="address" 
                  rows={3} 
                  placeholder="〒000-0000 Província, Cidade, Bairro, Prédio/Casa, Apto" 
                  className="w-full p-5 rounded-2xl border-2 border-slate-100 focus:border-[#5DCCD6] outline-none font-medium transition-all resize-none"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 ml-2">WhatsApp (para notificações de entrega)</label>
                <input required name="whatsapp" type="tel" placeholder="+81 00-0000-0000" className="w-full h-14 px-5 rounded-2xl border-2 border-slate-100 focus:border-[#5DCCD6] outline-none font-medium transition-all" />
              </div>

              <div className="pt-4 space-y-4">
                <button type="submit" className="hikari-btn-accent w-full py-6 font-black text-xl shadow-xl flex items-center justify-center gap-2">
                  FINALIZAR ASSINATURA <ChevronRight size={24} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const WelcomePage = ({ userData }: { userData: any }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <div className="w-24 h-24 bg-[#60D394] rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-2xl scale-110 animate-bounce">
          <CheckCircle2 size={48} />
        </div>
        
        <h1 className="text-h1 text-slate-800 mb-4">Seja bem-vindo, {userData.childName}!</h1>
        <p className="text-xl text-slate-500 font-medium mb-12">O primeiro passo na Aliança Melódica foi dado.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="bg-slate-50 p-8 rounded-[40px] border-2 border-slate-100 flex flex-col justify-center text-left">
            <h3 className="text-sm font-black text-[#D21E9D] uppercase tracking-widest mb-4">Sua Primeira Missão</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#5DCCD6] rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Music size={32} />
              </div>
              <div>
                <h4 className="text-xl font-bold font-baloo">Dia Feliz com Hikari</h4>
                <p className="text-sm text-slate-500 font-medium italic">Fase 1: Saudações Iniciais</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-3xl shadow-sm space-y-4">
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full bg-[#5DCCD6] transition-all duration-1000 ${isPlaying ? 'w-1/2' : 'w-0'}`}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400">01:14</span>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 transition-transform"
                >
                  {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                </button>
                <span className="text-[10px] font-bold text-slate-400">02:45</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-[40px] border-2 border-slate-100 flex flex-col items-center justify-center text-center">
            <div className="bg-white p-4 rounded-3xl shadow-xl mb-6">
              <QrCode size={120} className="text-slate-800" />
            </div>
            <h4 className="font-bold text-lg mb-2">Instale o HikariApp</h4>
            <p className="text-sm text-slate-500 font-medium mb-6">Escaneie para entrar no mundo <br/> mágico da Aliança Melódica.</p>
            <div className="flex gap-2">
              <div className="px-4 py-2 bg-slate-200 rounded-full text-[10px] font-black uppercase">App Store</div>
              <div className="px-4 py-2 bg-slate-200 rounded-full text-[10px] font-black uppercase">Google Play</div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 flex items-center gap-4 text-left">
            <div className="w-12 h-12 bg-[#FFD700]/20 rounded-2xl flex items-center justify-center text-[#FFD700]">
              <Gift size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400">PRÊMIO FÍSICO</p>
              <p className="text-sm font-bold text-slate-700">Entrega estimada: 5 dias úteis</p>
              <p className="text-[10px] text-slate-400 mt-1 max-w-[150px] truncate">{userData.address}</p>
            </div>
          </div>
          <button className="bg-[#25D366] p-6 rounded-3xl text-white flex items-center justify-center gap-3 font-bold hover:opacity-90 transition-all shadow-lg">
            <MessageSquare size={24} /> Entrar no Grupo de Pais (WhatsApp)
          </button>
        </div>

        <div className="mt-20">
          <p className="text-2xl font-baloo text-slate-400 italic">
            🎶 Seu filho já está na Aliança Melódica. A primeira nota começa agora.
          </p>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ onClose }: { onClose: () => void }) => {
  const [stats, setStats] = useState(getStats());

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(getStats());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] bg-slate-100 flex flex-col animate-in slide-in-from-bottom duration-300">
      <nav className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
            <BarChart3 size={20} />
          </div>
          <span className="font-black text-xl tracking-tight text-slate-900">Hikari Admin</span>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <X size={24} />
        </button>
      </nav>

      <div className="flex-grow overflow-y-auto bg-slate-50/50 p-8 md:p-12">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12">
            <h1 className="text-3xl font-black text-slate-900 mb-2">Visão Geral do Negócio</h1>
            <p className="text-slate-500 font-medium">Acompanhe as métricas de conversão e acessos em tempo real.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center">
                  <BarChart3 size={28} />
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-600 text-[10px] font-black rounded-full uppercase">Realtime</div>
              </div>
              <div>
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest block mb-1">Total de Acessos</span>
                <span className="text-5xl font-black text-slate-900">{stats.visits}</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center">
                  <Users size={28} />
                </div>
              </div>
              <div>
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest block mb-1">Cadastros Iniciados</span>
                <span className="text-5xl font-black text-slate-900">{stats.initiated}</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[40px] shadow-lg border-2 border-[#60D394] flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-[#60D394]/20 text-[#60D394] rounded-2xl flex items-center justify-center">
                  <CheckCircle2 size={28} />
                </div>
                <TrendingUp size={24} className="text-[#60D394]" />
              </div>
              <div>
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest block mb-1">Inscrições Concluídas</span>
                <span className="text-5xl font-black text-slate-900">{stats.completed}</span>
              </div>
            </div>
          </div>

          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <ClipboardList size={24} className="text-slate-400" />
              <h2 className="text-2xl font-black text-slate-900">Base de Assinantes</h2>
            </div>
            
            {stats.subscribers.length === 0 ? (
              <div className="bg-white p-12 rounded-[40px] text-center border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-bold">Nenhum assinante cadastrado ainda.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {stats.subscribers.map((sub) => (
                  <div key={sub.id} className="bg-white p-6 md:p-8 rounded-[30px] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 md:items-center justify-between group hover:border-[#5DCCD6] transition-colors">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#5DCCD6]/10 text-[#5DCCD6] rounded-full flex items-center justify-center">
                          <Baby size={20} />
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900">{sub.childName} ({sub.age} anos)</h4>
                          <p className="text-xs font-bold text-slate-400 uppercase">Responsável: {sub.parentName}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-slate-600">
                        <MapPin size={16} className="shrink-0 mt-1 text-[#D21E9D]" />
                        <span className="italic leading-snug">{sub.address}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:items-end gap-3 shrink-0">
                      <div className="flex gap-2">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${sub.plan === 'anual' ? 'bg-[#FFD700] text-slate-900' : 'bg-slate-900 text-white'}`}>
                          {sub.plan}
                        </span>
                        <a href={`https://wa.me/${sub.whatsapp.replace(/\D/g,'')}`} target="_blank" className="flex items-center gap-1.5 px-4 py-1.5 bg-[#25D366] text-white text-[10px] font-black rounded-full uppercase transition-transform hover:scale-105">
                          <MessageSquare size={12} fill="currentColor" /> WhatsApp
                        </a>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">{sub.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
               <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
                 <Calendar className="text-slate-400" size={20} /> Histórico do Servidor
               </h3>
               <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                    <span className="text-slate-500 font-medium">Última inscrição</span>
                    <span className="font-bold text-slate-900">{stats.lastDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Status do Sistema</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-bold text-green-600 uppercase">Online & Seguro</span>
                    </div>
                  </div>
               </div>
            </div>

            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
               <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
                 <Zap className="text-[#FFD700]" size={20} fill="currentColor" /> Performance de Planos
               </h3>
               <div className="flex items-center justify-center py-4">
                  <div className="text-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Plano Mais Escolhido</span>
                    <span className={`text-2xl font-black px-6 py-2 rounded-full ${stats.mostPopular === 'Anual' ? 'bg-[#FFD700] text-slate-900' : 'bg-[#5DCCD6] text-white'}`}>
                      {stats.mostPopular}
                    </span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HikariMelodiaPage = ({ onStartCheckout, setSelectedMethodology, setShowCreche, setShowEducacaoInfantil, setShowEnsinoFundamental, setShowEnsinoMedio }: any) => {
  return (
    <div className="bg-[#FFFFFF]">
      {/* SESSÃO 1 – HERO */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-[#5DCCD6] via-[#4FBFD9] to-[#D21E9D]/20 overflow-hidden text-center lg:text-left">
        <MusicalBackground />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FFD700] text-slate-800 text-sm font-black mb-10 shadow-lg uppercase tracking-wider mx-auto lg:mx-0">
                <Music size={18} fill="currentColor" /> Educação Musical Inovadora
              </div>
              
              <h1 className="text-h1 text-slate-800 mb-2 leading-tight drop-shadow-sm flex flex-col md:flex-row md:items-baseline gap-4 justify-center lg:justify-start">
                Hikari <span className="text-4xl md:text-5xl font-nunito font-bold text-slate-700">メロディー</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-baloo text-slate-700/80 mb-8 font-bold">
                Aprender Japonês Não Foi Nunca Tão Musical
              </h2>
              <p className="text-lg md:text-xl text-slate-600 mb-12 leading-relaxed max-w-2xl font-medium mx-auto lg:mx-0">
                Um programa estruturado, científico e profundamente afetivo que conecta música, neurociência e cultura japonesa.
              </p>
            </div>

            <div className="flex-1 relative w-full max-w-xl">
              <div className="relative z-10 rounded-[30px] overflow-hidden shadow-2xl border-[12px] border-white backdrop-blur-sm bg-white aspect-video">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/tqrx49tVCdw?si=8ycO4HfJYjZIIFDi" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                ></iframe>
              </div>
              <div className="absolute -top-10 -right-10 animate-bounce hidden md:block">
                 <Star size={64} className="golden-star fill-current" />
              </div>
            </div>
          </div>
          
          <div className="mt-16 flex justify-center">
            <button 
              onClick={() => onStartCheckout('anual')} 
              className="hikari-btn-accent px-8 md:px-16 py-6 md:py-8 text-xl md:text-2xl font-extrabold cta-pulse flex items-center justify-center gap-3 shadow-2xl whitespace-nowrap"
            >
              QUERO COMEÇAR AGORA 
              <div className="border-2 border-white/40 p-1 rounded-md">
                <Zap size={28} />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* SESSÃO 2 – STORYTELLING & CLAY ICONS */}
      <section className="py-24 bg-slate-50 overflow-hidden relative">
        <MusicalBackground />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-h2 text-center text-slate-800 mb-10 leading-snug">
              Por que tantas crianças brasileiras ficam em silêncio… <span className="text-[#D21E9D]">mesmo estudando japonês na escola todos os dias?</span>
            </h2>
            
            <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-xl border border-slate-100 relative">
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-[#FFD700] rounded-2xl flex items-center justify-center shadow-lg transform -rotate-12">
                <span className="text-3xl font-black">62%</span>
              </div>
              
              <div className="space-y-6 text-lg text-slate-700 leading-relaxed font-medium">
                <p>Das famílias brasileiras no Japão consideram o idioma a maior barreira de adaptação.</p>
                <div className="pl-6 border-l-4 border-[#5DCCD6] space-y-2 py-2">
                  <p>A criança entende o que o professor fala.</p>
                  <p>Conhece as palavras.</p>
                </div>
                <p className="font-bold text-slate-900">Mas quando chega a hora de falar… o medo aparece.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
                  {['O erro vira vergonha.', 'A vergonha vira silêncio.', 'E o silêncio vira isolamento.'].map((txt, i) => (
                    <div key={i} className="bg-slate-50 p-4 rounded-2xl text-sm font-bold text-slate-500 italic flex items-center justify-center text-center">
                      "{txt}"
                    </div>
                  ))}
                  <div className="bg-[#D21E9D]/10 p-4 rounded-2xl text-sm font-black text-[#D21E9D] flex items-center justify-center text-center">
                    QUEBRA DO CICLO
                  </div>
                </div>
                <p>
                  O <span className="text-[#D21E9D] font-black">Método Hikari Melodia</span> não ensina apenas gramática. Nós usamos a música para "hackear" o sistema límbico (a parte emocional do cérebro), desligando o medo e ligando a memória afetiva.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {METHODOLOGY_DATA.map((item) => (
              <div key={item.id} onClick={() => setSelectedMethodology(item)}>
                <ClayIcon icon={item.icon} color={item.color} label={item.title} />
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Gallery Section */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Momentos Hikari" 
            subtitle="Um pouco do nosso dia a dia em imagens."
          />
        </div>
        <ImageCarousel images={PRESENTATION_IMAGES} />
      </section>

      {/* Pricing Section */}
      <PlansSection onSelectPlan={onStartCheckout} />

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 bg-[#5DCCD6] rounded-xl flex items-center justify-center text-white shadow-lg">
              <Music size={24} strokeWidth={3} />
            </div>
            <span className="font-baloo font-black text-2xl tracking-tight">Hikari Melodia</span>
          </div>
          <p className="text-slate-500 text-sm mb-8">
            Escola Objetivo de Iwata - Educação com Amor e Propósito.
            <br/>Transformando vidas através da educação bilíngue.
          </p>
          <div className="flex justify-center gap-6 text-slate-400 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Contato</a>
          </div>
          <p className="text-slate-700 text-xs mt-12">
            © 2024 Hikari Melodia. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

const EscolaObjetivoPage = ({ 
  setShowCreche, 
  setShowEducacaoInfantil, 
  setShowEnsinoFundamental, 
  setShowEnsinoMedio 
}: {
  setShowCreche: (v: boolean) => void;
  setShowEducacaoInfantil: (v: boolean) => void;
  setShowEnsinoFundamental: (v: boolean) => void;
  setShowEnsinoMedio: (v: boolean) => void;
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <div className="bg-white min-h-screen">
      {/* Lightbox Modal */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-[95vw] w-auto h-auto p-0 border-none bg-transparent shadow-none flex flex-col items-center justify-center overflow-visible focus:outline-none">
          <div className="relative w-full max-w-5xl flex flex-col items-center">
            {/* Close Button - Fixed position relative to image container for better mobile UX */}
            <button 
              onClick={() => setIsLightboxOpen(false)}
              className="absolute -top-12 right-0 md:-right-12 text-white hover:text-gray-300 transition-colors bg-black/50 hover:bg-black/70 rounded-full p-2 backdrop-blur-sm z-50"
              aria-label="Fechar imagem"
            >
              <X size={24} />
            </button>
            
            <img 
              src="/hero-objetivo.png" 
              alt="Colégio Objetivo de Iwata - Expandido" 
              className="max-w-full max-h-[80vh] md:max-h-[90vh] object-contain rounded-xl shadow-2xl bg-black/20"
            />
          </div>
        </DialogContent>
      </Dialog>
      {/* Hero Institucional - Reestilizado com Style Guide Hikari */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-[#5DCCD6] via-[#4FBFD9] to-[#D21E9D]/20 overflow-hidden text-center lg:text-left">
        <MusicalBackground />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FFD700] text-slate-800 text-sm font-black mb-10 shadow-lg uppercase tracking-wider mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <School size={18} fill="currentColor" /> Educação de Qualidade desde 2006
              </div>
              
              <h1 className="text-h1 text-slate-800 mb-2 leading-tight drop-shadow-sm flex flex-col md:flex-row md:items-baseline gap-4 justify-center lg:justify-start">
                Colégio Objetivo de <span className="text-4xl md:text-5xl font-nunito font-bold text-slate-700">Iwata</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-baloo text-slate-700/80 mb-8 font-bold hidden">
                
              </h2>
              <p className="text-lg md:text-xl text-slate-600 mb-12 leading-relaxed max-w-2xl font-medium mx-auto lg:mx-0">
                Com uma história que se estende por mais de uma década desde sua fundação em 2006, o Colégio Objetivo de Iwata consagrou-se como uma instituição de ensino comprometida com a excelência educacional e o desenvolvimento integral dos alunos. Sob Sistema de Ensino Objetivo, a escola visa proporcionar uma educação de qualidade, promovendo a participação coletiva em uma abordagem educacional inovadora e significativa. Essa missão visa preparar cidadãos competentes e habilidosos, tanto para o mercado de trabalho quanto para a convivência social solidária.
              </p>
              
            </div>

            <div className="flex-1 relative w-full max-w-xl cursor-pointer" onClick={() => setIsLightboxOpen(true)}>
              <div className="relative z-10 rounded-[20px] overflow-hidden shadow-2xl border-[6px] border-white backdrop-blur-sm group hover:scale-[1.02] transition-transform duration-500">
                {/* Shimmer Effect */}
                <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite]" />
                
                <img 
                  src="/hero-objetivo.png" 
                  alt="Colégio Objetivo de Iwata - Educando com Amor" 
                  className="w-full h-full object-cover"
                />
                
                {/* Click Hint Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                  <Maximize2 className="text-white drop-shadow-md scale-0 group-hover:scale-100 transition-transform duration-300" size={48} />
                </div>
              </div>
              <div className="absolute -bottom-10 -left-10 animate-bounce hidden md:block delay-700">
                 <Star size={64} className="text-[#FFD700] fill-current drop-shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Levels Section - Moved from HikariMelodiaPage */}
      <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <SectionTitle 
              title="Uma Jornada Completa" 
              subtitle="Do berçário à universidade, acompanhamos cada fase do desenvolvimento."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card Creche */}
              <div 
                onClick={() => setShowCreche(true)}
                className="bg-white p-6 rounded-[35px] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer border border-slate-100 group"
              >
                <div className="w-14 h-14 bg-[#5A9DFC]/10 text-[#5A9DFC] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Baby size={32} />
                </div>
                <h3 className="text-xl font-bold font-baloo text-slate-800 mb-2">Creche</h3>
                <p className="text-sm text-slate-500 font-medium mb-4">0 a 3 anos</p>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">Cuidado, afeto e estímulos sensoriais para os primeiros passos.</p>
                <span className="text-[#5A9DFC] font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Saiba mais <ArrowRight size={16} />
                </span>
              </div>

              {/* Card Educação Infantil */}
              <div 
                onClick={() => setShowEducacaoInfantil(true)}
                className="bg-white p-6 rounded-[35px] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer border border-slate-100 group"
              >
                <div className="w-14 h-14 bg-[#D21E9D]/10 text-[#D21E9D] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles size={32} />
                </div>
                <h3 className="text-xl font-bold font-baloo text-slate-800 mb-2">Educação Infantil</h3>
                <p className="text-sm text-slate-500 font-medium mb-4">3 a 6 anos</p>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">Descoberta do mundo, socialização e introdução lúdica ao japonês.</p>
                <span className="text-[#D21E9D] font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Saiba mais <ArrowRight size={16} />
                </span>
              </div>

              {/* Card Ensino Fundamental */}
              <div 
                onClick={() => setShowEnsinoFundamental(true)}
                className="bg-white p-6 rounded-[35px] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer border border-slate-100 group"
              >
                <div className="w-14 h-14 bg-[#4CAF50]/10 text-[#4CAF50] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BookOpen size={32} />
                </div>
                <h3 className="text-xl font-bold font-baloo text-slate-800 mb-2">Ensino Fundamental</h3>
                <p className="text-sm text-slate-500 font-medium mb-4">6 a 14 anos</p>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">Base acadêmica sólida com o Sistema Objetivo de Ensino.</p>
                <span className="text-[#4CAF50] font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Saiba mais <ArrowRight size={16} />
                </span>
              </div>

              {/* Card Ensino Médio */}
              <div 
                onClick={() => setShowEnsinoMedio(true)}
                className="bg-white p-6 rounded-[35px] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer border border-slate-100 group"
              >
                <div className="w-14 h-14 bg-[#FFD700]/10 text-[#FFD700] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <GraduationCap size={32} />
                </div>
                <h3 className="text-xl font-bold font-baloo text-slate-800 mb-2">Ensino Médio</h3>
                <p className="text-sm text-slate-500 font-medium mb-4">15 a 17 anos</p>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">Preparação intensiva para o futuro, vestibulares e carreira.</p>
                <span className="text-[#FFD700] font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Saiba mais <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </div>
      </section>

      {/* Sobre a Escola - Reestilizado */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-1 bg-[#D21E9D]/10 text-[#D21E9D] rounded-full font-black text-xs uppercase tracking-widest mb-4">
                Nossa Essência
              </div>
              <h2 className="text-h2 text-slate-800 mb-6">Educação que Acolhe e Transforma</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6 font-medium">
                Fundada com o propósito de oferecer educação de qualidade para a comunidade brasileira no Japão, a Escola Objetivo de Iwata se tornou referência em ensino bilíngue e acolhimento cultural.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-12 h-12 bg-[#60D394]/20 text-[#60D394] rounded-xl flex items-center justify-center">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Reconhecida pelo MEC</h4>
                    <p className="text-xs text-slate-500">Validade total no Brasil</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-12 h-12 bg-[#5A9DFC]/20 text-[#5A9DFC] rounded-xl flex items-center justify-center">
                    <Globe size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Homologada no Japão</h4>
                    <p className="text-xs text-slate-500">Integração com o sistema local</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais - Style Guide Cards */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Por que o Objetivo Iwata?" 
            subtitle="Uma estrutura completa pensada para o desenvolvimento integral do seu filho."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Globe, color: "bg-[#5DCCD6]", title: "Bilinguismo Real", desc: "Português como língua de herança e Japonês para integração total na sociedade." },
              { icon: Book, color: "bg-[#FFD700]", title: "Material Didático", desc: "Apostilas atualizadas do Sistema Objetivo, o que mais aprova em vestibulares no Brasil." },
              { icon: Heart, color: "bg-[#D21E9D]", title: "Acolhimento", desc: "Uma equipe pedagógica que entende os desafios e as belezas de viver entre duas culturas." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 text-center hover:shadow-xl hover:-translate-y-2 transition-all group">
                <div className={`w-20 h-20 ${item.color} rounded-[30%] flex items-center justify-center text-white mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform clay-effect`}>
                  <item.icon size={36} />
                </div>
                <h3 className="text-xl font-bold font-baloo text-slate-800 mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Institucional - Mantendo padrão visual */}
      <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
              <div className="w-10 h-10 bg-[#FFD700] rounded-xl flex items-center justify-center text-slate-900 shadow-lg">
                <School size={24} strokeWidth={2.5} />
              </div>
              <span className="font-baloo font-black text-2xl">Objetivo Iwata</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Formando líderes, construindo futuros e conectando culturas com excelência e afeto.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6 font-baloo text-[#5DCCD6]">Contato</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li className="flex items-center justify-center md:justify-start gap-3"><MapPin size={18} className="text-[#FFD700]" /> Iwata-shi, Shizuoka-ken</li>
              <li className="flex items-center justify-center md:justify-start gap-3"><MessageSquare size={18} className="text-[#FFD700]" /> +81 00-0000-0000</li>
              <li className="flex items-center justify-center md:justify-start gap-3"><Clock size={18} className="text-[#FFD700]" /> Seg - Sex: 8h às 17h</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6 font-baloo text-[#D21E9D]">Redes Sociais</h4>
            <div className="flex gap-4 justify-center md:justify-start">
              <a href="#" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FFD700] hover:text-slate-900 transition-all">FB</a>
              <a href="#" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#D21E9D] hover:text-white transition-all">IG</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- App Root ---

export default function App() {
  const [view, setView] = useState<'landing' | 'checkout' | 'welcome' | 'eoi'>('landing');
  const [selectedPlan, setSelectedPlan] = useState<'mensal' | 'anual'>('anual');
  const [userData, setUserData] = useState<any>(null);
  
  const [showDashboard, setShowDashboard] = useState(false);

  // Modal States
  const [selectedMethodology, setSelectedMethodology] = useState<MethodologyDetail | null>(null);
  const [showCreche, setShowCreche] = useState(false);
  const [showEducacaoInfantil, setShowEducacaoInfantil] = useState(false);
  const [showEnsinoFundamental, setShowEnsinoFundamental] = useState(false);
  const [showEnsinoMedio, setShowEnsinoMedio] = useState(false);

  useEffect(() => {
    updateStats('visit');
  }, []);

  const handleStartCheckout = (plan: 'mensal' | 'anual') => {
    updateStats('registration_initiated');
    setSelectedPlan(plan);
    setView('checkout');
  };

  const handleCompletePurchase = (data: any) => {
    updateStats('subscription_completed', data);
    setUserData(data);
    setView('welcome');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="min-h-screen relative">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm h-16 px-4">
        <div className="container mx-auto h-full flex justify-between items-center">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setView('landing')}
              className={`font-baloo font-bold text-lg transition-colors flex items-center gap-2 ${view === 'landing' || view === 'checkout' ? 'text-[#5DCCD6]' : 'text-slate-400 hover:text-slate-800'}`}
            >
              <Music size={18} /> Hikari Melodia
            </button>
            <div className="h-4 w-px bg-slate-200"></div>
            <button 
              onClick={() => setView('eoi')}
              className={`font-baloo font-bold text-lg transition-colors flex items-center gap-2 ${view === 'eoi' ? 'text-[#FFD700]' : 'text-slate-400 hover:text-slate-800'}`}
            >
              <School size={18} /> Escola Objetivo
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowDashboard(true)}
              className="p-2 text-slate-400 hover:text-slate-800 transition-colors"
              title="Área Administrativa"
            >
              <Lock size={18} />
            </button>
            <button 
              onClick={() => handleStartCheckout('mensal')}
              className="hidden md:flex px-5 py-2 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all shadow-md"
            >
              Área do Aluno
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Spacer */}
      <div className="pt-16">
        {view === 'landing' && (
          <HikariMelodiaPage 
            onStartCheckout={handleStartCheckout}
            setSelectedMethodology={setSelectedMethodology}
            setShowCreche={setShowCreche}
            setShowEducacaoInfantil={setShowEducacaoInfantil}
            setShowEnsinoFundamental={setShowEnsinoFundamental}
            setShowEnsinoMedio={setShowEnsinoMedio}
          />
        )}

        {view === 'eoi' && (
          <EscolaObjetivoPage 
            setShowCreche={setShowCreche}
            setShowEducacaoInfantil={setShowEducacaoInfantil}
            setShowEnsinoFundamental={setShowEnsinoFundamental}
            setShowEnsinoMedio={setShowEnsinoMedio}
          />
        )}

        {view === 'checkout' && (
          <CheckoutPage 
            initialPlan={selectedPlan} 
            onComplete={handleCompletePurchase}
            onCancel={() => setView('landing')}
          />
        )}

        {view === 'welcome' && userData && (
          <WelcomePage userData={userData} />
        )}
      </div>

      {/* Modals */}
      {selectedMethodology && (
        <MethodologyModal item={selectedMethodology} onClose={() => setSelectedMethodology(null)} />
      )}

      {showCreche && <CrecheModal onClose={() => setShowCreche(false)} />}
      {showEducacaoInfantil && <EducacaoInfantilModal onClose={() => setShowEducacaoInfantil(false)} />}
      {showEnsinoFundamental && <EnsinoFundamentalModal onClose={() => setShowEnsinoFundamental(false)} />}
      {showEnsinoMedio && <EnsinoMedioModal onClose={() => setShowEnsinoMedio(false)} />}

      {showDashboard && <Dashboard onClose={() => setShowDashboard(false)} />}
    </div>
  );
}
