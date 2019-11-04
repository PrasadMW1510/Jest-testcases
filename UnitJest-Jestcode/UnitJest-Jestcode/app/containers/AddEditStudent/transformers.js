export function transformStudentMapForPost(studentMap, studentId) {
  const studentObj = studentMap.toJS();
  return {
    user: {
      ...(studentId && { user_id: studentId }),
      first_name: studentObj.first_name,
      last_name: studentObj.last_name,
      middle_name: studentObj.middle_name,
      user_name: studentObj.user_name,
      password: studentObj.password,
      birth_date: studentObj.birth_date,
      user_type: studentObj.user_type,
      suffix: studentObj.suffix,
      extended_user_data: {
        sis_id: studentObj.sis_id,
        preferred_name: studentObj.preferred_name,
        grade: studentObj.grade,
        guardian: [{ guardian_id: 1 }, { guardian_id: 2 }],
      },
      classes: {
        class_id: Object.keys(studentObj.classes || {}),
      },
      groups: {
        group_id: Object.keys(studentObj.groups || {}),
      },
    },
  };
}
