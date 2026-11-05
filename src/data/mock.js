export const REPERTORIOS_MOCK = [
  {
    id: 'arendt',
    nome: 'Hannah Arendt',
    categoria: 'Filosofia',
    quem: 'Filósofa e teórica política alemã (1906–1975), que estudou o totalitarismo no século XX.',
    conceito:
      'Em "Origens do Totalitarismo" (1951), Arendt mostra que a mentira sistemática e a propaganda destroem a distinção entre fato e ficção, deixando as pessoas sem referência comum de realidade.',
    relacao:
      'A desinformação em massa produz o mesmo efeito: quando tudo pode ser questionado ou fabricado, o cidadão perde a base para decidir e para debater.',
    aplicacao:
      'Segundo a filósofa Hannah Arendt, em "Origens do Totalitarismo", a mentira sistemática corrói a distinção entre fato e ficção. Nessa perspectiva, a disseminação de notícias falsas no Brasil ameaça a base comum de realidade necessária ao debate democrático, o que exige educação midiática e responsabilização das plataformas.',
    argumentos: [
      'Desinformação ameaça a democracia',
      'Perda de referência comum de realidade',
      'Necessidade de educação midiática',
    ],
    outrosTemas: [
      'Polarização política',
      'Populismo e manipulação de massas',
      'Crise da confiança nas instituições',
    ],
    fontes: [{ titulo: 'ARENDT, Hannah. Origens do Totalitarismo. 1951.' }],
  },
  {
    id: 'bauman',
    nome: 'Zygmunt Bauman',
    categoria: 'Sociologia',
    quem: 'Sociólogo polonês (1925–2017), conhecido por analisar a sociedade contemporânea.',
    conceito:
      'Em "Modernidade Líquida" (2000), Bauman descreve uma sociedade em que vínculos, valores e instituições são fluidos e instáveis, mudando rápido e sem solidez.',
    relacao:
      'Na lógica da liquidez, a informação circula e é descartada em segundos, sem checagem ou reflexão. Isso favorece o compartilhamento impulsivo de conteúdos falsos.',
    aplicacao:
      'De acordo com o sociólogo Zygmunt Bauman, a modernidade líquida é marcada pela fluidez e pela instabilidade das relações. Nesse contexto, a velocidade com que as informações são compartilhadas nas redes sociais desestimula a checagem, o que favorece a propagação de desinformação e exige maior senso crítico da população.',
    argumentos: [
      'Velocidade da informação reduz a checagem',
      'Consumo superficial de conteúdo',
      'Fragilidade dos vínculos e das fontes de confiança',
    ],
    outrosTemas: [
      'Redes sociais e saúde mental',
      'Consumismo',
      'Relações afetivas na era digital',
    ],
    fontes: [{ titulo: 'BAUMAN, Zygmunt. Modernidade Líquida. 2000.' }],
  },
  {
    id: 'pariser',
    nome: 'Eli Pariser',
    categoria: 'Livro',
    quem: 'Ativista e escritor norte-americano, autor de "O Filtro Invisível" (2011).',
    conceito:
      'Pariser chama de "bolha de filtro" o isolamento criado por algoritmos que personalizam o conteúdo exibido e mostram a cada pessoa, sobretudo, o que combina com suas preferências.',
    relacao:
      'Nas bolhas, a pessoa recebe pouca informação divergente, e boatos e conteúdos falsos que confirmam suas crenças circulam sem contraponto.',
    aplicacao:
      'O conceito de "bolha de filtro", do escritor Eli Pariser, descreve o isolamento causado por algoritmos que priorizam conteúdos alinhados ao gosto do usuário. Dessa forma, o contato com versões divergentes dos fatos diminui, o que facilita a circulação de notícias falsas e demanda maior transparência das plataformas digitais.',
    argumentos: [
      'Algoritmos reforçam crenças prévias',
      'Falta de transparência das plataformas',
      'Polarização alimentada por bolhas',
    ],
    outrosTemas: [
      'Polarização política',
      'Influência das big techs',
      'Uso de dados pessoais',
    ],
    fontes: [{ titulo: 'PARISER, Eli. O Filtro Invisível. 2011.' }],
  },
  {
    id: 'constituicao',
    nome: 'Constituição Federal de 1988',
    categoria: 'Legislação',
    quem: 'Lei máxima do Brasil, promulgada em 1988, que organiza o Estado e garante direitos fundamentais.',
    conceito:
      'O artigo 5º garante a liberdade de manifestação do pensamento, vedado o anonimato (inciso IV), e o acesso à informação (inciso XIV).',
    relacao:
      'Combater a desinformação exige equilíbrio: proteger a liberdade de expressão sem permitir que ela seja usada para disseminar falsidades que prejudicam direitos de terceiros.',
    aplicacao:
      'A Constituição Federal de 1988 assegura, em seu artigo 5º, a livre manifestação do pensamento e o acesso à informação. Entretanto, o uso dessa liberdade para propagar notícias falsas compromete o direito da população a informações verdadeiras, o que torna necessário que o Estado promova ações de educação digital sem restringir a liberdade de expressão.',
    argumentos: [
      'Liberdade de expressão tem limites e responsabilidades',
      'Direito à informação verdadeira',
      'Papel do Estado na educação digital',
    ],
    outrosTemas: [
      'Liberdade de imprensa',
      'Cidadania e direitos fundamentais',
      'Discurso de ódio',
    ],
    fontes: [
      {
        titulo: 'BRASIL. Constituição da República Federativa do Brasil de 1988 (Planalto).',
        url: 'https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm',
      },
    ],
  },
  {
    id: 'marco-civil',
    nome: 'Marco Civil da Internet',
    categoria: 'Legislação',
    quem: 'Lei nº 12.965/2014, que estabelece princípios, direitos e deveres para o uso da internet no Brasil.',
    conceito:
      'A lei protege a liberdade de expressão e a privacidade online e define regras de responsabilidade dos provedores de internet sobre conteúdos de terceiros.',
    relacao:
      'É a base legal que orienta o debate sobre o papel das plataformas digitais na circulação e na remoção de conteúdos falsos.',
    aplicacao:
      'O Marco Civil da Internet (Lei nº 12.965/2014) estabelece princípios para o uso da rede no Brasil, como a liberdade de expressão e a responsabilização dos agentes. Nesse sentido, a atualização dessas regras e a fiscalização das plataformas são caminhos para reduzir a circulação de desinformação sem ferir direitos individuais.',
    argumentos: [
      'Responsabilização das plataformas digitais',
      'Equilíbrio entre liberdade e regulação',
      'Necessidade de atualização da legislação',
    ],
    outrosTemas: [
      'Crimes virtuais',
      'Privacidade e proteção de dados',
      'Cyberbullying',
    ],
    fontes: [
      {
        titulo: 'BRASIL. Lei nº 12.965, de 23 de abril de 2014 (Planalto).',
        url: 'https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm',
      },
    ],
  },
]