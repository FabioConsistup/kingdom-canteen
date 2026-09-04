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
  email: 'bonus@kingdomcanteen.cloud',
  mailtoSubject: 'Solicitação de Cashback Bônus - Kingdom Canteen',
  period: '08/09 a 30/09',
  /** A promoção exige valor SUPERIOR a este limite — R$ 100,00 exatos não participam. */
  promoThreshold: 100,
  /** Recarga recomendada para diluir a taxa fixa por operação. Não é regra da promoção. */
  recommendedMin: 50,
  standardRate: 0.1,
  bonusRate: 0.1,
  creditDeadline: '7 dias úteis',
} as const;

export const totalRate = site.standardRate + site.bonusRate;

export const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(site.mailtoSubject)}`;

export const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Conta digital', href: '#conta-digital' },
  { label: 'Cashback', href: '#cashback' },
  { label: 'Exemplos', href: '#exemplos' },
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

/** Composição visual 10% + 10% = 20%. */
export type BreakdownItem = {
  label: string;
  value: string;
  note: string;
  tone: 'neutral' | 'bonus' | 'total';
};

export const cashbackBreakdown: BreakdownItem[] = [
  {
    label: 'Cashback normal',
    value: '10%',
    note: 'Em todas as recargas, com ou sem promoção.',
    tone: 'neutral',
  },
  {
    label: 'Bônus da promoção',
    value: '+10%',
    note: 'Apenas em recargas elegíveis da campanha.',
    tone: 'bonus',
  },
  {
    label: 'Total em recargas elegíveis',
    value: '20%',
    note: 'Soma do cashback padrão com o bônus da promoção.',
    tone: 'total',
  },
];

export type PromoHighlight = {
  value: string;
  label: string;
  tone: 'blue' | 'orange' | 'red';
};

export const promoHighlights: PromoHighlight[] = [
  { value: site.period, label: 'Período da promoção', tone: 'blue' },
  { value: 'Superior a R$ 100', label: 'Valor da recarga elegível', tone: 'orange' },
  { value: '+10%', label: 'Cashback bônus adicional', tone: 'red' },
];

export type Step = {
  title: string;
  description: string;
  icon: IconName;
};

export const steps: Step[] = [
  {
    icon: 'user',
    title: 'Verifique o cadastro',
    description: 'O aluno deve possuir cadastro ativo no sistema da cantina.',
  },
  {
    icon: 'balance',
    title: 'Confira o saldo',
    description:
      'A conta não deve possuir saldo negativo que consuma parte da recarga promocional. O valor integral da recarga indicada no comprovante deve permanecer como saldo positivo.',
  },
  {
    icon: 'recharge',
    title: 'Faça uma recarga superior a R$ 100',
    description: `Realize uma recarga de valor superior a R$ 100,00 entre ${site.period}.`,
  },
  {
    icon: 'mail',
    title: 'Envie o comprovante',
    description: `Envie o comprovante exclusivamente para ${site.email}.`,
  },
  {
    icon: 'clock',
    title: 'Aguarde o bônus',
    description: `O cashback bônus adicional de 10% será analisado e poderá ser creditado manualmente pela equipe da ${site.brand} em até ${site.creditDeadline}.`,
  },
];

/** Cards comparativos da seção "Entenda cada situação". */
export type Scenario = {
  id: string;
  rows: { label: string; value: string }[];
  result: string;
  total?: string;
  note: string;
  eligible: boolean;
};

export const scenarios: Scenario[] = [
  {
    id: 'recarga-50',
    rows: [{ label: 'Recarga', value: 'R$ 50,00' }],
    result: '10% de cashback padrão',
    note: 'É o valor mínimo recomendado para melhor aproveitamento da taxa fixa, mas não atende ao valor necessário para o bônus promocional.',
    eligible: false,
  },
  {
    id: 'recarga-100',
    rows: [{ label: 'Recarga', value: 'R$ 100,00' }],
    result: '10% de cashback padrão',
    note: 'Não recebe o bônus adicional porque a promoção exige valor SUPERIOR a R$ 100,00.',
    eligible: false,
  },
  {
    id: 'recarga-150',
    rows: [
      { label: 'Saldo anterior', value: 'Sem saldo negativo' },
      { label: 'Recarga', value: 'R$ 150,00' },
    ],
    result: '10% padrão + 10% bônus',
    total: '20% de cashback',
    note: 'Elegível, desde que todas as demais condições da promoção também sejam cumpridas.',
    eligible: true,
  },
  {
    id: 'saldo-negativo',
    rows: [
      { label: 'Saldo anterior', value: '-R$ 40,00' },
      { label: 'Recarga', value: 'R$ 120,00' },
      { label: 'Saldo após compensação', value: 'R$ 80,00' },
    ],
    result: 'Não recebe o cashback bônus promocional',
    note: 'Parte da recarga foi utilizada para quitar o saldo negativo. O valor do comprovante não ficou integralmente positivo na conta.',
    eligible: false,
  },
];

export const checklist: string[] = [
  'O aluno possui cadastro ativo.',
  `A recarga foi realizada entre ${site.period}.`,
  'A recarga é SUPERIOR a R$ 100,00.',
  'A recarga não está sendo utilizada para quitar saldo negativo.',
  'O valor integral indicado no comprovante ficou como saldo positivo na conta.',
  `O comprovante será enviado para ${site.email}.`,
  'O cliente está ciente de que o bônus pode levar até 7 dias úteis para ser creditado.',
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
      'As recargas realizadas na conta da cantina já possuem cashback padrão de 10%. Durante o período da promoção, recargas elegíveis de valor superior a R$ 100,00 poderão receber um cashback bônus adicional de 10%, totalizando 20% de cashback na recarga elegível.',
      'O cashback padrão da plataforma é diferente do cashback bônus desta campanha.',
    ],
  },
  {
    number: '4',
    title: 'Valor mínimo da recarga',
    paragraphs: [
      'Qualquer recarga de valor superior a R$ 100,00 realizada durante o período da promoção dará direito a um cashback bônus adicional de 10% sobre o valor da recarga.',
      'Exemplo: Recarga de R$ 150,00 → Cashback bônus de R$ 15,00, somado ao cashback padrão de R$ 15,00.',
    ],
  },
  {
    number: '5',
    title: 'Condição de saldo positivo',
    paragraphs: [
      'Para ter direito ao cashback bônus promocional, o valor integral da recarga indicado no comprovante deverá permanecer como saldo positivo na conta do aluno.',
      'Recargas utilizadas, total ou parcialmente, para compensar saldo negativo existente antes da operação não serão consideradas elegíveis para o cashback bônus desta promoção.',
      'Exemplo: se a conta estiver com saldo de -R$ 40,00 e for realizada uma recarga de R$ 120,00, parte da recarga será utilizada para regularizar o saldo negativo. Dessa forma, o valor integral de R$ 120,00 não permanecerá positivo na conta e essa recarga não será elegível ao cashback bônus promocional.',
    ],
  },
  {
    number: '6',
    title: 'Como receber o cashback bônus',
    paragraphs: [
      `O crédito do cashback bônus será realizado manualmente pela equipe da ${site.brand}.`,
      `Para solicitar o bônus, é obrigatório enviar o comprovante da recarga exclusivamente para o e-mail: ${site.email}`,
      'O envio do comprovante por qualquer outro canal de comunicação, incluindo WhatsApp, redes sociais ou atendimento presencial, não será aceito para fins desta promoção.',
    ],
  },
  {
    number: '7',
    title: 'Prazo para recebimento',
    paragraphs: [
      'Após o envio do comprovante por e-mail, o cashback bônus poderá ser creditado na conta do aluno em até 7 (sete) dias úteis.',
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
    question: 'Quem pode participar?',
    answer:
      'Todos os alunos com cadastro ativo no sistema da cantina, desde que sejam cumpridas as demais condições da promoção.',
  },
  {
    question: 'Por que vocês recomendam recargas de pelo menos R$ 50?',
    answer:
      'O sistema possui uma taxa fixa por operação de recarga. Por isso, a recomendação é realizar recargas de pelo menos R$ 50,00, permitindo que o cashback recebido ajude a compensar essa taxa.',
  },
  {
    question: 'Uma recarga de R$ 50 participa da promoção?',
    answer:
      'Não. Ela continua recebendo o cashback padrão, mas o bônus promocional adicional de 10% exige uma recarga de valor superior a R$ 100,00.',
  },
  {
    question: 'Uma recarga de R$ 100 participa?',
    answer: 'Não. O valor precisa ser superior a R$ 100,00.',
  },
  {
    question: 'Tenho saldo negativo. Posso participar?',
    answer:
      'Para o cashback bônus promocional, o valor integral da recarga indicado no comprovante precisa permanecer como saldo positivo na conta. Se parte da recarga for utilizada para quitar um saldo negativo anterior, essa recarga não será elegível ao bônus promocional.',
  },
  {
    question: 'Minha conta está em -R$ 40 e fiz uma recarga de R$ 120. Recebo o bônus?',
    answer:
      'Não. Nesse caso, R$ 40 da recarga são utilizados para compensar o saldo negativo, fazendo com que apenas R$ 80 permaneçam positivos. Como os R$ 120 do comprovante não ficaram integralmente positivos na conta, a recarga não é elegível ao cashback bônus promocional.',
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
