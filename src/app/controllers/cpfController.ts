import { Request, Response } from 'express';
import { getCpfData } from '../services/serpro';

class CpfController {
  public verifyCpf = async (req: Request, res: Response) => {
    const { cpf } = req.params

    const cpfData = await getCpfData(cpf)

    res.json(cpfData);
  };
}

export const cpfController = new CpfController();
