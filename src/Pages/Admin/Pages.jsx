import { useState } from "react";
import Modal from "../../Components/common/Modal";
import Button from "../../Components/common/Button";
import RowsSelector from "../../Components/common/RowsSelector";
import FilterForm from "../../Components/common/FilterForm";
import ActionButtons from "../../Components/common/ActionButtons";

export default function AdminTickets() {
  const [rows, setRows] = useState(5);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({ subject: "", status: "" });
  const [tickets, setTickets] = useState([
    {
      id: 1,
      subject: "Payment Issue",
      customer: "John Doe",
      date: "2025-08-25",
      status: "Open",
      replies: [
        { sender: "Customer", message: "My payment failed", attachments: [] },
      ],
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [activeTicket, setActiveTicket] = useState(null);
  const [statusDropdown, setStatusDropdown] = useState(null); // ✅ new state for status menu

  const statusColors = {
    Open: "bg-green-200 text-green-700",
    Pending: "bg-yellow-200 text-yellow-700",
    Closed: "bg-red-200 text-red-700",
  };

  const filteredTickets = tickets.filter(
    (t) =>
      (!filters.subject ||
        t.subject.toLowerCase().includes(filters.subject.toLowerCase())) &&
      (!filters.status || t.status === filters.status)
  );

  const visibleTickets = filteredTickets.slice(0, rows);

  // Save ticket
  const handleSaveTicket = (form) => {
    setTickets([...tickets, { ...form, id: Date.now(), replies: [] }]);
    setModalOpen(false);
  };

  // Add reply
  const handleAddReply = (ticketId, reply) => {
    setTickets(
      tickets.map((t) =>
        t.id === ticketId ? { ...t, replies: [...t.replies, reply] } : t
      )
    );
    setReplyModalOpen(false);
  };

  // Change status
  const handleChangeStatus = (ticketId, status) => {
    setTickets(tickets.map((t) => (t.id === ticketId ? { ...t, status } : t)));
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-secondary">Manage Tickets</h2>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <Button variant="secondary" onClick={() => setShowFilter(!showFilter)}>
          Show Filters
        </Button>
        <RowsSelector value={rows} onChange={setRows} />
        <Button
          variant="primary"
          onClick={() => {
            setEditingTicket(null);
            setModalOpen(true);
          }}
        >
          + Add Ticket
        </Button>
      </div>

      {/* Filters */}
      <FilterForm
        show={showFilter}
        filters={filters}
        setFilters={setFilters}
        fields={[
          { key: "subject", placeholder: "Subject" },
          {
            key: "status",
            type: "select",
            placeholder: "Status",
            options: [
              { label: "Open", value: "Open" },
              { label: "Pending", value: "Pending" },
              { label: "Closed", value: "Closed" },
            ],
          },
        ]}
        onClear={() => setFilters({})}
        onApply={() => setShowFilter(false)}
      />

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow bg-white relative overflow-visible">
        <table className="w-full text-left border-collapse relative">
          <thead>
            <tr className="bg-gray-light text-gray-dark">
              <th className="p-3">Subject</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleTickets.map((t) => (
              <tr
                key={t.id}
                className="border-b hover:bg-gray-light/40 relative"
              >
                <td className="p-3">{t.subject}</td>
                <td className="p-3">{t.customer}</td>
                <td className="p-3">{t.date}</td>
                <td className="p-3 relative">
                  <div className="relative inline-block">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setStatusDropdown(
                          statusDropdown === t.id ? null : t.id
                        );
                      }}
                      className={`px-3 py-1 rounded-lg text-sm font-medium shadow ${
                        statusColors[t.status]
                      }`}
                    >
                      {t.status}
                    </button>

                    {/* Dropdown */}
                    {statusDropdown === t.id && (
                      <div className="absolute top-full left-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-[9999]">
                        {Object.keys(statusColors).map((s) => (
                          <button
                            key={s}
                            onClick={() => {
                              handleChangeStatus(t.id, s);
                              setStatusDropdown(null);
                            }}
                            className={`block w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-light ${statusColors[s]}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-3 flex justify-center gap-2">
                  <ActionButtons
                    onEdit={() => {
                      setActiveTicket(t);
                      setReplyModalOpen(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Ticket Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h3 className="text-xl font-semibold mb-4">Add Ticket</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = Object.fromEntries(
              new FormData(e.target).entries()
            );
            handleSaveTicket(formData);
          }}
          className="grid gap-4"
        >
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            required
            className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
          />
          <input
            type="text"
            name="customer"
            placeholder="Customer Name"
            required
            className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
          />
          <textarea
            name="message"
            placeholder="Describe the issue..."
            required
            className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
          />
          <Button type="submit" variant="primary">
            Add Ticket
          </Button>
        </form>
      </Modal>

      {/* Ticket Replies Modal */}
      <Modal isOpen={replyModalOpen} onClose={() => setReplyModalOpen(false)}>
        {activeTicket && (
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Ticket: {activeTicket.subject}
            </h3>
            <div className="space-y-3 max-h-60 overflow-y-auto mb-4 p-2 border rounded-lg">
              {activeTicket.replies.map((r, i) => (
                <div key={i} className="p-2 bg-gray-light rounded">
                  <p className="font-semibold">{r.sender}:</p>
                  <p>{r.message}</p>
                  {r.attachments?.length > 0 && (
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {r.attachments.map((file, j) => (
                        <img
                          key={j}
                          src={URL.createObjectURL(file)}
                          alt="attachment"
                          className="w-20 h-20 object-cover rounded"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const reply = {
                  sender: "Admin",
                  message: formData.get("reply"),
                  attachments: formData.getAll("attachments"),
                };
                handleAddReply(activeTicket.id, reply);
              }}
              className="grid gap-3"
            >
              <textarea
                name="reply"
                placeholder="Write your reply..."
                required
                className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
              />
              <input
                type="file"
                name="attachments"
                multiple
                className="border p-2 rounded-lg"
              />
              <div className="flex justify-end">
                <Button type="submit" variant="primary">
                  Send Reply
                </Button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
}
