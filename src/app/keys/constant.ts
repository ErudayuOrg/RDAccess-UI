export const RD_CONSTANT ={ 
DESIGNATION : [
  { userDesignationCode: 'ADMIN', userDesignation: 'Admin' },
  { userDesignationCode: 'HOD', userDesignation: 'Head of the Department' },
  { userDesignationCode: 'PROFR', userDesignation: 'Professor' },
  { userDesignationCode: 'RESER', userDesignation: 'Research Scholar' },
  { userDesignationCode: 'STUDT', userDesignation: 'Student' },
  { userDesignationCode: 'GUEST', userDesignation: 'Guest' }
],
ROLE_WITH_NO_EDIT : ['STUD','GUEST'],
ROLE_WITH_EDIT : ['HOD'],
ROLE_WITH_NO_CREATE : ['STUD','ADMIN','GUEST'],
ROLE_WITH_NO_PROFILE : ['GUEST','ADMIN'],
ROLE_WITH_ADMIN_ACCESS : ['ADMIN'],
ROLE_WITH_NO_DEPARTMENT : ['ADMIN','GUEST'],
MAX_CONTIBUTOR_PER_PROJECT: 5,
//increment TOTAL_SIZE if new tile added to this list
PROJECT_TILE_INDEX :{
    TOTAL_SIZE:5,
    TITLE:0,
    SUMMARY:1,
    KEYWORDS:2,
    REFERENCE:3,
    CONTENT:4
  }
}