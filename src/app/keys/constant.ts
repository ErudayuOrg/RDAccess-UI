export const RD_CONSTANT ={ 
DESIGNATION : [
  { userDesignationCode: 'ADMIN', userDesignation: 'Admin' },
  { userDesignationCode: 'HOD', userDesignation: 'Head of the Department' },
  { userDesignationCode: 'PROFR', userDesignation: 'Teaching staff' },
  { userDesignationCode: 'RESER', userDesignation: 'Non-Teaching staff' },
  { userDesignationCode: 'STUDT', userDesignation: 'Student' },
  { userDesignationCode: 'MNGMT', userDesignation: 'Management' }
],
ROLE_WITH_NO_EDIT : ['STUD','MNGMT'],
ROLE_WITH_EDIT : ['HOD'],
ROLE_WITH_NO_CREATE : ['STUD','ADMIN','MNGMT'],
ROLE_WITH_NO_PROFILE : ['MNGMT','ADMIN'],
ROLE_WITH_ADMIN_ACCESS : ['ADMIN'],
ROLE_WITH_NO_DEPARTMENT : ['ADMIN','MNGMT'],
ROLE_WITH_EDIT_FUNDING:['ADMIN'],
ROLE_WITH_EDIT_FUNDING_PROJECT:['ADMIN'],
ROLE_WITH_EDIT_APPLIED_FUNDING_PROJECT:['ADMIN','HOD','MNGMT'],
MAX_CONTIBUTOR_PER_PROJECT: 5,

PROJECT_STATUS_CODE :{
  ONGOING: '01',
  COMPLETED:'02'
},
PROJECT_STATUS_MAP :{
  '01': 'Ongoing',
  '02': 'Completed'
},

FUNDING_STATUS_CODE :{
  STARTED: '01',
  FILLED:'02',
  CHECKED:'03',
  SUBMITTED:'04',
  REVIEW: '05',
  SHORTLISTED:'06',
  REJECTED:'07',
  ACCEPTED:'08'
},
FUNDING_STATUS_MAP :{
  '01': 'Started',
  '02': 'Filled',
  '03': 'Checked',
  '04': 'Submitted',
  '05': 'Review',
  '06': 'Shortlisted',
  '07': 'Rejected',
  '08': 'Accepted'
},

//increment TOTAL_SIZE if new tile added to TILE_INDEX list
PROJECT_TILE_INDEX :{
    TOTAL_SIZE:5,
    TITLE:0,
    SUMMARY:1,
    KEYWORDS:2,
    REFERENCE:3,
    CONTENT:4
  },
FUNDING_TILE_INDEX :{
    TOTAL_SIZE:4,
    HEADER:0,
    DESCRIPTION:1,
    ADDL_DETAIL:2,
    LINKS:3
  },
  RECEIVED_FP_TILE_INDEX :{
    TOTAL_SIZE:7,
    HEADER:0,
    SUMMARY:1,
    KEYWORDS:2,
    AMOUNT:3,
    DATE:4,
    STATUS:5,
    INVESTIGATOR:6
  },

  SNAPSHOT_TILE_TITLE :{
    FUNDINGS:'Funded projects',
    LABS:'Total research labs',
    PROJECTS:'Total projects',
    PUBLICATIONS:'Total Publications',
    MOUS:'Total MOUs'
  },

  FUNDING_TYPE : [
    { fundingType: 'Project grant' },
    { fundingType: 'Travel grant' },
    { fundingType: 'Conference/Workshop grant' },
    { fundingType: 'Others' },
  ],

}