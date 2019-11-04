export function transformSchoolDays(schoolDaysChecked) {
  const defaultDays = ['2', '3', '4', '5', '6']; // Monday - Friday
  const daysChecked = schoolDaysChecked.length > 0 ? schoolDaysChecked : defaultDays;
  const schoolDays = [];

  daysChecked.forEach(schoolDay => schoolDays.push(schoolDay));

  return { school_day: schoolDays };
}

export function transformApps(appsCheckedValues) {
  const appsChecked = [];
  appsCheckedValues.forEach(restrictedApp => {
    if (restrictedApp[1]) {
      appsChecked.push(restrictedApp[0]);
    }
  });

  return { app: appsChecked };
}

export function transformGroups(demographics) {
  return { group: demographics };
}

export function transformDataForDistrictUpdate(profileData, userOrgId, demographics) {
  const schoolDaysChecked = Object.keys(profileData.get('school_days').toJS());
  const appCheckedValues = Object.entries(profileData.get('restricted_apps').toJS());
  const schoolDays = transformSchoolDays(schoolDaysChecked);
  const restrictedApps = transformApps(appCheckedValues);
  const groups = demographics.length ? transformGroups(demographics) : '';
  const dataObj = {
    organizations: {
      org_id: userOrgId,
      type: profileData.get('type'),
      name: profileData.get('name'),
      description: profileData.get('description'),
      aa_server_address: '',
      district_info: {
        location: profileData.get('location'),
        start_of_day: profileData.get('start_of_day'),
        end_of_day: profileData.get('end_of_day'),
        time_zone: profileData.get('time_zone'),
        school_days: schoolDays,
        restricted_apps: restrictedApps,
      },
      contact_info: {
        address1: profileData.get('address1'),
        address2: profileData.get('address2'),
        address3: profileData.get('address3'),
        city: profileData.get('city'),
        state: profileData.get('state'),
        postal_code: profileData.get('postal_code'),
        phone_number1: profileData.get('phone_number1'),
        email_address1: profileData.get('email_address1'),
      },
      contact_person: {
        last_name: profileData.get('last_name'),
        first_name: profileData.get('first_name'),
        middle_name: profileData.get('middle_name'),
        title: profileData.get('title'),
      },
      groups,
    },
  };

  return dataObj;
}
