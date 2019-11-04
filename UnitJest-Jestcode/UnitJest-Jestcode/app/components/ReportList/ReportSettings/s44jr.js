const s44jr = {
  s44jr_grading_tools_main: {
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
  s44jr_02: {
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
  },
  s44jr_01: {
    school: {
      dateRanges: ['CurrSchoolYear'],
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
  },
  s44jr_settings_main: {
    '': {
      dateRanges: [],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        '/iRead/s44jrProductCtrls?command=GetStudentSettings&user_id=$COHORT_ID$&sid=$SESSION_ID$',
      pdf_qs: null,
      pdf_o_qs: null,
    },
  },
};
export default s44jr;
