export const RD_CONSTANT ={ 
DESIGNATION : [
  { userDesignationCode: 'ADMIN', userDesignation: 'Admin' },
  { userDesignationCode: 'HOD', userDesignation: 'Head of the Department' },
  { userDesignationCode: 'PROFR', userDesignation: 'Teaching staff' },
  { userDesignationCode: 'RESER', userDesignation: 'Non-Teaching staff' },
  { userDesignationCode: 'STUDT', userDesignation: 'Student' },
  { userDesignationCode: 'GUEST', userDesignation: 'Guest' }
],
ROLE_WITH_NO_EDIT : ['STUD','GUEST'],
ROLE_WITH_EDIT : ['HOD'],
ROLE_WITH_NO_CREATE : ['STUD','ADMIN','GUEST'],
ROLE_WITH_NO_PROFILE : ['GUEST','ADMIN'],
ROLE_WITH_ADMIN_ACCESS : ['ADMIN'],
ROLE_WITH_NO_DEPARTMENT : ['ADMIN','GUEST'],
ROLE_WITH_EDIT_FUNDING:['ADMIN'],
MAX_CONTIBUTOR_PER_PROJECT: 5,
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

  SNAPSHOT_TILE_TITLE :{
    FUNDINGS:'Funded projects',
    LABS:'Total research labs',
    PROJECTS:'Total projects',
    PUBLICATIONS:'Total Publications',
    MOUS:'Total MOUs'
  }
}