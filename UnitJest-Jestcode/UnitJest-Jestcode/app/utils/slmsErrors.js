const errorMSGs = {
  // ***** Error messages START *********
  DEFAULT: 'There was an error with: ',
  100: 'This field is required.',

  // ****** name errors
  110: 'Please enter a "First Name".',
  111: '"First Name" may not be greater that 50 characters.',
  120: 'Please enter a "Last Name."',
  129: 'Username must be 3 or more characters.',
  130: 'Please enter a "Username". This will be used for logging on to all Houghton Mifflin Harcourt Programs.',
  131: 'Please enter a "School Name".',
  132: 'Please enter a "Student ID".',
  133: 'Please enter a "Grade".',
  134: 'Please enter a "Password".',
  135: 'Please enter a "Group Name".',
  136: 'Please enter a "Class Name".',
  137: 'Please enter a "District Name".',
  138: 'Please enter a "District State".',
  139: 'Please enter a "District Location".',

  // ****** invalid data format errors
  140: 'This "Email Address" is not valid. Please enter the correct email address.',
  141: 'Please verify the "Date of Birth" is correct, and follows the proper format (mm/dd/yyyy).',

  // ****** Passwords must match
  142: 'Password and password confirmation must match.',

  // ****** empty collection errors
  150: 'A student must be registered in at least one class. Please select a class.',
  151: 'A teacher must be associated to at least one class. Please select a class.',
  152: 'A class must be associated to at least one grade. Please select a grade.',
  153: 'A school must have at least one grade. Please select a grade.',
  154: 'Please select a "School Type."',

  // ****** other metadata errors
  160: 'Please enter a "School Number."',
  161: 'This profile must be associated with a class, school or district. Please select an organization.',
  162: 'Please enter a "District Number".',
  163: 'You must supply a start date and end date for each grading period.',
  164: 'You must supply a start date and end date for each grading period.',

  // used on some enrollment screens.
  165: 'Please select a grade, teacher, class, group or student from the SmartBar on the left.',

  // used on View Saved Reports page.
  166: 'You have not saved any reports for this cohort.',

  // incomplete school address info errors
  170: 'Please enter a school address.',
  171: 'Please enter a city for the school address.',
  172: 'Please enter a state for the school address.',
  173: 'Please enter a zip code for the school address.',
  174: 'Please enter a phone number for the school.',
  175: 'Please enter an email address for the school.',

  // generic messages
  200: 'The submission of this form has timed out because the server is not responding. You can try again or, if the problem persists, contact your school technical administrator.',
  201: 'There was an error on the server after submitting this form. You can try again or, if the problem persists, contact your school technical administrator.',
  202: 'The page could not be loaded due to an error.', // when xml files don't load due to an unspecified error.
  203: 'The page could not be loaded because the server did not respond. Please try again. If this problem persists, contact your school technical administrator.', // when xml files don't load due to a timeout

  // search messages
  210: 'You must enter at least one word into the search field to perform a search.',
  211: 'A minimum value may not be greater than a maximum value.',
  212: 'A maximum value may not be less than minimum value.',
  213: 'No results match your search criteria.',

  // Date errors
  220: 'The start date must be prior to the end date.', // early is higher than later
  221: 'Please supply a start date and an end date for all grading periods.',
  222: 'Grading Periods cannot overlap. Please adjust start or end date.',
  223: 'Grading Period End Date cannot exceed School Year End Date.',
  224: 'Grading Period Start Date cannot precede School Year Start Date.',
  225: 'School Start Date must be at least one day before School End Date.',
  226: 'School End Date must be at least one day after School Start Date.',
  227: 'Please supply a School Start Date.',
  228: 'Please supply a School End Date.',
  229: 'Caution!  Removing a grade from your school may cause students and classes associated with that grade to become unavailable on the SmartBar.',

  // misc add/edit
  230: 'A student must be associated with a class. Please add a class before you add this student.',
  231: 'Your password and password confirmation should be the same.  Please re-enter and confirm your password.',
  232: 'This school has no classes. You must first add a class to this school before you can add this teacher.',
  233: 'Please enter a valid phone number.',
  234: "Please enter an 'Other Educational Institution' name.",
  235: 'Please enter a "District Time Zone".',
  236: 'Please enter a "District User ID".',

  // book expert
  240: 'You must click Save to save any changes. Do you want to go to a different collection?', // editing book collections
  241: 'Please enter both a Lexile score and a Word Count to calculate the Point value.',
  242: 'Please enter a search term to view the information on this tab.',
  243: 'There are no selected titles to print. Please select at least one title.',
  244: "You need to have at least 30 titles in your custom list in order to print a list of titles. Please select additional titles. To print a blank order form, click the 'Blank Order Form' link below.",
  245: 'Please select at least one quiz to print.',
  246: 'Please select at least one quiz to export.',
  247: 'There are no selected titles to order.', // for printing book order form.
  248: 'There are no selected titles to export to HTML.',
  249: 'The Reading Counts! Book Expert Server software must be installed to use the Reading Counts! Book Expert. Please consult with your System or Network Administrator for installation help.',

  // home
  250: 'Please select at least one message to delete.',
  251: 'No students selected.',

  // SRI product controls
  // --- new test score
  260: 'You must enter a Lexile score between 0 and 1700, or BR for a Beginning Reader.\n ',
  // --- proficiency bands
  261: 'Please enter Lexile values for each performance band and each grade level.',
  // --- settings
  262: 'Minimum time between tests may not exceed 365 days.',
  263: 'Please enter a number between 0-30 in the Minimum Time Between Completed Tests field.',
  264: "The selected date cannot be later than today's date.",

  // SMI product controls
  265: 'Please fill in the minimum time between tests with a value between 0 and 365.',
  266: 'There was a problem with the Quantile\nvalues entered. Please check the following:\n\n- Ensure that a Quantile value between 0\n  and 1599 has been entered for each\n  performance level and grade\n- Ensure that the maximum Quantile is\n  greater than the minimum Quantile for\n  each performance level and each grade.\n\n',

  // Certificate Manager
  300: 'Please select a program certificate using the pull-down menu above.',

  // Resource/Standards
  310: 'You haven\'t specified a search. To perform a search, please enter a search term in the "SAM Keyword" field or select search criteria under "Advanced Search."',
  311: 'Please choose a program to search for resources and standards documents.',
  312: 'SAM cannot access Resources and Standards at this time, please try again later. If the problem persists contact your System Administrator.',

  // ****** invalid process errors
  // --- SRC grading tool
  421: "The selected date cannot be later than today's date.",
  422: 'The number of correct questions cannot exceed the number of total questions.',
  423: 'The Total Questions field must contain an integer between 0 and 30 inclusive.',
  424: 'Please select a date.',
  425: 'Please enter an integer in the Correct Answers field.',
  426: 'Please enter an integer between 0 and 30 inclusive in the Total Questions field.',
  427: 'The value in the Correct Answers field cannot exceed the value in the Total Questions field.',
  428: 'Only one passing quiz score per quiz can be recorded by this tool.',
  435: 'The amount of points you are redeeming is more than the amount of points available for this user. Please try again.',
  436: 'Please enter a value in the Points field.',
  437: "The selected date cannot be later than today's date.",

  // --- SRC Product Controls
  450: 'An invalid value has been entered for Points Multiplier (in the Award Settings box).  This value must be an integer between 1 and 99 inclusive.',
  451: 'An invalid value has been entered for "Number of questions per quiz" (in the Number of Questions per Quiz box).  This value must be an integer between 1 and 30 inclusive.',
  452: 'An invalid value has been entered for "% required to pass a quiz" (in the Quiz Settings box).  This value must be an integer between 1 and 100 inclusive.',
  453: 'An invalid value has been entered for "Quiz attempts allowed" (in the Quiz Settings box).  This value must be an integer between 1 and 6 inclusive.',
  454: 'An invalid value has been entered for "Retake days between quizzes" (in the Quiz Settings box).  This value must be an integer between 0 and 6 inclusive.',
  455: 'An invalid value has been entered for Goals (in the Award Settings box).  This value must be an integer between 0 and 9999 inclusive.',
  456: 'An invalid value has been entered for "Number of questions per eReads Quiz" (in the Number of Questions per Quiz box).  This value must be an integer between 1 and 10 inclusive.',

  // --- RA Product Controls
  475: 'In order for this SmartFile grade to be recorded, you must enter a date.',
  476: 'In order for this SmartFile grade to be recorded, you must enter a score.',
  477: 'The score you entered for this Smart File grade is not valid. In order for your score to be saved, it must be entered as a whole number from 1 - 100.',
  478: 'There is no information to display for this report.\r\rIf you selected a custom date range for this report, please make sure the dates are correct. If you generated this report by running it first at the district level and then navigating to the school level on your SmartBar, return to the reports index and run the report again at the school level.',
  479: 'This student already has a score for the SmartFile you selected. To edit the existing score, please return to the SmartFile home screen and click the "edit" link next to the appropriate SmartFile.',

  // --- RT Product Controls
  490: 'The Test Score must be an integer between 0 and 75 inclusive.',
  491: 'READ 180 Enterprise Edition licenses must be installed before an rSkills Enterprise Edition Test can be assigned.',

  // --- R180 reports
  500: 'There is no information to display for this table.\n\n If you selected a custom date range, be aware that this report will only generate data for periods of greater than or equal to seven (7) days.',

  // --- R180 reports
  525: 'Invalid assignment name.  Please select a name from the dropdown list or enter a new assignment name in the text field.',
  526: 'Invalid grade. Please enter a grade in the appropriate form field.',
  527: 'Percentage cannot be calculated. Please enter a valid grade.',
  528: 'Total number of questions must be greater than 0.  Please enter a valid number of questions.',
  529: 'Percentage must be between 0% and 100%. Please enter a valid grade.',
  530: 'This assignment is already in the assignment list.',
  531: "The selected date cannot be later than today's date.",

  // FM Product Controls
  551: 'This student has not completed the operation to which he or she is currently assigned. For maximum program effectiveness, students should complete operations in sequence. Are you sure you want to change this student to Addition?',
  552: 'This student has not completed the operation to which he or she is currently assigned. For maximum program effectiveness, students should complete operations in sequence. Are you sure you want to change this student to Subtraction?',
  553: 'This student has not completed the operation to which he or she is currently assigned. For maximum program effectiveness, students should complete operations in sequence. Are you sure you want to change this student to Multiplication?',
  554: 'This student has not completed the operation to which he or she is currently assigned. For maximum program effectiveness, students should complete operations in sequence. Are you sure you want to change this student to Division?',
  555: 'This student has already completed the operation and fact range you selected. Click OK to reassign this student for additional practice.',
  556: 'This student has already completed the operation and fact range you selected and has not completed the operation to which he or she is currently assigned. For maximum program effectiveness, students should complete operations in sequence. Are you sure you want to change this student to Addition?',
  557: 'This student has already completed the operation and fact range you selected and has not completed the operation to which he or she is currently assigned. For maximum program effectiveness, students should complete operations in sequence. Are you sure you want to change this student to Subtraction?',
  558: 'This student has already completed the operation and fact range you selected and has not completed the operation to which he or she is currently assigned. For maximum program effectiveness, students should complete operations in sequence. Are you sure you want to change this student to Multiplication?',
  559: 'This student has already completed the operation and fact range you selected and has not completed the operation to which he or she is currently assigned. For maximum program effectiveness, students should complete operations in sequence. Are you sure you want to change this student to Division?',
  560: 'Some of the selected students have not yet completed the operation to which they are currently assigned. For maximum program effectiveness, students should complete operations in sequence. Are you sure you want to change these student assignments?',
  561: 'Some of the selected students have already completed the operation and fact range you selected. They will be reassigned for additional practice. Are you sure you want to change these student assignments?',
  562: 'Some of these students have not yet completed the operation to which they are currently assigned. For maximum program effectiveness, students should complete operations in sequence. Some of these students have already completed the operation and fact range you selected. They will be reassigned for additional practice. Are you sure you want to change these student assignments?',

  // FM Reports
  // -- Report FM_01:
  580: 'The program cannot generate this report because the time period is not within FASTT Math use, the student is not enrolled in FASTT Math, or the student is not assigned to an operation.',
  581: 'The program cannot generate this report because the student is not assigned to an operation.',
  582: 'The program cannot generate this report because the time period is not within FASTT Math use, the students are not enrolled in FASTT Math, or students are not assigned to an operation.',

  // FAD reports
  602: 'The program cannot generate this report because the student is not enrolled in FractionNation.',

  // React Client-Side Error Messages
  1000: 'Grading Periods must fall within the School Start Date and School End Date. Please adjust start or end date.',

  // ***** Error messages END *********

  // ***** Server errors list
  // These are error codes returned by the server and that correspond to
  // a server problem, that the client can't do much about, except report it.

  // unknown error
  '-1':
    'There was a server error. You can try again or, if the problem persists, contact your technical administrator.',
  // server error
  '-2':
    'There was a server error. You can try again or, if the problem persists, contact your technical administrator.',
  // invalid command
  '-4':
    'Invalid Command. You can try again or, if the problem persists, contact your technical administrator.',
  // session expired
  '-7': 'Your SAM session has expired. Click Exit SAM then begin a new session and log in again.',
  // server database error
  '-21':
    'There was a database error. You can try again or, if the problem persists, contact your technical administrator.',
  // server reporting engine error
  '-22':
    'There was a reporting error. You can try again or, if the problem persists, contact your technical administrator.',
  // cannot overwrite a class of the same name
  '-26': 'Class name(s) are already in use at this school.',

  // ***** Local errors list
  // These error codes, also returned by the server, relate to direct action from the
  // client and are considered "local" errors. Ex: trying to submit a username that is
  // already taken by another user will return error code

  // invalid input
  '-3': 'The information you entered was not valid. Please re-enter the information.',
  // illegal access
  '-5': 'You do not have permission to access this information.',
  // invalid xml
  '-6':
    'There was an error sending data to the server. Try clicking Save again. You can also click Cancel, reopen this window and try again.',
  // bad license format
  '-8': 'The license key has been entered incorrectly. Please check the number and try again.',
  '-9':
    'Due to a server error, this student could not be enrolled at this time.  Please try again.',
  // required fields missing
  '-31':
    'Some required information is missing. Please enter information in all the fields that appear in red.',
  // duplicate field value
  '-32': 'This field is already in use. Try an alternate value.',
  // failed to meet password stringency requirements
  '-34':
    'A user with this Username already exists in SAM. Use the SAM Search to locate the user (User may be Active or Inactive).',
  '-35':
    'A user with this Student ID already exists in SAM. Use the SAM Search to locate the user (User may be Active or Inactive).',
  // insufficient privileges
  '-51': "You'll need to log in as a District Administrator to access this information.",
  // no access rights
  '-52': "You'll need to log in as a School Administrator to access this information.",
  // not enough seats available
  '-81':
    'The new license key authorizes fewer seats than are currently allocated. Please unenroll students from the program and try to certify the license key again.',
  // no license
  '-91':
    'There are no seats/licenses for this program; please contact your technology technical administrator.',
  // no seats available (licensing)
  '-92':
    'Enrollment has exceeded the number of available licenses.  Please un-enroll student(s) as necessary or contact Customer Service to purchase additional licenses.',
  '-93':
    'You are trying to un-enroll a nontransferable license. You will not be able to use this license for another student.',
  '-94':
    'You have entered a license key for a program that is not installed on this system.  Please contact your technology technical administrator.',
  '-221': 'This report only applies to level 1 students.',
  '-222': 'No students in the selected class belong to a group.',
  '-302':
    'Sorry, this Username or Password is not valid. ' +
    'Please be sure you have entered it correctly or contact your System Administrator for ' +
    'assistance. Note: Username & Password are case sensitive.',
  '-304': 'Username cannot be an HMH keyword.',
  '-305': 'Password cannot be an HMH keyword.',
  '-306': 'Password Hint cannot be an HMH keyword.',
  '-307': 'Password Hint cannot be same as your password.',
  '-601': 'Either the username or password is incorrect.  Please try again.',
  '-603': 'The username you have selected is already in use.  Please choose a different username.',
};

/**
 * Provided the error code it returns the error message
 *
 * If error code doesn't exist return the serverMsg
 *
 * @param errorCode
 * @param serverMsg
 * @returns {*}
 */
export default function getErrorMsg(errorCode, serverMsg = '') {
  return errorMSGs[errorCode] ? errorMSGs[errorCode] : serverMsg;
}
