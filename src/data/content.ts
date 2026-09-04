import type { IconName } from '../components/Icon';

/** Dados oficiais da promoção. Nenhuma informação além destas foi criada. */
export const site = {
  brand: 'Kingdom Canteen',
  logo: '/assets/kingdom-canteen-logo.png',
  email: 'bonus@kingdomcanteen.cloud',
  mailtoSubject: 'Solicitação de Cashback Bônus - Kingdom Canteen',
  period: '08/09 a 30/09',
  minValue: 100,
  cashbackRate: 0.1,
  creditDeadline: '7 dias úteis',
} as const;

export const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(site.mailtoSubject)}`;

export const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Conta digital', href: '#conta-digital' },
  { label: 'Cashback', href: '#cashback' },
  { label: 'Regulamento', href: '#regulamento' },
] as const;

export type Feature = {
  icon: IconName;
  title: string;
  description: string;
};

export const features: Feature[] = [
  {
    icon: 'wallet',
    title: 'Consultar saldo',
    description: 'Veja o saldo disponível na conta do aluno.',
  },
  {
    icon: 'history',
    title: 'Histórico de consumo',
    description: 'Acompanhe as compras realizadas na cantina escolar.',
  },
  {
    icon: 'calendar',
    title: 'Pedidos agendados',
    description: 'Organize pedidos antecipadamente para tornar o recreio mais prático.',
  },
  {
    icon: 'recharge',
    title: 'Recargas online',
    description: 'Adicione saldo à conta digital sem precisar realizar pagamentos presenciais.',
  },
  {
    icon: 'shield',
    title: 'Limites de consumo',
    description: 'Acompanhe os limites configurados para o consumo do aluno.',
  },
];

export type PromoHighlight = {
  value: string;
  label: string;
  tone: 'blue' | 'orange' | 'red';
};

export const promoHighlights: PromoHighlight[] = [
  { value: site.period, label: 'Período da promoção', tone: 'blue' },
  { value: 'Acima de R$ 100', label: 'Valor da recarga elegível', tone: 'orange' },
  { value: '+10%', label: 'Cashback bônus', tone: 'red' },
];

export type Step = {
  title: string;
  description: string;
  icon: IconName;
};

export const steps: Step[] = [
  {
    icon: 'user',
    title: 'Tenha um cadastro ativo',
    description:
      'O aluno precisa possuir cadastro ativo no sistema da cantina. Caso ainda não possua, os pais ou responsáveis deverão realizar o cadastro pelo aplicativo IUUPI.',
  },
  {
    icon: 'recharge',
    title: 'Faça uma recarga elegível',
    description: `Realize, entre ${site.period}, uma recarga de valor superior a R$ 100,00.`,
  },
  {
    icon: 'mail',
    title: 'Envie o comprovante',
    description: `Envie o comprovante da recarga exclusivamente para ${site.email}.`,
  },
  {
    icon: 'clock',
    title: 'Aguarde o crédito',
    description: `Após o envio do comprovante, o cashback bônus poderá ser creditado manualmente pela equipe da ${site.brand} em até ${site.creditDeadline}.`,
  },
];

export type RegulationItem = {
  number: string;
  title: string;
  paragraphs: string[];
};

export const regulation: RegulationItem[] = [
  {
    number: '1',
    title: 'Quem pode participar',
    paragraphs: [
      'A promoção é válida para todos os alunos que possuam cadastro ativo no sistema da cantina.',
      'Alunos que ainda não possuem cadastro e desejam participar deverão solicitar aos pais ou responsáveis que realizem o cadastro por meio do aplicativo IUUPI.',
      'O cadastramento facial também será realizado exclusivamente para alunos que estejam devidamente cadastrados no sistema da cantina.',
    ],
  },
  {
    number: '2',
    title: 'Período da promoção',
    paragraphs: [
      `A promoção será válida exclusivamente durante o período de cadastramento facial, de: ${site.period}.`,
      'Recargas realizadas fora desse período não serão elegíveis ao cashback bônus desta promoção.',
    ],
  },
  {
    number: '3',
    title: 'Valor mínimo da recarga',
    paragraphs: [
      'Qualquer recarga de valor superior a R$ 100,00 realizada durante o período da promoção dará direito a um cashback bônus adicional de 10% sobre o valor da recarga.',
      'Exemplo: Recarga de R$ 150,00 → Cashback bônus de R$ 15,00.',
    ],
  },
  {
    number: '4',
    title: 'Como receber o cashback bônus',
    paragraphs: [
      `O crédito do cashback bônus será realizado manualmente pela equipe da ${site.brand}.`,
      `Para solicitar o bônus, é obrigatório enviar o comprovante da recarga exclusivamente para o e-mail: ${site.email}`,
      'O envio do comprovante por qualquer outro canal de comunicação, incluindo WhatsApp, redes sociais ou atendimento presencial, não será aceito para fins desta promoção.',
    ],
  },
  {
    number: '5',
    title: 'Prazo para recebimento',
    paragraphs: [
      `Após o envio do comprovante por e-mail, o cashback bônus poderá ser creditado na conta do aluno em até 7 (sete) dias úteis.`,
    ],
  },
  {
    number: '6',
    title: 'Condições gerais',
    paragraphs: [
      'A participação na promoção está condicionada ao cumprimento de todas as regras descritas acima.',
      `A promoção é destinada exclusivamente aos alunos cadastrados no sistema da cantina e será válida somente para recargas elegíveis realizadas no período de ${site.period}.`,
      'Para participar, mantenha o cadastro do aluno atualizado no aplicativo IUUPI.',
    ],
  },
];

export type FaqItem = { question: string; answer: string };

export const faq: FaqItem[] = [
  {
    question: 'Quem pode participar?',
    answer:
      'Todos os alunos com cadastro ativo no sistema da cantina, desde que sejam cumpridas as demais condições da promoção.',
  },
  {
    question: 'Uma recarga de R$ 100,00 recebe o bônus?',
    answer: 'Não. A promoção é válida para recargas de valor superior a R$ 100,00.',
  },
  {
    question: 'Uma recarga de R$ 150,00 recebe quanto de cashback bônus?',
    answer:
      'Considerando o cumprimento das demais condições da promoção, uma recarga de R$ 150,00 gera R$ 15,00 de cashback bônus.',
  },
  {
    question: 'Até quando posso realizar a recarga?',
    answer: `As recargas elegíveis precisam ser realizadas entre ${site.period}.`,
  },
  {
    question: 'Como solicito o cashback bônus?',
    answer: `Envie o comprovante da recarga exclusivamente para ${site.email}.`,
  },
  {
    question: 'Posso enviar o comprovante pelo WhatsApp?',
    answer: `Não. Para fins desta promoção, o comprovante deverá ser enviado exclusivamente pelo e-mail ${site.email}.`,
  },
  {
    question: 'Quanto tempo leva para o bônus entrar na conta?',
    answer: 'O crédito poderá ser realizado em até 7 dias úteis após o envio do comprovante por e-mail.',
  },
  {
    question: 'Meu filho ainda não possui cadastro. O que devo fazer?',
    answer: 'Os pais ou responsáveis deverão realizar o cadastro do aluno por meio do aplicativo IUUPI.',
  },
];

export const formatBRL = (value: number): string =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
