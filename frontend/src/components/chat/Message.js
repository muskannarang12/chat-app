import { format } from "timeago.js";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Message({ message, self }) {
  return (
    <>
      <li
        className={classNames(
          self !== message.sender ? "justify-start" : "justify-end",
          "flex"
        )}
      >
        <div>
          <div
            className={classNames(
              self !== message.sender
                ? "text-gray-700 dark:text-gray-400 bg-white border border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-700"
                : "bg-pink-400 dark:bg-purple-500 text-white", // 💜 Changed here
              "relative max-w-xl px-4 py-2 rounded-lg shadow"
            )}
          >
            <span className="block font-normal">{message.message}</span>
          </div>
          <span className="block text-sm text-white-700 dark:text-gray-400">
            {format(message.createdAt)}
          </span>
        </div>
      </li>
    </>
  );
}
