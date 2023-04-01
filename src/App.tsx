import React from "react";

export default function App() {
  const [displayedMessages, setDisplayedMessages] = React.useState<string[]>([]);
  const [inputMessage, setInputMessage] = React.useState<string>("");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayedMessages(displayedMessages.slice(1));
    }, 5000);

    return () => clearTimeout(timer);
  }, [displayedMessages]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (inputMessage.length > 0) {
        setDisplayedMessages([...displayedMessages, inputMessage]);
        setInputMessage("");
        document.getElementById("input-message")!.innerHTML = "";
      }
    }
  };

  return (
    <main className="bg-[#00FF00] text-3xl flex flex-col justify-end min-h-screen gap-5 p-5 font-inter">
      <div className="flex flex-col gap-5">
        {displayedMessages.map((message, i) => {
          return (
            <p className="max-w-md p-3 break-words whitespace-pre-wrap bg-white shadow-xl rounded-xl w-fit" key={i}>
              {message}
            </p>
          );
        })}
      </div>
      <div
        className={`${
          inputMessage
            ? "rounded-xl w-fit rounded-bl-none text-black shadow-xl break-words max-w-md whitespace-pre-wrap bg-white opacity-100"
            : "text-[#00FF00] opacity-0"
        }
            outline-none p-3 transition-opacity duration-300 ease-in-out`}
        id="input-message"
        contentEditable="true"
        spellCheck="false"
        onInput={(event) => setInputMessage(event.currentTarget.textContent!)}
        onKeyDown={(event) => handleKeyDown(event)}
      />
    </main>
  );
}
