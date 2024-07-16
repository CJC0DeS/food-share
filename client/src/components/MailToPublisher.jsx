import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiEmailCheckOutline, mdiCloseCircleOutline } from "@mdi/js";

export default function MailToPublisher({
  publisherUsername,
  publisherEmail,
  foodPostName,
  onCancel,
}) {
  const [message, setMessage] = useState("");
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="flex">
        <div className="flex flex-1">
          Contact
          <span className="font-semibold mx-1">{publisherUsername}</span> for
          <span className="font-semibold mx-1">
            {foodPostName.toLowerCase()}
          </span>
          at
          <span className="font-semibold mx-1">{publisherEmail}</span>
        </div>
        <button
          onClick={() => {
            onCancel(false);
          }}
          className=" text-red-700 rounded-full uppercase hover:opacity-75 disabled:opacity-50 mx-2"
        >
          <Icon path={mdiCloseCircleOutline} size={1} />
        </button>
      </p>
      <textarea
        name="message"
        id="message"
        rows="2"
        value={message}
        onChange={onChange}
        placeholder="Enter your message here..."
        className="border p-3 px-5 rounded-3xl  bg-lime-100  focus:outline-lime-500 text-lime-800"
      />
      <div className="flex">
        <div className="flex flex-1">
          <Link
            to={`mailto:${publisherEmail}?subject=Regarding ${foodPostName}&body=${message}`}
            className="flex justify-center text-white p-3 rounded-3xl uppercase hover:opacity-75 disabled:opacity-50 bg-lime-700 w-80 mx-auto"
          >
            Send Message
            <Icon path={mdiEmailCheckOutline} size={1} className="ml-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
