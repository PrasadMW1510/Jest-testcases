const dtm = {
  dtm_settings_main: {
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
  dtm_settings_test_assignment: {
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
  dtm_grading_tools_main: {
    '': {
      dateRanges: [],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/dtm/DTMProductControls?sid=$SESSION_ID$&command=get_dtm_completed_tests&student_id=$COHORT_ID$',
      pdf_qs: null,
      pdf_o_qs: null,
    },
  },
  dtm_04: {
    district: {
      dateRanges: ['CurrSchoolYear', 'Custom'],
      option_name: 'Program',
      option_labels: ['All Available Tests', 'Do The Math Modules', 'Do the Math Now!'],
      option_values: ['all', 'DTM_Module', 'DTM_Now'],
      option_default: 'all',
      option_property: 'program',
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&program=$PROGRAM$',
      pdf_qs: null,
      pdf_o_qs: null,
    },
    school: {
      dateRanges: ['CurrSchoolYear', 'Custom'],
      option_name: 'Program',
      option_labels: ['All Available Tests', 'Do The Math Modules', 'Do the Math Now!'],
      option_values: ['all', 'DTM_Module', 'DTM_Now'],
      option_default: 'all',
      option_property: 'program',
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&program=$PROGRAM$',
      pdf_qs: null,
      pdf_o_qs: null,
    },
  },
  dtm_02: {
    grade: {
      dateRanges: [
        'CurrGradingPeriod',
        'GradingPeriod1',
        'GradingPeriod2',
        'GradingPeriod3',
        'GradingPeriod4',
        'GradingPeriod5',
        'GradingPeriod6',
        'ThisWeek',
        'LastWeek',
        'Last10Days',
        'Last15Days',
        'Today',
        'Custom',
      ],
      option_name: 'Program',
      option_labels: ['All Available Tests', 'Do The Math Modules', 'Do the Math Now!'],
      option_values: ['all', 'DTM_Module', 'DTM_Now'],
      option_default: 'all',
      option_property: 'program',
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$&program=$PROGRAM$',
      pdf_qs: '?sortOnElement=$SORT_ON$&sortByElement=$SORT_BY$&sortOrder=$SORT_ORDER$',
      pdf_o_qs: null,
    },
    teacher: {
      dateRanges: [
        'CurrGradingPeriod',
        'GradingPeriod1',
        'GradingPeriod2',
        'GradingPeriod3',
        'GradingPeriod4',
        'GradingPeriod5',
        'GradingPeriod6',
        'ThisWeek',
        'LastWeek',
        'Last10Days',
        'Last15Days',
        'Today',
        'Custom',
      ],
      option_name: 'Program',
      option_labels: ['All Available Tests', 'Do The Math Modules', 'Do the Math Now!'],
      option_values: ['all', 'DTM_Module', 'DTM_Now'],
      option_default: 'all',
      option_property: 'program',
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$&program=$PROGRAM$',
      pdf_qs: '?sortOnElement=$SORT_ON$&sortByElement=$SORT_BY$&sortOrder=$SORT_ORDER$',
      pdf_o_qs: null,
    },
    class: {
      dateRanges: [
        'CurrGradingPeriod',
        'GradingPeriod1',
        'GradingPeriod2',
        'GradingPeriod3',
        'GradingPeriod4',
        'GradingPeriod5',
        'GradingPeriod6',
        'ThisWeek',
        'LastWeek',
        'Last10Days',
        'Last15Days',
        'Today',
        'Custom',
      ],
      option_name: 'Program',
      option_labels: ['All Available Tests', 'Do The Math Modules', 'Do the Math Now!'],
      option_values: ['all', 'DTM_Module', 'DTM_Now'],
      option_default: 'all',
      option_property: 'program',
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$&program=$PROGRAM$',
      pdf_qs: '?sortOnElement=$SORT_ON$&sortByElement=$SORT_BY$&sortOrder=$SORT_ORDER$',
      pdf_o_qs: null,
    },
    group: {
      dateRanges: [
        'CurrGradingPeriod',
        'GradingPeriod1',
        'GradingPeriod2',
        'GradingPeriod3',
        'GradingPeriod4',
        'GradingPeriod5',
        'GradingPeriod6',
        'ThisWeek',
        'LastWeek',
        'Last10Days',
        'Last15Days',
        'Today',
        'Custom',
      ],
      option_name: 'Program',
      option_labels: ['All Available Tests', 'Do The Math Modules', 'Do the Math Now!'],
      option_values: ['all', 'DTM_Module', 'DTM_Now'],
      option_default: 'all',
      option_property: 'program',
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$&program=$PROGRAM$',
      pdf_qs: '?sortOnElement=$SORT_ON$&sortByElement=$SORT_BY$&sortOrder=$SORT_ORDER$',
      pdf_o_qs: null,
    },
  },
  dtm_01: {
    student: {
      dateRanges: [
        'CurrGradingPeriod',
        'GradingPeriod1',
        'GradingPeriod2',
        'GradingPeriod3',
        'GradingPeriod4',
        'GradingPeriod5',
        'GradingPeriod6',
        'ThisWeek',
        'LastWeek',
        'Last10Days',
        'Last15Days',
        'Today',
        'Custom',
      ],
      option_name: 'Program',
      option_labels: ['Do The Math Modules', 'Do the Math Now!'],
      option_values: ['DTM_Module', 'DTM_Now'],
      option_default: 'DTM_Module',
      option_property: 'program',
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$&program=$PROGRAM$',
      pdf_qs: null,
      pdf_o_qs: null,
    },
  },
  dtm_03: {
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
      option_name: 'Program',
      option_labels: ['Do The Math Modules', 'Do the Math Now!', 'All Programs'],
      option_values: ['DTM_Module', 'DTM_Now', 'all'],
      option_default: 'all',
      option_property: 'program',
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$&program=$PROGRAM$',
      pdf_qs: null,
      pdf_o_qs: null,
    },
  },
};
export default dtm;
