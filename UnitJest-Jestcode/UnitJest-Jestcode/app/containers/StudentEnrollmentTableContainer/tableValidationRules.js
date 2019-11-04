export default function rules() {
  // Order of items does not matter.
  return [
    {
      id: 'CDX_CIII',
      siblings: ['CDX_CI', 'CDX_CII'],
    },
    {
      id: 'CDX_CI',
      siblings: ['CDX_CII', 'CDX_CIII'],
    },
    {
      id: 'CDX_CII',
      siblings: ['CDX_CI', 'CDX_CIII'],
    },
    {
      id: 'DTM2',
      siblings: [],
    },
    {
      id: 'DTM_MODULE',
      siblings: [],
    },
    {
      id: 'DTM_NOW',
      siblings: [],
    },

    {
      id: 'E3D_A_1',
      groupId: 'E3D',
      siblings: ['E3D_A_2', 'E3D_B_1', 'E3D_B_2', 'E3D_C_1'],
    },
    {
      id: 'E3D_A_2',
      groupId: 'E3D',
      siblings: ['E3D_A_1', 'E3D_B_1', 'E3D_B_2', 'E3D_C_1'],
    },

    {
      id: 'E3D_B_1',
      groupId: 'E3D',
      siblings: ['E3D_A_1', 'E3D_A_2', 'E3D_B_2', 'E3D_C_1'],
    },
    {
      id: 'E3D_B_2',
      groupId: 'E3D',
      siblings: ['E3D_A_1', 'E3D_A_2', 'E3D_B_1', 'E3D_C_1'],
    },

    {
      id: 'E3D_C_1',
      groupId: 'E3D',
      siblings: ['E3D_A_1', 'E3D_A_2', 'E3D_B_1', 'E3D_B_2'],
    },

    {
      id: 'FAD',
      groupId: 'E3D',
      siblings: [],
    },

    {
      id: 'FM',
      siblings: [],
    },
    {
      id: 'FMNG',
      siblings: [],
    },

    {
      id: 'M180_Y1',
      siblings: [],
    },
    {
      id: 'M180_Y2',
      siblings: [],
    },
    {
      id: 'r180ng_A',
      siblings: [
        'r180u_A',
        'r180u_A_flex',
        'r180u_B',
        'r180u_B_flex',
        'r180u_C',
        'r180u_C_flex',
        'R180_A',
        'R180_B',
        'R180_C',
      ],
    },
    {
      id: 'r180ng_B',
      siblings: [
        'r180u_A',
        'r180u_A_flex',
        'r180u_B',
        'r180u_B_flex',
        'r180u_C',
        'r180u_C_flex',
        'R180_A',
        'R180_B',
        'R180_C',
      ],
    },

    {
      id: 'r180ng_C',
      siblings: [
        'r180u_A',
        'r180u_A_flex',
        'r180u_B',
        'r180u_B_flex',
        'r180u_C',
        'r180u_C_flex',
        'R180_A',
        'R180_B',
        'R180_C',
      ],
    },
    {
      id: 'r180u_A',
      siblings: ['r180u_B', 'r180u_C'],
    },
    {
      id: 'r180u_A_flex',
      siblings: ['r180u_B_flex', 'r180u_C_flex', 'S44NG_A_flex', 'S44NG_B_flex', 'S44NG_C_flex'],
    },
    {
      id: 'r180u_B',
      siblings: ['r180u_A', 'r180u_C'],
    },
    {
      id: 'r180u_B_flex',
      siblings: ['r180u_A_flex', 'r180u_C_flex', 'S44NG_A_flex', 'S44NG_B_flex', 'S44NG_C_flex'],
    },

    {
      id: 'r180u_C',
      siblings: ['r180u_A', 'r180u_B'],
    },
    {
      id: 'r180u_C_flex',
      siblings: ['r180u_A_flex', 'r180u_B_flex', 'S44NG_A_flex', 'S44NG_B_flex', 'S44NG_C_flex'],
    },

    {
      id: 'R180_A',
      siblings: [],
    },
    {
      id: 'R180_B',
      siblings: [],
    },
    {
      id: 'R180_C',
      siblings: [],
    },

    {
      id: 'RT',
      siblings: [],
    },
    {
      id: 'RTNG',
      siblings: ['RT'],
    },

    {
      id: 'S44',
      siblings: [],
    },
    {
      id: 'S44JR',
      siblings: [],
    },

    {
      id: 'S44NG',
      siblings: ['S44', 'S44JR'],
    },

    {
      id: 'S44NG_A_flex',
      siblings: ['S44NG_B_flex', 'S44NG_C_flex', 'r180u_A_flex', 'r180u_B_flex', 'r180u_C_flex'],
    },
    {
      id: 'S44NG_B_flex',
      siblings: ['S44NG_A_flex', 'S44NG_C_flex', 'r180u_A_flex', 'r180u_B_flex', 'r180u_C_flex'],
    },
    {
      id: 'S44NG_C_flex',
      siblings: ['S44NG_A_flex', 'S44NG_B_flex', 'r180u_A_flex', 'r180u_B_flex', 'r180u_C_flex'],
    },
    {
      id: 'SMI',
      siblings: [],
    },
    {
      id: 'SPI',
      siblings: [],
    },

    {
      id: 'SRC',
      siblings: [],
    },
    {
      id: 'SRI',
      siblings: [],
    },

    {
      id: 'XT_I',
      siblings: [],
    },

    {
      id: 'XT_II',
      siblings: [],
    },
    {
      id: 'XT_III',
      siblings: [],
    },
  ];
}
