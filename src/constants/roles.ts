export enum rolesEnum {
  ADMIN = "ADMIN",
  MANAGING_DIRECTOR = "MANAGING_DIRECTOR",
  PROMOTING_MANAGER = "PROMOTING_MANAGER",
  EVENT_MANAGER = "EVENT_MANAGER",
  FINANCE_MANAGER = "FINANCE_MANAGER",
  SALES_MANAGER = "SALES_MANAGER",
  PARTICIPANT = "PARTICIPANT",
}

export type roles = keyof typeof rolesEnum;
export const roles = Object.values<keyof typeof rolesEnum>(rolesEnum);
