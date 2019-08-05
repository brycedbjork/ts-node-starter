export default function(req: { body: object }, res: any) {
  var aboutInfo = {
    name: "has-api",
    version: "1.0"
  };
  res.json(aboutInfo);
}
