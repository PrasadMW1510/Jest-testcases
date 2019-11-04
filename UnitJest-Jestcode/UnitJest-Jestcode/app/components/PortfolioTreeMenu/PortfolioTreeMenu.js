/**
 *
 * PortfolioTreeMenu
 *
 */

import React from 'react';
import { Treebeard, decorators } from 'react-treebeard';
import PropTypes from 'prop-types';
import { sortData } from 'utils/utilities';
import {
  getNewThisWeek,
  getUnreadData,
  getInboxDataByCommunityId,
  getInboxDataByCommunityName,
} from 'containers/InboxContainer/common';
import TreebeardDecorator from './TreebeardDecorator';
import './PortfolioTreeMenu.scss';

class PortfolioTreeMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: 'Loading...',
      },
    };
    this.onToggle = this.onToggle.bind(this);
    this.setDecorator();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.schoolData && newProps.schoolData.length > 0) {
      newProps.schoolData.map(item => {
        const newitem = item;
        if (!Object.prototype.hasOwnProperty.call(item, 'children')) {
          return (newitem.children = []);
        }
        return item;
      });
      this.setState({ data: newProps.schoolData });
    } else if (newProps.classData) {
      this.setState({ data: newProps.classData });
    }
  }

  onToggle(node, toggled) {
    switch (node.type) {
      case 'ssUnread':
        this.getSsUnread(node.data, node.kind);
        break;
      case 'ssnewThisWeek':
        this.getSSnewThisWeek(node.data, node.kind);
        break;
      case 'teacher-inbox-sf':
        this.getTeacherData(node.data, node.kind, node.community_id, node.name);
        break;
      case 'PfAsignment':
        this.props.getClassAssignmentRequest(node.id, node.data, node.community_id); // id is class id
        break;
      case 'PfStudentGoal':
        this.props.getClassStudentGoalRequest(node.id); // id is class id
        break;
      default:
        switch (true) {
          case Object.prototype.hasOwnProperty.call(node, 'org_id') &&
            Object.prototype.hasOwnProperty.call(node, 'children') &&
            node.children.length === 0:
            this.props.getGradeDetailsRequest(node.org_id);
            break;
          case Object.prototype.hasOwnProperty.call(node, 'full_name') &&
            Object.prototype.hasOwnProperty.call(node, 'children') &&
            this.newFunction(node):
            this.props.getTeachersDetailsRequest(
              node.full_name,
              this.props.userType,
              this.props.makeSelectLoginUserOrg
            );
            break;
          case Object.prototype.hasOwnProperty.call(node, 'user_id') &&
            Object.prototype.hasOwnProperty.call(node, 'children') &&
            node.children.length === 0:
            this.props.getPortfolioClassDetailsRequest(
              node.user_id,
              this.props.userType,
              this.props.makeSelectLoginUserOrg
            );
            break;
          case Object.prototype.hasOwnProperty.call(node, 'class_id') &&
            node.page === 'student_work':
            this.props.getStudentsSubmissionMetadataSW(node.class_id);
            this.props.getStudentsSubmissionTreeList(
              node.class_id,
              this.props.userType,
              this.props.makeSelectLoginUserOrg
            );
            break;
          case Object.prototype.hasOwnProperty.call(node, 'student_id'):
            this.props.getStudentsSubmissionNodeList(node.student_id);
            break;
          default:
            break;
        }
    }
    const { cursor } = this.state;
    if (cursor) {
      cursor.active = false;
    }
    const newNode = node;
    newNode.active = true;
    if (node.children) {
      newNode.toggled = toggled;
    }
    this.setState({ cursor: node });
    this.forceUpdate();
  }

  getSsUnread = (nodeData, kind) => {
    const newGridData = getUnreadData(nodeData, kind);
    if (kind === 'ClassAssignment') {
      this.props.setInboxTreeDataWithTreeList(newGridData);
    } else {
      this.props.setInboxTreeData(newGridData);
    }
  };

  getSSnewThisWeek = (nodeData, kind) => {
    const newGridData = getNewThisWeek(nodeData, kind);
    if (kind === 'ClassAssignment') {
      this.props.setInboxTreeDataWithTreeList(newGridData);
    } else {
      this.props.setInboxTreeData(newGridData);
    }
  };
  getTeacherData = (nodeData, kind, communityId, name) => {
    if (kind === 'SoftwareSubmission') {
      const newGridDataSS = getInboxDataByCommunityId(nodeData, kind, communityId);
      this.props.setInboxTreeData(newGridDataSS);
    } else {
      const newGridData = getInboxDataByCommunityName(nodeData, kind, name);
      if (kind === 'ClassAssignment') {
        this.props.setInboxTreeDataWithTreeList(newGridData);
      } else {
        this.props.setInboxTreeData(newGridData);
      }
    }
  };
  setDecorator() {
    decorators.Header = TreebeardDecorator;
  }
  newFunction(node) {
    return node.children.length === 0;
  }
  render() {
    const data1 = this.state.data;
    if (
      data1.length > 0 &&
      data1[0].type &&
      (data1[0].type === 'PfStudentGoal' ||
        data1[0].type === 'PfAsignment' ||
        data1[0].type === 'student_work')
    ) {
      data1.sort((a, b) => sortData(a.name, b.name));
    }

    return (
      <div>
        <Treebeard data={data1} onToggle={this.onToggle} decorators={decorators} />
      </div>
    );
  }
}

PortfolioTreeMenu.propTypes = {
  getClassAssignmentRequest: PropTypes.func,
  getClassStudentGoalRequest: PropTypes.func,
  getGradeDetailsRequest: PropTypes.func,
  getTeachersDetailsRequest: PropTypes.func,
  getPortfolioClassDetailsRequest: PropTypes.func,
  getStudentsSubmissionMetadataSW: PropTypes.func,
  getStudentsSubmissionTreeList: PropTypes.func,
  getStudentsSubmissionNodeList: PropTypes.func,
  userType: PropTypes.string,
  makeSelectLoginUserOrg: PropTypes.string,
  setInboxTreeData: PropTypes.func,
  setInboxTreeDataWithTreeList: PropTypes.func,
};

export default PortfolioTreeMenu;
