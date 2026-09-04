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

/** Uma recarga atinge o valor mínimo da promoção a partir de R$ 100,00 (inclusive). */
export const meetsPromoMin = (amount: number) => amount >= site.promoMin;

export const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Conta digital', href: '#conta-digital' },
  { label: 'Cashback', href: '#cashback' },
  { label: 'Exemplos', href: '#exemplos' },
  { label: 'Regulamento', href: '#regulamento' },
  { label: 'Solicitar', href: '#solicitar' },
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

/** Composição visual 10% + 10% = 20%. */
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
    note: 'Em todas as recargas, com ou sem promoção.',
    tone: 'neutral',
  },
  {
    label: 'Bônus da promoção',
    value: '10%',
    note: 'Adicional, apenas em recargas elegíveis da campanha.',
    tone: 'bonus',
  },
  {
    label: 'Cashback total',
    value: '20%',
    note: 'Em recargas promocionais elegíveis.',
    tone: 'total',
  },
];

export type PromoHighlight = {
  value: string;
  label: string;
  tone: 'blue' | 'orange' | 'red' | 'white';
};

export const promoHighlights: PromoHighlight[] = [
  { value: site.period, label: 'Período da promoção', tone: 'blue' },
  { value: 'R$ 100+', label: 'Recarga promocional', tone: 'orange' },
  { value: '+10%', label: 'Cashback bônus adicional', tone: 'red' },
  { value: '20%', label: 'Cashback total em recargas elegíveis', tone: 'white' },
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
    description: 'O aluno precisa possuir cadastro ativo no sistema da cantina.',
  },
  {
    icon: 'balance',
    title: 'Confira o saldo',
    description:
      'Se houver saldo negativo, recomendamos regularizar primeiro o valor pendente e depois realizar a recarga promocional.',
  },
  {
    icon: 'recharge',
    title: 'Faça uma recarga a partir de R$ 100',
    description: `Realize uma recarga de R$ 100,00 ou mais durante o período de ${site.period}.`,
  },
  {
    icon: 'form',
    title: 'Preencha o formulário',
    description:
      'Informe os dados do responsável e do aluno e anexe o comprovante da recarga.',
  },
  {
    icon: 'send',
    title: 'Envie sua solicitação',
    description: `A solicitação será enviada para a ${site.brand} e uma confirmação será encaminhada para o e-mail do responsável informado.`,
  },
  {
    icon: 'clock',
    title: 'Aguarde a análise',
    description: `O cashback bônus adicional poderá ser creditado manualmente em até ${site.creditDeadline}, conforme as condições da promoção.`,
  },
];

/** Cards comparativos da seção "Entenda cada situação". */
export type Scenario = {
  id: string;
  recharge: string;
  result: string;
  total?: string;
  note: string;
  eligible: boolean;
};

export const scenarios: Scenario[] = [
  {
    id: 'recarga-50',
    recharge: 'R$ 50,00',
    result: '10% de cashback padrão',
    note: 'É o valor recomendado para melhor aproveitamento da taxa fixa de recarga, mas não atende ao valor mínimo da promoção.',
    eligible: false,
  },
  {
    id: 'recarga-99',
    recharge: 'R$ 99,99',
    result: '10% de cashback padrão',
    note: 'Não participa do cashback bônus porque o valor da promoção começa em R$ 100,00.',
    eligible: false,
  },
  {
    id: 'recarga-100',
    recharge: 'R$ 100,00',
    result: '10% padrão + 10% bônus',
    total: '20% de cashback total',
    note: 'R$ 100,00 já atende ao valor mínimo da promoção, desde que todas as demais condições também sejam cumpridas.',
    eligible: true,
  },
  {
    id: 'recarga-150',
    recharge: 'R$ 150,00',
    result: 'R$ 15,00 padrão + R$ 15,00 bônus',
    total: 'R$ 30,00 de cashback',
    note: 'Em uma recarga promocional elegível de R$ 150,00, o total de cashback corresponde a R$ 30,00.',
    eligible: true,
  },
];

/** Passo a passo de quem está com a conta negativa. */
export const negativeBalanceFlow = [
  { id: 'saldo-inicial', label: 'Saldo', value: '-R$ 40,00' },
  { id: 'regularizacao', label: 'Regularização', value: 'R$ 40,00' },
  { id: 'saldo-zerado', label: 'Saldo', value: 'R$ 0,00' },
  { id: 'nova-recarga', label: 'Nova recarga promocional', value: 'R$ 120,00' },
  { id: 'valor-positivo', label: 'Valor positivo da nova recarga', value: 'R$ 120,00' },
];

export const checklist: string[] = [
  'O aluno possui cadastro ativo.',
  `A recarga foi feita entre ${site.period}.`,
  'O valor da recarga é de R$ 100,00 ou mais.',
  'Se havia saldo negativo, ele foi regularizado antes da nova recarga promocional.',
  'O formulário foi preenchido corretamente.',
  'O comprovante da recarga foi anexado.',
  'Os dados do responsável e do aluno estão corretos.',
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
    title: 'Orientação sobre saldo negativo',
    paragraphs: [
      'Se a conta do aluno estiver com saldo negativo, recomendamos primeiro regularizar o valor pendente e, somente depois, realizar a recarga que participará da promoção.',
      'Dessa forma, o valor da nova recarga fica integralmente disponível como saldo positivo na conta.',
      'Recomendamos separar a operação de regularização do saldo negativo da recarga promocional.',
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
    question: 'As recargas já têm cashback?',
    answer:
      'Sim. As recargas normalmente já recebem 10% de cashback. Durante a promoção, recargas que cumpram todas as condições recebem mais 10% de cashback bônus.',
  },
  {
    question: 'Então uma recarga elegível recebe 20%?',
    answer:
      'Sim. Em uma recarga promocional elegível, são 10% de cashback padrão mais 10% de cashback bônus, totalizando 20%.',
  },
  {
    question: 'O cashback padrão e o bônus são a mesma coisa?',
    answer:
      'Não. O cashback padrão de 10% já faz parte das recargas. O bônus da campanha acrescenta mais 10% às recargas que cumprirem todas as condições.',
  },
  {
    question: 'Qual é o valor mínimo para o bônus promocional?',
    answer: 'A promoção é válida para recargas a partir de R$ 100,00.',
  },
  {
    question: 'Uma recarga de R$ 100,00 participa da promoção?',
    answer:
      'Sim. R$ 100,00 já atende ao valor mínimo da promoção, desde que as demais condições também sejam cumpridas.',
  },
  {
    question: 'Por que vocês recomendam recargas de pelo menos R$ 50?',
    answer:
      'O sistema cobra uma taxa fixa por operação. A recomendação de pelo menos R$ 50,00 ajuda a aproveitar melhor o cashback em relação a essa taxa. Para participar do bônus promocional, porém, a recarga precisa ser de R$ 100,00 ou mais.',
  },
  {
    question: 'Estou com saldo negativo. O que devo fazer?',
    answer:
      'Recomendamos primeiro regularizar o saldo negativo e, depois, realizar uma nova recarga de R$ 100,00 ou mais para participar da promoção.',
  },
  {
    question: 'Quem pode participar?',
    answer:
      'Todos os alunos com cadastro ativo no sistema da cantina, desde que sejam cumpridas as demais condições da promoção.',
  },
  {
    question: 'Como envio meu comprovante?',
    answer:
      'Preencha o formulário disponível nesta página com os dados do responsável e do aluno e anexe o comprovante da recarga.',
  },
  {
    question: 'Receberei uma confirmação?',
    answer:
      'Sim. Após o envio bem-sucedido do formulário, uma confirmação será encaminhada para o e-mail do responsável informado.',
  },
  {
    question: 'Até quando posso realizar a recarga?',
    answer: `As recargas elegíveis precisam ser realizadas entre ${site.period}.`,
  },
  {
    question: 'Quanto tempo leva para o bônus entrar na conta?',
    answer:
      'O crédito poderá ser realizado em até 7 dias úteis após o envio da solicitação, conforme as condições da promoção.',
  },
  {
    question: 'Meu filho ainda não possui cadastro. O que devo fazer?',
    answer: 'Os pais ou responsáveis deverão realizar o cadastro do aluno por meio do aplicativo IUUPI.',
  },
];

export const formatBRL = (value: number): string =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
