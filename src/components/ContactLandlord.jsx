import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";

const ContactLandlord = ({ userRef, listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  const onChange = (e) => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, "users", userRef);
      console.log(docRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("Could not get Landlord information");
      }
    };
    getLandlord();
  }, [userRef]);
  console.log(landlord);
  return (
    <>
      {landlord !== null && (
        <div className="mt-8 font-bold">
          <p>
            Contact {landlord.name} for {listing.name.toLowerCase()}
          </p>
          <div>
            <textarea
              name="message"
              id="message"
              rows="2"
              value={message}
              onChange={onChange}
              className="border border-slate-200 rounded-md my-4 p-3 w-full font-normal"
            ></textarea>
          </div>
          <a
            href={`mailto: ${landlord.email}? Subject=${listing.name} &body=${message}`}
          >
            <button className="w-full font-bold border border-red-500 rounded-md p-3 text-white bg-red-500 mb-5 hover:bg-white hover:text-red-500 mt-3 transition duration-500">
              Send Message
            </button>
          </a>
        </div>
      )}
    </>
  );
};

export default ContactLandlord;
