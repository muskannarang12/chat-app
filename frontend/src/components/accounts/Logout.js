import { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";

import { useAuth } from "../../contexts/AuthContext";

export default function Logout({ modal, setModal }) {
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();

  const { logout, setError } = useAuth();

  async function handleLogout() {
    try {
      setError("");
      await logout();
      setModal(false);
      navigate("/login");
    } catch {
      setError("Failed to logout");
    }
  }

  return (
    <Transition.Root show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setModal}
      >
        <div className="flex items-start justify-center min-h-screen pt-28 px-4 text-center sm:pt-36 sm:px-0 bg-black/50 backdrop-blur-sm">

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-middle bg-white/30 dark:bg-black/30 backdrop-blur-md rounded-2xl px-8 pt-6 pb-5 text-left overflow-hidden shadow-xl transition-all sm:my-8 sm:max-w-lg sm:w-full">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-red-100 dark:bg-gray-200">
                  <ExclamationIcon
                    className="h-6 w-6 text-red-600"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold text-white dark:text-white"
                  >
                    Logging Out
                  </Dialog.Title>
                  <p className="text-sm text-gray-100 dark:text-gray-300 mt-1">
                    Are you sure you want to log out?
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white/80 text-gray-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-500 dark:hover:bg-gray-600"
                  onClick={() => setModal(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
