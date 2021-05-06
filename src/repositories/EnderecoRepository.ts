import { EntityRepository, Repository } from "typeorm";

import { Endereco } from "../model/Endereco";

@EntityRepository(Endereco)
class EnderecoRepository extends Repository<Endereco> {}

export { EnderecoRepository };