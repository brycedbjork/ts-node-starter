import { updateUser } from "../user/updateUser";
import { Student, Hirer } from "../../schemas/User";
import { firestore } from "../../firebase";
import { purePhone } from "../../utils/formatPhone";

/*
Takes uid, user entity and credits referer
*/

export default async (uid: string, user: Student | Hirer) => {
  // find referrals that match user
  const formattedPhone = purePhone(user.phoneNumber);
  const phoneMatches = await firestore
    .collection("referrals")
    .where("phoneNumber", "==", formattedPhone)
    .get();
  const emailMatches = await firestore
    .collection("referrals")
    .where("email", "==", user.email)
    .get();
  const results = [
    ...phoneMatches.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    }),
    ...emailMatches.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    })
  ];

  // only continue if we have some matches
  if (results.length == 0) {
    return;
  }

  // sort results by time (latest referrals first)
  results.sort((a: any, b: any) => {
    return b.time > a.time ? 1 : -1;
  });

  // latest referral is the one we will match with the user
  const match: any = results[0];
  if (match.user && match.user.id) {
    await updateUser(uid, {
      referral: match.user.id
    });
  }

  // delete all of the referrals that matched
  // results.forEach(async result => {
  //   await firestore
  //     .collection("referrals")
  //     .doc(result.id)
  //     .delete();
  // });
};
