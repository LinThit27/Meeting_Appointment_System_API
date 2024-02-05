import { CreateOptions, FindOptions, Identifier } from "sequelize";
import Account, { AccountAttributes } from "../models/Account";

type createAccount = {
  name: string;
  staffId: number;
  departmentId: number;
};

const findAll = (options?: FindOptions<AccountAttributes>) =>
  Account.findAll(options);

const findByPk = (
  identifier: Identifier,
  options?: FindOptions<AccountAttributes>
) => Account.findByPk(identifier, options);

const create = (
  data: createAccount,
  options?: CreateOptions<AccountAttributes>
) => Account.create(data, options);

export default { findAll, findByPk, create };
