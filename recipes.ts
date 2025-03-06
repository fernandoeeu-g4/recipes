import { Recipe } from "../types/Recipe";

export const recipes: Recipe[] = [
  {
    id: "1",
    title: "Utility Function para Composição de Classes com clsx",
    description:
      "Função utilitária para combinar classes do Tailwind de forma segura usando clsx e tailwind-merge.",
    category: "styling",
    code: `import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Exemplo de uso:
const className = cn(
  'base-class',
  condition && 'conditional-class',
  ['array-class-1', 'array-class-2'],
  { 'object-class': true }
);`,
    tags: ["tailwind", "clsx", "styling", "utils"],
    author: "Time Frontend",
    createdAt: "2024-03-15",
  },
  {
    id: "2",
    title: "Animação de Fade com Framer Motion",
    description:
      "Componente reutilizável para animações de fade usando Framer Motion.",
    category: "animations",
    code: `import { motion } from 'framer-motion';

export const FadeIn = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

// Exemplo de uso:
function App() {
  return (
    <FadeIn>
      <h1>Conteúdo com Fade</h1>
    </FadeIn>
  );
}`,
    tags: ["animation", "framer-motion", "transitions"],
    author: "Time Frontend",
    createdAt: "2024-03-15",
  },
  {
    id: "3",
    title: "Formulário com React Hook Form e Zod",
    description:
      "Exemplo de formulário usando React Hook Form com validação Zod.",
    category: "forms",
    code: `import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo de 6 caracteres'),
});

type FormData = z.infer<typeof schema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit">Entrar</button>
    </form>
  );
}`,
    tags: ["forms", "validation", "react-hook-form", "zod"],
    author: "Time Frontend",
    createdAt: "2024-03-15",
  },
  {
    id: "4",
    title: "Store Global com Zustand",
    description: "Exemplo de gerenciamento de estado global usando Zustand.",
    category: "client-state",
    code: `import { create } from 'zustand';

interface User {
  id: string;
  name: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

// Exemplo de uso:
function Profile() {
  const { user, logout } = useAuthStore();
  
  return (
    <div>
      <h1>Olá, {user?.name}</h1>
      <button onClick={logout}>Sair</button>
    </div>
  );
}`,
    tags: ["state-management", "zustand", "global-state"],
    author: "Time Frontend",
    createdAt: "2024-03-15",
  },
  {
    id: "473287328",
    title: "React Query com Zod Schema",
    description:
      "Exemplo de implementação do TanStack Query com validação de schema usando Zod.",
    category: "data-fetching",
    code: `import { apiUrls } from '@/shared/api-urls'
  import { api } from '@/shared/services/api'
  import { useQuery } from '@tanstack/react-query'
  import { z } from 'zod'
  
  // Define o schema de validação com Zod
  const programStepResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    baseQuestionGroup: z.object({
      id: z.string(),
      name: z.string(),
      completed: z.boolean(),
      totalItemCount: z.number(),
      completedItemCount: z.number(),
    }),
    items: z.array(
      z.object({
        resource: z.object({
          id: z.string(),
          name: z.string(),
          banner: z.string(),
          durationInMinutes: z.number(),
          completed: z.boolean(),
          hasAttachments: z.boolean(),
        }),
        questionGroup: z.object({
          id: z.string(),
          name: z.string(),
          locked: z.boolean(),
          completed: z.boolean(),
        }).nullable(),
        completed: z.boolean(),
        totalItemCount: z.number(),
        completedItemCount: z.number(),
      })
    ),
  })
  
  // Tipo inferido do schema
  type ProgramStepMicroProgress = z.infer<typeof programStepResponseSchema>
  
  // Função de fetch dos dados
  async function getProgramStepMicroProgress(programStepId: string) {
    const url = apiUrls.programSteps.microProgressByUser(programStepId)
    const response = await api.get(url)
    return programStepResponseSchema.parse(response.data)
  }
  
  // Query key para cache
  const queryKey = 'program-step-micro-progress'
  
  // Hook personalizado usando React Query
  function useProgramStepMicroProgress(programStepId: string) {
    return useQuery({
      queryKey: [queryKey, programStepId],
      queryFn: () => getProgramStepMicroProgress(programStepId),
    })
  }
  
  // Exemplo de uso:
  function ProgramStep({ programStepId }: { programStepId: string }) {
    const { data, isLoading, error } = useProgramStepMicroProgress(programStepId)
    
    if (isLoading) return <div>Carregando...</div>
    if (error) return <div>Erro ao carregar dados</div>
    
    return (
      <div>
        <h1>{data?.name}</h1>
        <div>
          Progresso: {data?.baseQuestionGroup.completedItemCount} 
          de {data?.baseQuestionGroup.totalItemCount}
        </div>
      </div>
    )
  }`,
    tags: ["data-fetching", "react-query", "zod"],
    author: "Time Frontend",
    createdAt: "2024-03-15",
  },
  {
    id: "5",
    title: "Formatação de Datas com Day.js",
    description: "Utilitário para formatação de datas usando Day.js.",
    category: "dates",
    code: `import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime';

// Configuração
dayjs.locale('pt-br');
dayjs.extend(relativeTime);

export const dateUtils = {
  format: (date: string | Date, format = 'DD/MM/YYYY') => {
    return dayjs(date).format(format);
  },
  
  fromNow: (date: string | Date) => {
    return dayjs(date).fromNow();
  },
  
  isFuture: (date: string | Date) => {
    return dayjs(date).isAfter(dayjs());
  },
};

// Exemplo de uso:
const date = new Date();
console.log(dateUtils.format(date)); // "15/03/2024"
console.log(dateUtils.fromNow(date)); // "há alguns segundos"`,
    tags: ["dates", "formatting", "dayjs"],
    author: "Time Frontend",
    createdAt: "2024-03-15",
  },
  {
    id: "6",
    title: "Coming soon",
    description: "Example for Icons category is coming soon.",
    category: "icons",
    code: "",
    tags: ["icons"],
    author: "Time Frontend",
    createdAt: "2024-03-15",
  },
  {
    id: "7",
    title: "Coming soon",
    description: "Example for Components category is coming soon.",
    category: "components",
    code: "",
    tags: ["components"],
    author: "Time Frontend",
    createdAt: "2024-03-15",
  },
  {
    id: "8",
    title: "Coming soon",
    description: "Example for Validation category is coming soon.",
    category: "validation",
    code: "",
    tags: ["validation"],
    author: "Time Frontend",
    createdAt: "2024-03-15",
  },
  {
    id: "9",
    title: "Coming soon",
    description: "Example for Server State category is coming soon.",
    category: "server-state",
    code: "",
    tags: ["server-state"],
    author: "Time Frontend",
    createdAt: "2024-03-15",
  },
  {
    id: "10",
    title: "Coming soon",
    description: "Example for Async category is coming soon.",
    category: "async",
    code: "",
    tags: ["async"],
    author: "Time Frontend",
    createdAt: "2024-03-15",
  },
  {
    id: "11",
    title: "Coming soon",
    description: "Example for Cookies category is coming soon.",
    category: "cookies",
    code: "",
    tags: ["cookies"],
    author: "Time Frontend",
    createdAt: "2024-03-15",
  },
  {
    id: "12",
    title: "Coming soon",
    description: "Example for Feature Flags category is coming soon.",
    category: "feature-flags",
    code: "",
    tags: ["feature-flags"],
    author: "Time Frontend",
    createdAt: "2024-03-15",
  },
  {
    id: "13",
    title: "Coming soon",
    description: "Example for Complex Features category is coming soon.",
    category: "complex-features",
    code: "",
    tags: ["complex-features"],
    author: "Time Frontend",
    createdAt: "2024-03-15",
  },
  {
    id: "14",
    title: "Coming soon",
    description: "Example for Utils category is coming soon.",
    category: "utils",
    code: "",
    tags: ["utils"],
    author: "Time Frontend",
    createdAt: "2024-03-15",
  },
  {
    id: "15",
    title: "Coming soon",
    description: "Example for Performance category is coming soon.",
    category: "performance",
    code: "",
    tags: ["performance"],
    author: "Time Frontend",
    createdAt: "2024-03-15",
  },
  {
    id: "16",
    title: "Coming soon",
    description: "Example for External Services category is coming soon.",
    category: "external-services",
    code: "",
    tags: ["external-services"],
    author: "Time Frontend",
    createdAt: "2024-03-15",
  },
];
