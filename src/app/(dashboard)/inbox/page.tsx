import { ConversationList } from "@/components/inbox/conversation-list";
import { ChatPanel } from "@/components/inbox/chat-panel";
import { ConversationInfo } from "@/components/inbox/conversation-info";

export default function InboxPage() {
  return (
    <div className="flex h-full overflow-hidden">
      <ConversationList />
      <ChatPanel />
      <ConversationInfo />
    </div>
  );
}
