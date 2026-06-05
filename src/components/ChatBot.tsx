import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { Bot, Loader2, MessageCircle, Send, Sprout, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const starterMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Xin chào, mình là Tiểu Thần Nông AI của AgriBeacon. Bạn có thể hỏi về canh tác, cảm biến IoT, UAV, robot, bản đồ nông trại, dự báo năng suất hoặc giải pháp AgriBeacon.",
  },
];

const quickPrompts = [
  "Vườn sầu riêng nên đặt cảm biến gì?",
  "Robot phun thuốc phù hợp diện tích nào?",
  "Làm sao dự báo năng suất tốt hơn?",
];

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const renderInlineMarkdown = (text: string) => {
  const parts = text.split(/(\*\*[^*\n]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={`${part}-${index}`} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
};

const renderAssistantMarkdown = (content: string) => {
  const elements: JSX.Element[] = [];
  let listType: "ul" | "ol" | null = null;
  let listItems: string[] = [];

  const flushList = () => {
    if (!listType || listItems.length === 0) return;

    const ListTag = listType;
    elements.push(
      <ListTag key={`list-${elements.length}`} className="ml-4 list-outside space-y-1 pl-1">
        {listItems.map((item, index) => (
          <li key={`${item}-${index}`}>{renderInlineMarkdown(item)}</li>
        ))}
      </ListTag>,
    );
    listType = null;
    listItems = [];
  };

  content.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      return;
    }

    const bullet = trimmed.match(/^[-*]\s+(.+)$/);
    const numbered = trimmed.match(/^\d+[.)]\s+(.+)$/);

    if (bullet) {
      if (listType && listType !== "ul") flushList();
      listType = "ul";
      listItems.push(bullet[1]);
      return;
    }

    if (numbered) {
      if (listType && listType !== "ol") flushList();
      listType = "ol";
      listItems.push(numbered[1]);
      return;
    }

    flushList();
    elements.push(
      <p key={`p-${elements.length}`}>
        {renderInlineMarkdown(trimmed)}
      </p>,
    );
  });

  flushList();

  return <div className="space-y-2">{elements}</div>;
};

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || loading) return;

    const nextMessages = [...messages, { id: createId(), role: "user" as const, content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.error || "Không gọi được AI");
      }

      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: "assistant",
          content: data.answer || "Mình chưa có câu trả lời phù hợp lúc này.",
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: "assistant",
          content:
            error instanceof Error && error.message.includes("OPENCODE_GO_API_KEY")
              ? "Chatbot chưa được cấu hình OPENCODE_GO_API_KEY trên server. Vui lòng thêm key trong biến môi trường deploy."
              : "Mình đang không kết nối được AI. Bạn thử lại sau ít phút nhé.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    void sendMessage(input);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(input);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {open && (
        <section className="mb-3 flex h-[min(620px,calc(100vh-12rem))] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl sm:w-[420px]">
          <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Sprout className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold text-foreground">Tiểu Thần Nông AI</h2>
                <p className="truncate text-xs text-muted-foreground">Trợ lý AgriBeacon</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Đóng chat">
              <X className="h-4 w-4" />
            </Button>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
            {messages.map((message) => {
              const isUser = message.role === "user";
              const Icon = isUser ? User : Bot;

              return (
                <div key={message.id} className={cn("flex gap-2", isUser && "justify-end")}>
                  {!isUser && (
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[78%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                      isUser
                        ? "whitespace-pre-wrap bg-primary text-primary-foreground"
                        : "border border-border bg-card text-card-foreground",
                    )}
                  >
                    {isUser ? message.content : renderAssistantMarkdown(message.content)}
                  </div>
                  {isUser && (
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                  )}
                </div>
              );
            })}
            {loading && (
              <div className="flex gap-2">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-primary">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Đang trả lời...
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-border bg-card/70 px-4 py-3">
            {messages.length === 1 && (
              <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => void sendMessage(prompt)}
                    className="shrink-0 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex items-end gap-2">
              <Textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Hỏi Tiểu Thần Nông AI..."
                rows={1}
                className="max-h-28 min-h-11 resize-none rounded-xl"
                disabled={loading}
              />
              <Button type="submit" size="icon" disabled={loading || !input.trim()} aria-label="Gửi tin nhắn">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
          </div>
        </section>
      )}

      <Button
        size="lg"
        onClick={() => setOpen((current) => !current)}
        className="h-14 rounded-full bg-gradient-to-r from-primary to-secondary px-5 shadow-glow"
        aria-label={open ? "Đóng chat" : "Mở chat"}
      >
        {open ? <X className="mr-2 h-5 w-5" /> : <MessageCircle className="mr-2 h-5 w-5" />}
        Tiểu Thần Nông AI
      </Button>
    </div>
  );
};

export default ChatBot;
