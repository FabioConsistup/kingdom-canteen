import type { IconName } from '../components/Icon';

/**
 * Dados oficiais da cantina e da promoção.
 *
 * Dois cashbacks diferentes convivem na página:
 *  - `standardRate`: cashback padrão, presente em todas as recargas;
 *  - `bonusRate`: bônus adicional, apenas em recargas elegíveis da campanha.
 * Nenhuma informação além das fornecidas foi criada (a taxa fixa por operação
 * de recarga existe, mas o valor não foi informado e por isso não aparece).
 */
export const site = {
  brand: 'Kingdom Canteen',
  logo: '/assets/kingdom-canteen-logo.png',
  /** Caixa institucional que recebe as solicitações enviadas pelo formulário. */
  email: 'bonus@kingdomcanteen.cloud',
  period: '08/09 a 30/09',
  /** Valor mínimo da promoção — recargas de R$ 100,00 ou mais são elegíveis. */
  promoMin: 100,
  /** Recarga recomendada para diluir a taxa fixa por operação. Não é regra da promoção. */
  recommendedMin: 50,
  standardRate: 0.1,
  bonusRate: 0.1,
  creditDeadline: '7 dias úteis',
} as const;

export const totalRate = site.standardRate + site.bonusRate;

/** Comunicado operacional — aparece no banner e, de propósito, também no FAQ. */
export const announcement = {
  eyebrow: 'Comunicado importante',
  headline: 'A partir de 1º de outubro, não haverá mais venda fiado na cantina.',
  body: 'Para compras pela conta digital IUUPI, mantenha saldo disponível na conta do aluno.',
  note: 'Os pagamentos em dinheiro ou cartão continuarão disponíveis normalmente.',
} as const;

export const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Autoatendimento', href: '#autoatendimento' },
  { label: 'Iuupi', href: '#iuupi' },
  { label: 'Cashback', href: '#cashback' },
  { label: 'Regulamento', href: '#regulamento' },
  { label: 'Solicitar', href: '#solicitar' },
] as const;

/** Seção de autoatendimento e reconhecimento facial. */
export const selfService = {
  title: 'Mais agilidade na hora do intervalo',
  intro:
    'Alunos cadastrados poderão usar os tablets de autoatendimento da Kingdom Canteen e concluir a compra por reconhecimento facial — uma forma prática de identificar a conta do aluno no sistema da cantina.',
  points: [
    {
      icon: 'calendar' as IconName,
      title: 'Cadastramento facial a partir de 08/09',
      description: 'O cadastro da facial é feito na própria cantina, durante o período da campanha.',
    },
    {
      icon: 'user' as IconName,
      title: 'Para alunos já cadastrados',
      description: 'O recurso fica disponível para alunos previamente cadastrados no sistema da cantina.',
    },
    {
      icon: 'wallet' as IconName,
      title: 'Sem venda fiado a partir de outubro',
      description: 'Mantenha saldo na conta do aluno para as compras pela conta digital.',
    },
    {
      icon: 'check' as IconName,
      title: 'Dinheiro e cartão seguem normalmente',
      description: 'As formas de pagamento presenciais continuam disponíveis como sempre.',
    },
  ],
} as const;

/** Aplicativo Iuupi: textos e links das lojas. */
export const iuupiApp = {
  title: 'Tenha a cantina na palma da mão',
  intro:
    'O Iuupi é o aplicativo utilizado pela Kingdom Canteen para facilitar a rotina dos alunos e responsáveis.',
  ctaTitle: 'Ainda não tem cadastro?',
  ctaText:
    'Baixe o Iuupi, crie sua conta e cadastre o aluno para começar a utilizar os serviços digitais da cantina.',
  note: 'Para realizar o cadastro facial e participar das ações promocionais da cantina, o aluno deverá estar previamente cadastrado no sistema.',
  stores: [
    {
      id: 'ios',
      label: 'Baixar para iPhone',
      icon: 'apple' as IconName,
      href: 'https://apps.apple.com/br/app/iuupi/id6758313721',
    },
    {
      id: 'android',
      label: 'Baixar para Android',
      icon: 'android' as IconName,
      href: 'https://play.google.com/store/apps/details?id=com.iuupi.iuupiapp&pcampaignid=web_share',
    },
  ],
} as const;

export type Feature = {
  icon: IconName;
  title: string;
  description: string;
};

export const features: Feature[] = [
  {
    icon: 'wallet',
    title: 'Acompanhar o saldo',
    description: 'Veja quanto o aluno tem disponível na conta da cantina.',
  },
  {
    icon: 'history',
    title: 'Consultar o consumo',
    description: 'Acompanhe as compras e as movimentações da conta.',
  },
  {
    icon: 'recharge',
    title: 'Fazer recargas online',
    description: 'Adicione saldo sem precisar de pagamento presencial.',
  },
  {
    icon: 'shield',
    title: 'Gerenciar a conta digital',
    description: 'Administre os dados e as configurações da conta da cantina.',
  },
  {
    icon: 'sparkle',
    title: 'Habilitar os recursos digitais',
    description:
      'Deixe o aluno apto a usar o autoatendimento por reconhecimento facial na cantina.',
  },
];

/** Composição 10% + 10% = 20%. Usada uma única vez na página, na seção da promoção. */
export type BreakdownItem = {
  label: string;
  value: string;
  note: string;
  tone: 'neutral' | 'bonus' | 'total';
};

export const cashbackBreakdown: BreakdownItem[] = [
  {
    label: 'Cashback padrão',
    value: '10%',
    note: 'Todas as recargas.',
    tone: 'neutral',
  },
  {
    label: 'Cashback bônus',
    value: '10%',
    note: 'Recargas promocionais elegíveis.',
    tone: 'bonus',
  },
  {
    label: 'Cashback total',
    value: '20%',
    note: 'Quando cumpridas as condições.',
    tone: 'total',
  },
];

export type PromoHighlight = {
  value: string;
  label: string;
  tone: 'blue' | 'orange' | 'red';
};

export const promoHighlights: PromoHighlight[] = [
  { value: site.period, label: 'Período', tone: 'blue' },
  { value: 'R$ 100+', label: 'Valor mínimo elegível', tone: 'orange' },
  { value: '+10%', label: 'Bônus promocional', tone: 'red' },
];

export type Step = {
  title: string;
  description: string;
  icon: IconName;
};

export const steps: Step[] = [
  {
    icon: 'recharge',
    title: 'Faça sua recarga',
    description: 'Realize uma recarga elegível durante o período da promoção.',
  },
  {
    icon: 'balance',
    title: 'Confira o saldo',
    description:
      'Se houver saldo negativo, o valor utilizado para regularizá-lo será descontado da base do bônus.',
  },
  {
    icon: 'form',
    title: 'Envie o comprovante',
    description:
      'Preencha o formulário com os dados do responsável e do aluno e anexe o comprovante.',
  },
  {
    icon: 'clock',
    title: 'Aguarde a análise',
    description: `O bônus poderá ser creditado manualmente em até ${site.creditDeadline}.`,
  },
];

/** Dois exemplos curtos, logo abaixo do simulador. */
export type QuickExample = {
  id: string;
  title: string;
  rows: { label: string; value: string; highlight?: boolean }[];
  total: string;
};

export const quickExamples: QuickExample[] = [
  {
    id: 'simples',
    title: 'Recarga de R$ 150,00',
    rows: [
      { label: 'Cashback padrão', value: 'R$ 15,00' },
      { label: 'Cashback bônus', value: 'R$ 15,00', highlight: true },
    ],
    total: 'R$ 30,00 de cashback',
  },
  {
    id: 'saldo-negativo',
    title: 'Saldo de -R$ 350,00 e recarga de R$ 500,00',
    rows: [
      { label: 'Valor líquido positivo', value: 'R$ 150,00' },
      { label: 'Cashback bônus (10% do líquido)', value: 'R$ 15,00', highlight: true },
    ],
    total: 'R$ 65,00 de cashback total',
  },
];

/** Conferência rápida exibida dentro do formulário, antes do botão de envio. */
export const preSubmitChecklist: string[] = [
  'Cadastro ativo',
  'Recarga dentro do período',
  'Valor elegível',
  'Dados e comprovante corretos',
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
    title: 'Cashback padrão e cashback bônus',
    paragraphs: [
      'As recargas realizadas na conta da cantina já possuem cashback padrão de 10%. Durante o período da promoção, recargas elegíveis a partir de R$ 100,00 poderão receber um cashback bônus adicional de 10%, totalizando 20% de cashback na recarga elegível.',
      'O cashback padrão da plataforma é diferente do cashback bônus desta campanha.',
    ],
  },
  {
    number: '4',
    title: 'Valor mínimo da recarga',
    paragraphs: [
      'Qualquer recarga de valor igual ou superior a R$ 100,00 realizada durante o período da promoção poderá dar direito ao cashback bônus adicional de 10%, desde que cumpridas todas as demais condições.',
      'Exemplo: Recarga de R$ 150,00 → R$ 15,00 de cashback padrão e R$ 15,00 de cashback bônus, totalizando R$ 30,00.',
    ],
  },
  {
    number: '5',
    title: 'Saldo negativo e base de cálculo do bônus',
    paragraphs: [
      'Quando a conta do aluno possuir saldo negativo antes da recarga, o valor utilizado para regularizar esse saldo não será considerado para o cálculo do cashback bônus promocional.',
      'O cashback bônus adicional de 10% será calculado somente sobre o valor líquido positivo restante após a compensação do saldo negativo.',
      'Para que haja direito ao cashback bônus promocional, esse valor líquido positivo deverá ser igual ou superior a R$ 100,00.',
      'Exemplo: Saldo anterior: -R$ 350,00. Recarga: R$ 500,00. Valor líquido positivo: R$ 150,00. Cashback bônus promocional: R$ 15,00.',
      'Recomendamos regularizar previamente eventuais saldos negativos e, posteriormente, realizar a recarga promocional.',
    ],
  },
  {
    number: '6',
    title: 'Como solicitar o cashback bônus',
    paragraphs: [
      'Para solicitar o cashback bônus, o responsável deverá preencher o formulário disponível nesta página e anexar o comprovante da recarga.',
      `As informações e o comprovante serão encaminhados para ${site.email} e uma confirmação será enviada ao e-mail do responsável informado no formulário.`,
      `O crédito do cashback bônus será realizado manualmente pela equipe da ${site.brand}.`,
    ],
  },
  {
    number: '7',
    title: 'Prazo para recebimento',
    paragraphs: [
      'Após o envio da solicitação, o cashback bônus poderá ser creditado na conta do aluno em até 7 (sete) dias úteis.',
    ],
  },
  {
    number: '8',
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
    question: 'Todas as recargas têm cashback?',
    answer:
      'Sim. As recargas já recebem 10% de cashback. Durante a promoção, recargas que cumpram todas as condições recebem mais 10% de cashback bônus.',
  },
  {
    question: 'Qual o valor mínimo da promoção?',
    answer: 'A promoção é válida para recargas a partir de R$ 100,00.',
  },
  {
    question: 'Tenho saldo negativo. Como funciona o bônus?',
    answer:
      'O valor utilizado para quitar o saldo negativo é descontado da base da promoção. O cashback bônus de 10% é calculado somente sobre o valor líquido positivo restante, que precisa ser de pelo menos R$ 100,00.',
  },
  {
    question: 'Como envio o comprovante?',
    answer:
      'Preencha o formulário disponível nesta página com os dados do responsável e do aluno e anexe o comprovante da recarga.',
  },
  {
    question: 'Quanto tempo leva para receber o bônus?',
    answer:
      'O crédito poderá ser realizado em até 7 dias úteis após o envio da solicitação, conforme as condições da promoção.',
  },
  {
    question: 'Até quando vale a promoção?',
    answer: `As recargas elegíveis precisam ser realizadas entre ${site.period}.`,
  },
  {
    question: 'Meu filho ainda não possui cadastro. O que devo fazer?',
    answer: 'Os pais ou responsáveis deverão realizar o cadastro do aluno por meio do aplicativo IUUPI.',
  },
  {
    question: 'A cantina continuará vendendo fiado?',
    answer:
      'Não. A partir de 1º de outubro, não serão mais realizadas vendas fiado na cantina. Para compras pela conta digital IUUPI, recomendamos manter saldo disponível na conta do aluno. Pagamentos em dinheiro e cartão continuarão disponíveis normalmente.',
  },
];

export const formatBRL = (value: number): string =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
