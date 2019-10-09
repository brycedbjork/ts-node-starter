export default function(req: { body: object }, res: any) {
  var aboutInfo = {
    name: "starter-api",
    version: "1.0"
  };
  res.json(aboutInfo);
}
