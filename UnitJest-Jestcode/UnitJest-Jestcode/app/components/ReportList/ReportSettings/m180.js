const m180 = {
  m180_settings_main: {
    '': {
      dateRanges: [],
      option_name: null,
      option_labels: null,
      option_values: null,
      option_default: null,
      option_property: null,
      connect_url:
        'm180/M180ProductControls?command=getSettings&cohort_type=student&cohort_id=$COHORT_ID$&sid=$SESSION_ID$',
      pdf_qs: null,
      pdf_o_qs: null,
    },
  },
  m180_01: {
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
};
export default m180;
