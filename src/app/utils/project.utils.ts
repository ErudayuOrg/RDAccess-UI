/*userDesignationCode:
* STUDT => student
* GUEST => princi, mangement, others..

* PROFR => All professor
* RESER => researchScholar

* HOD => HOD
* ADMIN => Admin */

const ROLE_WITH_NO_EDIT = ['STUD','GUEST',];
const ROLE_WITH_EDIT = ['HOD'];

export const getEditAccess = (userDetail, projectDetail):boolean=>{
    const {userId,userDesignationCode,userDepartmentId} = userDetail;
    const {team,projectDepartment} = projectDetail;

    const contributionAccess:boolean = getContributionAccess(userId,userDesignationCode,team); 
    const roleAccess:boolean = getRoleAccess(userDesignationCode, userDepartmentId, projectDepartment);
 return contributionAccess || roleAccess;
}

const getContributionAccess = (userId, userDesignationCode, team):boolean=>{
    return(
        !ROLE_WITH_NO_EDIT.includes(userDesignationCode) &&
        team.includes(userId)
    );
}

const getRoleAccess = (userDesignationCode, userDepartmentId, projectDepartment):boolean=>{
    return(
        userDesignationCode === 'ADMIN' ||
        (ROLE_WITH_EDIT.includes(userDesignationCode) && projectDepartment.includes(userDepartmentId))
    );
}
