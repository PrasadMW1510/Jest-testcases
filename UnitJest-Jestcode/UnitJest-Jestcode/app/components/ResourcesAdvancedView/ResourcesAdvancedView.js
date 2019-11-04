/**
 *
 * ResourcesAdvancedView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ResourcesModalView from 'components/ResourcesModalView';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';
import resourcesAdvancedPostSchema from './resourcesAdvancedPostSchema.json';

import './ResourcesAdvancedView.scss';

const initialState = {
  isNoValueSelected: false,
  strandSelected: null,
  advancedPostData: { ...resourcesAdvancedPostSchema },
};

class ResourcesAdvancedView extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    this.state = initialState;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.appSelected !== nextProps.appSelected) {
      this.setState({ ...initialState });
    }
  }

  sortingPostCall = sortTerm => {
    const advanced = this.state.advancedPostData;
    advanced.sortTerms.sortTerm = sortTerm;
    this.props.postResourcesBasedOnId(advanced, 'advanced');
  };

  noValueModalClose = () => {
    this.setState({ isNoValueSelected: false });
  };

  /**
   * Perform the post call based on the drop down values selected.
   * @param event
   */
  handleClick = event => {
    event.preventDefault();
    if (
      this.state.advancedPostData.resource_type ||
      this.state.advancedPostData.skill_category ||
      this.state.advancedPostData.skill
    ) {
      this.props.updateResourcesSearchModalStatus(true);
      this.props.postResourcesBasedOnId(this.state.advancedPostData, 'advanced');
    } else {
      this.setState({ isNoValueSelected: true });
    }
  };

  /**
   * handle the on change event for Advanced drop down.
   * @param event
   */
  handleAdvanced = event => {
    event.preventDefault();
    if (event.target.value !== 'select_a_type') {
      this.setState({
        advancedPostData: {
          ...this.state.advancedPostData,
          resource_type: event.target.value,
        },
      });
    } else {
      this.setState({
        advancedPostData: {
          ...this.state.advancedPostData,
          resource_type: null,
        },
      });
    }
  };

  /**
   * Store selected Skill type to the state to be displayed in the Skill drop down.
   * Set the strandSelected to null if strand is not selected.
   *  This is to prevent the skill from getting displayed.
   */
  handleStrand = event => {
    event.preventDefault();
    if (event.target.value === 'select_a_strand') {
      this.setState({
        strandSelected: null,
        advancedPostData: {
          ...this.state.advancedPostData,
          skill_category: null,
          skill: null,
        },
      });
    } else {
      this.props.advancedSkill.getIn(['skill_categories', 0, 'skill_category']).map(skills => {
        if (skills.getIn(['category_name', 0]) === event.target.value) {
          this.setState({
            strandSelected: skills,
            advancedPostData: {
              ...this.state.advancedPostData,
              skill_category: skills.getIn(['category_name', 0]),
            },
          });
        }
        return null;
      });
    }
  };

  /**
   * update the skill value when the skill drop down is selected.
   * @param event
   */
  handleSkill = event => {
    event.preventDefault();
    if (event.target.value !== 'select_a_skill') {
      this.setState({
        advancedPostData: {
          ...this.state.advancedPostData,
          skill: event.target.value,
        },
      });
    } else {
      this.setState({
        advancedPostData: {
          ...this.state.advancedPostData,
          skill: null,
        },
      });
    }
  };

  /**
   * Go over the list of the json values and update the view when there is corresponding resources information.
   * We don't was the supertype to be display in this view.
   */
  resourcesTypeDropDown = () => {
    const result = [];
    if (this.props.advancedResource.length) {
      this.props.advancedResource.forEach(app => {
        /**
         * It can only be of two types "type_name and resource_subtype_name".
         */
        if (app.type_name) {
          result.push(
            <option key={app.type_id[0]} value={app.type_id[0]}>
              {app.type_name[0]}
            </option>
          );
        }

        if (app.resource_subtypes) {
          if (app.resource_subtypes[0] !== '') {
            app.resource_subtypes[0].resource_subtype.forEach(subtype => {
              result.push(
                <option key={subtype.resource_subtype_id[0]} value={subtype.resource_subtype_id[0]}>
                  {` - ${subtype.resource_subtype_name[0]}`}
                </option>
              );
            });
          }
        }
      });
    }
    return result;
  };

  /**
   * Select a strand from teh list of options.
   * Not all the applications have Skill categories.
   */
  resourcesStrandDropDown = () =>
    this.props.advancedSkill.getIn(['skill_categories', 0, 'skill_category']).map(strand => (
      <option key={strand.getIn(['category_id', 0])} value={strand.getIn(['category_name', 0])}>
        {strand.getIn(['category_name', 0])}
      </option>
    ));

  /**
   * Based on the stateSeletected value store from handleChange display the skill value.
   */
  resourcesSkillDropDown = () => {
    if (this.state.strandSelected && this.state.strandSelected.getIn(['skills', 0])) {
      return this.state.strandSelected.getIn(['skills', 0, 'skill']).map(skill => (
        <option key={skill.getIn(['skill_id', 0])} value={skill.getIn(['skill_id', 0])}>
          {skill.getIn(['skill_name', 0])}
        </option>
      ));
    }
    return null;
  };

  /**
   * Only display the Strand, Skill dropdown if the API returns a skills info for the app_id selected.
   */
  render() {
    return (
      <div className="resources-advanced">
        Use the pull-down menus to begin your Resources search.
        <div>
          <span className="resources-advanced__text">Resource Type:</span>
          <select
            className="resources-advanced__search-box"
            value={this.state.advancedPostData.resource_type || ''}
            onChange={this.handleAdvanced}
          >
            <option key={'select_a_type'} value={'select_a_type'}>
              Select a type
            </option>
            {this.resourcesTypeDropDown()}
          </select>
        </div>
        {this.props.advancedSkill &&
          this.props.advancedSkill.getIn(['skill_categories', 0, 'skill_category']) && (
            <div>
              <div>
                <span className="resources-advanced__text resources-advanced__text--strand">
                  Strand:
                </span>
                <select
                  className="resources-advanced__search-box"
                  value={this.state.advancedPostData.skill_category || ''}
                  onChange={this.handleStrand}
                >
                  <option key={'select_a_strand'} value={'select_a_strand'}>
                    Select a strand
                  </option>
                  {this.resourcesStrandDropDown()}
                </select>
              </div>
              <div>
                <span className="resources-advanced__text resources-advanced__text--skill">
                  Skill:
                </span>
                <select
                  className="resources-advanced__search-box"
                  value={this.state.advancedPostData.skill || ''}
                  onChange={this.handleSkill}
                >
                  <option key={'select_a_skill'} value={'select_a_skill'}>
                    Select a skill
                  </option>
                  {this.resourcesSkillDropDown()}
                </select>
              </div>
            </div>
          )}
        <div>
          <button className="resources-advanced__button" onClick={event => this.handleClick(event)}>
            GO
          </button>
        </div>
        {this.props.modalSearchStatus &&
          this.props.resourcesPostResponse && (
            <ResourcesModalView
              item={this.props.resourcesPostResponse}
              updateResourcesModalStatus={this.props.updateResourcesSearchModalStatus}
              modalStatus={this.props.modalSearchStatus}
              sortUpdater={this.sortingPostCall}
            />
          )}
        {this.state.isNoValueSelected && (
          <SAMModal
            isOpen={this.state.isNoValueSelected}
            contentLabel="No Value Selected"
            modalClassModifier="resources-advanced-no-value"
          >
            <div className="resources-advanced-no-value__box">
              <div className="resources-advanced-no-value__box-text">
                You haven&#39;t specified a search. To perform a search, please enter a search term
                in the &#34;SAM Keyword&#34; field or select search criteria under &#34;Advanced
                Search&#34;.
              </div>
            </div>
            <SAMButton
              buttonClassModifier="resources-advanced-no-value__ok-button"
              onClickHandler={this.noValueModalClose}
            >
              OK
            </SAMButton>
          </SAMModal>
        )}
      </div>
    );
  }
}

ResourcesAdvancedView.propTypes = {
  advancedResource: PropTypes.array.isRequired,
  advancedSkill: PropTypes.object,
  postResourcesBasedOnId: PropTypes.func,
  appSelected: PropTypes.string,
  resourcesPostResponse: PropTypes.object,
  updateResourcesSearchModalStatus: PropTypes.func,
  modalSearchStatus: PropTypes.bool,
};

export default ResourcesAdvancedView;
