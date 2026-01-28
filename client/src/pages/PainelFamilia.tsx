/**
 * Painel Família - Escola Objetivo de Iwata
 * Um espaço seguro, centralizado e intuitivo para acompanhar tudo sobre seu filho(a)
 */

import { useState, useEffect } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { getLoginUrl } from '@/const';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Calendar, 
  MessageSquare, 
  Bell, 
  LogOut, 
  Home,
  BookOpen,
  Heart,
  FileText,
  AlertCircle,
  CheckCircle2,
  Clock,
  Utensils,
  Bus,
  Smile,
  Send,
  Paperclip,
  ChevronRight,
  Users,
  Settings,
  Shield,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Image as ImageIcon,
  Video,
  Megaphone,
  Star,
  Plus,
  X
} from 'lucide-react';

// ============================================
// TIPOS
// ============================================

interface Aluno {
  id: number;
  matricula: string;
  nome: string;
  foto?: string;
  turmaId?: number;
  notas?: Record<string, number[]>;
  frequencia?: number;
  diasAusentes?: number;
  atividadesPendentes?: { titulo: string; entregue: boolean; prazo?: string }[];
  documentos?: { cartaoVacina: boolean; autorizacaoTransporte: boolean; termoUniforme: boolean; outros?: { nome: string; entregue: boolean; prazo?: string }[] };
  alergias?: string[];
  medicamentosAutorizados?: { nome: string; dose: string; horario: string; prescricao?: string }[];
  contatosMedicos?: { clinica?: string; pediatra?: string; planoSaude?: string };
  contatosEmergencia?: string[];
}

interface Responsavel {
  id: number;
  email: string;
  nome: string;
  telefone?: string;
  parentesco?: string;
  filhos?: string[];
}

interface EquipeMembro {
  id: number;
  email: string;
  nome: string;
  cargo: string;
  turmas?: string[];
  foto?: string;
}

interface MuralPost {
  id: number;
  tipo: string;
  titulo: string;
  conteudo?: string;
  urlMidia?: string;
  dataEvento?: string;
  postadoPor: string;
  createdAt: string;
}

interface DiaDiaRegistro {
  id: number;
  data: string;
  tipo: string;
  cardapio?: { principal: string; vegetariano?: string; alergenicos?: string[] };
  transporte?: { horarioSaida: string; previsaoChegada: string; motorista: string; motoristaFoto?: string; motoristaTelefone?: string };
  bemEstar?: { humor: string; alimentacao: string; interacaoSocial: string; observacoes?: string };
  descricao?: string;
  itens?: string[];
}

interface Mensagem {
  id: number;
  remetente: string;
  remetenteNome?: string;
  remetenteTipo: string;
  destinatario: string;
  destinatarioSetor?: string;
  texto: string;
  anexoUrl?: string;
  lido: boolean;
  createdAt: string;
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function PainelFamilia() {
  const { user, loading: authLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('meu-filho');
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);
  const [userProfile, setUserProfile] = useState<{ tipo: 'responsavel' | 'equipe'; data: Responsavel | EquipeMembro } | null>(null);

  // Queries
  const { data: profileData, isLoading: profileLoading } = trpc.painelFamilia.getProfile.useQuery(
    undefined,
    { enabled: !!user }
  );

  const { data: alunosData, isLoading: alunosLoading } = trpc.painelFamilia.getAlunos.useQuery(
    undefined,
    { enabled: !!user && userProfile?.tipo === 'responsavel' }
  );

  const { data: muralData } = trpc.painelFamilia.getMural.useQuery(
    undefined,
    { enabled: !!user }
  );

  const { data: diaDiaData } = trpc.painelFamilia.getDiaDia.useQuery(
    { alunoId: selectedAluno?.id },
    { enabled: !!user && !!selectedAluno }
  );

  const { data: mensagensData } = trpc.painelFamilia.getMensagens.useQuery(
    undefined,
    { enabled: !!user }
  );

  // Efeitos
  useEffect(() => {
    if (profileData) {
      setUserProfile(profileData as any);
    }
  }, [profileData]);

  useEffect(() => {
    if (alunosData && alunosData.length > 0 && !selectedAluno) {
      setSelectedAluno(alunosData[0] as Aluno);
    }
  }, [alunosData, selectedAluno]);

  // Loading state
  if (authLoading || profileLoading) {
    return <LoadingScreen />;
  }

  // Not authenticated
  if (!user) {
    return <LoginScreen />;
  }

  // Profile not found (user not registered as responsavel or equipe)
  if (!userProfile) {
    return <AccessDeniedScreen userEmail={user.email || ''} userName={user.name || ''} onLogout={logout} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#5DCCD6] to-[#4FBFD9] rounded-xl flex items-center justify-center text-white shadow-md">
              <GraduationCap size={22} />
            </div>
            <div>
              <h1 className="font-bold text-slate-800 text-lg">Painel Família</h1>
              <p className="text-xs text-slate-500">Escola Objetivo de Iwata</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* User Info */}
            <div className="hidden md:flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={undefined} />
                <AvatarFallback className="bg-[#5DCCD6] text-white text-sm">
                  {userProfile.data.nome?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-700">{userProfile.data.nome}</p>
                <p className="text-xs text-slate-500 capitalize">
                  {userProfile.tipo === 'equipe' ? (userProfile.data as EquipeMembro).cargo : 'Responsável'}
                </p>
              </div>
            </div>

            {/* Admin Button (only for equipe) */}
            {userProfile.tipo === 'equipe' && (
              <Button 
                variant="outline" 
                size="sm"
                className="border-[#D21E9D] text-[#D21E9D] hover:bg-[#D21E9D]/10"
              >
                <Shield size={16} className="mr-1" />
                Área Admin
              </Button>
            )}

            {/* Back to Site */}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.location.href = '/'}
              className="text-slate-500"
            >
              <Home size={16} className="mr-1" />
              <span className="hidden sm:inline">Voltar ao Site</span>
            </Button>

            {/* Logout */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => logout()}
              className="text-slate-400 hover:text-red-500"
            >
              <LogOut size={18} />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Aluno Selector (for responsaveis with multiple children) */}
        {userProfile.tipo === 'responsavel' && alunosData && alunosData.length > 1 && (
          <div className="mb-6">
            <p className="text-sm text-slate-500 mb-2">Selecione o aluno:</p>
            <div className="flex gap-3 flex-wrap">
              {alunosData.map((aluno: any) => (
                <Button
                  key={aluno.id}
                  variant={selectedAluno?.id === aluno.id ? 'default' : 'outline'}
                  onClick={() => setSelectedAluno(aluno)}
                  className={selectedAluno?.id === aluno.id ? 'bg-[#5DCCD6] hover:bg-[#4FBFD9]' : ''}
                >
                  {aluno.nome}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-white border border-slate-200 p-1 rounded-xl h-auto">
            <TabsTrigger 
              value="meu-filho" 
              className="flex items-center gap-2 py-3 data-[state=active]:bg-[#5DCCD6] data-[state=active]:text-white rounded-lg"
            >
              <User size={18} />
              <span className="hidden sm:inline">Meu Filho</span>
            </TabsTrigger>
            <TabsTrigger 
              value="dia-a-dia"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-[#5DCCD6] data-[state=active]:text-white rounded-lg"
            >
              <Calendar size={18} />
              <span className="hidden sm:inline">Dia a Dia</span>
            </TabsTrigger>
            <TabsTrigger 
              value="mural"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-[#5DCCD6] data-[state=active]:text-white rounded-lg"
            >
              <Bell size={18} />
              <span className="hidden sm:inline">Mural</span>
            </TabsTrigger>
            <TabsTrigger 
              value="chat"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-[#5DCCD6] data-[state=active]:text-white rounded-lg"
            >
              <MessageSquare size={18} />
              <span className="hidden sm:inline">Chat</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab: Meu Filho */}
          <TabsContent value="meu-filho">
            {selectedAluno ? (
              <MeuFilhoTab aluno={selectedAluno} />
            ) : (
              <EmptyState message="Nenhum aluno encontrado" />
            )}
          </TabsContent>

          {/* Tab: Dia a Dia */}
          <TabsContent value="dia-a-dia">
            <DiaDiaTab registros={diaDiaData || []} alunoNome={selectedAluno?.nome || ''} />
          </TabsContent>

          {/* Tab: Mural */}
          <TabsContent value="mural">
            <MuralTab posts={muralData || []} />
          </TabsContent>

          {/* Tab: Chat */}
          <TabsContent value="chat">
            <ChatTab mensagens={mensagensData || []} userEmail={user.email || ''} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// ============================================
// SUB-COMPONENTES
// ============================================

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-[#5DCCD6] to-[#4FBFD9] rounded-2xl flex items-center justify-center text-white shadow-lg mx-auto mb-4 animate-pulse">
          <GraduationCap size={32} />
        </div>
        <p className="text-slate-500">Carregando...</p>
      </div>
    </div>
  );
}

function LoginScreen() {
  const [mode, setMode] = useState<'choice' | 'register'>('choice');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const cadastrarMutation = trpc.painelFamilia.cadastrarResponsavel.useMutation({
    onSuccess: (data) => {
      setIsSubmitting(false);
      if (data.alreadyExists) {
        // Usuário já existe, redirecionar para login
        setSuccess(true);
        setTimeout(() => {
          window.location.href = getLoginUrl();
        }, 1500);
      } else {
        // Cadastro realizado, redirecionar para login
        setSuccess(true);
        setTimeout(() => {
          window.location.href = getLoginUrl();
        }, 2000);
      }
    },
    onError: (err) => {
      setIsSubmitting(false);
      setError(err.message || 'Erro ao cadastrar. Tente novamente.');
    }
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!nome.trim() || nome.trim().length < 2) {
      setError('Nome deve ter pelo menos 2 caracteres');
      return;
    }
    
    if (!email.trim() || !email.includes('@')) {
      setError('E-mail inválido');
      return;
    }

    setIsSubmitting(true);
    cadastrarMutation.mutate({
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      telefone: telefone.trim() || undefined,
    });
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#5DCCD6] via-[#4FBFD9] to-[#D21E9D]/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardContent className="py-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Cadastro Realizado!</h2>
            <p className="text-slate-600 mb-4">Redirecionando para o login...</p>
            <div className="animate-spin w-6 h-6 border-2 border-[#5DCCD6] border-t-transparent rounded-full mx-auto"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5DCCD6] via-[#4FBFD9] to-[#D21E9D]/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center pb-2">
          <div className="w-20 h-20 bg-gradient-to-br from-[#5DCCD6] to-[#4FBFD9] rounded-2xl flex items-center justify-center text-white shadow-lg mx-auto mb-4">
            <GraduationCap size={40} />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-800">Painel Família</CardTitle>
          <CardDescription className="text-slate-500">
            Escola Objetivo de Iwata
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {mode === 'choice' ? (
            <>
              <p className="text-center text-slate-600 text-sm">
                Acesse com sua conta para acompanhar a vida escolar do seu filho(a).
              </p>
              
              {/* Botão Login com Google */}
              <Button 
                className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 py-6 text-lg shadow-sm"
                onClick={() => window.location.href = getLoginUrl()}
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Entrar com Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-500">ou</span>
                </div>
              </div>

              {/* Botão Criar Conta */}
              <Button 
                variant="outline"
                className="w-full border-[#5DCCD6] text-[#5DCCD6] hover:bg-[#5DCCD6]/10 py-6 text-lg"
                onClick={() => setMode('register')}
              >
                <User size={20} className="mr-2" />
                Criar conta com Nome e E-mail
              </Button>

              <p className="text-center text-xs text-slate-400">
                Após o cadastro, a secretaria vinculará seu(s) filho(s) ao seu perfil.
              </p>
            </>
          ) : (
            <>
              {/* Formulário de Cadastro */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="mb-2 text-slate-500"
                onClick={() => setMode('choice')}
              >
                <ChevronRight size={16} className="mr-1 rotate-180" />
                Voltar
              </Button>

              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nome completo *</label>
                  <Input
                    type="text"
                    placeholder="Seu nome completo"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="py-5"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">E-mail *</label>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-5"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Telefone (opcional)</label>
                  <Input
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="py-5"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

                <Button 
                  type="submit"
                  className="w-full bg-[#5DCCD6] hover:bg-[#4FBFD9] text-white py-6 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Cadastrando...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={20} className="mr-2" />
                      Confirmar Cadastro
                    </>
                  )}
                </Button>
              </form>

              <p className="text-center text-xs text-slate-400">
                Após o cadastro, você será redirecionado para fazer login.
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function AccessDeniedScreen({ userEmail, userName, onLogout }: { userEmail: string; userName?: string; onLogout: () => void }) {
  const [showRegister, setShowRegister] = useState(false);
  const [nome, setNome] = useState(userName || '');
  const [telefone, setTelefone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const cadastrarMutation = trpc.painelFamilia.cadastrarResponsavel.useMutation({
    onSuccess: (data) => {
      setIsSubmitting(false);
      setSuccess(true);
      // Recarregar a página após 2 segundos para verificar o novo cadastro
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
    onError: (err) => {
      setIsSubmitting(false);
      setError(err.message || 'Erro ao cadastrar. Tente novamente.');
    }
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!nome.trim() || nome.trim().length < 2) {
      setError('Nome deve ter pelo menos 2 caracteres');
      return;
    }

    setIsSubmitting(true);
    cadastrarMutation.mutate({
      nome: nome.trim(),
      email: userEmail.toLowerCase(),
      telefone: telefone.trim() || undefined,
    });
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#5DCCD6] via-[#4FBFD9] to-[#D21E9D]/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardContent className="py-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Cadastro Realizado!</h2>
            <p className="text-slate-600 mb-4">Seu acesso foi liberado. Carregando o painel...</p>
            <div className="animate-spin w-6 h-6 border-2 border-[#5DCCD6] border-t-transparent rounded-full mx-auto"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={32} className="text-amber-600" />
          </div>
          <CardTitle className="text-xl text-slate-800">
            {showRegister ? 'Complete seu Cadastro' : 'Bem-vindo(a)!'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showRegister ? (
            <>
              <p className="text-slate-600 text-center">
                O e-mail <strong>{userEmail}</strong> ainda não está cadastrado no Painel Família.
              </p>
              <p className="text-sm text-slate-500 text-center">
                Deseja se cadastrar como responsável?
              </p>
              <div className="pt-4 space-y-2">
                <Button 
                  className="w-full bg-[#5DCCD6] hover:bg-[#4FBFD9] text-white py-5"
                  onClick={() => setShowRegister(true)}
                >
                  <User size={16} className="mr-2" />
                  Sim, quero me cadastrar
                </Button>
                <Button variant="outline" className="w-full" onClick={onLogout}>
                  <LogOut size={16} className="mr-2" />
                  Sair e tentar com outra conta
                </Button>
                <Button variant="ghost" className="w-full" onClick={() => window.location.href = '/'}>
                  <Home size={16} className="mr-2" />
                  Voltar ao site
                </Button>
              </div>
            </>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                className="mb-2 text-slate-500"
                onClick={() => setShowRegister(false)}
              >
                <ChevronRight size={16} className="mr-1 rotate-180" />
                Voltar
              </Button>

              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
                  <Input
                    type="email"
                    value={userEmail}
                    disabled
                    className="py-5 bg-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nome completo *</label>
                  <Input
                    type="text"
                    placeholder="Seu nome completo"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="py-5"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Telefone (opcional)</label>
                  <Input
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="py-5"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

                <Button 
                  type="submit"
                  className="w-full bg-[#5DCCD6] hover:bg-[#4FBFD9] text-white py-6 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Cadastrando...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={20} className="mr-2" />
                      Confirmar Cadastro
                    </>
                  )}
                </Button>
              </form>

              <p className="text-center text-xs text-slate-400">
                Após o cadastro, a secretaria vinculará seu(s) filho(s) ao seu perfil.
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertCircle size={24} className="text-slate-400" />
      </div>
      <p className="text-slate-500">{message}</p>
    </div>
  );
}

// ============================================
// TAB: MEU FILHO
// ============================================

function MeuFilhoTab({ aluno }: { aluno: Aluno }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Coluna Principal */}
      <div className="lg:col-span-2 space-y-6">
        {/* Card do Aluno */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20 border-4 border-[#5DCCD6]/20">
                <AvatarImage src={aluno.foto} />
                <AvatarFallback className="bg-[#5DCCD6] text-white text-2xl">
                  {aluno.nome?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-800">{aluno.nome}</h2>
                <p className="text-slate-500">Matrícula: {aluno.matricula}</p>
                <div className="flex gap-2 mt-2">
                  <Badge className="bg-[#5DCCD6]/10 text-[#5DCCD6] hover:bg-[#5DCCD6]/20">
                    3º Ano B
                  </Badge>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    Ativo
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notas */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen size={20} className="text-[#5DCCD6]" />
              Desempenho Acadêmico
            </CardTitle>
          </CardHeader>
          <CardContent>
            {aluno.notas && Object.keys(aluno.notas).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(aluno.notas).map(([disciplina, notas]) => (
                  <div key={disciplina} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-700 capitalize">{disciplina}</span>
                      <span className="text-sm text-slate-500">
                        Média: {(notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(1)}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {notas.map((nota, i) => (
                        <div 
                          key={i} 
                          className={`flex-1 text-center py-2 rounded-lg text-sm font-medium ${
                            nota >= 7 ? 'bg-green-100 text-green-700' : 
                            nota >= 5 ? 'bg-yellow-100 text-yellow-700' : 
                            'bg-red-100 text-red-700'
                          }`}
                        >
                          {nota.toFixed(1)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-4">Sem notas registradas</p>
            )}
          </CardContent>
        </Card>

        {/* Atividades Pendentes */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText size={20} className="text-[#D21E9D]" />
              Atividades Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {aluno.atividadesPendentes && aluno.atividadesPendentes.length > 0 ? (
              <div className="space-y-3">
                {aluno.atividadesPendentes.map((atividade, i) => (
                  <div 
                    key={i} 
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      atividade.entregue ? 'bg-green-50' : 'bg-yellow-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {atividade.entregue ? (
                        <CheckCircle2 size={20} className="text-green-500" />
                      ) : (
                        <Clock size={20} className="text-yellow-500" />
                      )}
                      <span className={atividade.entregue ? 'text-green-700' : 'text-yellow-700'}>
                        {atividade.titulo}
                      </span>
                    </div>
                    {atividade.prazo && !atividade.entregue && (
                      <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                        Prazo: {new Date(atividade.prazo).toLocaleDateString('pt-BR')}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-4">Nenhuma atividade pendente</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Coluna Lateral */}
      <div className="space-y-6">
        {/* Frequência */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar size={20} className="text-[#FFD700]" />
              Frequência
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-800 mb-2">
                {aluno.frequencia || 0}%
              </div>
              <Progress value={aluno.frequencia || 0} className="h-3 mb-2" />
              <p className="text-sm text-slate-500">
                {aluno.diasAusentes || 0} dias ausentes
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Documentos */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText size={20} className="text-[#5DCCD6]" />
              Documentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {aluno.documentos && (
                <>
                  <DocumentItem 
                    label="Cartão de Vacina" 
                    entregue={aluno.documentos.cartaoVacina} 
                  />
                  <DocumentItem 
                    label="Autorização Transporte" 
                    entregue={aluno.documentos.autorizacaoTransporte} 
                  />
                  <DocumentItem 
                    label="Termo Uniforme" 
                    entregue={aluno.documentos.termoUniforme} 
                  />
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Saúde */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart size={20} className="text-red-500" />
              Saúde e Segurança
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Alergias */}
            <div>
              <p className="text-sm font-medium text-slate-600 mb-2">Alergias</p>
              {aluno.alergias && aluno.alergias.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {aluno.alergias.map((alergia, i) => (
                    <Badge key={i} variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-200">
                      {alergia}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400">Nenhuma alergia registrada</p>
              )}
            </div>

            {/* Contatos de Emergência */}
            <div>
              <p className="text-sm font-medium text-slate-600 mb-2">Contatos de Emergência</p>
              {aluno.contatosEmergencia && aluno.contatosEmergencia.length > 0 ? (
                <div className="space-y-1">
                  {aluno.contatosEmergencia.map((contato, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone size={14} />
                      {contato}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400">Nenhum contato registrado</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DocumentItem({ label, entregue }: { label: string; entregue: boolean }) {
  return (
    <div className={`flex items-center justify-between p-2 rounded-lg ${entregue ? 'bg-green-50' : 'bg-red-50'}`}>
      <span className={`text-sm ${entregue ? 'text-green-700' : 'text-red-700'}`}>{label}</span>
      {entregue ? (
        <CheckCircle2 size={18} className="text-green-500" />
      ) : (
        <AlertCircle size={18} className="text-red-500" />
      )}
    </div>
  );
}

// ============================================
// TAB: DIA A DIA
// ============================================

function DiaDiaTab({ registros, alunoNome }: { registros: any[]; alunoNome: string }) {
  const hoje = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Dia a Dia</h2>
          <p className="text-slate-500 capitalize">{hoje}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cardápio */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Utensils size={20} className="text-orange-500" />
              Cardápio do Dia
            </CardTitle>
          </CardHeader>
          <CardContent>
            {registros.find(r => r.tipo === 'cardapio')?.cardapio ? (
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-slate-600">Prato Principal</p>
                  <p className="text-slate-800">{registros.find(r => r.tipo === 'cardapio')?.cardapio?.principal}</p>
                </div>
                {registros.find(r => r.tipo === 'cardapio')?.cardapio?.vegetariano && (
                  <div>
                    <p className="text-sm font-medium text-green-600">Opção Vegetariana</p>
                    <p className="text-slate-800">{registros.find(r => r.tipo === 'cardapio')?.cardapio?.vegetariano}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-4">Cardápio não disponível</p>
            )}
          </CardContent>
        </Card>

        {/* Transporte */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bus size={20} className="text-blue-500" />
              Transporte Escolar
            </CardTitle>
          </CardHeader>
          <CardContent>
            {registros.find(r => r.tipo === 'transporte')?.transporte ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={registros.find(r => r.tipo === 'transporte')?.transporte?.motoristaFoto} />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      <Bus size={20} />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-slate-800">
                      {registros.find(r => r.tipo === 'transporte')?.transporte?.motorista}
                    </p>
                    <p className="text-sm text-slate-500">Motorista</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500">Saída</p>
                    <p className="font-bold text-slate-800">
                      {registros.find(r => r.tipo === 'transporte')?.transporte?.horarioSaida}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500">Chegada</p>
                    <p className="font-bold text-slate-800">
                      {registros.find(r => r.tipo === 'transporte')?.transporte?.previsaoChegada}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-slate-500 text-center py-4">Informações não disponíveis</p>
            )}
          </CardContent>
        </Card>

        {/* Bem-estar */}
        <Card className="border-0 shadow-md md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Smile size={20} className="text-yellow-500" />
              Registro de Bem-estar
            </CardTitle>
            <CardDescription>Preenchido pela professora</CardDescription>
          </CardHeader>
          <CardContent>
            {registros.find(r => r.tipo === 'bem_estar')?.bemEstar ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-yellow-50 rounded-xl">
                  <p className="text-4xl mb-2">{registros.find(r => r.tipo === 'bem_estar')?.bemEstar?.humor}</p>
                  <p className="text-sm text-slate-600">Humor</p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl">
                  <p className="font-medium text-green-700 mb-1">Alimentação</p>
                  <p className="text-sm text-slate-600">
                    {registros.find(r => r.tipo === 'bem_estar')?.bemEstar?.alimentacao}
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl">
                  <p className="font-medium text-blue-700 mb-1">Interação Social</p>
                  <p className="text-sm text-slate-600">
                    {registros.find(r => r.tipo === 'bem_estar')?.bemEstar?.interacaoSocial}
                  </p>
                </div>
                {registros.find(r => r.tipo === 'bem_estar')?.bemEstar?.observacoes && (
                  <div className="md:col-span-3 p-4 bg-slate-50 rounded-xl">
                    <p className="font-medium text-slate-700 mb-1">Observações</p>
                    <p className="text-sm text-slate-600">
                      {registros.find(r => r.tipo === 'bem_estar')?.bemEstar?.observacoes}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-4">Registro não disponível para hoje</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ============================================
// TAB: MURAL
// ============================================

function MuralTab({ posts }: { posts: any[] }) {
  const getPostIcon = (tipo: string) => {
    switch (tipo) {
      case 'noticia': return <Megaphone size={18} />;
      case 'evento': return <Calendar size={18} />;
      case 'foto': return <ImageIcon size={18} />;
      case 'video': return <Video size={18} />;
      case 'depoimento': return <Star size={18} />;
      default: return <Bell size={18} />;
    }
  };

  const getPostColor = (tipo: string) => {
    switch (tipo) {
      case 'noticia': return 'bg-blue-100 text-blue-600';
      case 'evento': return 'bg-purple-100 text-purple-600';
      case 'foto': return 'bg-green-100 text-green-600';
      case 'video': return 'bg-red-100 text-red-600';
      case 'depoimento': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Mural da Escola</h2>
        <p className="text-slate-500">Notícias, eventos e atualizações</p>
      </div>

      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getPostColor(post.tipo)}`}>
                    {getPostIcon(post.tipo)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs capitalize">
                        {post.tipo}
                      </Badge>
                      {post.dataEvento && (
                        <Badge className="bg-purple-100 text-purple-700 text-xs">
                          {new Date(post.dataEvento).toLocaleDateString('pt-BR')}
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg mb-2">{post.titulo}</h3>
                    {post.conteudo && (
                      <p className="text-slate-600 text-sm leading-relaxed">{post.conteudo}</p>
                    )}
                    {post.urlMidia && (
                      <div className="mt-4">
                        <img 
                          src={post.urlMidia} 
                          alt={post.titulo}
                          className="rounded-xl max-h-64 object-cover"
                        />
                      </div>
                    )}
                    <p className="text-xs text-slate-400 mt-4">
                      Publicado em {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState message="Nenhuma publicação no mural" />
      )}
    </div>
  );
}

// ============================================
// TAB: CHAT
// ============================================

function ChatTab({ mensagens, userEmail }: { mensagens: any[]; userEmail: string }) {
  const [selectedSetor, setSelectedSetor] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const setores = [
    { id: 'professor', label: 'Professora', icon: <GraduationCap size={20} />, color: 'bg-blue-100 text-blue-600' },
    { id: 'coordenacao', label: 'Coordenação', icon: <Users size={20} />, color: 'bg-purple-100 text-purple-600' },
    { id: 'direcao', label: 'Direção', icon: <Shield size={20} />, color: 'bg-red-100 text-red-600' },
    { id: 'transporte', label: 'Transporte', icon: <Bus size={20} />, color: 'bg-green-100 text-green-600' },
    { id: 'cantina', label: 'Cantina', icon: <Utensils size={20} />, color: 'bg-orange-100 text-orange-600' },
    { id: 'financeiro', label: 'Financeiro', icon: <FileText size={20} />, color: 'bg-yellow-100 text-yellow-600' },
    { id: 'secretaria', label: 'Secretaria', icon: <Mail size={20} />, color: 'bg-slate-100 text-slate-600' },
  ];

  const filteredMensagens = selectedSetor 
    ? mensagens.filter(m => m.destinatarioSetor === selectedSetor || m.remetente === userEmail)
    : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
      {/* Lista de Setores */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Canais de Conversa</CardTitle>
          <CardDescription>Selecione um setor para conversar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {setores.map((setor) => (
              <button
                key={setor.id}
                onClick={() => setSelectedSetor(setor.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                  selectedSetor === setor.id 
                    ? 'bg-[#5DCCD6] text-white' 
                    : 'hover:bg-slate-100'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  selectedSetor === setor.id ? 'bg-white/20' : setor.color
                }`}>
                  {setor.icon}
                </div>
                <span className="font-medium">{setor.label}</span>
                <ChevronRight size={18} className="ml-auto opacity-50" />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Área de Chat */}
      <Card className="border-0 shadow-md md:col-span-2 flex flex-col">
        {selectedSetor ? (
          <>
            <CardHeader className="pb-2 border-b">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  setores.find(s => s.id === selectedSetor)?.color
                }`}>
                  {setores.find(s => s.id === selectedSetor)?.icon}
                </div>
                <div>
                  <CardTitle className="text-lg">
                    {setores.find(s => s.id === selectedSetor)?.label}
                  </CardTitle>
                  <CardDescription>Chat privado</CardDescription>
                </div>
              </div>
            </CardHeader>
            
            {/* Mensagens */}
            <ScrollArea className="flex-1 p-4">
              {filteredMensagens.length > 0 ? (
                <div className="space-y-4">
                  {filteredMensagens.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`flex ${msg.remetente === userEmail ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-3 rounded-2xl ${
                        msg.remetente === userEmail 
                          ? 'bg-[#5DCCD6] text-white rounded-br-sm' 
                          : 'bg-slate-100 text-slate-800 rounded-bl-sm'
                      }`}>
                        {msg.remetente !== userEmail && (
                          <p className="text-xs font-medium mb-1 opacity-70">{msg.remetenteNome}</p>
                        )}
                        <p className="text-sm">{msg.texto}</p>
                        <p className={`text-xs mt-1 ${
                          msg.remetente === userEmail ? 'text-white/70' : 'text-slate-400'
                        }`}>
                          {new Date(msg.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                          {msg.lido && msg.remetente === userEmail && ' ✓✓'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-slate-400">Nenhuma mensagem ainda</p>
                </div>
              )}
            </ScrollArea>

            {/* Input de Mensagem */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="text-slate-400">
                  <Paperclip size={20} />
                </Button>
                <Input 
                  placeholder="Digite sua mensagem..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button className="bg-[#5DCCD6] hover:bg-[#4FBFD9]">
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare size={48} className="text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">Selecione um canal para iniciar uma conversa</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
