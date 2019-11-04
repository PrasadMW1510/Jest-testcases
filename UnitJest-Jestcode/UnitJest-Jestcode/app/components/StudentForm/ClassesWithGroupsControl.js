import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { Field } from 'redux-form/immutable';
import FormControl from 'components/forms/FormControl';
import FormGroup from 'components/forms/FormGroup';
import { extractValue } from 'utils/transformData';
import { FIELD_CLASSES, FIELD_GROUPS } from './constants';

class ClassesWithGroupsControl extends Component {
  handleClassToggle = ev => {
    const id = ev.currentTarget.id;
    const { groupsAll, groups } = this.props;
    const map = this.props.classes;
    const checkedClasses = !map.get(id) ? map.set(id, true) : map.delete(id);
    this.props.change(FIELD_CLASSES, checkedClasses);

    // If the class is unchecked, uncheck associated groups too
    if (!checkedClasses.get(id)) {
      let immGroups = groups;
      groupsAll.filter(gr => gr.owner_id[0] === id).forEach(gr => {
        const groupId = gr.group_id && gr.group_id[0];
        immGroups = immGroups.delete(groupId);
      });
      // Update the store
      this.props.change(FIELD_GROUPS, immGroups);
    }
  };

  handleGroupToggle = ev => {
    const { id, dataset } = ev.currentTarget;
    const classId = dataset && dataset.classid;
    const map = this.props.groups;
    const checkedGroups = !map.get(id) ? map.set(id, true) : map.delete(id);
    this.props.change(FIELD_GROUPS, checkedGroups);

    // Auto-select the class if unchecked when child group is checked.
    const mapClasses = this.props.classes;
    if (classId && checkedGroups.get(id) && !mapClasses.get(classId)) {
      this.props.change(FIELD_CLASSES, mapClasses.set(classId, true));
    }
  };

  render = () => {
    const { className, classes, groups, classesAll, groupsAll } = this.props;
    const classItems = classesAll.map(cl => (
      <Fragment key={cl.class_id}>
        <div className="student-form__input-class">
          <input
            className="student-form__input"
            type="checkbox"
            checked={!!classes.get(extractValue(cl.class_id))}
            onChange={this.handleClassToggle}
            key={extractValue(cl.class_id)}
            id={extractValue(cl.class_id)}
          />
          {extractValue(cl.display_name)}
        </div>
        <div className="student-form__input-group">
          {groupsAll.map(gr => (
            <div key={gr.group_id}>
              {extractValue(gr.group_id) &&
                extractValue(gr.owner_id) === extractValue(cl.class_id) && (
                  <div>
                    <input
                      type="checkbox"
                      className="student-form__input"
                      checked={!!groups.get(extractValue(gr.group_id))}
                      onChange={this.handleGroupToggle}
                      id={extractValue(gr.group_id)}
                      data-classid={gr.owner_id}
                    />
                    {extractValue(gr.display_name)}
                  </div>
                )}
            </div>
          ))}
        </div>
      </Fragment>
    ));
    return (
      <FormControl className={className}>
        <FormGroup>{classItems}</FormGroup>
        <Field name="classes" type="hidden" component="input" />
        <Field name="groups" type="hidden" component="input" />
      </FormControl>
    );
  };
}

ClassesWithGroupsControl.defaultProps = {
  classes: fromJS({}),
  className: '',
  classesAll: [],
  groupsAll: [],
  groups: fromJS({}),
};

ClassesWithGroupsControl.propTypes = {
  change: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  classesAll: PropTypes.array.isRequired,
  className: PropTypes.string.isRequired,
  groups: PropTypes.object.isRequired,
  groupsAll: PropTypes.array.isRequired,
};

export default ClassesWithGroupsControl;
