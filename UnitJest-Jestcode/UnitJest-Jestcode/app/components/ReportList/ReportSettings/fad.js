const fad = {
  fad_05: {
    district: {
      dateRanges: ['CurrSchoolYear'],
      option_name: 'Additional Settings',
      option_labels: ['Placement Only', 'Placement and Final'],
      option_values: ['false', 'true'],
      option_default: 'true',
      option_property: 'incl_final_data',
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$&incl_final_data=$INCL_FINAL_DATA$',
      pdf_qs: null,
      pdf_o_qs: null,
    },
    school: {
      dateRanges: ['CurrSchoolYear'],
      option_name: 'Additional Settings',
      option_labels: ['Placement Only', 'Placement and Final'],
      option_values: ['false', 'true'],
      option_default: 'true',
      option_property: 'incl_final_data',
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$&incl_final_data=$INCL_FINAL_DATA$',
      pdf_qs: null,
      pdf_o_qs: null,
    },
    grade: {
      dateRanges: ['CurrSchoolYear'],
      option_name: 'Additional Settings',
      option_labels: ['Placement Only', 'Placement and Final'],
      option_values: ['false', 'true'],
      option_default: 'true',
      option_property: 'incl_final_data',
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$&incl_final_data=$INCL_FINAL_DATA$',
      pdf_qs: null,
      pdf_o_qs: null,
    },
  },
  fad_09: {
    district: {
      dateRanges: ['CurrSchoolYear'],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs:
        '?sortOnElement=$SORT_ON$&sortByElement=$SORT_BY$&sortOrder=$SORT_ORDER$&usageType=$USAGE_TYPE$',
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
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs:
        '?sortOnElement=$SORT_ON$&sortByElement=$SORT_BY$&sortOrder=$SORT_ORDER$&usageType=$USAGE_TYPE$',
      pdf_o_qs: null,
    },
  },
  fad_08: {
    grade: {
      dateRanges: ['SinceStartDate'],
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
      dateRanges: ['SinceStartDate'],
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
      dateRanges: ['SinceStartDate'],
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
      dateRanges: ['SinceStartDate'],
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
  fad_settings_main: {
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
  fad_01: {
    teacher: {
      dateRanges: ['SinceStartDate'],
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
      dateRanges: ['SinceStartDate'],
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
      dateRanges: ['SinceStartDate'],
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
  fad_03: {
    teacher: {
      dateRanges: ['SinceStartDate'],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs: '?sortOnElement=$SORT_ON$&sortByElement=$SORT_BY$&sortOrder=$SORT_ORDER$&type=$TYPE$',
      pdf_o_qs: null,
    },
    class: {
      dateRanges: ['SinceStartDate'],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs: '?sortOnElement=$SORT_ON$&sortByElement=$SORT_BY$&sortOrder=$SORT_ORDER$&type=$TYPE$',
      pdf_o_qs: null,
    },
    group: {
      dateRanges: ['SinceStartDate'],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&school_id=$SCHOOL_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs: '?sortOnElement=$SORT_ON$&sortByElement=$SORT_BY$&sortOrder=$SORT_ORDER$&type=$TYPE$',
      pdf_o_qs: null,
    },
  },
  fad_07: {
    class: {
      dateRanges: ['SinceStartDate', 'CurrGradingPeriod'],
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
      dateRanges: ['SinceStartDate', 'CurrGradingPeriod'],
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
    student: {
      dateRanges: ['SinceStartDate', 'CurrGradingPeriod'],
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
  fad_12: {
    class: {
      dateRanges: ['SinceStartDate'],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs: null,
      pdf_o_qs: null,
    },
    group: {
      dateRanges: ['SinceStartDate'],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs: null,
      pdf_o_qs: null,
    },
    student: {
      dateRanges: ['SinceStartDate'],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/slms/SlmsReport?sid=$SESSION_ID$&command=generate_report&report_type_id=$REPORT_TYPE_ID$&user_id=$USER_ID$&cohort_type=$FAMILY$&cohort_id=$COHORT_ID$&date_range=$DATE_RANGE$&attribute_filters=$ATTRIBUTE_FILTERS$&group_filters=$GROUP_FILTERS$&grade_filters=$GRADE_FILTERS$&app_filters=$APP_FILTERS$&item_type=student&school_id=$SCHOOL_ID$',
      pdf_qs: '?sortOnElement=$SORT_ON$&sortByElement=$SORT_BY$&sortOrder=$SORT_ORDER$',
      pdf_o_qs: null,
    },
  },
  fad_04: {
    student: {
      dateRanges: ['Last30Days', 'CurrSchoolYear', 'Custom'],
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
};
export default fad;
