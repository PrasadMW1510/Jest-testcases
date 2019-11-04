import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import { USER_ORG, USER_TYPE } from 'containers/App/constants';
import PermissionsGrantedTable from 'components/PermissionsGrantedTable';

describe('Permissions Granted Table Component', () => {
  let wrapper;
  const permissions = [
    { id: ['100'], name: ['Edit Student Profile'], display_name: ['Edit Student Profile'] },
    { id: ['1000'], name: ['View Demographics'], display_name: ['View Demographics'] },
    { id: ['110'], name: ['View Student Profile'], display_name: ['View Student Profile'] },
    { id: ['1100'], name: ['Export Data'], display_name: ['Export Data'] },
    {
      id: ['1500'],
      name: ['Manage Student Applications Settings'],
      display_name: ['Manage Student Applications Settings'],
    },
    {
      id: ['1550'],
      name: ['Manage Student Enrollment'],
      display_name: ['Manage Student Enrollment'],
    },
    { id: ['1600'], name: ['NCLB Filter on Reports'], display_name: ['NCLB Filter on Reports'] },
    {
      id: ['1700'],
      name: ['Subgroup Setup in District and School'],
      display_name: ['Subgroup Setup in District and School'],
    },
    { id: ['1800'], name: ['License Key Input'], display_name: ['License Key Input'] },
    { id: ['200'], name: ['Edit Group Profile'], display_name: ['Edit Group Profile'] },
    { id: ['210'], name: ['View Group Profile'], display_name: ['View Group Profile'] },
    { id: ['300'], name: ['Edit Class Profile'], display_name: ['Edit Class Profile'] },
    { id: ['310'], name: ['View Class Profile'], display_name: ['View Class Profile'] },
    { id: ['400'], name: ['Edit School Profile'], display_name: ['Edit School Profile'] },
    { id: ['410'], name: ['View School Profile'], display_name: ['View School Profile'] },
    { id: ['500'], name: ['Edit District Profile'], display_name: ['Edit District Profile'] },
    { id: ['510'], name: ['View District Profile'], display_name: ['View District Profile'] },
    { id: ['600'], name: ['Edit Teacher Profile'], display_name: ['Edit Teacher Profile'] },
    { id: ['610'], name: ['View Teacher Profile'], display_name: ['View Teacher Profile'] },
    { id: ['620'], name: ['View Own Profile'], display_name: ['View Own Profile'] },
    { id: ['630'], name: ['Edit Own Profile'], display_name: ['Edit Own Profile'] },
    { id: ['640'], name: ['View Own Permissions'], display_name: ['View Own Permissions'] },
    { id: ['660'], name: ['View Others Permissions'], display_name: ['View Others Permissions'] },
    { id: ['670'], name: ['Edit Others Permissions'], display_name: ['Edit Other Permissions'] },
    { id: ['700'], name: ['Manage Inactive Accounts'], display_name: ['Manage Inactive Accounts'] },
    { id: ['820'], name: ['Add Students'], display_name: ['Add Students'] },
    { id: ['825'], name: ['Add Groups'], display_name: ['Add Groups'] },
    { id: ['830'], name: ['Add Classes'], display_name: ['Add Classes'] },
    { id: ['835'], name: ['Add Teachers'], display_name: ['Add Teachers'] },
    { id: ['840'], name: ['Add Schools'], display_name: ['Add Schools'] },
    { id: ['845'], name: ['Deactivate Student'], display_name: ['Deactivate Student'] },
    { id: ['850'], name: ['Deactivate Group'], display_name: ['Deactivate Group'] },
    { id: ['855'], name: ['Deactivate Class'], display_name: ['Deactivate Class'] },
    { id: ['860'], name: ['Deactivate Teacher'], display_name: ['Deactivate Teacher'] },
    { id: ['865'], name: ['Deactivate School'], display_name: ['Deactivate School'] },
    { id: ['900'], name: ['Import Student Rosters'], display_name: ['Import Student Rosters'] },
  ];

  const mockOnCheckboxChange = jest.fn();
  describe('userOrg is default', () => {
    beforeEach(() => {
      wrapper = shallow(
        <PermissionsGrantedTable permissions={permissions} permissionsChecked={[]} editMode />
      );
    });

    it('Should render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render the right columns for top table', () => {
      const mockData = {
        permission_type: 'Student Edit Window',
        view_access: true,
        edit_access: true,
      };

      const mockRowData = {
        original: mockData,
      };

      const viewAndEditTable = wrapper.find('.permissions-granted-table__view');

      const { columns } = viewAndEditTable.props();
      const typeColumn = columns.find(row => row.accessor === 'permission_type');
      const viewColumn = columns.find(row => row.Header === 'View');
      const editColumn = columns.find(row => row.Header === 'Edit');

      const typeWrapper = shallow(typeColumn.Cell(mockRowData));
      const viewRowWrapper = shallow(viewColumn.Cell(mockRowData));
      const editRowWrapper = shallow(editColumn.Cell(mockRowData));

      expect(shallowToJson(typeWrapper)).toMatchSnapshot();
      expect(shallowToJson(viewRowWrapper)).toMatchSnapshot();
      expect(shallowToJson(editRowWrapper)).toMatchSnapshot();
    });

    it('should render the right columns for bottom table', () => {
      const mockData = {
        permission_type: 'Add Students',
        allow_access: true,
      };

      const mockRowData = {
        original: mockData,
      };

      const allowTable = wrapper.find('.permissions-granted-table__allow');
      const { columns } = allowTable.props();
      const typeColumn = columns.find(row => row.accessor === 'permission_type');
      const allowColumn = columns.find(row => row.Header === 'Allow');

      const typeWrapper = shallow(typeColumn.Cell(mockRowData));
      const allowRowWrapper = shallow(allowColumn.Cell(mockRowData));

      expect(shallowToJson(typeWrapper)).toMatchSnapshot();
      expect(shallowToJson(allowRowWrapper)).toMatchSnapshot();
    });

    it('should render the right columns for top table with no access', () => {
      const mockData = {
        permission_type: 'Student Edit Window',
        view_access: false,
        edit_access: false,
      };

      const mockRowData = { original: mockData };

      const viewAndEditTable = wrapper.find('.permissions-granted-table__view');

      const { columns } = viewAndEditTable.props();
      const typeColumn = columns.find(row => row.accessor === 'permission_type');
      const viewColumn = columns.find(row => row.Header === 'View');
      const editColumn = columns.find(row => row.Header === 'Edit');

      const typeWrapper = shallow(typeColumn.Cell(mockRowData));
      const viewRowWrapper = shallow(viewColumn.Cell(mockRowData));
      const editRowWrapper = shallow(editColumn.Cell(mockRowData));

      expect(shallowToJson(typeWrapper)).toMatchSnapshot();
      expect(shallowToJson(viewRowWrapper)).toMatchSnapshot();
      expect(shallowToJson(editRowWrapper)).toMatchSnapshot();
    });

    it('should render the right columns for bottom table with no access', () => {
      const mockData = { permission_type: 'Add Students', allow_access: false };

      const mockRowData = { original: mockData };

      const allowTable = wrapper.find('.permissions-granted-table__allow');
      const { columns } = allowTable.props();
      const typeColumn = columns.find(row => row.accessor === 'permission_type');
      const allowColumn = columns.find(row => row.Header === 'Allow');

      const typeWrapper = shallow(typeColumn.Cell(mockRowData));
      const allowRowWrapper = shallow(allowColumn.Cell(mockRowData));

      expect(shallowToJson(typeWrapper)).toMatchSnapshot();
      expect(shallowToJson(allowRowWrapper)).toMatchSnapshot();
    });
  });

  describe('userOrg is District', () => {
    beforeEach(() => {
      wrapper = shallow(
        <PermissionsGrantedTable
          permissions={permissions}
          userOrg={USER_ORG.District}
          permissionsChecked={[]}
          editMode
        />
      );
    });

    it('Should render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render the right columns for top table', () => {
      const mockData = {
        permission_type: 'Student Edit Window',
        view_access: true,
        edit_access: true,
      };

      const mockRowData = {
        original: mockData,
      };

      const viewAndEditTable = wrapper.find('.permissions-granted-table__view');

      const { columns } = viewAndEditTable.props();
      const typeColumn = columns.find(row => row.accessor === 'permission_type');
      const viewColumn = columns.find(row => row.Header === 'View');
      const editColumn = columns.find(row => row.Header === 'Edit');

      const typeWrapper = shallow(typeColumn.Cell(mockRowData));
      const viewRowWrapper = shallow(viewColumn.Cell(mockRowData));
      const editRowWrapper = shallow(editColumn.Cell(mockRowData));

      expect(shallowToJson(typeWrapper)).toMatchSnapshot();
      expect(shallowToJson(viewRowWrapper)).toMatchSnapshot();
      expect(shallowToJson(editRowWrapper)).toMatchSnapshot();
    });

    it('should render the right columns for bottom table', () => {
      const mockData = {
        permission_type: 'Add Students',
        allow_access: true,
      };

      const mockRowData = {
        original: mockData,
      };

      const allowTable = wrapper.find('.permissions-granted-table__allow');
      const { columns } = allowTable.props();
      const typeColumn = columns.find(row => row.accessor === 'permission_type');
      const allowColumn = columns.find(row => row.Header === 'Allow');

      const typeWrapper = shallow(typeColumn.Cell(mockRowData));
      const allowRowWrapper = shallow(allowColumn.Cell(mockRowData));

      expect(shallowToJson(typeWrapper)).toMatchSnapshot();
      expect(shallowToJson(allowRowWrapper)).toMatchSnapshot();
    });
  });

  describe('userOrg is School', () => {
    beforeEach(() => {
      wrapper = shallow(
        <PermissionsGrantedTable
          permissions={permissions}
          userOrg={USER_ORG.School}
          permissionsChecked={[]}
          editMode
        />
      );
    });

    it('Should render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render the right columns for top table', () => {
      const mockData = {
        permission_type: 'Student Edit Window',
        view_access: true,
        edit_access: true,
      };

      const mockRowData = {
        original: mockData,
      };

      const viewAndEditTable = wrapper.find('.permissions-granted-table__view');

      const { columns } = viewAndEditTable.props();
      const typeColumn = columns.find(row => row.accessor === 'permission_type');
      const viewColumn = columns.find(row => row.Header === 'View');
      const editColumn = columns.find(row => row.Header === 'Edit');

      const typeWrapper = shallow(typeColumn.Cell(mockRowData));
      const viewRowWrapper = shallow(viewColumn.Cell(mockRowData));
      const editRowWrapper = shallow(editColumn.Cell(mockRowData));

      expect(shallowToJson(typeWrapper)).toMatchSnapshot();
      expect(shallowToJson(viewRowWrapper)).toMatchSnapshot();
      expect(shallowToJson(editRowWrapper)).toMatchSnapshot();
    });

    it('should render the right columns for bottom table', () => {
      const mockData = {
        permission_type: 'Add Students',
        allow_access: true,
      };

      const mockRowData = {
        original: mockData,
      };

      const allowTable = wrapper.find('.permissions-granted-table__allow');
      const { columns } = allowTable.props();
      const typeColumn = columns.find(row => row.accessor === 'permission_type');
      const allowColumn = columns.find(row => row.Header === 'Allow');

      const typeWrapper = shallow(typeColumn.Cell(mockRowData));
      const allowRowWrapper = shallow(allowColumn.Cell(mockRowData));

      expect(shallowToJson(typeWrapper)).toMatchSnapshot();
      expect(shallowToJson(allowRowWrapper)).toMatchSnapshot();
    });
  });

  describe('userOrg is Teacher', () => {
    beforeEach(() => {
      wrapper = shallow(
        <PermissionsGrantedTable
          permissions={permissions}
          permissionsChecked={[]}
          userOrg={USER_TYPE.Teacher}
          editMode
        />
      );
    });

    it('Should render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render the right columns for top table', () => {
      const mockData = {
        permission_type: 'Student Edit Window',
        view_access: true,
        edit_access: true,
      };

      const mockRowData = {
        original: mockData,
      };

      const viewAndEditTable = wrapper.find('.permissions-granted-table__view');

      const { columns } = viewAndEditTable.props();
      const typeColumn = columns.find(row => row.accessor === 'permission_type');
      const viewColumn = columns.find(row => row.Header === 'View');
      const editColumn = columns.find(row => row.Header === 'Edit');

      const typeWrapper = shallow(typeColumn.Cell(mockRowData));
      const viewRowWrapper = shallow(viewColumn.Cell(mockRowData));
      const editRowWrapper = shallow(editColumn.Cell(mockRowData));

      expect(shallowToJson(typeWrapper)).toMatchSnapshot();
      expect(shallowToJson(viewRowWrapper)).toMatchSnapshot();
      expect(shallowToJson(editRowWrapper)).toMatchSnapshot();
    });

    it('should render the right columns for bottom table', () => {
      const mockData = {
        permission_type: 'Add Students',
        allow_access: true,
      };

      const mockRowData = {
        original: mockData,
      };

      const allowTable = wrapper.find('.permissions-granted-table__allow');
      const { columns } = allowTable.props();
      const typeColumn = columns.find(row => row.accessor === 'permission_type');
      const allowColumn = columns.find(row => row.Header === 'Allow');

      const typeWrapper = shallow(typeColumn.Cell(mockRowData));
      const allowRowWrapper = shallow(allowColumn.Cell(mockRowData));

      expect(shallowToJson(typeWrapper)).toMatchSnapshot();
      expect(shallowToJson(allowRowWrapper)).toMatchSnapshot();
    });
  });

  describe('Permission Table when editmode is false', () => {
    beforeEach(() => {
      wrapper = shallow(
        <PermissionsGrantedTable
          permissions={permissions}
          userOrg={USER_ORG.District}
          editMode={false}
          onCheckboxChange={mockOnCheckboxChange}
          permissionsChecked={[100, 500, 1500]}
        />
      );
    });

    it('Should render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render the right columns for top table', () => {
      const mockData = {
        permission_type: 'Student Edit Window',
        view_access: false,
        edit_access: false,
      };

      const mockRowData = {
        original: mockData,
      };

      const viewAndEditTable = wrapper.find('.permissions-granted-table__view');

      const { columns } = viewAndEditTable.props();
      const typeColumn = columns.find(row => row.accessor === 'permission_type');
      const viewColumn = columns.find(row => row.Header === 'View');
      const editColumn = columns.find(row => row.Header === 'Edit');

      const typeWrapper = shallow(typeColumn.Cell(mockRowData));
      const viewRowWrapper = shallow(viewColumn.Cell(mockRowData));
      const editRowWrapper = shallow(editColumn.Cell(mockRowData));

      expect(shallowToJson(typeWrapper)).toMatchSnapshot();
      expect(shallowToJson(viewRowWrapper)).toMatchSnapshot();
      expect(shallowToJson(editRowWrapper)).toMatchSnapshot();
    });

    it('should render the right columns for bottom table', () => {
      const mockData = {
        permission_type: 'Add Students',
        allow_access: false,
      };

      const mockRowData = {
        original: mockData,
      };

      const allowTable = wrapper.find('.permissions-granted-table__allow');
      const { columns } = allowTable.props();
      const typeColumn = columns.find(row => row.accessor === 'permission_type');
      const allowColumn = columns.find(row => row.Header === 'Allow');

      const typeWrapper = shallow(typeColumn.Cell(mockRowData));
      const allowRowWrapper = shallow(allowColumn.Cell(mockRowData));

      expect(shallowToJson(typeWrapper)).toMatchSnapshot();
      expect(shallowToJson(allowRowWrapper)).toMatchSnapshot();
    });

    describe('checkbox flow', () => {
      beforeEach(() => {
        wrapper = mount(
          <PermissionsGrantedTable
            permissions={permissions}
            userOrg={USER_ORG.District}
            editMode={false}
            onCheckboxChange={mockOnCheckboxChange}
            permissionsChecked={[100, 500, 1500]}
          />
        );
      });

      it('should renderCheck', () => {
        const checked = true;
        const selectedId = 'sss';
        const checkboxSpy = jest.fn();
        const inputs = wrapper.find('.permissions-granted-table__check-mark');
        const input = inputs.at(0);
        const { onChange } = input.props();
        wrapper.instance().handleCheckboxChange = checkboxSpy;

        onChange({ target: { checked: true } });
        wrapper.instance().renderCheck(checked, selectedId);
        expect(checkboxSpy).toHaveBeenCalled();
      });

      it('should handleCheckboxChange', () => {
        const checked = true;
        const selectedId = 'sss';
        wrapper.instance().handleCheckboxChange(checked, selectedId);
        expect(mockOnCheckboxChange).toHaveBeenCalledWith(checked, selectedId);
      });
    });
  });
});
