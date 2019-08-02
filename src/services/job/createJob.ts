import { auth } from "../../firebase";

const createJob = (req: { body: { uid: string; token: string } }, res: any) => {
  auth.verifyIdToken(token).then(decodedToken => {
    if (decodedToken.uid === uid) {
      res.sendStatus(200);
    }
  });
};

export default createJob;
