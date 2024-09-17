import { Request, Response } from 'express';

class HomeController {
  public home = async (req: Request, res: Response) => {
    res.json({
      now: (new Date()).toString(),
    });
  };
}

export const homeController = new HomeController();
