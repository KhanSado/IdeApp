export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: NavigationItem[];
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'navigation',
    title: '',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'home',
        title: 'Home',
        type: 'item',
        url: '/home',
        icon: 'feather icon-home'
      },
      {
        id: 'cult-control',
        title: 'Controle de Culto',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'cults-dashboard',
            title: 'Cultos',
            type: 'item',
            url: '/cult-control/dashboard'
          },
          {
            id: 'visit-dashboard',
            title: 'Visitas',
            type: 'item',
            url: '/cult-control/visitor-list'
          },
          {
            id: 'new-cult',
            title: 'Novo Culto',
            type: 'item',
            url: '/cult-control/new'
          },
          {
            id: 'new-visitor',
            title: 'Novo Visitante',
            type: 'item',
            url: '/cult-control/visitor'
          },
          {
            id: 'new-recep-team',
            title: 'Nova Equipe de Recepcão',
            type: 'item',
            url: '/cult-control/reception-team'
          }
        ]
  },
  {
    id: 'ebd-control',
    title: 'Controle de E.B.D',
    type: 'collapse',
    icon: 'feather icon-book',
    children: [
      {
        id: 'classroom-dashboard',
        title: 'Aulas Registradas',
        type: 'item',
        url: 'ebd-control/classroom-dashboard'
      },
      {
        id: 'new-professor',
        title: 'Novo Professor',
        type: 'item',
        url: 'ebd-control/new-professor'
      },
      {
        id: 'new-class',
        title: 'Nova Turma',
        type: 'item',
        url: 'ebd-control/new-class'
      },
      {
        id: 'new-classroom',
        title: 'Nova Aula',
        type: 'item',
        url: 'ebd-control/new-classroom'
      },
      {
        id: 'new-student',
        title: 'Novo Aluno',
        type: 'item',
        url: 'ebd-control/new-student'
      }
    ]
},
    ]
  },
];

