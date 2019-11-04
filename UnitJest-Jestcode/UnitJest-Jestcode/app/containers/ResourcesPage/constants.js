/*
 *
 * ResourcesProgram constants
 *
 * Gets the list of application that are allocated to the User.
 */

export const GET_PRODUCT_SEARCH = 'get_product_search';

export const GET_PRODUCT_SEARCH_SUCCESS = 'get_product_search_success';

export const GET_PRODUCT_SEARCH_FAILURE = 'get_product_search_failure';

export const GET_BUILD_INFO = 'get_build_info';

export const GET_BUILD_INFO_SUCCESS = 'get_build_info_success';

export const GET_BUILD_INFO_FAILURE = 'get_build_info_FAILURE';

export const UPDATE_RESOURCES_QUICK_MODAL_STATUS = 'update_resources_quick_modal_status';

export const POST_RESOURCES_QUICK_SEARCH = 'post_resources_quick_search';

export const POST_RESOURCES_QUICK_SEARCH_SUCCESS = 'post_resources_quick_search_success';

export const POST_RESOURCES_QUICK_SEARCH_FAILURE = 'post_resources_quick_search_failure';

/**
 * List of constants that are to be excluded from the SAM app
 * If any app is to be added back in future remove the string from the array the app should be displayed.
 * Note: The rest of the api may need appropriate changes.
 * @type {string[]}
 */
export const excludeApps = [
  'Common Core Code X Course I',
  'Common Core Code X Course II',
  'Common Core Code X Course III',
  'Common Core Code X Course I Teacher',
  'Common Core Code X Course II Teacher',
  'Common Core Code X Course III Teacher',
  'Do The Math',
  'Do The Math Teacher',
  'English 3D Course A Volume 1',
  'English 3D Course A Volume 2',
  'English 3D Course B Volume 1',
  'English 3D Course B Volume 2',
  'English 3D Course C Volume 1',
  'English 3D Course A Volume 1 Teacher',
  'English 3D Course A Volume 2 Teacher',
  'English 3D Course B Volume 1 Teacher',
  'English 3D Course B Volume 2 Teacher',
  'English 3D Course C Volume 1 Teacher',
  'MATH 180 Course I Teacher',
  'MATH 180 Course II Teacher',
  'READ 180 U Stage A',
  'READ 180 U Stage B',
  'READ 180 U Stage C',
  'READ 180 U CA Stage A',
  'READ 180 U CA Stage B',
  'READ 180 U CA Stage C',
  'READ 180 U Stage A Teacher',
  'READ 180 U Stage B Teacher',
  'READ 180 U Stage C Teacher',
  'Read180 U CA Stage A Teacher',
  'Read180 U CA Stage B Teacher',
  'Read180 U CA Stage C Teacher',
  'READ180 Xtra Topic Software A',
  'READ180 Xtra Topic Software B',
  'READ180 Xtra Topic Software C',
  'iRead Teacher',
  'System44 NG CA Stage A',
  'System44 NG CA Stage B',
  'System44 NG CA Stage C',
  'Student Achievement Manager',
];
