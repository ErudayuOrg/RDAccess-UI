import { RD_CONSTANT  } from "../keys/constant";

export const getFundingEditAccess = ({userDesignationCode}) => {
    return RD_CONSTANT.ROLE_WITH_EDIT_FUNDING.includes(userDesignationCode);
}

export const isPastDate = date =>{
    return new Date(date) < new Date()? true: false;
}