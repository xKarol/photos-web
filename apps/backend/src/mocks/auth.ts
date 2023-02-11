import * as authMiddleware from "../middlewares/require-auth";

const mockAuthMiddleware = jest
  .spyOn(authMiddleware, "requireAuth")
  .mockImplementation((_req, _res, next) => {
    next();
  });

export default mockAuthMiddleware;
