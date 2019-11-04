import { sortData } from 'utils/utilities';

export const getTeacherName = item => `${item.name[0].last_name[0]}, ${item.name[0].first_name[0]}`;

export const getTeacherIDs = item => item.name[0].user_id[0];

export const getApplicationData = (item, apps) => {
  const items =
    item &&
    item['applications-licensed'] &&
    item['applications-licensed'][0]['application-licensed'];
  const ids = (items && items.map(prodItem => prodItem.subproduct_id[0])) || [];
  const checks = apps.map(app => !!ids.includes(app.application_id[0]));
  return checks;
};

export const sortApplicationData = (a, b) => {
  const current = a.name[0];
  const next = b.name[0];
  return sortData(current, next);
};

const tag = (name, closing) => `<${closing ? '/' : ''}${name}>`;

export const jsonToXML = (obj, rootname) => {
  let xml = '';
  const keys = Object.keys(obj);
  for (let index = 0; index < keys.length; index += 1) {
    const value = obj[keys[index]];
    const type = typeof value;
    if (value instanceof Array && type === 'object') {
      for (let arrayIndex = 0; arrayIndex < value.length; arrayIndex += 1) {
        xml += jsonToXML(value[arrayIndex]);
      }
    } else if (value instanceof Object && type === 'object') {
      xml += tag(keys[index]) + jsonToXML(value) + tag(keys[index], 1);
    } else {
      xml +=
        tag(keys[index]) +
        value +
        tag(keys[index], {
          closing: 1,
        });
    }
  }

  return rootname ? tag(rootname) + xml + tag(rootname, 1) : xml;
};
