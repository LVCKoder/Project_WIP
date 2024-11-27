import React, { useState, useEffect } from "react";

interface TicketCommentsProps {
  taskId: string; // ID tasku, aby sme vedeli, kam ukladať komentáre
}

export const TicketComments: React.FC<TicketCommentsProps> = ({ taskId }) => {
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");

  // Načítanie komentárov z localStorage pri otvorení detailu
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const task = storedTasks.find((task: any) => task.id === taskId);
    if (task) {
      setComments(task.comments || []);
    }
  }, [taskId]);

  // Pridanie komentára
  const handleAddComment = () => {
    if (!newComment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    const email = localStorage.getItem("userEmail") || "Unknown User";
    const updatedComments = [...comments, `${email}: ${newComment.trim()}`];
    setComments(updatedComments); // Aktualizácia lokálneho stavu

    // Uloženie komentárov do localStorage
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const taskIndex = storedTasks.findIndex((task: any) => task.id === taskId);
    if (taskIndex !== -1) {
      storedTasks[taskIndex].comments = updatedComments;
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }

    setNewComment(""); // Vymazanie textového poľa
  };

  return (
    <div className="w-2/3 pl-6">
      <h3 className="text-xl font-medium mb-4">Comments</h3>
      <div className="flex-1 overflow-y-auto bg-gray-100 rounded-lg p-4 h-[400px]">
        {comments.length > 0 ? (
          comments.map((comment, index) => {
            const [email, ...rest] = comment.split(": ");
            const content = rest.join(": ");
            return (
              <div
                key={index}
                className="flex items-start bg-white p-3 rounded-lg shadow mb-3"
              >
                <img
                  src={`https://thispersondoesnotexist.com/image?random=${index}`}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="text-sm font-medium text-gray-700">{email}</p>
                  <p className="text-gray-600">{content}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
      <div className="mt-4">
        <textarea
          className="h-32 w-full px-3 py-1 text-sm outline-none border-gray-300 resize-none border rounded-lg placeholder:text-sm"
          placeholder="Add your comments here"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <div className="flex justify-between items-center mt-2">
          <button
            onClick={handleAddComment}
            className="h-12 w-[150px] bg-blue-400 text-sm text-white rounded-lg transition-all hover:bg-blue-600"
          >
            Submit Comment
          </button>
        </div>
      </div>
    </div>
  );
};
