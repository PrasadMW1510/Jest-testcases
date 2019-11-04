import * as Utils from '../tableValidation';
import getRules from '../tableValidationRules';

describe('Rules', () => {
  it('should export table validation rules', () => {
    expect(getRules()).toBeDefined();
  });
});

describe('Initialization', () => {
  let mockTableData;

  beforeEach(() => {
    mockTableData = [
      [
        'header-row',
        { id: 'CDX_CI', label: 'CDX CI' },
        { id: 'CDX_CII', label: 'CDX CII' },
        { id: 'CDX_CIII', label: 'CDX CIII' },
      ],
      ['teacher-001', true, true, true],
      ['teacher-002', false, false, false],
    ];
  });

  it('should convert booleans in data to object equivalents', () => {
    const convertedData = Utils.convertBools(mockTableData);
    const row1 = convertedData[1];
    const row2 = convertedData[2];
    expect(row1[1]).toEqual({ checked: true, disabled: false });
    expect(row2[1]).toEqual({ checked: false, disabled: false });
  });

  it('should merge rule data into header', () => {
    const dataWithRules = Utils.mergeRules(mockTableData, getRules());
    const rowHeader = dataWithRules[0];
    expect(rowHeader[1].siblings).toBeDefined();
  });

  it('should properly initialize', () => {
    const initializedData = Utils.init(mockTableData, getRules());
    expect(initializedData[0][1].siblings).toBeDefined();
    expect(initializedData[1][1].checked).toBeDefined();
  });
});

describe('Validate Rows', () => {
  let mockTableData;

  beforeEach(() => {
    mockTableData = [
      [
        'header-row',
        { id: 'CDX_CI', label: 'CDX CI' },
        { id: 'CDX_CII', label: 'CDX CII' },
        { id: 'CDX_CIII', label: 'CDX CIII' },
      ],
      ['teacher-001', true, false, false],
      ['teacher-002', false, false, true],
      ['teacher-003', false, true, false],

      // Invalid data but still should get converted in predicatbale way
      ['teacher-004', true, true, true],
      ['teacher-005', true, false, true],
    ];
  });

  it('should properly disable checkboxes based on rules - row 1', () => {
    const rowIndex = 1;
    const initializedData = Utils.init(mockTableData, getRules());
    const validatedRow = Utils.validateRow(initializedData, rowIndex);
    expect(validatedRow[0]).toEqual('teacher-001');
    expect(validatedRow[1]).toEqual({ checked: true, disabled: false });
    expect(validatedRow[2]).toEqual({ checked: false, disabled: true });
    expect(validatedRow[3]).toEqual({ checked: false, disabled: true });
  });

  it('should properly disable checkboxes based on rules - row 2', () => {
    const rowIndex = 2;
    const initializedData = Utils.init(mockTableData, getRules());
    const validatedRow = Utils.validateRow(initializedData, rowIndex);
    expect(validatedRow[0]).toEqual('teacher-002');
    expect(validatedRow[1]).toEqual({ checked: false, disabled: true });
    expect(validatedRow[2]).toEqual({ checked: false, disabled: true });
    expect(validatedRow[3]).toEqual({ checked: true, disabled: false });
  });

  it('should properly disable checkboxes based on rules - row 3', () => {
    const rowIndex = 3;
    const initializedData = Utils.init(mockTableData, getRules());
    const validatedRow = Utils.validateRow(initializedData, rowIndex);
    expect(validatedRow[0]).toEqual('teacher-003');
    expect(validatedRow[1]).toEqual({ checked: false, disabled: true });
    expect(validatedRow[2]).toEqual({ checked: true, disabled: false });
    expect(validatedRow[3]).toEqual({ checked: false, disabled: true });
  });

  describe('Invalid Incoming Data', () => {
    it('should properly disable checkboxes based on rules - row 4', () => {
      const rowIndex = 4;
      const initializedData = Utils.init(mockTableData, getRules());
      const validatedRow = Utils.validateRow(initializedData, rowIndex);
      expect(validatedRow[0]).toEqual('teacher-004');
      expect(validatedRow[1]).toEqual({ checked: true, disabled: true });
      expect(validatedRow[2]).toEqual({ checked: true, disabled: true });
      expect(validatedRow[3]).toEqual({ checked: true, disabled: true });
    });

    it('should properly disable checkboxes based on rules - row 5', () => {
      const rowIndex = 5;
      const initializedData = Utils.init(mockTableData, getRules());
      const validatedRow = Utils.validateRow(initializedData, rowIndex);
      expect(validatedRow[0]).toEqual('teacher-005');
      expect(validatedRow[1]).toEqual({ checked: true, disabled: true });
      expect(validatedRow[2]).toEqual({ checked: false, disabled: true });
      expect(validatedRow[3]).toEqual({ checked: true, disabled: true });
    });

    it('should validate all rows - row1', () => {
      const validatedData = Utils.validateAll(mockTableData, getRules());
      // row 1
      expect(validatedData[1][0]).toEqual('teacher-001');
      expect(validatedData[1][1]).toEqual({ checked: true, disabled: false });
      expect(validatedData[1][2]).toEqual({ checked: false, disabled: true });
      expect(validatedData[1][3]).toEqual({ checked: false, disabled: true });
    });

    it('should validate all rows - row2', () => {
      const validatedData = Utils.validateAll(mockTableData, getRules());
      // row 1
      expect(validatedData[2][0]).toEqual('teacher-002');
      expect(validatedData[2][1]).toEqual({ checked: false, disabled: true });
      expect(validatedData[2][2]).toEqual({ checked: false, disabled: true });
      expect(validatedData[2][3]).toEqual({ checked: true, disabled: false });
    });

    it('should validate all rows - row3', () => {
      const validatedData = Utils.validateAll(mockTableData, getRules());
      // row 1
      expect(validatedData[3][0]).toEqual('teacher-003');
      expect(validatedData[3][1]).toEqual({ checked: false, disabled: true });
      expect(validatedData[3][2]).toEqual({ checked: true, disabled: false });
      expect(validatedData[3][3]).toEqual({ checked: false, disabled: true });
    });
  });

  describe('Validate / Real-world Data', () => {
    let mockTableDataRW;
    let initializedData;
    let validatedRow;

    const rowIndex = 1;

    beforeEach(() => {
      mockTableDataRW = [
        [
          'header-row',

          { id: 'CDX_CI', label: 'CDX CI' },
          { id: 'CDX_CII', label: 'CDX CII' },
          { id: 'CDX_CIII', label: 'CDX CIII' },

          { id: 'DTM2', label: 'DTM2' },
          { id: 'DTM_MODULE', label: 'DTM MODULE' },
          { id: 'DTM_NOW', label: 'DTM NOW' },

          { id: 'E3D_A_1', label: 'E3D_A_1' },
          { id: 'E3D_A_2', label: 'E3D_A_2' },
          { id: 'E3D_B_1', label: 'E3D_B_1' },
          { id: 'E3D_B_2', label: 'E3D_B_2' },
          { id: 'E3D_C_1', label: 'E3D_C_1' },

          { id: 'FAD', label: 'FAD' },
          { id: 'FM', label: 'FM' },
          { id: 'FMNG', label: 'FMNG' },
          { id: 'M180_Y1', label: 'M180_Y1' },
          { id: 'M180_Y2', label: 'M180_Y2' },

          { id: 'r180ng_A', label: 'r180ng_A' },
          { id: 'r180ng_B', label: 'r180ng_B' },
          { id: 'r180ng_C', label: 'r180ng_C' },

          { id: 'r180u_A', label: 'r180u_A' },
          { id: 'r180u_A_flex', label: 'r180u_A_flex' },
          { id: 'r180u_B', label: 'r180u_B' },
          { id: 'r180u_B_flex', label: 'r180u_B_flex' },
          { id: 'r180u_C', label: 'r180u_C' },
          { id: 'r180u_C_flex', label: 'r180u_C_flex' },
        ],

        [
          'teacher-001',

          // CDX Group (radio)
          true,
          false,
          false,

          // DTM2, DTM_MODULE, DTM_NOW (none)
          false,
          true,
          false,

          // English 3D Course A1, A2, B1, B2, C1 (radio)
          false,
          false,
          false,
          false,
          true,

          // Math - FAD, FM, FMNG, M180_Y1, M180_Y2 (none)
          true,
          false,
          true,
          false,
          true,

          // Read 180 NG Stage A, B, C (none for these 3)
          // These 3 also effect next group
          false,
          false,
          false,

          // Read 180 NG Stage A, B, C (none for these 3)
          false,
          false,
          false,

          // Read 180 U
          false,
          false,
          false,
          false,
          false,
          false,
        ],
      ];
      initializedData = Utils.init(mockTableDataRW, getRules());
      validatedRow = Utils.validateRow(initializedData, rowIndex);
    });

    it('should properly handle a string', () => {
      expect(validatedRow[0]).toEqual('teacher-001');
    });

    describe('CDX Group (radio)', () => {
      it('should properly disable checkboxes based on rules', () => {
        expect(validatedRow[1]).toEqual({ checked: true, disabled: false });
        expect(validatedRow[2]).toEqual({ checked: false, disabled: true });
        expect(validatedRow[3]).toEqual({ checked: false, disabled: true });
      });
    });

    describe('DTM2, DTM_MODULE, DTM_NOW (none)', () => {
      it('should properly disable checkboxes based on rules', () => {
        expect(validatedRow[4]).toEqual({ checked: false, disabled: false });
        expect(validatedRow[5]).toEqual({ checked: true, disabled: false });
        expect(validatedRow[6]).toEqual({ checked: false, disabled: false });
      });
    });

    describe('English 3D Course A1, A2, B1, B2, C1 (radio)', () => {
      it('should properly disable checkboxes based on rules', () => {
        expect(validatedRow[7]).toEqual({ checked: false, disabled: true });
        expect(validatedRow[8]).toEqual({ checked: false, disabled: true });
        expect(validatedRow[9]).toEqual({ checked: false, disabled: true });
        expect(validatedRow[10]).toEqual({ checked: false, disabled: true });
        expect(validatedRow[11]).toEqual({ checked: true, disabled: false });
      });
    });

    describe('Math FAD, FM, FMNG, M180_Y1, M180_Y2 (none)', () => {
      it('should properly disable checkboxes based on rules', () => {
        expect(validatedRow[12]).toEqual({ checked: true, disabled: false });
        expect(validatedRow[13]).toEqual({ checked: false, disabled: false });
        expect(validatedRow[14]).toEqual({ checked: true, disabled: false });
        expect(validatedRow[15]).toEqual({ checked: false, disabled: false });
        expect(validatedRow[16]).toEqual({ checked: true, disabled: false });
      });
    });

    describe('Read 180 NG Stage A, B, C (none for these 3)', () => {
      it('should not disable NG Stage A, B, C checkboxes', () => {
        expect(validatedRow[17]).toEqual({ checked: false, disabled: false });
        expect(validatedRow[18]).toEqual({ checked: false, disabled: false });
        expect(validatedRow[19]).toEqual({ checked: false, disabled: false });
      });

      it('should properly disable Read 180 u checkboxes based on rules', () => {});
    });

    describe('Read 180u: r180u_A, r180u_A_flex, r180u_B, r180u_B_flex, r180u_C, r180u_C_flex', () => {
      it('should not disable NG Stage A, B, C checkboxes', () => {
        expect(validatedRow[20]).toEqual({ checked: false, disabled: false });
        expect(validatedRow[21]).toEqual({ checked: false, disabled: false });
        expect(validatedRow[22]).toEqual({ checked: false, disabled: false });
        expect(validatedRow[23]).toEqual({ checked: false, disabled: false });
        expect(validatedRow[24]).toEqual({ checked: false, disabled: false });
        expect(validatedRow[25]).toEqual({ checked: false, disabled: false });
      });
    });
  });
});

describe('Toggle Item', () => {
  let mockTableData;

  beforeEach(() => {
    mockTableData = [
      [
        'header-row',
        { id: 'CDX_CI', label: 'CDX CI' },
        { id: 'CDX_CII', label: 'CDX CII' },
        { id: 'CDX_CIII', label: 'CDX CIII' },
      ],
      ['teacher-001', false, false, false],
    ];
  });

  describe('With Radio Button Strategy', () => {
    it('should toggle the first checkbox item', () => {
      const initializedData = Utils.init(mockTableData, getRules());
      const updatedData = Utils.toggle(initializedData, 1, 1);
      expect(updatedData[1]).toEqual([
        'teacher-001',
        { checked: true, disabled: false },
        { checked: false, disabled: true },
        { checked: false, disabled: true },
      ]);
    });

    it('should toggle the second checkbox item', () => {
      const initializedData = Utils.init(mockTableData, getRules());
      const updatedData = Utils.toggle(initializedData, 1, 2);
      expect(updatedData[1]).toEqual([
        'teacher-001',
        { checked: false, disabled: true },
        { checked: true, disabled: false },
        { checked: false, disabled: true },
      ]);
    });

    it('should toggle the third checkbox item', () => {
      const initializedData = Utils.init(mockTableData, getRules());
      const updatedData = Utils.toggle(initializedData, 1, 3);
      expect(updatedData[1]).toEqual([
        'teacher-001',
        { checked: false, disabled: true },
        { checked: false, disabled: true },
        { checked: true, disabled: false },
      ]);
    });

    describe('With Existing Item Checked', () => {
      it('should toggle the first checkbox item & uncheck the 3rd', () => {
        const initializedData = Utils.init(mockTableData, getRules());

        // Mutate data so third checkbox is checked
        initializedData[1][3] = { checked: true, disabled: false };

        const updatedData = Utils.toggle(initializedData, 1, 1);
        expect(updatedData[1]).toEqual([
          'teacher-001',
          { checked: true, disabled: false },
          { checked: false, disabled: true },
          { checked: false, disabled: true },
        ]);
      });

      it('should toggle the second checkbox item & uncheck the 3rd', () => {
        const initializedData = Utils.init(mockTableData, getRules());

        // Mutate data so third checkbox is checked
        initializedData[1][3] = { checked: true, disabled: false };

        const updatedData = Utils.toggle(initializedData, 1, 2);
        expect(updatedData[1]).toEqual([
          'teacher-001',
          { checked: false, disabled: true },
          { checked: true, disabled: false },
          { checked: false, disabled: true },
        ]);
      });

      it('should uncheck the 3rd item', () => {
        const initializedData = Utils.init(mockTableData, getRules());

        // Mutate data so third checkbox is checked
        initializedData[1][3] = { checked: true, disabled: false };

        const updatedData = Utils.toggle(initializedData, 1, 3);
        expect(updatedData[1]).toEqual([
          'teacher-001',
          { checked: false, disabled: false },
          { checked: false, disabled: false },
          { checked: false, disabled: false },
        ]);
      });
    });
  });
});

describe('Multiple Groups', () => {
  let mockTableData;

  beforeEach(() => {
    mockTableData = [
      [
        'header-row',
        { id: 'CDX_CI', label: 'CDX CI' },
        { id: 'CDX_CII', label: 'CDX CII' },
        { id: 'CDX_CIII', label: 'CDX CIII' },
        { id: 'E3D_A_1', label: 'E3D_A_1' },
        { id: 'E3D_B_1', label: 'E3D_B_1' },
        { id: 'E3D_C_1', label: 'E3D_C_1' },
      ],
      ['teacher-001', false, false, false, false, false, false],
    ];
  });

  describe('Effecting Other Groups', () => {
    it('with other group all unchecked', () => {
      const initializedData = Utils.init(mockTableData, getRules());
      const updatedData = Utils.toggle(initializedData, 1, 1);
      expect(updatedData[1]).toEqual([
        'teacher-001',
        // CDX
        { checked: true, disabled: false },
        { checked: false, disabled: true },
        { checked: false, disabled: true },

        // E3D
        { checked: false, disabled: false },
        { checked: false, disabled: false },
        { checked: false, disabled: false },
      ]);
    });

    it('with other group 1 item checked (first)', () => {
      const initializedData = Utils.init(mockTableData, getRules());

      // Mutate so 1st E3D item checked
      initializedData[1][4] = { checked: true, disabled: false };

      const updatedData = Utils.toggle(initializedData, 1, 1);
      expect(updatedData[1]).toEqual([
        'teacher-001',

        // CDX
        { checked: true, disabled: false },
        { checked: false, disabled: true },
        { checked: false, disabled: true },

        // E3D
        { checked: true, disabled: false },
        { checked: false, disabled: true },
        { checked: false, disabled: true },
      ]);
    });

    it('with other group 1 item checked (second)', () => {
      const initializedData = Utils.init(mockTableData, getRules());

      // Mutate so 1st E3D item checked
      initializedData[1][5] = { checked: true, disabled: false };

      const updatedData = Utils.toggle(initializedData, 1, 1);
      expect(updatedData[1]).toEqual([
        'teacher-001',

        // CDX
        { checked: true, disabled: false },
        { checked: false, disabled: true },
        { checked: false, disabled: true },

        // E3D
        { checked: false, disabled: true },
        { checked: true, disabled: false },
        { checked: false, disabled: true },
      ]);
    });

    it('with other group 1 item checked (third)', () => {
      const initializedData = Utils.init(mockTableData, getRules());

      // Mutate so 1st E3D item checked
      initializedData[1][6] = { checked: true, disabled: false };

      const updatedData = Utils.toggle(initializedData, 1, 1);
      expect(updatedData[1]).toEqual([
        'teacher-001',

        // CDX
        { checked: true, disabled: false },
        { checked: false, disabled: true },
        { checked: false, disabled: true },

        // E3D
        { checked: false, disabled: true },
        { checked: false, disabled: true },
        { checked: true, disabled: false },
      ]);
    });
  });
});

describe('Mixed Data', () => {
  let mockTableData;

  beforeEach(() => {
    mockTableData = [
      [
        'header-row',
        { id: 'CDX_CI', label: 'CDX CI' },
        { id: 'CDX_CII', label: 'CDX CII' },
        { id: 'CDX_CIII', label: 'CDX CIII' },
        { id: 'E3D_A_1', label: 'E3D_A_1' },
        { id: 'E3D_B_1', label: 'E3D_B_1' },
        { id: 'E3D_C_1', label: 'E3D_C_1' },
        { id: 'DTM2', label: 'DTM2' },
        { id: 'DTM_MODULE', label: 'DTM_MODULE' },
        { id: 'DTM_NOW', label: 'DTM_NOW' },
      ],
      ['teacher-001', false, false, false, false, false, false, false, false, false],
    ];
  });

  describe('Effecting Other Groups', () => {
    it('with other group all unchecked', () => {
      const initializedData = Utils.init(mockTableData, getRules());
      const updatedData = Utils.toggle(initializedData, 1, 1);
      expect(updatedData[1]).toEqual([
        'teacher-001',
        // CDX
        { checked: true, disabled: false },
        { checked: false, disabled: true },
        { checked: false, disabled: true },

        // E3D
        { checked: false, disabled: false },
        { checked: false, disabled: false },
        { checked: false, disabled: false },

        // DTM
        { checked: false, disabled: false },
        { checked: false, disabled: false },
        { checked: false, disabled: false },
      ]);
    });

    it('with other group all unchecked', () => {
      const initializedData = Utils.init(mockTableData, getRules());
      const updatedData = Utils.toggle(initializedData, 1, 4);
      expect(updatedData[1]).toEqual([
        'teacher-001',
        // CDX (radio)
        { checked: false, disabled: false },
        { checked: false, disabled: false },
        { checked: false, disabled: false },

        // E3D (radio)
        { checked: true, disabled: false },
        { checked: false, disabled: true },
        { checked: false, disabled: true },

        // DTM (none)
        { checked: false, disabled: false },
        { checked: false, disabled: false },
        { checked: false, disabled: false },
      ]);
    });

    it('with non-radio group selected - first', () => {
      const initializedData = Utils.init(mockTableData, getRules());
      const updatedData = Utils.toggle(initializedData, 1, 7);
      expect(updatedData[1]).toEqual([
        'teacher-001',
        // CDX (radio)
        { checked: false, disabled: false },
        { checked: false, disabled: false },
        { checked: false, disabled: false },

        // E3D (radio)
        { checked: false, disabled: false },
        { checked: false, disabled: false },
        { checked: false, disabled: false },

        // DTM (none)
        { checked: true, disabled: false },
        { checked: false, disabled: false },
        { checked: false, disabled: false },
      ]);
    });

    it('with non-radio group selected - second', () => {
      const initializedData = Utils.init(mockTableData, getRules());
      const updatedData = Utils.toggle(initializedData, 1, 8);
      expect(updatedData[1]).toEqual([
        'teacher-001',
        // CDX (radio)
        { checked: false, disabled: false },
        { checked: false, disabled: false },
        { checked: false, disabled: false },

        // E3D (radio)
        { checked: false, disabled: false },
        { checked: false, disabled: false },
        { checked: false, disabled: false },

        // DTM (none)
        { checked: false, disabled: false },
        { checked: true, disabled: false },
        { checked: false, disabled: false },
      ]);
    });

    it('with non-radio group selected - third', () => {
      const initializedData = Utils.init(mockTableData, getRules());
      const updatedData = Utils.toggle(initializedData, 1, 9);
      expect(updatedData[1]).toEqual([
        'teacher-001',
        // CDX (radio)
        { checked: false, disabled: false },
        { checked: false, disabled: false },
        { checked: false, disabled: false },

        // E3D (radio)
        { checked: false, disabled: false },
        { checked: false, disabled: false },
        { checked: false, disabled: false },

        // DTM (none)
        { checked: false, disabled: false },
        { checked: false, disabled: false },
        { checked: true, disabled: false },
      ]);
    });
  });
});

describe('Utils', () => {
  let mockTableData;

  beforeEach(() => {
    mockTableData = [
      [
        'header-row',
        { id: 'CDX_CI', label: 'CDX CI' },
        { id: 'CDX_CII', label: 'CDX CII' },
        { id: 'CDX_CIII', label: 'CDX CIII' },
      ],
      ['teacher-001', true, false, false],
      ['teacher-002', false, false, false],
      ['teacher-003', false, false, false],
    ];
  });

  it('should get items in a column', () => {
    const validatedData = Utils.validateAll(mockTableData, getRules());
    expect(Utils.getItemsInColumn(mockTableData, 0)).toEqual([
      'header-row',
      'teacher-001',
      'teacher-002',
      'teacher-003',
    ]);

    expect(Utils.getItemsInColumn(validatedData, 1)).toEqual([
      {
        id: 'CDX_CI',
        label: 'CDX CI',
        siblings: ['CDX_CII', 'CDX_CIII'],
        checked: false,
        totalDisabled: 0,
        totalChecked: 0,
        anyDisabled: false,
        allChecked: false,
        disabled: false,
      },
      { checked: true, disabled: false },
      { checked: false, disabled: false },
      { checked: false, disabled: false },
    ]);

    expect(Utils.getItemsInColumn(validatedData, 2)).toEqual([
      {
        id: 'CDX_CII',
        label: 'CDX CII',
        siblings: ['CDX_CI', 'CDX_CIII'],
        checked: false,
        totalDisabled: 0,
        totalChecked: 0,
        anyDisabled: true,
        allChecked: false,
        disabled: false,
      },
      { checked: false, disabled: true },
      { checked: false, disabled: false },
      { checked: false, disabled: false },
    ]);
  });

  it('should determine if any items are disabled - column 0', () => {
    const validatedData = Utils.validateAll(mockTableData, getRules());
    const itemsInColumn = Utils.getItemsInColumn(validatedData, 0);
    expect(Utils.isAnyDisabled(itemsInColumn)).toEqual(false);
  });

  it('should determine if any items are disabled - column 1', () => {
    const validatedData = Utils.validateAll(mockTableData, getRules());
    const itemsInColumn = Utils.getItemsInColumn(validatedData, 1);
    expect(Utils.isAnyDisabled(itemsInColumn)).toEqual(false);
  });

  it('should determine if any items are disabled - column 2', () => {
    const validatedData = Utils.validateAll(mockTableData, getRules());
    const itemsInColumn = Utils.getItemsInColumn(validatedData, 2);
    expect(Utils.isAnyDisabled(itemsInColumn)).toEqual(true);
  });
});

describe('Header Checkbox', () => {
  let mockTableData;

  beforeEach(() => {
    mockTableData = [
      [
        'header-row',
        { id: 'CDX_CI', label: 'CDX CI' },
        { id: 'CDX_CII', label: 'CDX CII' },
        { id: 'CDX_CIII', label: 'CDX CIII' },
      ],
      ['teacher-001', false, false, false],
      ['teacher-002', false, false, false],
      ['teacher-003', false, false, false],
    ];
  });

  it('should not be checked by default', () => {
    const validatedData = Utils.validateAll(mockTableData, getRules());
    const header = validatedData[0];
    expect(header[1].checked).toBe(false);
    expect(header[2].checked).toBe(false);
    expect(header[3].checked).toBe(false);
  });

  it('should not be checked by default even if all checked', () => {
    const validatedData = Utils.validateAll(mockTableData, getRules());
    validatedData[1][1].checked = true;
    validatedData[2][1].checked = true;
    validatedData[3][1].checked = true;
    const header = validatedData[0];
    expect(header[1].checked).toBe(false);
    expect(header[2].checked).toBe(false);
    expect(header[3].checked).toBe(false);
  });
});

describe('Header Checkbox with Disabled', () => {
  let mockTableData;

  beforeEach(() => {
    mockTableData = [
      [
        'header-row',
        { id: 'CDX_CI', label: 'CDX CI' },
        { id: 'CDX_CII', label: 'CDX CII' },
        { id: 'CDX_CIII', label: 'CDX CIII' },
      ],
      ['teacher-001', true, false, false],
      ['teacher-002', false, false, false],
      ['teacher-003', false, false, false],
    ];
  });

  it('should flag header items when column has disabled items', () => {
    const validatedData = Utils.validateAll(mockTableData, getRules());
    const header = validatedData[0];
    expect(header[1].allChecked).toBe(false);
    expect(header[1].anyDisabled).toBe(false);
    expect(header[2].allChecked).toBe(false);
    expect(header[2].anyDisabled).toBe(true);
    expect(header[3].allChecked).toBe(false);
    expect(header[3].anyDisabled).toBe(true);
  });
});

describe('Header Checkbox with All Checked', () => {
  let mockTableData;

  beforeEach(() => {
    mockTableData = [
      [
        'header-row',
        { id: 'CDX_CI', label: 'CDX CI' },
        { id: 'CDX_CII', label: 'CDX CII' },
        { id: 'CDX_CIII', label: 'CDX CIII' },
      ],
      ['teacher-001', true, false, false],
      ['teacher-002', true, false, false],
      ['teacher-003', true, false, false],
    ];
  });

  it('should flag header when all items in column checked', () => {
    const validatedData = Utils.validateAll(mockTableData, getRules());
    const header = validatedData[0];
    expect(header[1].allChecked).toBe(true);
    expect(header[1].anyDisabled).toBe(false);
    expect(header[2].allChecked).toBe(false);
    expect(header[2].anyDisabled).toBe(true);
    expect(header[3].allChecked).toBe(false);
    expect(header[3].anyDisabled).toBe(true);
  });
});

describe('Header Checkbox with All Checked and Validated', () => {
  let mockTableData;

  beforeEach(() => {
    mockTableData = [
      [
        'header-row',
        { id: 'CDX_CI', label: 'CDX CI' },
        { id: 'CDX_CII', label: 'CDX CII' },
        { id: 'CDX_CIII', label: 'CDX CIII' },
      ],
      ['teacher-001', false, false, false],
      ['teacher-002', false, false, false],
      ['teacher-003', false, false, false],
    ];
  });

  it('should check all checkboxes and have appropriate validation', () => {
    const validatedData = Utils.validateAll(mockTableData, getRules());
    const updatedData = Utils.toggleAll(validatedData, 1, true);
    const allCheckedColumn1Data = Utils.validateAll(updatedData, getRules());
    const headerRow = allCheckedColumn1Data[0];
    const row1 = allCheckedColumn1Data[1];
    const row2 = allCheckedColumn1Data[2];
    const row3 = allCheckedColumn1Data[3];
    expect(headerRow[1].allChecked).toBe(true);
    expect(headerRow[2].allChecked).toBe(false);
    expect(headerRow[3].allChecked).toBe(false);
    expect(row1[1].checked).toBe(true);
    expect(row2[1].checked).toBe(true);
    expect(row3[1].checked).toBe(true);
    expect(row1[2].checked).toBe(false);
    expect(row2[2].checked).toBe(false);
    expect(row3[2].checked).toBe(false);
    expect(row1[3].checked).toBe(false);
    expect(row2[3].checked).toBe(false);
    expect(row3[3].checked).toBe(false);
  });
});

describe('Header Checkbox with All Unchecked and Validated', () => {
  let mockTableData;

  beforeEach(() => {
    mockTableData = [
      [
        'header-row',
        { id: 'CDX_CI', label: 'CDX CI' },
        { id: 'CDX_CII', label: 'CDX CII' },
        { id: 'CDX_CIII', label: 'CDX CIII' },
      ],
      ['teacher-001', true, false, false],
      ['teacher-002', true, false, false],
      ['teacher-003', true, false, false],
    ];
  });

  it('should uncheck all checkboxes and have appropriate validation', () => {
    const validatedData = Utils.validateAll(mockTableData, getRules());
    const updatedData = Utils.toggleAll(validatedData, 1, false);
    const data = Utils.validateAll(updatedData, getRules());
    const headerRow = data[0];
    const row1 = data[1];
    const row2 = data[2];
    const row3 = data[3];
    expect(headerRow[1].allChecked).toBe(false);
    expect(headerRow[2].allChecked).toBe(false);
    expect(headerRow[3].allChecked).toBe(false);
    expect(row1[1].checked).toBe(false);
    expect(row2[1].checked).toBe(false);
    expect(row3[1].checked).toBe(false);
    expect(row1[2].checked).toBe(false);
    expect(row2[2].checked).toBe(false);
    expect(row3[2].checked).toBe(false);
    expect(row1[3].checked).toBe(false);
    expect(row2[3].checked).toBe(false);
    expect(row3[3].checked).toBe(false);
  });
});

describe('Header Checkbox with Invalid Data', () => {
  let mockTableData;

  beforeEach(() => {
    mockTableData = [
      [
        'header-row',
        { id: 'CDX_CI', label: 'CDX CI' },
        { id: 'CDX_CII', label: 'CDX CII' },
        { id: 'CDX_CIII', label: 'CDX CIII' },
      ],
      ['teacher-001', false, true, true],
      ['teacher-002', false, false, true],
      ['teacher-003', true, false, true],
    ];
  });

  it('should check all', () => {
    const validatedData = Utils.validateAll(mockTableData, getRules());
    const updatedData = Utils.toggleAll(validatedData, 1, true);
    const data = Utils.validateAll(updatedData, getRules());
    const headerRow = data[0];
    const row1 = data[1];
    const row2 = data[2];
    const row3 = data[3];
    expect(headerRow[1].allChecked).toBe(true);
    expect(headerRow[2].allChecked).toBe(false);
    expect(headerRow[3].allChecked).toBe(false);
    expect(row1[1].checked).toBe(true);
    expect(row2[1].checked).toBe(true);
    expect(row3[1].checked).toBe(true);
    expect(row1[2].checked).toBe(false);
    expect(row2[2].checked).toBe(false);
    expect(row3[2].checked).toBe(false);
    expect(row1[3].checked).toBe(false);
    expect(row2[3].checked).toBe(false);
    expect(row3[3].checked).toBe(false);
  });
});
