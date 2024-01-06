export interface WorkdaysModel {
  id?: string,
  employee_id: string,
  date: string,
  is_employee_working_day: boolean,
  note: string,
  full_name: string,
  role: string
}