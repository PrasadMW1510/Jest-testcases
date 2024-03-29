const smi = {
  smi_settings_main: {
    '': {
      dateRanges: [],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url: null,
      pdf_qs: null,
      pdf_o_qs: null,
    },
  },
  smi_settings_advanced: {
    '': {
      dateRanges: [],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url: null,
      pdf_qs: null,
      pdf_o_qs: null,
    },
  },
  smi_grading_tools_main: {
    '': {
      dateRanges: [],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/smi/SMIProductControls?sid=$SESSION_ID$&command=getCompletedTestsInfo&cohort_type=student&cohort_id=$ITEM_ID$',
      pdf_qs: null,
      pdf_o_qs: null,
    },
  },
  math_inventory_01: {
    district: {
      dateRanges: ['CurrSchoolYear', 'Custom'],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student',
      pdf_qs: null,
      pdf_o_qs: null,
    },
    school: {
      dateRanges: ['CurrSchoolYear', 'Custom'],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student',
      pdf_qs: null,
      pdf_o_qs: null,
    },
    grade: {
      dateRanges: ['CurrSchoolYear', 'Custom'],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student',
      pdf_qs: null,
      pdf_o_qs: null,
    },
    teacher: {
      dateRanges: ['CurrSchoolYear', 'Custom'],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student',
      pdf_qs: null,
      pdf_o_qs: null,
    },
  },
  math_inventory_02: {
    district: {
      dateRanges: ['CurrSchoolYear'],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student',
      pdf_qs: '?sortOnElement=$SORT_ON$&sortByElement=$SORT_BY$&sortOrder=$SORT_ORDER$',
      pdf_o_qs: null,
    },
    school: {
      dateRanges: ['CurrSchoolYear'],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student',
      pdf_qs: '?sortOnElement=$SORT_ON$&sortByElement=$SORT_BY$&sortOrder=$SORT_ORDER$',
      pdf_o_qs: null,
    },
    grade: {
      dateRanges: ['CurrSchoolYear'],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs: '?sortOnElement=$SORT_ON$&sortByElement=$SORT_BY$&sortOrder=$SORT_ORDER$',
      pdf_o_qs: null,
    },
    teacher: {
      dateRanges: ['CurrSchoolYear'],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs: '?sortOnElement=$SORT_ON$&sortByElement=$SORT_BY$&sortOrder=$SORT_ORDER$',
      pdf_o_qs: null,
    },
  },
  math_inventory_12: {
    district: {
      dateRanges: ['CurrSchoolYear', 'Custom'],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student',
      pdf_qs: '?sortOnElement=$SORT_ON$&sortByElement=$SORT_BY$&sortOrder=$SORT_ORDER$',
      pdf_o_qs: null,
    },
    school: {
      dateRanges: ['CurrSchoolYear', 'Custom'],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student',
      pdf_qs: '?sortOnElement=$SORT_ON$&sortByElement=$SORT_BY$&sortOrder=$SORT_ORDER$',
      pdf_o_qs: null,
    },
  },
  math_inventory_13: {
    district: {
      dateRanges: ['CurrSchoolYear', 'Custom'],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url: null,
      pdf_qs: '?sortOnElement=$SORT_ON$&sortByElement=$SORT_BY$&sortOrder=$SORT_ORDER$',
      pdf_o_qs: null,
    },
    school: {
      dateRanges: [
        'CurrSchoolYear',
        'CurrGradingPeriod',
        'GradingPeriod1',
        'GradingPeriod2',
        'GradingPeriod3',
        'GradingPeriod4',
        'GradingPeriod5',
        'GradingPeriod6',
        'Custom',
      ],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url: null,
      pdf_qs: null,
      pdf_o_qs: null,
    },
    grade: {
      dateRanges: [
        'CurrSchoolYear',
        'CurrGradingPeriod',
        'GradingPeriod1',
        'GradingPeriod2',
        'GradingPeriod3',
        'GradingPeriod4',
        'GradingPeriod5',
        'GradingPeriod6',
        'Custom',
      ],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url: null,
      pdf_qs: null,
      pdf_o_qs: null,
    },
    teacher: {
      dateRanges: [
        'CurrSchoolYear',
        'CurrGradingPeriod',
        'GradingPeriod1',
        'GradingPeriod2',
        'GradingPeriod3',
        'GradingPeriod4',
        'GradingPeriod5',
        'GradingPeriod6',
        'Custom',
      ],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url: null,
      pdf_qs: null,
      pdf_o_qs: null,
    },
    class: {
      dateRanges: [
        'CurrSchoolYear',
        'CurrGradingPeriod',
        'GradingPeriod1',
        'GradingPeriod2',
        'GradingPeriod3',
        'GradingPeriod4',
        'GradingPeriod5',
        'GradingPeriod6',
        'Custom',
      ],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url: null,
      pdf_qs: null,
      pdf_o_qs: null,
    },
    group: {
      dateRanges: [
        'CurrSchoolYear',
        'CurrGradingPeriod',
        'GradingPeriod1',
        'GradingPeriod2',
        'GradingPeriod3',
        'GradingPeriod4',
        'GradingPeriod5',
        'GradingPeriod6',
        'Custom',
      ],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url: null,
      pdf_qs: null,
      pdf_o_qs: null,
    },
  },
  math_inventory_03: {
    grade: {
      dateRanges: [
        'CurrSchoolYear',
        'CurrGradingPeriod',
        'GradingPeriod1',
        'GradingPeriod2',
        'GradingPeriod3',
        'GradingPeriod4',
        'GradingPeriod5',
        'GradingPeriod6',
        'Custom',
      ],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs:
        '?sortOnElement=$SORT_ON$&sortByElement=$SORT_BY$&sortOrder=$SORT_ORDER$&cohort=$FAMILY$',
      pdf_o_qs: null,
    },
    class: {
      dateRanges: [
        'CurrSchoolYear',
        'CurrGradingPeriod',
        'GradingPeriod1',
        'GradingPeriod2',
        'GradingPeriod3',
        'GradingPeriod4',
        'GradingPeriod5',
        'GradingPeriod6',
        'Custom',
      ],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs:
        '?sortOnElement=$SORT_ON$&sortByElement=$SORT_BY$&sortOrder=$SORT_ORDER$&cohort=$FAMILY$',
      pdf_o_qs: null,
    },
    group: {
      dateRanges: [
        'CurrSchoolYear',
        'CurrGradingPeriod',
        'GradingPeriod1',
        'GradingPeriod2',
        'GradingPeriod3',
        'GradingPeriod4',
        'GradingPeriod5',
        'GradingPeriod6',
        'Custom',
      ],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs:
        '?sortOnElement=$SORT_ON$&sortByElement=$SORT_BY$&sortOrder=$SORT_ORDER$&cohort=$FAMILY$',
      pdf_o_qs: null,
    },
  },
  math_inventory_04: {
    grade: {
      dateRanges: [
        'CurrSchoolYear',
        'CurrGradingPeriod',
        'GradingPeriod1',
        'GradingPeriod2',
        'GradingPeriod3',
        'GradingPeriod4',
        'GradingPeriod5',
        'GradingPeriod6',
        'Custom',
      ],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs: '?sortOnElement=$SORT_ON$&sortByElement=$SORT_BY$&sortOrder=$SORT_ORDER$',
      pdf_o_qs: null,
    },
    teacher: {
      dateRanges: [
        'CurrSchoolYear',
        'CurrGradingPeriod',
        'GradingPeriod1',
        'GradingPeriod2',
        'GradingPeriod3',
        'GradingPeriod4',
        'GradingPeriod5',
        'GradingPeriod6',
        'Custom',
      ],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs: '?sortOnElement=$SORT_ON$&sortByElement=$SORT_BY$&sortOrder=$SORT_ORDER$',
      pdf_o_qs: null,
    },
    class: {
      dateRanges: [
        'CurrSchoolYear',
        'CurrGradingPeriod',
        'GradingPeriod1',
        'GradingPeriod2',
        'GradingPeriod3',
        'GradingPeriod4',
        'GradingPeriod5',
        'GradingPeriod6',
        'Custom',
      ],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs: '?sortOnElement=$SORT_ON$&sortByElement=$SORT_BY$&sortOrder=$SORT_ORDER$',
      pdf_o_qs: null,
    },
    group: {
      dateRanges: [
        'CurrSchoolYear',
        'CurrGradingPeriod',
        'GradingPeriod1',
        'GradingPeriod2',
        'GradingPeriod3',
        'GradingPeriod4',
        'GradingPeriod5',
        'GradingPeriod6',
        'Custom',
      ],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs: '?sortOnElement=$SORT_ON$&sortByElement=$SORT_BY$&sortOrder=$SORT_ORDER$',
      pdf_o_qs: null,
    },
  },
  math_inventory_08: {
    grade: {
      dateRanges: [],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs: '?sortOnElement=$SORT_ON$&sortByElement=$SORT_BY$&sortOrder=$SORT_ORDER$',
      pdf_o_qs: null,
    },
    teacher: {
      dateRanges: [],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs: '?sortOnElement=$SORT_ON$&sortByElement=$SORT_BY$&sortOrder=$SORT_ORDER$',
      pdf_o_qs: null,
    },
    class: {
      dateRanges: [],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs: null,
      pdf_o_qs: null,
    },
    group: {
      dateRanges: [],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs: null,
      pdf_o_qs: null,
    },
    student: {
      dateRanges: [],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs: '?sortOnElement=$SORT_ON$&sortByElement=$SORT_BY$&sortOrder=$SORT_ORDER$',
      pdf_o_qs: null,
    },
  },
  math_inventory_07: {
    teacher: {
      dateRanges: [
        'CurrSchoolYear',
        'CurrGradingPeriod',
        'GradingPeriod1',
        'GradingPeriod2',
        'GradingPeriod3',
        'GradingPeriod4',
        'GradingPeriod5',
        'GradingPeriod6',
        'Custom',
      ],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs: null,
      pdf_o_qs: null,
    },
    class: {
      dateRanges: [
        'CurrSchoolYear',
        'CurrGradingPeriod',
        'GradingPeriod1',
        'GradingPeriod2',
        'GradingPeriod3',
        'GradingPeriod4',
        'GradingPeriod5',
        'GradingPeriod6',
        'Custom',
      ],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs: null,
      pdf_o_qs: null,
    },
    group: {
      dateRanges: [
        'CurrSchoolYear',
        'CurrGradingPeriod',
        'GradingPeriod1',
        'GradingPeriod2',
        'GradingPeriod3',
        'GradingPeriod4',
        'GradingPeriod5',
        'GradingPeriod6',
        'Custom',
      ],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs: null,
      pdf_o_qs: null,
    },
    student: {
      dateRanges: [
        'CurrSchoolYear',
        'CurrGradingPeriod',
        'GradingPeriod1',
        'GradingPeriod2',
        'GradingPeriod3',
        'GradingPeriod4',
        'GradingPeriod5',
        'GradingPeriod6',
        'Custom',
      ],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs: null,
      pdf_o_qs: null,
    },
  },
  math_inventory_09eng: {
    teacher: {
      dateRanges: ['CurrSchoolYear', 'ThisWeek', 'LastWeek', 'Custom'],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs: null,
      pdf_o_qs: null,
    },
    class: {
      dateRanges: ['CurrSchoolYear', 'ThisWeek', 'LastWeek', 'Custom'],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs: null,
      pdf_o_qs: null,
    },
    student: {
      dateRanges: ['CurrSchoolYear', 'ThisWeek', 'LastWeek', 'Custom'],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs: null,
      pdf_o_qs: null,
    },
  },
  math_inventory_09spa: {
    teacher: {
      dateRanges: ['CurrSchoolYear', 'ThisWeek', 'LastWeek', 'Custom'],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs: null,
      pdf_o_qs: null,
    },
    class: {
      dateRanges: ['CurrSchoolYear', 'ThisWeek', 'LastWeek', 'Custom'],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs: null,
      pdf_o_qs: null,
    },
    student: {
      dateRanges: ['CurrSchoolYear', 'ThisWeek', 'LastWeek', 'Custom'],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs: null,
      pdf_o_qs: null,
    },
  },
  math_inventory_10: {
    teacher: {
      dateRanges: ['CurrSchoolYear', 'Custom'],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs: '?sortOnElement=$SORT_ON$&sortByElement=$SORT_BY$&sortOrder=$SORT_ORDER$',
      pdf_o_qs: null,
    },
    class: {
      dateRanges: ['CurrSchoolYear', 'Custom'],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs: '?sortOnElement=$SORT_ON$&sortByElement=$SORT_BY$&sortOrder=$SORT_ORDER$',
      pdf_o_qs: null,
    },
    group: {
      dateRanges: ['CurrSchoolYear', 'Custom'],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs: '?sortOnElement=$SORT_ON$&sortByElement=$SORT_BY$&sortOrder=$SORT_ORDER$',
      pdf_o_qs: null,
    },
  },
};
export default smi;
