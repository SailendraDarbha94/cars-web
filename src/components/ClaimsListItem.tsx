"use client";

const ClaimsListItem = ({ claim }: any) => {
  //const claimData = JSON.parse(claim)
  return (
    <div className="flex flex-row flex-wrap max-w-full font-pMedium bg-blue-400">
      <div className="flex flex-col w-1/2">
        <h1 className="text-lg">First Name : {claim.first_name}</h1>
        <h1 className="text-lg">Middle Name : {claim.middle_name}</h1>
        <h1 className="text-lg">Last Name : {claim.last_name}</h1>
        <h1 className="text-lg">Email : {claim.email}</h1>
        <h1 className="text-lg">Risk Type : {claim.risk_type}</h1>
        <h1 className="text-lg">Island : {claim.island}</h1>
        <h1 className="text-lg">Policy Number: {claim.policy_number}</h1>
        <h1 className="text-lg">Adjuster : {claim.adjuster}</h1>
      </div>
      <div className="bg-purple-300 w-1/2">
        <h1 className="text-wrap overflow-hidden">{JSON.stringify(claim.images)}</h1>
      </div>
    </div>
  );
};

export default ClaimsListItem;
