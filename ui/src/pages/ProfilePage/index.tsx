import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ContactSection, HistoryTabBar, ReceivedSection, SentSection, TokenTypeToggle } from "pages/HomePage/components";
import { HomeTab, TokenType } from "utils/enums";
import { useUserReceives, useUserTransfers } from "helpers";

const ProfilePage = () => {
  const [tab, setTab] = useState<HomeTab>(HomeTab.Sent);
  const navigate = useNavigate();
  const {
    transferIds,
    loading: transferLoading,
  } = useUserTransfers();
  const {
    transferIds: receiveIds,
    loading: receivesLoading,
  } = useUserReceives();

  return (
    <>
      <div className="text-white md:text-6xl text-4xl font-bold text-center mb-8">My Profile</div>
      <div className="w-full flex flex-col sm:flex-row gap-3 pt-4">
        <div className="rounded-2xl shadow-md shadow-dark-1000 bg-base w-full">
          <div className="text-white text-xl p-4">My contacts</div>
          <ContactSection
            onTransfer={(tokenType: TokenType, recipient: string) => {
              navigate("/", { state: { tokenType, recipient } });
            }}
          />
        </div>
        <div className="flex flex-col gap-2 rounded-2xl shadow-md shadow-dark-1000 bg-base w-full">
          <div className="text-white text-xl p-4">Recent transfers</div>
          <TokenTypeToggle />
          {tab === HomeTab.Sent ? (
            <>
              <HistoryTabBar
                tab={tab}
                onChange={(tab) => setTab(tab)}
              />
              <SentSection
                transferIds={transferIds}
                loading={transferLoading}
              />
            </>
          ) :(
            <>
              <HistoryTabBar
                tab={tab}
                onChange={(tab) => setTab(tab)}
              />
              <ReceivedSection
                transferIds={receiveIds}
                loading={receivesLoading}
              />
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ProfilePage;