import { EntityRepository, Repository } from "typeorm";

import { Cliente } from "../model/Cliente";

@EntityRepository(Cliente)
class ClienteRepository extends Repository<Cliente> {}

export { ClienteRepository };