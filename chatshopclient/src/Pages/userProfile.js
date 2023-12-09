import React from "react";
import Navbar from "../Components/Navbar";
import { connect } from "react-redux";

function userProfile({ userData }) {
  return (
    <>
      <Navbar />
      {userData ? (
        <div className="flex flex-row p-2 gap-8 w-full">
          <div className="flex flex-col gap-4 w-full">
            <h4 className=" text-HardOrange text-xl">{userData.name}</h4>
            <p>{userData.email}</p>
            <button>Voir tous mes commandes</button>
            <button>Modifier mes infos</button>
          </div>
          <div className="w-5/6">
            <img
              src={userData.picture}
              className="rounded-full w-full"
              alt="user"
            />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
const mapStateToProps = (state) => ({
  userData: state.userData,
});

export default connect(mapStateToProps)(userProfile);
