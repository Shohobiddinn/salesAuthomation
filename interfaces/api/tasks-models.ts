interface TaskModel {
  id?: string,
  is_active: boolean,
  task_entity_type_id: string,
  performer_id: string,
  client_id: string,
  content: string,
  color: string,
  due_date: string,
  task_file_id: string,
  task_result_file_id: string,
  created_date: string,
  comment: string,
  performer: PerformerModel,
  employee: EmployeeModel,
  client: ClientModel,
  status: string,
  task_type: TaskTypeModel,
  task_file: TaskFileModel,
  task_result_file: TaskResultFileModel
}

interface PerformerModel {
  id?: string,
  is_active: boolean,
  last_name: string,
  first_name: string,
  middle_name: string,
  phone: string,
  email: string,
  login: string,
  password: string,
  role: string,
  code: string
}

interface EmployeeModel {
  id?: string,
  is_active: true,
  last_name: string,
  first_name: string,
  middle_name: string,
  phone: string,
  email: string,
  login: string,
  password: string,
  role: string,
  code: string
}

interface EmployeesModel {
  visit_days: string[],
  employee_id: string,
  employee_name?: string,
  role?: number
}

interface DepositLimitsModel {
  currency_id: string,
  allowed_minimum_balance: number
}

interface ClientModel {
  id?: string,
  is_active: true,
  territory_id: string,
  client_category_id: string,
  name: string,
  company_name: string,
  address: string,
  navigate: string,
  phone: string,
  contact: string,
  inn: string,
  jshshir: string,
  client_type_id: string,
  sales_channel_id: string,
  description: string,
  lat: string,
  lon: string,
  code: string,
  number_of_contract: string,
  account: string,
  bank: string,
  mfo: string,
  oked: string,
  code_nds: string,
  employees: EmployeesModel[]
  product_categories: string[],
  deposit_limits: DepositLimitsModel[]
}

interface TaskTypeModel {
  id?: string,
  is_active: true,
  name: string,
  sort: 0
}

interface TaskFileModel {
  id?: string,
  is_active: true,
  name: string,
  path: string,
  client_id: string
}

interface TaskResultFileModel {
  id?: string,
  is_active: true,
  name: string,
  path: string,
  client_id: string
}


export type {
  TaskModel,
  PerformerModel,
  EmployeeModel,
  EmployeesModel,
  DepositLimitsModel,
  ClientModel,
  TaskTypeModel,
  TaskFileModel,
  TaskResultFileModel
}