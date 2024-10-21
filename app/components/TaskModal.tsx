import { useState, useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";

const taskSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string(),
  assignee: yup.string().required("Assignee is required"),
  priority: yup.string().required("Priority is required"),
  dueDate: yup.date().required("Due Date is required"),
  status: yup.string().required("Status is required"),
});

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "Lisa" },
  { id: 5, name: "John" },
  { id: 6, name: "Sarah" },
  { id: 7, name: "Alex" },
  { id: 8, name: "Emma" },
  { id: 9, name: "Daniel" },
  { id: 10, name: "Sophia" },
  { id: 11, name: "James" },
  { id: 12, name: "Olivia" },
  { id: 13, name: "Mia" },
  { id: 14, name: "Lucas" },
  { id: 15, name: "Noah" },
  { id: 16, name: "Ethan" },
  { id: 17, name: "Amelia" },
];

export default function TaskModal({ task, onSubmit, onClose }) {
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    assignee: "",
    priority: "Low",
    dueDate: "",
    status: "To Do",
  });

  useEffect(() => {
    if (task) {
      setInitialValues(task);
    }
  }, [task]);

  const formik = useFormik({
    initialValues,
    validationSchema: taskSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md w-1/3">
        <h2 className="text-2xl mb-4">
          {task ? "Edit Task" : "Create New Task"}
        </h2>

        <form onSubmit={formik.handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {formik.errors.title && formik.touched.title && (
              <p className="text-red-500">{formik.errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Assignee */}
          <div className="mb-4">
            <label className="block text-gray-700">Assignee</label>
            <select
              name="assignee"
              onChange={formik.handleChange}
              value={formik.values.assignee}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Assignee</option>
              {users.map((user) => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
            {formik.errors.assignee && formik.touched.assignee && (
              <p className="text-red-500">{formik.errors.assignee}</p>
            )}
          </div>

          {/* Priority */}
          <div className="mb-4">
            <label className="block text-gray-700">Priority</label>
            <select
              name="priority"
              onChange={formik.handleChange}
              value={formik.values.priority}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            {formik.errors.priority && formik.touched.priority && (
              <p className="text-red-500">{formik.errors.priority}</p>
            )}
          </div>

          {/* Due Date */}
          <div className="mb-4">
            <label className="block text-gray-700">Due Date</label>
            <input
              type="date"
              name="dueDate"
              onChange={formik.handleChange}
              value={formik.values.dueDate}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {formik.errors.dueDate && formik.touched.dueDate && (
              <p className="text-red-500">{formik.errors.dueDate}</p>
            )}
          </div>

          {/* Status */}
          <div className="mb-4">
            <label className="block text-gray-700">Status</label>
            <select
              name="status"
              onChange={formik.handleChange}
              value={formik.values.status}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            {formik.errors.status && formik.touched.status && (
              <p className="text-red-500">{formik.errors.status}</p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="p-2 bg-gray-500 text-white rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-md"
            >
              {task ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
