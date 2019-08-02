const createJob = ({ body: { uid, token } }, res) => {
  // auth.verifyIdToken(token).then(decodedToken => {
  //   if (decodedToken.uid === uid) {
  //     res.sendStatus(200)
  //   }
  // });
  res.sendStatus(200);
};

export default createJob;
